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
      className="group flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft transition-colors hover:border-brand"
    >
      <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
        <Icon aria-hidden="true" size={24} />
      </span>
      <h3 className="text-xl font-bold">{service.name}</h3>
      <p className="mt-2 flex-1 text-ink-muted">{service.blurb}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-semibold text-brand group-hover:underline">
        Learn more <ArrowRight aria-hidden="true" size={16} />
      </span>
    </Link>
  );
}
