// Edit these values (Phase 3 loads them from the clinic_settings table). All are PLACEHOLDERS.
export const site = {
  name: 'MindCare Therapy Centre',
  tagline: 'Counselling · Therapy · Rehabilitation',
  phone: '+91 00000 00000',          // TODO: clinic's real number
  whatsappNumber: '910000000000',    // digits only, with country code, no "+"
  email: 'hello@example.com',        // TODO
  address: '[Clinic address – to be added]',
  hours: [['Monday – Saturday', '[Opening hours to be added]'], ['Sunday', '[To be added]']],
};
export const whatsappUrl = (msg = 'Hello, I would like to know more about your services.', whatsappNumber = site.whatsappNumber) =>
  `https://wa.me/${String(whatsappNumber).replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
