import { ArrowDown, Brain, HeartHandshake } from 'lucide-react';
import ServiceGroup from '../components/services/ServiceGroup';
import usePageMetadata from '../hooks/usePageMetadata';

export default function Services() {
  usePageMetadata('Our Services', 'Browse counselling, rehabilitation and therapy services offered by MindCare Therapy Centre.');

  return (
    <div className="services-page">
      <section className="bg-white border-b border-line py-8 sm:py-12" aria-labelledby="services-main-heading">
        <div className="home-section-shell mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Title & Intro */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <span className="inline-block rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark">
                Clinical Care Directory
              </span>
              <h1 id="services-main-heading" className="font-display text-4xl sm:text-5xl text-brand-dark font-medium leading-tight">
                Our services
              </h1>
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl">
                Explore counselling first, then browse therapy and rehabilitation services. Each page explains what to expect and how to ask about a first visit.
              </p>
            </div>

            {/* Right Column: Quick Category Jump Cards (Fills the empty void) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              <a
                href="#counselling"
                className="group flex items-center justify-between p-4 rounded-2xl border border-line bg-brand-cream/60 hover:bg-white hover:border-brand hover:shadow-sm transition-all duration-200 no-underline"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-200">
                    <HeartHandshake size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm sm:text-base group-hover:text-brand-dark">
                      Counselling Services
                    </p>
                    <p className="text-xs text-ink-muted">5 specialized individual &amp; family therapies</p>
                  </div>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand border border-line group-hover:border-brand/40 group-hover:translate-y-0.5 transition-all">
                  <ArrowDown size={15} aria-hidden="true" />
                </span>
              </a>

              <a
                href="#rehabilitation"
                className="group flex items-center justify-between p-4 rounded-2xl border border-line bg-brand-soft/50 hover:bg-white hover:border-brand hover:shadow-sm transition-all duration-200 no-underline"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-200">
                    <Brain size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm sm:text-base group-hover:text-brand-dark">
                      Rehabilitation &amp; Therapy
                    </p>
                    <p className="text-xs text-ink-muted">6 developmental &amp; daily life therapies</p>
                  </div>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand border border-line group-hover:border-brand/40 group-hover:translate-y-0.5 transition-all">
                  <ArrowDown size={15} aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServiceGroup category="counselling" id="counselling" />
      <ServiceGroup category="rehabilitation" id="rehabilitation" />
    </div>
  );
}
