create table public.clinic_settings (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique check (singleton),
  clinic_name text not null,
  tagline text not null default '',
  phone text not null default '',
  whatsapp_number text not null default '',
  email text not null default '',
  address text not null default '',
  opening_hours jsonb not null default '[]'::jsonb,
  maps_url text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  category text not null check (category in ('counselling', 'rehabilitation')),
  icon text not null default 'Leaf',
  blurb text not null default '',
  introduction text,
  helps_with jsonb not null default '[]'::jsonb check (jsonb_typeof(helps_with) = 'array'),
  intended_audience text,
  general_approach text,
  first_appointment text,
  faqs jsonb not null default '[]'::jsonb check (jsonb_typeof(faqs) = 'array'),
  related_service_slugs text[] not null default '{}',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.specialists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null default '',
  photo_url text,
  qualifications text[] not null default '{}',
  practice_areas text[] not null default '{}',
  languages text[] not null default '{}',
  bio text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.specialist_services (
  id uuid primary key default gen_random_uuid(),
  specialist_id uuid not null references public.specialists(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (specialist_id, service_id)
);

create table public.specialist_availability (
  id uuid primary key default gen_random_uuid(),
  specialist_id uuid not null references public.specialists(id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null check (end_time > start_time),
  note text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  reference_number text not null unique default (
    'MC-' || to_char(now() at time zone 'UTC', 'YYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12))
  ),
  client_name text not null check (length(trim(client_name)) between 2 and 120),
  phone text not null check (length(trim(phone)) between 7 and 32),
  email text check (email is null or length(trim(email)) <= 254),
  service_id uuid not null references public.services(id) on delete restrict,
  specialist_id uuid references public.specialists(id) on delete set null,
  preferred_date date not null,
  time_range text not null check (length(trim(time_range)) between 2 and 80),
  message text check (message is null or length(message) <= 1000),
  contact_method text check (contact_method is null or contact_method in ('phone', 'email', 'whatsapp', 'either')),
  consent boolean not null check (consent),
  status text not null default 'New' check (status in ('New', 'Pending', 'Confirmed', 'Rescheduled', 'Completed', 'Cancelled')),
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index services_active_sort_idx on public.services (is_active, sort_order);
create index specialists_active_sort_idx on public.specialists (is_active, sort_order);
create index specialist_services_service_id_idx on public.specialist_services (service_id);
create index specialist_availability_specialist_weekday_idx on public.specialist_availability (specialist_id, weekday) where is_active;
create index appointments_status_created_idx on public.appointments (status, created_at desc);
create index appointments_preferred_date_idx on public.appointments (preferred_date);
create index appointments_service_id_idx on public.appointments (service_id);
create index appointments_specialist_id_idx on public.appointments (specialist_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog, public, pg_temp
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'clinic_settings', 'services', 'specialists', 'specialist_services',
    'specialist_availability', 'appointments', 'admin_users'
  ] loop
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name, table_name
    );
  end loop;
end;
$$;

create or replace function public.reject_past_appointment_date()
returns trigger
language plpgsql
set search_path = pg_catalog, public, pg_temp
as $$
begin
  if new.preferred_date < current_date then
    raise exception 'preferred_date cannot be in the past';
  end if;
  return new;
end;
$$;

create trigger appointments_reject_past_date
before insert on public.appointments
for each row execute function public.reject_past_appointment_date();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public, pg_temp
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;

create or replace function public.submit_appointment_request(
  p_client_name text,
  p_phone text,
  p_service_id uuid,
  p_preferred_date date,
  p_time_range text,
  p_specialist_id uuid default null,
  p_email text default null,
  p_message text default null,
  p_contact_method text default null,
  p_consent boolean default false
)
returns text
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
declare
  new_reference_number text;
begin
  if p_consent is distinct from true then
    raise exception 'Consent is required to submit an appointment request';
  end if;
  if not exists (
    select 1 from public.services where id = p_service_id and is_active
  ) then
    raise exception 'The selected service is not available';
  end if;
  if p_specialist_id is not null and not exists (
    select 1
    from public.specialist_services ss
    join public.specialists s on s.id = ss.specialist_id and s.is_active
    where ss.specialist_id = p_specialist_id and ss.service_id = p_service_id
  ) then
    raise exception 'The selected specialist is not available for this service';
  end if;

  insert into public.appointments (
    client_name, phone, service_id, preferred_date, time_range,
    specialist_id, email, message, contact_method, consent, status
  ) values (
    trim(p_client_name), trim(p_phone), p_service_id, p_preferred_date, trim(p_time_range),
    p_specialist_id, nullif(trim(p_email), ''), nullif(trim(p_message), ''),
    p_contact_method, true, 'New'
  ) returning reference_number into new_reference_number;

  return new_reference_number;
end;
$$;

alter table public.clinic_settings enable row level security;
alter table public.services enable row level security;
alter table public.specialists enable row level security;
alter table public.specialist_services enable row level security;
alter table public.specialist_availability enable row level security;
alter table public.appointments enable row level security;
alter table public.admin_users enable row level security;

grant usage on schema public to anon, authenticated;

create policy "Public can read active clinic settings" on public.clinic_settings
for select to anon, authenticated using (is_active);
create policy "Admins manage clinic settings" on public.clinic_settings
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active services" on public.services
for select to anon, authenticated using (is_active);
create policy "Admins manage services" on public.services
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active specialists" on public.specialists
for select to anon, authenticated using (is_active);
create policy "Admins manage specialists" on public.specialists
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active specialist service links" on public.specialist_services
for select to anon, authenticated using (
  exists (select 1 from public.specialists s where s.id = specialist_id and s.is_active)
  and exists (select 1 from public.services v where v.id = service_id and v.is_active)
);
create policy "Admins manage specialist service links" on public.specialist_services
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active specialist availability" on public.specialist_availability
for select to anon, authenticated using (
  is_active and exists (
    select 1 from public.specialists s where s.id = specialist_id and s.is_active
  )
);
create policy "Admins manage specialist availability" on public.specialist_availability
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public can submit new appointment requests" on public.appointments
for insert to anon with check (
  status = 'New'
  and consent is true
  and preferred_date >= current_date
  and exists (select 1 from public.services s where s.id = service_id and s.is_active)
  and (
    specialist_id is null
    or (
      exists (select 1 from public.specialists p where p.id = specialist_id and p.is_active)
      and exists (
        select 1 from public.specialist_services ss
        where ss.specialist_id = specialist_id and ss.service_id = service_id
      )
    )
  )
);
create policy "Admins manage appointments" on public.appointments
for all to authenticated using (public.is_admin()) with check (public.is_admin());

revoke all on table public.admin_users from anon, authenticated;
revoke all on table public.admin_users from public;
revoke all on table public.clinic_settings, public.services, public.specialists,
  public.specialist_services, public.specialist_availability, public.appointments
  from anon, authenticated;

grant select on public.clinic_settings, public.services, public.specialists,
  public.specialist_services, public.specialist_availability to anon, authenticated;
grant insert (client_name, phone, email, service_id, specialist_id, preferred_date,
  time_range, message, contact_method, consent) on public.appointments to anon;
grant select, insert, update, delete on public.clinic_settings, public.services,
  public.specialists, public.specialist_services, public.specialist_availability,
  public.appointments to authenticated;

revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.reject_past_appointment_date() from public, anon, authenticated;
revoke all on function public.is_admin() from public, anon, authenticated;
grant execute on function public.is_admin() to authenticated;
revoke all on function public.submit_appointment_request(text, text, uuid, date, text, uuid, text, text, text, boolean) from public, anon, authenticated;
grant execute on function public.submit_appointment_request(text, text, uuid, date, text, uuid, text, text, text, boolean) to anon;

comment on column public.appointments.internal_notes is
  'Private administrative notes. Never expose this column through public APIs or views.';
comment on function public.submit_appointment_request(text, text, uuid, date, text, uuid, text, text, text, boolean) is
  'Creates one New appointment request and returns only its generated reference number.';

-- First-admin setup (run only after creating/inviting that person in Supabase Auth):
-- Replace the email below with the exact email of the Auth user you created.
-- This grants admin access; it does not create an Auth account or set a password.
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'admin@example.com'
-- on conflict (user_id) do nothing;

-- A preferred_date trigger enforces the current-date rule on insert because
-- PostgreSQL CHECK constraints cannot safely depend on the changing current_date.