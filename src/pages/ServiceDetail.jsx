import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Compass,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import Button from '../components/ui/Button';
import ServiceIllustration from '../components/services/ServiceIllustration';
import { site, whatsappUrl, isPlaceholder } from '../config/site';
import usePageMetadata from '../hooks/usePageMetadata';
import { useClinicData } from '../lib/ClinicDataContext';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { services, settings } = useClinicData();
  const service = services.find((item) => item.slug === slug);
  usePageMetadata(
    service?.name ?? 'Service Not Found',
    service?.blurb ?? 'This service page could not be found. Browse the MindCare Therapy Centre service directory.'
  );

  if (!service) {
    return (
      <section className="public-page service-not-found">
        <h1 className="mt-3 text-4xl font-bold">We couldn’t find that service</h1>
        <p className="mt-4 text-ink-muted">The link may be out of date, or the service may no longer be listed.</p>
        <Button to="/services" className="mt-7">Browse all services</Button>
      </section>
    );
  }

  const relatedServices = service.relatedServices
    .map((relatedSlug) => services.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  const isCounselling = service.category === 'counselling';
  const clinicPhone = settings?.phone || site.phone;
  const clinicWhatsapp = settings?.whatsappNumber || site.whatsappNumber;

  return (
    <article className="public-page service-detail-page">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between">
        <Link
          to="/services"
          className="service-back-link inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors py-2 px-4 rounded-full bg-brand-soft/60 hover:bg-brand-soft border border-line no-underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Clinical Services</span>
        </Link>
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-ink-muted">
          <span>MindCare Services</span>
          <span>/</span>
          <span className="text-brand-dark font-semibold">{service.name}</span>
        </div>
      </nav>

      {/* Hero Card */}
      <header className="rounded-3xl border border-line bg-gradient-to-br from-white via-brand-cream/40 to-brand-soft/25 p-5 sm:p-8 lg:p-10 shadow-xs mb-8 sm:mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark">
                {isCounselling ? 'Counselling Care' : 'Therapy & Rehabilitation'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-line px-3 py-1 text-xs font-medium text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-brand" />
                <span>Confidential In-Clinic Care</span>
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              {service.name}
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-muted max-w-2xl">
              {service.introduction}
            </p>

            {/* Quick Consultation Facts */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 py-4 border-y border-line/70">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand shrink-0" />
                <span className="text-xs font-medium text-ink">50–60 Min</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand shrink-0" />
                <span className="text-xs font-medium text-ink">Age-Adapted</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                <span className="text-xs font-medium text-ink">Private &amp; Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                <span className="text-xs font-medium text-ink">Direct Booking</span>
              </div>
            </div>

            {/* Action Buttons: Responsive full width on mobile, row on tablet/desktop */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <Button
                to={`/appointment?service=${service.slug}`}
                className="w-full sm:w-auto justify-center inline-flex items-center gap-2 min-h-[48px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Request an Appointment</span>
              </Button>
              {!isPlaceholder(clinicWhatsapp) && (
                <a
                  href={whatsappUrl(`Hello, I would like to inquire about ${service.name} at MindCare Therapy Centre.`, clinicWhatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto justify-center inline-flex min-h-[48px] items-center gap-2 px-5 py-2.5 rounded-full border border-line bg-white hover:bg-brand-cream/60 text-ink font-semibold text-sm transition-all shadow-2xs hover:shadow-xs no-underline"
                >
                  <MessageCircle className="w-4 h-4 text-brand" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md rounded-3xl border border-line bg-white/90 backdrop-blur-xs p-5 shadow-sm">
              <div className="rounded-2xl bg-brand-soft/20 p-4 flex items-center justify-center">
                <ServiceIllustration slug={service.slug} className="w-full h-48 sm:h-60 object-contain rounded-xl" />
              </div>
              <div className="mt-3.5 pt-3.5 border-t border-line/70 flex items-center justify-between text-xs text-ink-muted">
                <span className="font-medium flex items-center gap-1.5 text-brand-dark">
                  <Sparkles className="w-3.5 h-3.5 text-brand" />
                  Evidence-Informed
                </span>
                <span className="rounded-full bg-brand-soft/60 px-2.5 py-0.5 text-brand-dark font-medium">
                  Calm Setting
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main 2-Column Clinical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: What this care may help with */}
          <section className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-xs" aria-labelledby="helps-with-heading">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand" />
                <span>Focus &amp; Support Areas</span>
              </div>
              <h2 id="helps-with-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink">
                What this care may help with
              </h2>
              <p className="text-sm sm:text-base text-ink-muted">
                Common topics, symptoms, and developmental focus areas supported in sessions.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {service.helpsWith.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3.5 rounded-2xl border border-line bg-brand-cream/30 p-4 hover:border-brand/40 hover:bg-brand-soft/10 transition-all"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-soft text-brand-dark flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-ink text-sm sm:text-base font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-brand-soft/30 border border-line p-4 text-xs sm:text-sm text-ink-muted leading-relaxed flex items-start gap-3">
              <span className="text-base shrink-0 mt-0.5">🌱</span>
              <p>
                <strong>Individualized Focus:</strong> Every person and family is distinct. We explore your circumstances together and shape care around what matters most to you, without requiring rigid diagnostic labels.
              </p>
            </div>
          </section>

          {/* Section 2: Clinical Approach */}
          <section className="rounded-3xl border border-line bg-gradient-to-br from-white via-white to-brand-soft/20 p-6 sm:p-8 shadow-xs" aria-labelledby="approach-heading">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark">
                <Compass className="w-3.5 h-3.5 text-brand" />
                <span>Clinical Approach</span>
              </div>
              <h2 id="approach-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink">
                Our Clinical Approach
              </h2>
              <p className="text-sm sm:text-base text-ink-muted">
                How our qualified practitioners structure sessions and collaborate with you.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border-l-4 border-brand bg-brand-cream/50 p-5 sm:p-6 shadow-2xs">
              <p className="text-base sm:text-lg leading-relaxed text-ink font-serif italic">
                “{service.approach}”
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-line bg-white p-5 flex flex-col justify-between hover:border-brand/40 transition-colors">
                <div>
                  <span className="inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                    Paced &amp; Gentle
                  </span>
                  <h3 className="text-base font-bold text-ink mt-2">Respectful Pacing</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Moving at a pace that feels safe, never pushing topics before readiness.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-line bg-white p-5 flex flex-col justify-between hover:border-brand/40 transition-colors">
                <div>
                  <span className="inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                    Collaborative
                  </span>
                  <h3 className="text-base font-bold text-ink mt-2">Shared Decisions</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Clear agreements on goals, family involvement, and ongoing feedback.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-line bg-white p-5 flex flex-col justify-between hover:border-brand/40 transition-colors">
                <div>
                  <span className="inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                    Reviewed
                  </span>
                  <h3 className="text-base font-bold text-ink mt-2">Ongoing Review</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Regular check-ins ensure that therapy remains supportive and relevant.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: What to Expect at a First Appointment */}
          <section className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-xs" aria-labelledby="first-visit-heading">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark">
                <Clock className="w-3.5 h-3.5 text-brand" />
                <span>Initial Consultation</span>
              </div>
              <h2 id="first-visit-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink">
                What to expect at your first visit
              </h2>
              <p className="text-sm sm:text-base text-ink-muted">
                A transparent, reassuring journey through your initial consultation.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-brand-cream/25 p-5 sm:p-6">
              <p className="text-base sm:text-lg leading-relaxed text-ink-muted">
                {service.firstAppointment}
              </p>
            </div>

            {/* 3 Step Timeline */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-soft/20 border border-line">
                <span className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  1
                </span>
                <div>
                  <h4 className="text-sm font-bold text-ink">Welcoming Intake</h4>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                    Settle into the clinic, discuss privacy, and outline your hopes for care.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-soft/20 border border-line">
                <span className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  2
                </span>
                <div>
                  <h4 className="text-sm font-bold text-ink">Gentle Exploration</h4>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                    Share what brought you in at your own pace without pressure.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-soft/20 border border-line">
                <span className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  3
                </span>
                <div>
                  <h4 className="text-sm font-bold text-ink">Clear Care Plan</h4>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                    Agree together on session rhythm, goals, and next steps.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Frequently Asked Questions */}
          <section className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-xs" aria-labelledby="faqs-heading">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark">
                <HelpCircle className="w-3.5 h-3.5 text-brand" />
                <span>Common Inquiries</span>
              </div>
              <h2 id="faqs-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink">
                Frequently asked questions
              </h2>
              <p className="text-sm sm:text-base text-ink-muted">
                Helpful clarity on sessions, family involvement, and privacy.
              </p>
            </div>

            <div className="mt-6 space-y-3.5">
              {service.faqs.map(({ question, answer }) => (
                <details
                  key={question}
                  className="group rounded-2xl border border-line bg-brand-cream/20 p-4 sm:p-5 transition-all open:bg-brand-soft/25 open:border-brand/40"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink text-base sm:text-lg select-none list-none gap-4">
                    <span>{question}</span>
                    <ChevronDown className="w-5 h-5 text-brand shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-ink-muted border-t border-line/60 pt-3">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar (4 cols) - Rich Informational Cards with Sticky Consultation Booking at bottom */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Card 1: Who this service is for */}
          <div className="rounded-3xl border border-line bg-white p-6 shadow-xs">
            <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
              <Users className="w-5 h-5 text-brand" />
              <span>Who this service is for</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {service.audience}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-soft/50 border border-line px-3 py-1 text-xs font-medium text-brand-dark">
                Targeted Care
              </span>
              <span className="rounded-full bg-brand-soft/50 border border-line px-3 py-1 text-xs font-medium text-brand-dark">
                Family Guidance
              </span>
              <span className="rounded-full bg-brand-soft/50 border border-line px-3 py-1 text-xs font-medium text-brand-dark">
                Comfort First
              </span>
            </div>
          </div>

          {/* Card 2: Preparing for Your Visit Checklist */}
          <div className="rounded-3xl border border-line bg-white p-6 shadow-xs">
            <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-brand" />
              <span>Preparing for Your Visit</span>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
              Helpful tips to make your initial session smooth and comfortable:
            </p>
            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-ink-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-brand font-bold text-base leading-none mt-0.5">•</span>
                <span><strong>Notes &amp; Questions:</strong> Jot down any specific moments or daily routines you’d like to discuss.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-brand font-bold text-base leading-none mt-0.5">•</span>
                <span><strong>Prior Records (Optional):</strong> School notes or past developmental reports if you have them.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-brand font-bold text-base leading-none mt-0.5">•</span>
                <span><strong>No Pressure:</strong> You do not need formal medical paperwork or a referral to get started.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Clinic Environment & Hours */}
          <div className="rounded-3xl border border-line bg-brand-cream/40 p-5 sm:p-6 shadow-2xs">
            <h4 className="font-display text-base font-bold text-ink flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand" />
              <span>Clinic Environment</span>
            </h4>
            <div className="mt-3 space-y-2 text-xs sm:text-sm text-ink-muted">
              <p>🌿 <strong>Sensory-Friendly:</strong> Calm, private consultation suites designed to reduce tension.</p>
              <p>🕒 <strong>Flexible Hours:</strong> Monday – Saturday appointments with evening availability.</p>
              <p>🔒 <strong>Protected Privacy:</strong> Discrete entrance and confidential patient handling.</p>
            </div>
          </div>

          {/* Card 4: Need Help Deciding? */}
          <div className="rounded-3xl border border-line bg-gradient-to-br from-brand-soft/40 to-brand-cream/40 p-5 shadow-2xs">
            <h4 className="font-display text-base font-bold text-ink">
              Not sure where to begin?
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm text-ink-muted leading-relaxed">
              If you’re unsure which service best fits your situation, our intake team is here to listen and help you choose the right path.
            </p>
            <Link
              to="/contact"
              className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:text-brand-dark no-underline"
            >
              <span>Contact our intake team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 5: Sticky Consultation Booking Widget (Eliminates lower empty gap) */}
          <div className="rounded-3xl border border-line bg-gradient-to-b from-brand-soft/90 via-white to-brand-cream/70 p-6 shadow-sm lg:sticky lg:top-24">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark">
              Care Appointment
            </span>

            <h3 className="mt-3 font-display text-xl font-bold text-ink">
              Schedule a Consultation
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
              Book a dedicated session for {service.name} with our qualified clinical team.
            </p>

            <div className="mt-5 space-y-3">
              <Button to={`/appointment?service=${service.slug}`} className="w-full justify-center min-h-[48px]">
                Request an Appointment
              </Button>
              {!isPlaceholder(clinicPhone) && (
                <a
                  href={`tel:${clinicPhone}`}
                  className="w-full inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line bg-white hover:bg-brand-cream/60 py-2.5 px-4 text-xs sm:text-sm font-semibold text-ink transition-colors no-underline shadow-2xs"
                >
                  <Phone className="w-4 h-4 text-brand" />
                  <span>Call Clinic: {clinicPhone}</span>
                </a>
              )}
            </div>

            <div className="mt-6 pt-5 border-t border-line/70">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2.5">
                Our Clinical Commitment
              </h4>
              <ul className="space-y-2 text-xs text-ink-muted">
                <li className="flex items-center gap-2">
                  <span className="text-brand font-bold">✓</span>
                  <span>Strict confidentiality &amp; respectful space</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand font-bold">✓</span>
                  <span>Qualified, empathetic practitioners</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand font-bold">✓</span>
                  <span>No physician referral necessary</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand font-bold">✓</span>
                  <span>Flexible appointment scheduling</span>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <section className="mt-16 pt-10 border-t border-line" aria-labelledby="related-services-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand">Explore Options</span>
              <h2 id="related-services-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink mt-1">
                Related clinical services
              </h2>
            </div>
            <Link to="/services" className="text-xs sm:text-sm font-semibold text-brand hover:text-brand-dark no-underline">
              View all 11 services →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                to={`/services/${item.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-5 hover:border-brand/40 hover:shadow-xs transition-all no-underline"
              >
                <div>
                  <div className="w-full h-32 rounded-xl bg-brand-soft/25 border border-line/60 p-2 flex items-center justify-center mb-4">
                    <ServiceIllustration slug={item.slug} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                    {item.category === 'counselling' ? 'Counselling Care' : 'Rehabilitation'}
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink group-hover:text-brand transition-colors mt-1">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-ink-muted line-clamp-2 leading-relaxed">
                    {item.blurb}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-brand group-hover:text-brand-dark">
                  <span>Explore service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      {/* Mobile Sticky Appointment CTA Bar */}
      <div className="fixed bottom-[calc(64px+env(safe-area-inset-bottom))] left-0 right-0 z-30 p-2.5 sm:p-3 bg-white/95 backdrop-blur-md border-t border-line shadow-lg lg:hidden flex items-center justify-between gap-3 px-4">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-ink truncate">{service.name}</p>
          <p className="text-[11px] text-ink-muted truncate">Initial consultation session</p>
        </div>
        <Button
          to={`/appointment?service=${service.slug}`}
          className="shrink-0 min-h-[44px] text-xs sm:text-sm font-semibold px-4 py-2"
        >
          Request Care
        </Button>
      </div>
    </article>
  );
}
