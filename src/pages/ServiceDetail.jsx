import { Link, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import usePageMetadata from '../hooks/usePageMetadata';
import { useClinicData } from '../lib/ClinicDataContext';

function BulletSection({ title, children }) {
  return (
    <section className="border-t border-line py-7">
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
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase text-brand">Service directory</p>
        <h1 className="mt-3 text-4xl font-bold">We couldn’t find that service</h1>
        <p className="mt-4 text-ink-muted">The link may be out of date, or the service may no longer be listed.</p>
        <Button to="/services" className="mt-7">Browse all services</Button>
      </section>
    );
  }

  const relatedServices = service.relatedServices
    .map((relatedSlug) => services.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link to="/services" className="text-sm font-semibold text-brand hover:underline">← All services</Link>
      <header className="py-9">
        <p className="text-sm font-semibold uppercase text-brand">{service.category === 'counselling' ? 'Counselling' : 'Rehabilitation & therapy'}</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{service.name}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-muted">{service.introduction}</p>
        <Button to={`/appointment?service=${service.slug}`} className="mt-7">Request an Appointment</Button>
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
        <section className="border-t border-line py-7" aria-labelledby="related-services-heading">
          <h2 id="related-services-heading" className="text-2xl font-bold">Related services</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedServices.map((related) => (
              <li key={related.slug}>
                <Link className="block rounded-card border border-line bg-white p-4 font-semibold text-brand-dark hover:border-brand" to={`/services/${related.slug}`}>
                  {related.name}<span className="float-right" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="border-t border-line pt-6 text-sm leading-6 text-ink-muted">This information is general and does not guarantee a particular experience or result. The practitioner can discuss whether the service is suitable for your needs.</p>
    </article>
  );
}