import { Link } from 'react-router-dom';
import {
  Baby, HeartHandshake, Heart, Users, Sunset, Hand, MessageCircle,
  BookOpen, Compass, Brain, Home, Leaf, ArrowRight,
} from 'lucide-react';

const icons = { Baby, HeartHandshake, Heart, Users, Sunset, Hand, MessageCircle, BookOpen, Compass, Brain, Home };

export default function ServiceCard({ service, index = 0 }) {
  const Icon = icons[service.icon] || Leaf;
  return (
    <Link
      to={`/services/${service.slug}`}
      className="service-card group"
    >
      <span className="service-card-top"><span className="service-card-index">{String(index + 1).padStart(2, '0')}</span><span className="service-card-icon"><Icon aria-hidden="true" size={23} /></span></span>
      <span className="service-card-category">{service.category === 'counselling' ? 'Counselling' : 'Therapy & rehabilitation'}</span>
      <h3>{service.name}</h3>
      <p>{service.blurb}</p>
      <span className="service-card-link">Explore service <ArrowRight aria-hidden="true" size={17} /></span>
    </Link>
  );
}
