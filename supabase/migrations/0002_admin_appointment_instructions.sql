alter table public.clinic_settings
  add column if not exists appointment_instructions text not null default '';