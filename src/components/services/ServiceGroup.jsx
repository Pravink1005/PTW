import ServiceCard from './ServiceCard';
import { categories } from '../../data/services';
import { useClinicData } from '../../lib/ClinicDataContext';
import { DataNotice } from '../ui/DataState';

export default function ServiceGroup({ category, id }) {
  const { services, serviceStatus } = useClinicData();
  const list = services.filter((s) => s.category === category);
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h2 id={`${id}-h`} className="mb-8 text-3xl font-bold">{categories[category]}</h2>
      {category === 'counselling' && <DataNotice status={serviceStatus} />}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => <ServiceCard key={s.slug} service={s} />)}
      </div>
      {!serviceStatus.loading && list.length === 0 && <p className="text-ink-muted">No services are currently listed in this category.</p>}
    </section>
  );
}
