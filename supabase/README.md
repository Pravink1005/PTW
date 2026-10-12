# Supabase setup

## Create the project

1. Sign in to [Supabase](https://supabase.com/) and create a new project for MindCare Clinic. Choose the region used by the clinic and set a strong database password; store it in a password manager and do not put it in this repository.
2. Wait for the project to finish provisioning.
3. In the project dashboard, open **SQL Editor**. Run `supabase/migrations/0001_init.sql`, then run `supabase/migrations/0002_admin_appointment_instructions.sql` from this workspace. Run each migration once per project.
4. Open a second SQL Editor query, paste the complete contents of `supabase/seed.sql`, and run it. This seeds the clinic placeholders and eleven active services. Re-running the seed resets those rows to the placeholder seed values, so update the seed or database content deliberately before doing so.

The migration enables Row Level Security on every table. Public clients can read active service, specialist, link, availability and clinic-setting rows. Appointment submissions are limited to `New`; public clients cannot read, update or delete appointment records. The submission RPC creates a request and returns only its generated reference number. `internal_notes` is not publicly readable. Admin screens verify membership using the `is_admin()` database function and all records remain protected by the existing RLS policies.

## Configure the frontend

1. In the dashboard, open **Project Settings → API** (or **Project Settings → API Keys**) and copy the **Project URL** and the public `anon`/publishable key.
2. From the workspace root, run `Copy-Item .env.example .env.local` in PowerShell.
3. Edit `.env.local` and set:

   ```dotenv
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-or-publishable-key
   ```

4. Restart Vite after changing environment variables: stop the current server and run `npm run dev` again.

Only the public anon/publishable key belongs in this frontend. Never use a `service_role` key, secret API key, database password, or user credential in a `VITE_` variable. `.env.local` is ignored by Git. Without both required values the application stays usable with local fallback data, and appointment submission displays a configuration error instead of reporting success.

## Add the first administrator

1. In **Authentication → Users**, invite the clinic owner or create their Auth account using the dashboard’s secure invitation flow. Enable MFA for administrator accounts where available. Do not create or share a password in SQL.
2. After the user exists, open SQL Editor and run the following after replacing the example email with the exact Auth email:

   ```sql
   insert into public.admin_users (user_id)
   select id
   from auth.users
   where email = 'owner@example.com'
   on conflict (user_id) do nothing;
   ```

3. Confirm the `INSERT 0 1` result (or `INSERT 0 0` if that Auth user was already an admin). The migration intentionally grants no client read/write access to `admin_users`; subsequent administrator changes must be made in the trusted Supabase SQL Editor by an authorized project owner.

The SQL for this project has not been run against a live Supabase database in this workspace. Review the migration and seed in a development Supabase project before production use.