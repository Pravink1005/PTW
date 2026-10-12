-- Run the complete script in the Supabase SQL Editor as the project SQL owner.
-- It requires at least one user already registered in public.admin_users.
-- All fixtures and role changes are rolled back at the end.
begin;

do $phase5_setup$
declare
  test_slug text := 'phase5-rls-' || left(replace(gen_random_uuid()::text, '-', ''), 10);
  active_service_id uuid;
  inactive_service_id uuid;
  specialist_id uuid;
  fixture_appointment_id uuid;
  admin_id uuid;
begin
  insert into public.services (slug, name, category, blurb, is_active, sort_order)
  values (test_slug, 'Phase 5 RLS Test Service', 'counselling', 'Disposable RLS test fixture', true, 99990)
  returning id into active_service_id;

  insert into public.services (slug, name, category, blurb, is_active, sort_order)
  values (test_slug || '-inactive', 'Phase 5 Inactive RLS Test Service', 'counselling', 'Disposable inactive fixture', false, 99991)
  returning id into inactive_service_id;

  insert into public.specialists (name, title, bio, is_active)
  values ('Phase 5 RLS Test Specialist', 'Test fixture', 'Disposable RLS test fixture', true)
  returning id into specialist_id;

  insert into public.specialist_services (specialist_id, service_id)
  values (specialist_id, active_service_id);

  insert into public.appointments (
    client_name, phone, service_id, specialist_id, preferred_date,
    time_range, consent, status
  ) values (
    'Phase 5 SQL Test Client', '+919000000000', active_service_id, specialist_id,
    current_date + 30, '10:00-11:00', true, 'New'
  ) returning id into fixture_appointment_id;

  select user_id into admin_id from public.admin_users limit 1;
  if admin_id is null then
    raise exception 'Create and register an administrator in public.admin_users before running this script.';
  end if;

  perform set_config('mindcare.phase5.active_service_id', active_service_id::text, true);
  perform set_config('mindcare.phase5.inactive_service_id', inactive_service_id::text, true);
  perform set_config('mindcare.phase5.fixture_appointment_id', fixture_appointment_id::text, true);
  perform set_config('mindcare.phase5.admin_id', admin_id::text, true);
  perform set_config('mindcare.phase5.non_admin_id', gen_random_uuid()::text, true);
end;
$phase5_setup$;

set local role anon;
do $phase5_anon$
declare
  active_service_id uuid := current_setting('mindcare.phase5.active_service_id')::uuid;
  inactive_service_id uuid := current_setting('mindcare.phase5.inactive_service_id')::uuid;
  fixture_appointment_id uuid := current_setting('mindcare.phase5.fixture_appointment_id')::uuid;
  submitted_reference text;
begin
  if not exists (select 1 from public.services where id = active_service_id and is_active) then
    raise exception 'ASSERTION FAILED: anon could not read an active service';
  end if;
  if exists (select 1 from public.services where id = inactive_service_id) then
    raise exception 'ASSERTION FAILED: anon can read an inactive service';
  end if;

  begin
    perform 1 from public.appointments where id = fixture_appointment_id;
    raise exception 'ASSERTION FAILED: anon read appointments';
  exception when insufficient_privilege then
    null;
  end;

  begin
    update public.appointments set status = 'Cancelled' where id = fixture_appointment_id;
    raise exception 'ASSERTION FAILED: anon updated an appointment';
  exception when insufficient_privilege then
    null;
  end;

  begin
    delete from public.appointments where id = fixture_appointment_id;
    raise exception 'ASSERTION FAILED: anon deleted an appointment';
  exception when insufficient_privilege then
    null;
  end;

  begin
    insert into public.appointments (
      client_name, phone, service_id, preferred_date, time_range, consent, status
    ) values (
      'Phase 5 SQL Test Client', '+919000000000', active_service_id,
      current_date + 1, '10:00-11:00', true, 'Pending'
    );
    raise exception 'ASSERTION FAILED: anon directly inserted a Pending appointment';
  exception when insufficient_privilege then
    null;
  end;

  begin
    perform public.submit_appointment_request(
      p_client_name => 'Phase 5 Invalid Service Test',
      p_phone => '+919000000000',
      p_service_id => '00000000-0000-0000-0000-000000000000',
      p_preferred_date => current_date + 1,
      p_time_range => '10:00-11:00',
      p_consent => true
    );
    raise exception 'ASSERTION FAILED: invalid service ID was accepted';
  exception when sqlstate 'P0001' then
    if sqlerrm like 'ASSERTION FAILED:%' or sqlerrm <> 'The selected service is not available' then raise; end if;
  end;

  begin
    perform public.submit_appointment_request(
      p_client_name => 'Phase 5 Invalid Specialist Test',
      p_phone => '+919000000000',
      p_service_id => active_service_id,
      p_preferred_date => current_date + 1,
      p_time_range => '10:00-11:00',
      p_specialist_id => '00000000-0000-0000-0000-000000000000',
      p_consent => true
    );
    raise exception 'ASSERTION FAILED: invalid specialist ID was accepted';
  exception when sqlstate 'P0001' then
    if sqlerrm like 'ASSERTION FAILED:%' or sqlerrm <> 'The selected specialist is not available for this service' then raise; end if;
  end;

  submitted_reference := public.submit_appointment_request(
    p_client_name => 'Phase 5 Valid SQL Test',
    p_phone => '+919000000000',
    p_service_id => active_service_id,
    p_preferred_date => current_date + 1,
    p_time_range => '10:00-11:00',
    p_consent => true
  );
  perform set_config('mindcare.phase5.anon_reference', submitted_reference, true);
