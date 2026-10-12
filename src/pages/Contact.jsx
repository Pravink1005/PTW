import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import { whatsappUrl } from '../config/site';
import usePageMetadata from '../hooks/usePageMetadata';
import { useClinicData } from '../lib/ClinicDataContext';
import { DataNotice } from '../components/ui/DataState';

export default function Contact() {
  const { settings, settingsStatus } = useClinicData();
  const directionsUrl = settings.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`;
  const contactMessage = `Hello, I would like to contact ${settings.name}.`;
  usePageMetadata('Contact', `Contact ${settings.name} for information about services, opening hours and directions.`);
  return (
    <div className="public-page contact-page">
      <header className="page-intro">
        <h1>Contact</h1>
        <p>Ask a question about services or send an appointment request. A request is not confirmed until the clinic contacts you.</p>
      </header>
      <DataNotice status={settingsStatus} />
      <div className="contact-grid">
        <section className="contact-details" aria-labelledby="clinic-details-heading">
          <h2 id="clinic-details-heading">Clinic details</h2>
          <dl>
            <div className="flex gap-3"><MapPin className="mt-1 shrink-0 text-brand" aria-hidden="true" /><div><dt className="font-semibold">Address</dt><dd className="mt-1 text-ink-muted">{settings.address}</dd></div></div>
            <div className="flex gap-3"><Phone className="mt-1 shrink-0 text-brand" aria-hidden="true" /><div><dt className="font-semibold">Phone</dt><dd className="mt-1"><a className="text-brand hover:underline" href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}>{settings.phone}</a></dd></div></div>
            <div className="flex gap-3"><Mail className="mt-1 shrink-0 text-brand" aria-hidden="true" /><div><dt className="font-semibold">Email</dt><dd className="mt-1"><a className="text-brand hover:underline" href={`mailto:${settings.email}`}>{settings.email}</a></dd></div></div>
          </dl>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-[44px] items-center font-semibold text-brand hover:underline">
            <MapPin className="mr-2 h-5 w-5" aria-hidden="true" />Map and directions<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>
        <section className="contact-hours" aria-labelledby="hours-heading">
          <div className="flex items-center gap-3"><Clock3 className="text-brand" aria-hidden="true" /><h2 id="hours-heading" className="text-2xl font-bold">Opening hours</h2></div>
          <dl className="mt-5 divide-y divide-line">
            {settings.hours.map(([day, hours]) => <div key={day} className="flex justify-between gap-5 py-3"><dt className="font-medium">{day}</dt><dd className="text-right text-ink-muted">{hours}</dd></div>)}
          </dl>
          {settings.hours.length === 0 && <p className="mt-4 text-sm text-ink-muted">Opening hours have not been added yet. Contact the clinic to check availability.</p>}
          <Button href={whatsappUrl(contactMessage, settings.whatsappNumber)} className="mt-7" target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp<span className="sr-only"> (opens WhatsApp)</span>
          </Button>
          <p className="mt-3 text-sm leading-6 text-ink-muted">Opening WhatsApp does not submit an appointment request or confirm a booking.</p>
        </section>
      </div>
    </div>
  );
}