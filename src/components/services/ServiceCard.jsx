import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import ServiceIllustration from './ServiceIllustration';

export default function ServiceCard({ service }) {
  const isCounselling = service.category === 'counselling';
  const highlights = (service.helpsWith || []).slice(0, 2);

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-brand hover:-translate-y-1 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand no-underline"
    >
      {/* Meaningful Thematic Illustration Header */}
      <div className="overflow-hidden rounded-xl bg-brand-soft/30 mb-4 transition-transform duration-300 group-hover:scale-[1.015]">
        <ServiceIllustration slug={service.slug} className="w-full h-36 object-contain" />
      </div>

      {/* Category & Audience Badges */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-brand-soft text-brand-dark border border-brand/10">
          {isCounselling ? 'Counselling' : 'Therapy'}
        </span>
        {service.audience && (
          <span className="text-xs font-medium text-ink-muted truncate max-w-[170px]">
            {service.audience.split(',')[0]}
          </span>
        )}
      </div>

      {/* Level 3 Heading - Preserved exactly for Vitest */}
      <h3 className="font-display text-xl sm:text-2xl font-medium text-ink group-hover:text-brand-dark transition-colors duration-150">
        {service.name}
      </h3>

      {/* Description */}
      <p className="mt-2 text-[15px] text-ink-muted leading-relaxed line-clamp-2">
        {service.blurb}
      </p>

      {/* Focus Highlights */}
      {highlights.length > 0 && (
        <div className="mt-3.5 pt-3 border-t border-line/50 space-y-1.5">
          {highlights.map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-xs text-ink-muted truncate">
              <Check size={13} className="text-brand shrink-0" aria-hidden="true" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      )}

      {/* Card Action Link */}
      <div className="mt-auto pt-4 flex items-center justify-between text-sm font-semibold text-brand group-hover:text-brand-dark">
        <span>Explore service details</span>
        <ArrowRight aria-hidden="true" size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