end;
$phase5_anon$;
reset role;

set local role authenticated;
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config('request.jwt.claim.sub', current_setting('mindcare.phase5.non_admin_id'), true);
do $phase5_non_admin$
declare
  fixture_appointment_id uuid := current_setting('mindcare.phase5.fixture_appointment_id')::uuid;
  affected integer;
begin
  if exists (select 1 from public.appointments where id = fixture_appointment_id) then
    raise exception 'ASSERTION FAILED: non-admin authenticated user read appointments';
  end if;
  update public.appointments set status = 'Cancelled' where id = fixture_appointment_id;
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'ASSERTION FAILED: non-admin authenticated user updated an appointment'; end if;
  delete from public.appointments where id = fixture_appointment_id;
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'ASSERTION FAILED: non-admin authenticated user deleted an appointment'; end if;

  begin
    insert into public.appointments (
      client_name, phone, service_id, preferred_date, time_range, consent, status
    ) values (
      'Phase 5 Non-admin SQL Test', '+919000000000',
      current_setting('mindcare.phase5.active_service_id')::uuid,
      current_date + 1, '10:00-11:00', true, 'New'
    );
    raise exception 'ASSERTION FAILED: non-admin authenticated user inserted an appointment';
  exception when insufficient_privilege then
    null;
  end;
end;
$phase5_non_admin$;
reset role;

set local role authenticated;
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config('request.jwt.claim.sub', current_setting('mindcare.phase5.admin_id'), true);
do $phase5_admin$
declare
  fixture_appointment_id uuid := current_setting('mindcare.phase5.fixture_appointment_id')::uuid;
  active_service_id uuid := current_setting('mindcare.phase5.active_service_id')::uuid;
  admin_insert_id uuid;
  affected integer;
begin
  if not exists (select 1 from public.appointments where id = fixture_appointment_id) then
    raise exception 'ASSERTION FAILED: registered admin could not read appointments';
  end if;
  update public.appointments set status = 'Confirmed' where id = fixture_appointment_id;
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'ASSERTION FAILED: registered admin could not update appointments'; end if;

  insert into public.appointments (
    client_name, phone, service_id, preferred_date, time_range, consent, status
  ) values (
    'Phase 5 Admin SQL Test', '+919000000000', active_service_id,
    current_date + 2, '10:00-11:00', true, 'New'
  ) returning id into admin_insert_id;
  delete from public.appointments where id = admin_insert_id;
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'ASSERTION FAILED: registered admin could not delete appointments'; end if;
end;
$phase5_admin$;
reset role;

do $phase5_new_status$
declare
  submitted_status text;
begin
  select status into submitted_status
  from public.appointments
  where reference_number = current_setting('mindcare.phase5.anon_reference');
  if submitted_status is distinct from 'New' then
    raise exception 'ASSERTION FAILED: anon submission did not create an appointment with status New';
  end if;
end;
$phase5_new_status$;

rollback;