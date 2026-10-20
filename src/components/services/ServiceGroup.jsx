import ServiceCard from './ServiceCard';
import { useClinicData } from '../../lib/ClinicDataContext';
import { DataNotice } from '../ui/DataState';

export default function ServiceGroup({ category, id }) {
  const { services, serviceStatus } = useClinicData();
  const list = services.filter((s) => s.category === category);
  const isCounselling = category === 'counselling';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className={`py-8 sm:py-12 border-b border-line ${
        isCounselling ? 'bg-brand-cream/60' : 'bg-brand-soft/40'
      }`}
    >
      <div className="home-section-shell mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6 sm:mb-8">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark mb-2">
              {isCounselling ? 'Counselling Care' : 'Rehabilitation & Daily Support'}
            </span>
            <h2 id={`${id}-h`} className="font-display text-3xl sm:text-4xl text-brand-dark font-medium leading-tight">
              {isCounselling ? 'Counselling services' : 'Rehabilitation and therapy'}
            </h2>
            <p className="mt-2 text-base sm:text-lg text-ink-muted leading-relaxed">
              {isCounselling
                ? 'A thoughtful, confidential place to explore feelings, relationships, and life transitions at your own pace.'
                : 'Practical, person-centred support designed to enhance communication, learning, and everyday independence.'}
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end justify-center shrink-0 text-right space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-line px-3 py-1 text-xs font-semibold text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              {isCounselling ? '5 Specialised Programs' : '6 Specialised Therapies'}
            </span>
            <span className="text-xs text-ink-muted">In-person &amp; confidential consultations</span>
          </div>
        </div>

        {isCounselling && <DataNotice status={serviceStatus} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>

        {!serviceStatus.loading && list.length === 0 && (
          <p className="mt-6 text-ink-muted">No services are currently listed in this category.</p>
        )}
      </div>
    </section>
  );
}
