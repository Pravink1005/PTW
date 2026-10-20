import { Link } from 'react-router-dom';
import {
  Baby, HeartHandshake, Heart, Users, Sunset, Hand, MessageCircle,
  BookOpen, Compass, Brain, Home, Leaf, ArrowRight,
} from 'lucide-react';

const icons = { Baby, HeartHandshake, Heart, Users, Sunset, Hand, MessageCircle, BookOpen, Compass, Brain, Home };

export default function ServiceCard({ service }) {
  const Icon = icons[service.icon] || Leaf;
  const isCounselling = service.category === 'counselling';

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-line bg-white p-6 sm:p-7 shadow-xs hover:shadow-lg hover:border-brand hover:-translate-y-1 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand no-underline"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-200">
          <Icon aria-hidden="true" size={24} />
        </span>
        <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-brand-cream text-ink-muted border border-line/60">
          {isCounselling ? 'Counselling' : 'Therapy'}
        </span>
      </div>
      <h3 className="font-display text-xl sm:text-2xl font-medium text-ink group-hover:text-brand-dark transition-colors duration-150">
        {service.name}
      </h3>
      <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed line-clamp-2">
        {service.blurb}
      </p>
      <div className="mt-auto pt-5 flex items-center gap-2 text-sm font-semibold text-brand group-hover:text-brand-dark">
        <span>Explore service</span>
        <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
