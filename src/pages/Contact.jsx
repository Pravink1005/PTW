import { Clock3, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import { whatsappUrl, isPlaceholder } from '../config/site';
import usePageMetadata from '../hooks/usePageMetadata';
import { useClinicData } from '../lib/ClinicDataContext';
import { DataNotice } from '../components/ui/DataState';

export default function Contact() {
  const { settings, settingsStatus } = useClinicData();
  const directionsUrl =
    settings.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`;
  const contactMessage = `Hello, I would like to contact ${settings.name}.`;
  usePageMetadata(
    'Contact',
    `Contact ${settings.name} for information about services, opening hours and directions.`
  );

  const hasPhone = !isPlaceholder(settings.phone);
  const hasWhatsapp = !isPlaceholder(settings.whatsappNumber);

  return (
    <div className="public-page contact-page">
      <header className="page-intro">
        <h1>Contact</h1>
        <p>
          Ask a question about services or send an appointment request. A request is not confirmed
          until the clinic contacts you.
        </p>
      </header>

      <DataNotice status={settingsStatus} />

      {/* Top Mobile Quick-Action Buttons (Large 50px tap targets for mobile visitors) */}
      <div className="sm:hidden grid grid-cols-1 gap-3 my-6">
        {hasPhone && (
          <a
            href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
            className="flex items-center justify-center gap-2.5 min-h-[50px] w-full rounded-2xl bg-brand text-white font-semibold text-base py-3 px-5 shadow-xs no-underline"
          >
            <Phone size={18} aria-hidden="true" />
            <span>Call Clinic: {settings.phone}</span>
          </a>
        )}
        {hasWhatsapp && (
          <a
            href={whatsappUrl(contactMessage, settings.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 min-h-[50px] w-full rounded-2xl border border-line bg-white text-ink hover:bg-brand-cream/60 font-semibold text-base py-3 px-5 shadow-xs no-underline"
          >
            <MessageCircle size={19} className="text-brand shrink-0" aria-hidden="true" />
            <span>Message on WhatsApp</span>
          </a>
        )}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 min-h-[50px] w-full rounded-2xl border border-line bg-white text-ink hover:bg-brand-cream/60 font-semibold text-base py-3 px-5 shadow-xs no-underline"
        >
          <Navigation size={18} className="text-brand shrink-0" aria-hidden="true" />
          <span>Get Map &amp; Directions</span>
        </a>
      </div>

      <div className="contact-grid">
        <section className="contact-details" aria-labelledby="clinic-details-heading">
          <h2 id="clinic-details-heading">Clinic details</h2>
          <dl className="mt-6 space-y-4">
            <div className="flex items-start gap-3.5">
              <MapPin className="mt-1 shrink-0 text-brand" size={20} aria-hidden="true" />
              <div>
                <dt className="font-semibold text-ink text-sm sm:text-base">Address</dt>
                <dd className="mt-1 text-ink-muted text-sm sm:text-base leading-relaxed">
                  {settings.address}
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone className="mt-1 shrink-0 text-brand" size={20} aria-hidden="true" />
              <div>
                <dt className="font-semibold text-ink text-sm sm:text-base">Phone</dt>
                <dd className="mt-1 text-sm sm:text-base">
                  <a
                    className="inline-flex min-h-[44px] items-center text-brand font-medium hover:underline"
                    href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                  >
                    {settings.phone}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Mail className="mt-1 shrink-0 text-brand" size={20} aria-hidden="true" />
              <div>
                <dt className="font-semibold text-ink text-sm sm:text-base">Email</dt>
                <dd className="mt-1 text-sm sm:text-base">
                  <a
                    className="inline-flex min-h-[44px] items-center text-brand font-medium hover:underline"
                    href={`mailto:${settings.email}`}
                  >
                    {settings.email}
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[48px] items-center gap-2 font-semibold text-brand hover:underline"
          >
            <MapPin className="h-5 w-5" aria-hidden="true" />
            <span>Map and directions</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>

        <section className="contact-hours" aria-labelledby="hours-heading">
          <div className="flex items-center gap-3">
            <Clock3 className="text-brand" size={22} aria-hidden="true" />
            <h2 id="hours-heading" className="text-2xl font-bold text-ink">
              Opening hours
            </h2>
          </div>

          <dl className="mt-5 divide-y divide-line/70">
            {settings.hours.map(([day, hours]) => (
              <div key={day} className="flex justify-between items-center gap-4 py-3.5">
                <dt className="font-medium text-ink text-sm sm:text-base">{day}</dt>
                <dd className="text-right text-ink-muted text-sm sm:text-base">{hours}</dd>
              </div>
            ))}
          </dl>

          {settings.hours.length === 0 && (
            <p className="mt-4 text-sm text-ink-muted">
              Opening hours have not been added yet. Contact the clinic to check availability.
            </p>
          )}

          {hasWhatsapp && (
            <div className="mt-6 pt-2">
              <Button
                href={whatsappUrl(contactMessage, settings.whatsappNumber)}
                className="w-full sm:w-auto min-h-[48px] justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Message us on WhatsApp
                <span className="sr-only"> (opens WhatsApp)</span>
              </Button>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                Opening WhatsApp does not submit an appointment request or confirm a booking.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
