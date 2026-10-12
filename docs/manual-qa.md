# Manual QA Checklist

Run these checks against a development Supabase project with fictional data. Do not use real patient or client details for testing.

## Browser and Responsive Layout

- [ ] Desktop Chrome: visit home, services, each service detail, specialists, contact, appointment, privacy, and terms pages. Check page titles, descriptions, footer links, and no console errors containing personal data.
- [ ] Desktop Chrome: sign in as an admin and exercise dashboard refresh, appointment filters/search/details, confirm, reschedule, complete, cancel, notes, CSV export, service CRUD/order/assignment, specialist CRUD/availability, and clinic settings.
- [ ] Mobile layout: test at a narrow phone width and tablet width; check navigation, form controls, appointment cards/drawer, admin lists, modals, and no horizontal overflow or clipped text.
- [ ] Keyboard-only: use Tab/Shift+Tab, Enter, Space, and Escape where applicable. Verify the skip link, visible focus, logical order, all actions reachable, and no focus loss when dialogs/drawers open and close.
- [ ] Contrast: verify text, status labels, focus indicators, buttons, disabled controls, and error/success messages meet WCAG 2.2 AA contrast requirements in their actual states.

## Data and Failure States

- [ ] Slow network: throttle requests; confirm loading indicators appear, layout remains usable, and retries work after a request fails.
- [ ] Empty database: with RLS enabled and no seeded catalog/settings rows, inspect empty services/specialists, appointment filters, dashboard counts, and settings behavior. Confirm no fabricated appointment success.
- [ ] Missing environment variables: remove either Supabase variable and restart Vite; confirm the public fallback explains availability, appointment submission fails safely, and admin access is unavailable.
- [ ] Expired session: expire/revoke the admin session or trigger a signed-out event; confirm admin routes return to login and data/actions are unavailable.
- [ ] Logged-out appointment-data check: in a separate anonymous browser context, confirm the UI has no appointment listing, then run `supabase/tests/phase5_rls.sql` in the development SQL Editor. Verify anon appointment SELECT/UPDATE/DELETE fail and invalid service/specialist submissions are rejected.
- [ ] Production build: run `npm run test:run`, `npm run lint`, and `npm run build`; preview `dist` and directly load public, service-detail, and admin-login routes.
- [ ] Production deployment: replace example domains, inspect sitemap/robots and JSON-LD, verify Auth redirect allow-lists and public env values, and test a real staff invite using a non-client test account.