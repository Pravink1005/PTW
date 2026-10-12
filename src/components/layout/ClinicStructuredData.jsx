import { useEffect } from 'react';
import { useClinicData } from '../../lib/ClinicDataContext';

function isPlaceholder(value) {
  return !String(value ?? '').trim() || /\[[^\]]+\]|example\.(com|org|test)|00000|910000000000|to be added|placeholder|^MindCare Therapy Centre$|^Counselling · Therapy · Rehabilitation$/i.test(String(value));
}

export default function ClinicStructuredData() {
  const { settings } = useClinicData();

  useEffect(() => {
    const clinicValues = [
      ['name', settings.name],
      ['telephone', settings.phone],
      ['WhatsApp number', settings.whatsappNumber],
      ['email', settings.email],
      ['address', settings.address],
      ...settings.hours.map(([day, hours]) => [`opening hours (${day})`, hours]),
    ];
    const placeholders = clinicValues.filter(([, value]) => isPlaceholder(value));
    const data = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${window.location.origin}/#clinic`,
      url: window.location.origin,
      name: settings.name,
      description: settings.tagline,
      telephone: settings.phone,
      email: settings.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: settings.address,
        addressCountry: 'IN',
      },
      additionalProperty: [
        ...settings.hours.map(([day, hours]) => ({ '@type': 'PropertyValue', name: `Opening hours (${day})`, value: hours })),
        ...(placeholders.length ? [{
          '@type': 'PropertyValue',
          name: 'Publication status',
          value: `Placeholder clinic values require verification: ${placeholders.map(([name]) => name).join(', ')}`,
        }] : []),
      ],
    };
    const script = document.createElement('script');
    script.id = 'clinic-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    document.head.append(script);
    return () => script.remove();
  }, [settings]);

  return null;
}