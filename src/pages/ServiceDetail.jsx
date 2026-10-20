import { Link, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import ServiceIllustration from '../components/services/ServiceIllustration';
import usePageMetadata from '../hooks/usePageMetadata';
import { useClinicData } from '../lib/ClinicDataContext';

function BulletSection({ title, children }) {
  return (
    <section className="service-detail-section">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const { services } = useClinicData();
  const service = services.find((item) => item.slug === slug);
  usePageMetadata(service?.name ?? 'Service Not Found', service?.blurb ?? 'This service page could not be found. Browse the MindCare Therapy Centre service directory.');

  if (!service) {
    return (
      <section className="public-page service-not-found">
        <h1 className="mt-3 text-4xl font-bold">We couldn’t find that service</h1>
        <p className="mt-4 text-ink-muted">The link may be out of date, or the service may no longer be listed.</p>
        <Button to="/services" className="mt-7">Browse all services</Button>
      </section>
    );
  }

  const relatedServices = service.relatedServices
    .map((relatedSlug) => services.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  const isCounselling = service.category === 'counselling';

  return (
    <article className="public-page service-detail-page">
      <Link to="/services" className="service-back-link">← All services</Link>
      
      {/* Visual Header with Meaningful Illustration */}
      <header className="page-intro service-detail-intro grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <span className="inline-block rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark mb-3">
            {isCounselling ? 'Counselling Care' : 'Therapy & Rehabilitation'}
          </span>
          <h1>{service.name}</h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-ink-muted">{service.introduction}</p>
          <div className="pt-3">
            <Button to={`/appointment?service=${service.slug}`}>Request an Appointment</Button>
          </div>
        </div>
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-line bg-brand-soft/20 p-2 shadow-xs">
            <ServiceIllustration slug={service.slug} className="w-full h-44 sm:h-48 rounded-xl object-contain" />
          </div>
        </div>
      </header>

      <BulletSection title="What this may help with">
        <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-muted">
          {service.helpsWith.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </BulletSection>
      <BulletSection title="Who this service is for">
        <p className="mt-3 leading-7 text-ink-muted">{service.audience}</p>
      </BulletSection>
      <BulletSection title="General approach">
        <p className="mt-3 leading-7 text-ink-muted">{service.approach}</p>
      </BulletSection>
      <BulletSection title="What to expect at a first appointment">
        <p className="mt-3 leading-7 text-ink-muted">{service.firstAppointment}</p>
      </BulletSection>
      <BulletSection title="Frequently asked questions">
        <div className="mt-3 divide-y divide-line">
          {service.faqs.map(({ question, answer }) => (
            <details key={question} className="py-4">
              <summary className="cursor-pointer font-semibold">{question}</summary>
              <p className="mt-3 leading-7 text-ink-muted">{answer}</p>
            </details>
          ))}
        </div>
      </BulletSection>

      {relatedServices.length > 0 && (
        <section className="service-detail-section" aria-labelledby="related-services-heading">
          <h2 id="related-services-heading" className="text-2xl font-bold">Related services</h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                to={`/services/${item.slug}`}
                className="group flex flex-col justify-between p-5 rounded-2xl border border-line bg-white hover:border-brand hover:shadow-xs transition-all no-underline"
              >
                <div>
                  <h3 className="font-display text-lg font-medium text-ink group-hover:text-brand-dark transition-colors">{item.name}</h3>
                  <p className="mt-1.5 text-xs text-ink-muted line-clamp-2">{item.blurb}</p>
                </div>
                <span className="mt-3 text-xs font-semibold text-brand">Learn more →</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
