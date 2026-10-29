// Edit these values (Phase 3 loads them from the clinic_settings table). All are PLACEHOLDERS.
// TODO [LAUNCH]: Replace all placeholder contact information with verified clinic details before production launch.
export const site = {
  name: 'MindCare Therapy Centre',
  tagline: 'Counselling · Therapy · Rehabilitation',
  phone: '+91 00000 00000',          // TODO [LAUNCH]: clinic's real number
  whatsappNumber: '910000000000',    // TODO [LAUNCH]: digits only, with country code, no "+"
  email: 'hello@example.com',        // TODO [LAUNCH]: clinic's real public inquiries email
  address: '[Clinic address – to be added]', // TODO [LAUNCH]: physical clinic address
  hours: [
    ['Monday – Saturday', '[Opening hours to be added]'], // TODO [LAUNCH]: actual clinic hours
    ['Sunday', '[To be added]'],
  ],
};

export function isPlaceholder(value) {
  if (!value) return true;
  const str = String(value).trim();
  return (
    str === '' ||
    /\[[^\]]+\]/.test(str) ||
    /00000/.test(str) ||
    /example\.(com|org|test)/i.test(str) ||
    /to be added|placeholder/i.test(str)
  );
}

export const whatsappUrl = (msg = 'Hello, I would like to know more about your services.', whatsappNumber = site.whatsappNumber) =>
  `https://wa.me/${String(whatsappNumber).replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
