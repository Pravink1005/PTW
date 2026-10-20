import { useState } from 'react';
import { ArrowRight, Clock3, HeartHandshake, MapPin, Phone, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import HeroIllustration from '../components/home/HeroIllustration';
import ServiceGroup from '../components/services/ServiceGroup';
import usePageMetadata from '../hooks/usePageMetadata';
import { useClinicData } from '../lib/ClinicDataContext';

const startingPoints = [
  {
    prompt: 'I do not know where to begin.',
    response: 'You can begin with one practical question, a service you are curious about, or a request for the clinic to contact you.',
  },
  {
    prompt: 'I am still figuring out what I need.',
    response: 'That is okay. Browse the services at your own pace, then reach out when you are ready to ask about the next step.',
  },
  {
    prompt: 'I would like to understand my options first.',
    response: 'You can contact the clinic with a question before making an appointment request. There is no need to have everything decided yet.',
  },
];

export default function Home() {
  const { settings, specialists, specialistStatus } = useClinicData();
  const [activeStartingPoint, setActiveStartingPoint] = useState(0);
  usePageMetadata('Home', `Gentle support for every stage of care at ${settings.name}. Counselling, therapy and rehabilitation.`);

  return (
    <>
      {/* Hero Section */}
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero-inner mx-auto">
          <div className="home-hero-content">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-semibold tracking-wide text-brand-dark mb-3">
              <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
              MindCare Therapy Centre
            </div>
            <h1 id="home-heading">Compassionate Care for Mind, Growth &amp; Daily Life</h1>
            <p className="home-hero-intro">Dedicated counselling, specialised therapy, and rehabilitation services for individuals, children, and families—guided with patience, dignity, and warmth.</p>
            <div className="home-hero-actions">
              <Button to="/appointment" className="home-primary-cta">Request an appointment <ArrowRight size={17} aria-hidden="true" /></Button>
              <a className="home-quiet-link" href="#counselling">Explore services <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <p className="home-request-note">An appointment request is not a confirmed booking. The clinic will contact you about availability.</p>
          </div>
          <HeroIllustration className="w-full max-w-lg mx-auto" />
        </div>
      </section>

      {/* Reassurance Strip */}
      <section className="border-y border-line bg-white/80 backdrop-blur-sm py-4 sm:py-5" aria-label="Why people choose MindCare">
        <div className="home-section-shell mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <ShieldCheck size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-ink text-sm">Confidential &amp; Ethical</p>
              <p className="text-xs text-ink-muted">A private space respecting your dignity</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <Users size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-ink text-sm">Children to Seniors</p>
              <p className="text-xs text-ink-muted">Care tailored across every life stage</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <Sparkles size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-ink text-sm">11 Specialised Services</p>
              <p className="text-xs text-ink-muted">Counselling &amp; therapy under one roof</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <HeartHandshake size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-ink text-sm">Paced at Your Comfort</p>
              <p className="text-xs text-ink-muted">Collaborative, non-judgmental guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* About MindCare Welcome Section */}
      <section className="py-8 sm:py-12 bg-white border-b border-line" aria-labelledby="about-preview-heading">
        <div className="home-section-shell mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-3.5">
            <span className="inline-block rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark">
              About MindCare
            </span>
            <h2 id="about-preview-heading" className="text-3xl sm:text-4xl font-display font-medium text-ink leading-tight">
              A gentle, supportive space where you are truly heard.
            </h2>
            <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
              At MindCare Therapy Centre, we believe reaching out for support should feel welcoming and unhurried. Whether you are navigating personal challenges, strengthening family communication, or supporting a child’s development, our multidisciplinary clinic provides compassionate, evidence-informed care under one roof.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="rounded-2xl border border-line bg-brand-cream/50 p-4">
                <h3 className="font-semibold text-ink text-base">Multidisciplinary Team</h3>
                <p className="mt-1 text-xs sm:text-sm text-ink-muted">Counsellors, speech pathologists, and occupational therapists working together.</p>
              </div>
              <div className="rounded-2xl border border-line bg-brand-cream/50 p-4">
                <h3 className="font-semibold text-ink text-base">Zero-Pressure Exploration</h3>
                <p className="mt-1 text-xs sm:text-sm text-ink-muted">Ask questions first, explore your options, and decide next steps at your own pace.</p>
              </div>
            </div>
            <div className="pt-1.5">
              <Button to="/about" variant="secondary" className="w-full sm:w-auto justify-center">
                Read our story &amp; care philosophy <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 rounded-3xl bg-brand-soft border border-brand/15 p-6 sm:p-7 space-y-4">
            <h3 className="font-display text-2xl text-brand-dark font-medium">What Guides Our Practice</h3>
            <ul className="space-y-3 text-sm text-ink">
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white text-xs font-bold mt-0.5" aria-hidden="true">✓</span>
                <span><strong>Dignity &amp; Compassion:</strong> Every person is treated with deep respect for their unique background and lived experience.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white text-xs font-bold mt-0.5" aria-hidden="true">✓</span>
                <span><strong>Collaborative Care:</strong> We listen to what matters to you and shape practical goals alongside you.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white text-xs font-bold mt-0.5" aria-hidden="true">✓</span>
                <span><strong>Strict Confidentiality:</strong> Your privacy, personal information, and session details are held to strict ethical standards.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Where to start Section */}
      <section className="py-8 sm:py-12 bg-brand-cream border-b border-line" aria-labelledby="we-heard-heading">
        <div className="home-section-shell mx-auto">
          <div className="max-w-2xl mb-6 sm:mb-7">
            <span className="inline-block rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark mb-2">
              Guidance &amp; Clarity
            </span>
            <h2 id="we-heard-heading" className="font-display text-3xl sm:text-4xl text-brand-dark font-medium leading-tight">
              Where to start
            </h2>
            <p className="mt-2 text-base sm:text-lg text-ink-muted leading-relaxed">
              It is normal to have questions before reaching out. Choose the statement that feels closest to where you are right now, and take it one step at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5" role="group" aria-label="Choose a question">
            {startingPoints.map((item, index) => {
              const isSelected = activeStartingPoint === index;
              return (
                <button
                  key={item.prompt}
                  type="button"
                  aria-pressed={isSelected}
                  aria-controls="we-heard-answer"
                  onClick={() => setActiveStartingPoint(index)}
                  className={`group relative flex flex-col justify-between text-left p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-brand bg-white shadow-md ring-2 ring-brand/20 -translate-y-0.5'
                      : 'border-line bg-white/70 hover:bg-white hover:border-brand/40 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-brand text-white shadow-xs'
                          : 'bg-brand-soft text-brand-dark group-hover:bg-brand/20'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${
                        isSelected
                          ? 'bg-brand-soft text-brand translate-x-0.5'
                          : 'text-ink-muted/50 group-hover:text-brand group-hover:translate-x-0.5'
                      }`}
                    >
                      <ArrowRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                  <span className="font-display text-lg sm:text-xl font-medium text-ink leading-snug">
                    {item.prompt}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="we-heard-answer"
            aria-live="polite"
            className="mt-5 rounded-2xl border border-brand/20 bg-white p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5"
          >
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                Our suggestion for you
              </span>
              <p className="font-display text-lg sm:text-xl text-ink leading-relaxed">
                {startingPoints[activeStartingPoint].response}
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-brand bg-brand-soft px-5 py-2.5 text-sm font-semibold text-brand-dark hover:bg-brand hover:text-white transition-colors duration-150 w-full sm:w-auto"
            >
              Ask the clinic a question <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Counselling Services Group */}
      <ServiceGroup category="counselling" id="counselling" />

      {/* A simple first step Section */}
      <section className="py-8 sm:py-10 bg-brand-cream/40 border-b border-line" aria-labelledby="first-visit-heading">
        <div className="home-section-shell mx-auto">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-7">
            <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark mb-2">
              How It Works
            </span>
            <h2 id="first-visit-heading" className="font-display text-2xl sm:text-3xl text-brand-dark font-medium leading-tight">
              A simple first step
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-muted leading-relaxed">
              We make beginning care straightforward, transparent, and comfortable. Here is what to expect from your initial enquiry.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 list-none p-0 m-0">
            <li className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-line shadow-xs hover:border-brand/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white font-display text-lg font-bold shadow-xs">
                    1
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">
                    Step 01 · Request
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-ink mb-2">
                  You send a request
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  Fill out our brief online form choosing a service or general enquiry at a time that suits your routine.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-line/60">
                <span className="text-xs text-ink-muted">Takes 2 minutes · No referral needed</span>
              </div>
            </li>

            <li className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-line shadow-xs hover:border-brand/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white font-display text-lg font-bold shadow-xs">
                    2
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">
                    Step 02 · Contact
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-ink mb-2">
                  The clinic contacts you
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  Our coordinator reviews specialist availability and reaches out via phone or email to confirm a suitable slot.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-line/60">
                <span className="text-xs text-ink-muted">Direct coordinator phone/email follow-up</span>
              </div>
            </li>

            <li className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-line shadow-xs hover:border-brand/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white font-display text-lg font-bold shadow-xs">
                    3
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-dark bg-brand-soft px-2.5 py-1 rounded-full">
                    Step 03 · Consultation
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-ink mb-2">
                  You have a first conversation
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  Meet your specialist in a calm, unhurried space to discuss your goals, answer questions, and shape next steps together.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-line/60">
                <span className="text-xs text-ink-muted">Confidential, private &amp; paced for you</span>
              </div>
            </li>
          </ol>

          <div className="mt-5 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-white border border-line/80 px-4 py-1.5 text-xs text-brand-dark shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              Sending a request does not confirm an appointment. The clinic contacts you to confirm availability.
            </p>
          </div>
        </div>
      </section>

      {/* Rehabilitation Services Group */}
      <ServiceGroup category="rehabilitation" id="rehabilitation" />

      {/* Meet our specialists Section */}
      <section className="py-8 sm:py-10 bg-brand-cream/50 border-b border-line" aria-labelledby="specialists-h">
        <div className="home-section-shell mx-auto">
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-7 lg:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="inline-block rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark">
                  Clinical Care Team
                </span>
                <h2 id="specialists-h" className="font-display text-3xl sm:text-4xl text-brand-dark font-medium leading-tight">
                  Meet our specialists
                </h2>
                <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl">
                  {specialistStatus.source === 'fallback'
                    ? 'Our team of qualified counsellors and therapists is being added here shortly. In the meantime, you can reach out directly with any questions about our practitioners.'
                    : specialists.length
                      ? 'Explore our multidisciplinary team of licensed counsellors, speech pathologists, and occupational therapists.'
                      : 'Our team of qualified counsellors and therapists is being added here shortly. In the meantime, you can reach out directly with any questions about our practitioners.'}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream border border-line/60 px-3 py-1 text-xs font-medium text-ink-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                    Counsellors &amp; Psychotherapists
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream border border-line/60 px-3 py-1 text-xs font-medium text-ink-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                    Speech Pathologists
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream border border-line/60 px-3 py-1 text-xs font-medium text-ink-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                    Occupational Therapists
                  </span>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-3">
                <div className="text-left lg:text-right hidden sm:block">
                  <p className="text-xs font-semibold text-brand-dark uppercase tracking-wider">Multi-Disciplinary</p>
                  <p className="text-xs text-ink-muted">Tailored assessment &amp; ongoing care</p>
                </div>
                <Button to="/specialists" variant="secondary" className="w-full sm:w-auto justify-center">
                  Meet the team <ArrowRight size={17} aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy reassurance callout */}
      <section className="py-5 sm:py-7 bg-white border-b border-line" aria-label="Privacy reassurance">
        <div className="home-section-shell mx-auto">
          <aside
            className="rounded-2xl border border-brand/20 bg-brand-soft/70 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs"
            aria-label="Privacy reassurance"
          >
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-xs border border-brand/10">
                <ShieldCheck size={22} aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark">
                  Your Privacy &amp; Ethical Care
                </p>
                <p className="text-sm sm:text-base text-ink leading-relaxed max-w-2xl">
                  Share only the details needed for the clinic to respond, and please leave health information out of the message field.
                </p>
              </div>
            </div>
            <Link
              to="/privacy"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-brand/30 bg-white px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-brand hover:text-white transition-colors duration-150 w-full sm:w-auto self-stretch sm:self-start md:self-center"
            >
              Read the privacy information <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      {/* Closing CTA Band */}
      <section className="home-closing-band bg-brand-dark text-white py-10 sm:py-14" aria-labelledby="closing-heading">
        <div className="home-section-shell mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-soft border border-white/15">
              We Are Here For You
            </span>
            <h2
              id="closing-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal !text-white leading-tight"
              style={{ color: '#FFFFFF' }}
            >
              Whenever you feel ready, reach out.
            </h2>
            <p
              className="text-base sm:text-lg !text-white/85 leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'rgba(255, 255, 255, 0.88)' }}
            >
              Whether you have a specific question about our services or wish to explore beginning therapy, our clinic team is here to listen and assist with kindness and care.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              <Link
                id="closing-primary-cta"
                to="/appointment"
                className="home-primary-cta inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full !bg-white !text-brand-dark hover:!bg-brand-soft shadow-md font-semibold px-7 py-3.5 text-base transition-colors no-underline w-full sm:w-auto"
                style={{ backgroundColor: '#FFFFFF', color: '#123F49' }}
              >
                Request an appointment <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-base font-semibold !text-white hover:bg-white/20 transition-colors no-underline w-full sm:w-auto"
                style={{ color: '#FFFFFF' }}
              >
                Ask a question first <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <p
              className="text-xs sm:text-sm !text-white/70 pt-1"
              style={{ color: 'rgba(255, 255, 255, 0.72)' }}
            >
              All enquiries are held in strict clinical confidentiality.
            </p>
          </div>
        </div>
      </section>

      {/* Clinic Details Section */}
      <section className="py-8 sm:py-12 bg-brand-cream border-t border-line" aria-labelledby="visit-heading">
        <div className="home-section-shell mx-auto">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <span className="inline-block rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark mb-2">
              Visit &amp; Contact
            </span>
            <h2 id="visit-heading" className="font-display text-3xl sm:text-4xl text-brand-dark font-medium leading-tight">
              Clinic details
            </h2>
            <p className="mt-2 text-base sm:text-lg text-ink-muted leading-relaxed">
              Visit us in person, speak with our care coordinator, or verify consultation hours before your visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Address Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-xs hover:border-brand/50 transition-all duration-200">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-soft text-brand mb-3.5">
                  <MapPin size={20} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink mb-1.5">Clinic Location</h3>
                <p className="text-base text-ink font-medium leading-relaxed">{settings.address}</p>
                <p className="mt-1 text-xs text-ink-muted">Accessible facility with convenient visitor parking.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-line/60">
                <span className="text-xs font-semibold text-brand">In-person consultations</span>
              </div>
            </div>

            {/* Phone & Inquiries Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-xs hover:border-brand/50 transition-all duration-200">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-soft text-brand mb-3.5">
                  <Phone size={20} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink mb-1.5">Phone &amp; Enquiries</h3>
                <p className="text-base text-ink font-medium">
                  <a
                    href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                    className="text-brand hover:text-brand-dark hover:underline transition-colors"
                  >
                    {settings.phone}
                  </a>
                </p>
                <p className="mt-1 text-xs text-ink-muted">Call our desk for appointment scheduling or queries.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-line/60">
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline">
                  Send an online message <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Consultation Hours Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-xs hover:border-brand/50 transition-all duration-200">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-soft text-brand mb-3.5">
                  <Clock3 size={20} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink mb-1.5">Consultation Hours</h3>
                <p className="text-base text-ink font-medium">
                  {settings.hours?.[0] ? `${settings.hours[0][0]}: ${settings.hours[0][1]}` : 'Monday – Saturday: 9:00 AM – 6:00 PM'}
                </p>
                <p className="mt-1 text-xs text-ink-muted">Appointments scheduled to ensure privacy and adequate time.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-line/60">
                <span className="text-xs font-semibold text-ink-muted">Sunday: By prior arrangement</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
