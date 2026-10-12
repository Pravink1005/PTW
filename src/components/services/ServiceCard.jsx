import { Link } from 'react-router-dom';
import {
  Baby, HeartHandshake, Heart, Users, Sunset, Hand, MessageCircle,
  BookOpen, Compass, Brain, Home, Leaf, ArrowRight,
} from 'lucide-react';

const icons = { Baby, HeartHandshake, Heart, Users, Sunset, Hand, MessageCircle, BookOpen, Compass, Brain, Home };

export default function ServiceCard({ service }) {
  const Icon = icons[service.icon] || Leaf;
  return (
    <Link
      to={`/services/${service.slug}`}
      className={`service-card service-card-${service.category} group`}
    >
      <span className="service-card-icon"><Icon aria-hidden="true" size={23} /></span>
      <h3>{service.name}</h3>
      <p>{service.blurb}</p>
      <span className="service-card-link"><span>Explore service</span><ArrowRight aria-hidden="true" size={17} /></span>
    </Link>
  );
}
