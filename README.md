# MindCare Clinic

A React single-page website for a counselling and rehabilitation clinic, with a public service directory and appointment request form plus a password-protected administration area. The frontend uses Supabase for public clinic data, appointment submissions, and admin workflows. Appointment privacy depends on the database Row Level Security (RLS) policies; client-side routes are not an authorization boundary.

## Features

- Public clinic information, services, specialist profiles, contact details, and appointment requests.
- Admin sign-in, dashboard counts, appointment search/filter/detail and status actions, service and specialist management, and clinic settings.
- Responsive admin navigation, loading/error states, accessible labels and landmarks, page-specific metadata, LocalBusiness JSON-LD, sitemap, and robots directives.
- Appointment cancellations are status changes. CSV export includes only reference, name, service, date, and status.

## Stack

React 18, React Router 7, Vite 8, Tailwind CSS 3, React Hook Form, Supabase JS 2, Lucide icons, Vitest 5, React Testing Library, jsdom, and ESLint.

## Prerequisites and Install

- Node.js 22.13 or newer (or Node.js 24) and npm.
- A Supabase project for live appointment and admin workflows.

```powershell
npm ci
```

Create `.env.local` in the project root with:

```dotenv
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-or-publishable-key
```

Restart Vite after changing environment variables. Both values are browser-visible. Never put a `service_role` key, secret API key, database password, or administrator password in a `VITE_` variable. Without these values, the public site shows local fallback content and online appointment submission/admin access are unavailable.

## Supabase Setup

1. Create a Supabase project and keep its database password in a password manager.
2. In SQL Editor, run `supabase/migrations/0001_init.sql`, then `supabase/migrations/0002_admin_appointment_instructions.sql`.
3. Run `supabase/seed.sql` once to create placeholder clinic settings and eleven services. Re-running it overwrites seeded service/settings content with placeholders; do not rerun it after replacing those values unless that reset is intended.
4. In Authentication settings, disable public sign-ups. Invite administrator accounts through the trusted Supabase dashboard flow; use a verified clinic-controlled email and enable MFA where available.
5. Add the first administrator only after their Auth account exists. In SQL Editor, replace the email with the exact account email:

   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'owner@example.com'
   on conflict (user_id) do nothing;
   ```

6. Confirm one row was inserted (or zero if the account was already an admin). Do not grant browser access to `admin_users`; admin membership is checked through the `is_admin()` database function and RLS policies.
7. Run `supabase/tests/phase5_rls.sql` in a development project's SQL Editor as the project SQL owner. It requires an existing `admin_users` row, creates disposable fixtures, tests the `anon`, non-admin `authenticated`, and admin `authenticated` roles, then rolls everything back. A raised `ASSERTION FAILED` indicates a policy/privilege mismatch. This SQL script is not part of the local npm test suite and has not been run against a live database in this workspace.

The public role can read active catalog/settings rows and submit requests through the `submit_appointment_request` RPC. It cannot read, update, or delete appointment rows. Authenticated database operations remain subject to RLS; a protected frontend route alone does not grant database access.

## Development and Checks

```powershell
npm run dev
npm test                 # Watch mode
npm run test:run         # One-shot tests
npm run lint
npm run build
npm run preview
```

Vitest tests use jsdom and mock Supabase at the client boundary. The RLS SQL script requires a Supabase SQL Editor and is run separately. See [docs/manual-qa.md](docs/manual-qa.md) for browser and deployment checks.

## Cloudflare Pages Deployment

1. Connect the repository to Cloudflare Pages. Use the repository root as the project root, `npm run build` as the build command, and `dist` as the output directory.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as Pages build environment variables for production and any preview environments that need Supabase. These are public client values; never add a service-role or secret key.
3. The existing `public/_redirects` file is copied into `dist` and rewrites SPA routes to `/index.html`. Confirm a direct request to `/services/...` and `/admin/login` resolves after deployment.
4. In Supabase **Authentication → URL Configuration**, set the production Site URL and allow the production callback/origin. Add local development and only the Pages preview origins that need authentication, for example `http://localhost:5173/**`, `https://your-domain.example/**`, and `https://your-project.pages.dev/**`. Keep the allow-list limited to trusted origins.
5. Replace `example.com` in `public/sitemap.xml` and `public/robots.txt` with the verified production domain before publishing. Review the deployed page source and structured data for remaining placeholders.

Cloudflare Pages Free limits documented on the limits page checked **2026-10-12** include 500 builds per month, one concurrent build, 20,000 files per site, a 25 MiB maximum per asset, and 100 custom domains per project. The page does not establish a general uptime promise; review the current plan and service terms before launch.

Supabase Free pricing checked **2026-10-12** lists 50,000 monthly active users, 500 MB database size, 5 GB egress, 5 GB cached egress, 1 GB file storage, and up to two active projects. Free projects may be paused after one week of inactivity; the plan does not include automatic database backups or an uptime SLA. These are current published quotas, not guarantees of capacity or availability, and may change. Check the provider pages before deployment:

- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Supabase pricing](https://supabase.com/pricing)

Do not infer unlimited hosting, traffic, uptime, backups, or support from these plans.

## Vercel Deployment

1. Import the GitHub repository into Vercel and select the repository root. Vercel detects Vite; `vercel.json` sets `npm run build`, `dist`, and the SPA rewrite needed for React Router deep links.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in **Project Settings → Environment Variables** for Production and Preview (and Development if using `vercel dev`). These values are public in the browser bundle. Do not add a Supabase service-role key or other secret.
3. Deploy. Vercel builds on pushes to the production branch and creates preview deployments for other branches/pull requests. Confirm direct navigation and refresh work on `/services`, `/services/child-counselling`, and `/admin/login`.
4. In Supabase **Authentication → URL Configuration**, set the production Vercel/custom domain as the Site URL. Add `http://localhost:5173/**` for local auth and only the production/preview URLs that need email or auth redirects. Avoid broad redirect patterns; prefer the exact production origin and the narrowest supported preview pattern.
5. Replace `example.com` in `public/sitemap.xml` and `public/robots.txt` with the production domain. Add any custom domain in Vercel and include that exact origin in Supabase's redirect allow-list.

Vercel references: [Vite deployment guide](https://vercel.com/docs/frameworks/frontend/vite), [project configuration](https://vercel.com/docs/project-configuration/vercel-json), and [environment variables](https://vercel.com/docs/environment-variables).

## SEO and Accessibility

Public route components set page-specific titles and descriptions. Clinic JSON-LD is generated from the current clinic settings; any missing or placeholder values are explicitly marked in the structured data and must be replaced and verified. `robots.txt` excludes `/admin/`; it is not an access-control mechanism. Sitemap and robots files intentionally use an `example.com` placeholder until the production domain is known.

The public layout includes a skip link, named navigation landmarks, heading hierarchy, form labels, visible focus styles, and specialist photo alt text. Placeholder avatar decoration is hidden from assistive technology. Use the manual keyboard and contrast checks before launch.

## Privacy and Security

- Appointment records include contact information and must be treated as personal data. Collect only information needed to respond; do not solicit clinical details in the public request message.
- RLS is enabled by the Supabase migrations. Do not weaken appointment policies to support frontend behavior. Never rely on hiding routes as authorization.
- The browser uses only the Supabase anon/publishable key. Keep service-role keys and database credentials server-side and out of source control/build variables.
- Do not log appointment details or credentials. Restrict Supabase dashboard access, review Auth users, enable administrator MFA where available, and establish a retention/deletion process before accepting real requests.
- The privacy and terms pages contain draft placeholders. Obtain qualified legal review and confirm Indian data-protection obligations and clinic recordkeeping rules before publication.

## Troubleshooting

- **Supabase is not configured:** check both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local` or the hosting provider's build environment variables, then restart the dev server/redeploy. Only the public anon/publishable key belongs in the client.
- **Admin sign-in returns to login:** confirm the Auth user exists in `public.admin_users`, the `is_admin()` RPC is available from migration `0001`, and the Auth session is valid. The browser cannot read `admin_users` directly.
- **Admin queries return permission errors or empty rows:** check that migrations ran in order, the user has a matching membership row, and RLS is enabled. Do not bypass RLS to fix a frontend error.
- **Services or specialists are missing:** confirm the rows are active and the specialist/service relationship rows are present. The public site intentionally reads only active catalog rows.
- **Appointment submission fails:** verify the service is active, required fields and consent are valid, the date is not in the past, and the RPC from migration `0001` is installed. The UI does not claim success without a returned reference number.
- **Direct route refresh returns a host-level 404:** confirm the provider publishes `dist`; Cloudflare Pages uses `public/_redirects`, while Vercel uses the root `vercel.json` SPA rewrite.
- **Seed content reappears:** `supabase/seed.sql` is intentionally a reset to placeholder settings/services. Do not rerun it against content that should be preserved.

## Dependencies

- Runtime: `@supabase/supabase-js`, `lucide-react`, `react`, `react-dom`, `react-hook-form`, `react-router-dom`.
- Build/style: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`.
- Tests/lint: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `eslint`, `@eslint/js`, `globals`.

Exact versions and transitive dependencies are recorded in `package-lock.json`; use `npm ci` for reproducible installation.

## Known Limitations

- Clinic settings, professional details, contact information, map URL, and opening hours are seeded placeholders until verified by clinic staff.
- Appointment requests do not reserve a slot, prevent overlapping requests, send email/SMS notifications, or integrate with a calendar. Staff must follow up and confirm manually.
- The browser-facing admin role list is managed through trusted Supabase SQL/dashboard access; there is no in-app user administration or audit log.
- RLS assertions require a development Supabase database and are not exercised by Vitest. The SQL script has not been executed against a live project here.
- Legal pages are drafts. No retention schedule, consent workflow for ongoing care, or incident response process is supplied by this codebase.

## Pre-launch Checklist

- [ ] Replace every clinic, specialist, contact, hours, address, map, email, phone, and domain placeholder; verify the JSON-LD and sitemap.
- [ ] Obtain legal review of the privacy policy and terms; complete an Indian data-protection review with qualified counsel.
- [ ] Approve and document a records retention/deletion policy and a privacy request contact/process.
- [ ] Review migrations and seed data in a development Supabase project; run the Phase 5 SQL RLS script and verify all assertions.
- [ ] Disable public Auth sign-ups, provision named administrators, test MFA, and confirm production/preview redirect URL allow-lists.
- [ ] Confirm no secret keys are deployed to browser variables; rotate any credential that was exposed.
- [ ] Complete [the manual QA checklist](docs/manual-qa.md), run tests/lint/build, and verify the final production URLs and error states.
- [ ] Confirm clinic staff can respond to requests and handle cancellation, rescheduling, access requests, and deletion/retention obligations.