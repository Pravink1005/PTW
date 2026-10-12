import ServiceCard from './ServiceCard';
import { useClinicData } from '../../lib/ClinicDataContext';
import { DataNotice } from '../ui/DataState';

export default function ServiceGroup({ category, id }) {
  const { services, serviceStatus } = useClinicData();
  const list = services.filter((s) => s.category === category);
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`service-group service-group-${category}`}>
      <div className="service-group-layout">
        <div className="service-group-heading">
          <h2 id={`${id}-h`}>{category === 'counselling' ? 'Counselling services' : 'Rehabilitation and therapy'}</h2>
          <p>{category === 'counselling'
            ? 'A thoughtful place to explore feelings, relationships, and changes at your own pace.'
            : 'Practical, person-centred support for communication, learning, and daily activities.'}</p>
        </div>
        {category === 'counselling' && <DataNotice status={serviceStatus} />}
        <div className={`service-card-grid service-card-grid-${category}`}>
          {list.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </div>
      {!serviceStatus.loading && list.length === 0 && <p className="text-ink-muted">No services are currently listed in this category.</p>}
    </section>
  );
}
