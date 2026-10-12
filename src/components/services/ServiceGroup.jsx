import ServiceCard from './ServiceCard';
import { categories } from '../../data/services';
import { useClinicData } from '../../lib/ClinicDataContext';
import { DataNotice } from '../ui/DataState';

export default function ServiceGroup({ category, id }) {
  const { services, serviceStatus } = useClinicData();
  const list = services.filter((s) => s.category === category);
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`service-group service-group-${category}`}>
      <div className="service-group-heading">
        <p className="home-section-kicker">{category === 'counselling' ? 'Space to talk' : 'Support for everyday life'}</p>
        <h2 id={`${id}-h`}>{categories[category]}</h2>
        <p>{category === 'counselling'
          ? 'A thoughtful place to explore feelings, relationships, and changes at your own pace.'
          : 'Practical, person-centred support for communication, learning, and daily activities.'}</p>
      </div>
      {category === 'counselling' && <DataNotice status={serviceStatus} />}
      <div className="service-card-grid">
        {list.map((s, index) => <ServiceCard key={s.slug} service={s} index={index} />)}
      </div>
      {!serviceStatus.loading && list.length === 0 && <p className="text-ink-muted">No services are currently listed in this category.</p>}
    </section>
  );
}
