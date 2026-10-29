# MindCare Therapy Centre - Pre-Launch Verification Checklist

This checklist enumerates all placeholder configurations, mock assets, legal texts, and external integrations that must be reviewed, configured, and verified prior to taking the clinic website live in production.

---

## 1. Contact & Clinic Profile (`src/config/site.js` & Supabase `clinic_settings`)

All clinic contact details are loaded from Supabase `clinic_settings` table, falling back to `src/config/site.js`. Replace all placeholder defaults:

- [ ] **Primary Phone Number**
  - Current placeholder: `+91 00000 00000`
  - Action: Replace with the clinic's reception desk phone number (with country code `+91` or local format).
  - Target locations: Supabase `clinic_settings.phone`, `src/config/site.js`.
- [ ] **WhatsApp Inquiries Number**
  - Current placeholder: `910000000000`
  - Action: Replace with the verified WhatsApp Business mobile number (digits only, including country code `91`, no `+`).
  - Target locations: Supabase `clinic_settings.whatsapp_number`, `src/config/site.js`.
- [ ] **Official Contact Email**
  - Current placeholder: `hello@example.com`
  - Action: Replace with the clinic's public-facing inquiries email (e.g., `care@mindcareclinic.in`).
  - Target locations: Supabase `clinic_settings.email`, `src/config/site.js`.
- [ ] **Physical Clinic Address & Google Maps Location**
  - Current placeholder: `[Clinic address – to be added]`
  - Action: Update with physical street address, building/suite number, postal code, and city. Update Google Maps query URL.
  - Target locations: Supabase `clinic_settings.address`, `src/config/site.js`, `src/pages/Contact.jsx`.
- [ ] **Consultation & Reception Hours**
  - Current placeholder: `[['Monday – Saturday', '[Opening hours to be added]'], ['Sunday', '[To be added]']]`
  - Action: Specify exact hours of operation for weekdays, Saturdays, and Sundays/holidays.
  - Target locations: Supabase `clinic_settings.hours`, `src/config/site.js`, `src/pages/Contact.jsx`.

---

## 2. Domain & SEO Configuration

Replace all instances of `example.com` with your verified production domain (e.g. `https://mindcaretherapy.com`):

- [ ] **`public/robots.txt`**
  - Update `Sitemap: https://example.com/sitemap.xml` to `https://<YOUR_PRODUCTION_DOMAIN>/sitemap.xml`.
- [ ] **`public/sitemap.xml`**
  - Replace all `<loc>https://example.com/...</loc>` URLs with `https://<YOUR_PRODUCTION_DOMAIN>/...`.
- [ ] **Schema.org Structured Data (`src/components/layout/ClinicStructuredData.jsx`)**
  - Uses `window.location.origin` at runtime, but ensure canonical metadata and domain tags match.
- [ ] **OpenGraph and Social Meta (`index.html`)**
  - Verify `og:image` URL resolves properly on the live public URL.
  - Check `<title>` tag with city/region specification (e.g. `MindCare Therapy Centre | Counselling, Speech & Occupational Therapy, [City]`).

---

## 3. Legal & Regulatory Compliance Pages

- [ ] **Privacy Policy (`src/pages/Privacy.jsx`)**
  - Review clinic confidentiality policies, patient data retention, and compliance with local health data laws (e.g. Indian Digital Personal Data Protection Act / DISHA guidelines).
- [ ] **Terms of Service (`src/pages/Terms.jsx`)**
  - Confirm booking policies, cancellation/rescheduling notice requirements, non-emergency clinical disclaimers, and fee structure disclosure.

---

## 4. Clinical Staff & Specialists Directory

- [ ] **Practitioner Profiles (`src/pages/Specialists.jsx` & Supabase `specialists`)**
  - Verify real practitioner names, titles, qualifications, and registration numbers (e.g., RCI registration for clinical psychologists/speech therapists).
  - Replace temporary avatar images with high-resolution, professional clinic staff headshots.
  - Verify specialties, bio text, and language capabilities.

---

## 5. Services & Appointment Intake

- [ ] **Service Details (`src/pages/ServiceDetail.jsx`)**
  - Verify service names, focus areas ("What this care may help with"), clinical approaches, and consultation durations.
- [ ] **Appointment Notification Channel**
  - Verify that clinic staff receive notifications for new appointment requests (Supabase webhook, email alert, or regular admin dashboard triage).
- [ ] **Admin Authentication (`/admin/login`)**
  - Change default admin passwords.
  - Restrict admin signups or configure email confirmation in Supabase Auth.

