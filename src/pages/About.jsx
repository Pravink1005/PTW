import { ArrowRight, CheckCircle2, Heart, Shield, Sparkles, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import usePageMetadata from '../hooks/usePageMetadata';

const values = [
  {
    title: 'Our Mission',
    icon: Heart,
    text: 'To make reaching out for psychological and rehabilitative support feel approachable, reassuring, and dignified for every individual and family.',
  },
  {
    title: 'Our Vision',
    icon: Sparkles,
    text: 'A community where seeking mental wellbeing and therapy is met with compassion, understanding, and accessible evidence-informed care.',
  },
  {
    title: 'Dignity & Respect',
    icon: Shield,
    text: 'Every person brings unique strengths and life experiences. We honor your personal boundaries, cultural background, and comfort level.',
  },
  {
    title: 'Collaborative Care',
    icon: Users,
    text: 'We partner with you and, where agreed, your family or support network to build practical, sustainable steps forward.',
  },
];

const carePillars = [
  {
    title: 'Children & Adolescents',
    desc: 'Gentle developmental support, emotional expression, school adjustment, and play-based behavioral management.',
  },
  {
    title: 'Couples & Families',
    desc: 'Structured pre-marital, marital, and family conversations focused on communication, mutual understanding, and transition.',
  },
  {
    title: 'Older Adults & Life Transitions',
    desc: 'Compassionate companionship through life changes, retirement, grief, loneliness, and maintaining independence.',
  },
  {
    title: 'Rehabilitation & Daily Living',
    desc: 'Occupational therapy, speech therapy, cognitive training, and ADL routines tailored for meaningful day-to-day autonomy.',
  },
];

export default function About() {
  usePageMetadata('About MindCare', 'Learn about MindCare Therapy Centre, our welcoming approach, care philosophy, and multidisciplinary team.');
  return (
    <div className="public-page about-page">
      <header className="page-intro">
        <span className="inline-block rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark mb-3">
          Our Philosophy &amp; Ethos
        </span>
        <h1>About MindCare</h1>
        <p className="mt-4 text-lg leading-8 text-ink-muted max-w-3xl">
          At MindCare Therapy Centre, we understand that taking the first step toward counselling or therapy can feel daunting. We have created a warm, calm, and respectful environment where you are listened to without judgment, and supported at a pace that feels right for you.
        </p>
      </header>

      {/* Values Grid */}
      <section className="mt-12" aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-2xl sm:text-3xl font-display font-medium text-ink mb-6">
          Principles That Guide Our Work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map(({ title, icon: Icon, text }) => (
            <div key={title} className="rounded-2xl border border-line bg-white p-6 shadow-sm hover:border-brand/40 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand mb-4">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl text-ink font-semibold">{title}</h3>
              <p className="mt-2 text-ink-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Support */}
      <section className="mt-16 rounded-3xl bg-brand-soft border border-brand/10 p-8 sm:p-10" aria-labelledby="support-heading">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark">Comprehensive Care</span>
          <h2 id="support-heading" className="mt-2 text-2xl sm:text-3xl font-display text-brand-dark font-medium">
            Who We Walk Beside
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
            Our multidisciplinary team unites clinical counsellors, speech pathologists, occupational therapists, and special educators to support clients across every chapter of life.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
          {carePillars.map(({ title, desc }) => (
            <div key={title} className="rounded-2xl bg-white p-5 border border-line">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-brand shrink-0" aria-hidden="true" />
                <h3 className="font-semibold text-ink text-base">{title}</h3>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed pl-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Professional Approach */}
      <section className="mt-16 rounded-2xl border border-line bg-white p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-display text-ink font-medium">
          Our Clinical Commitment to You
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-ink text-base">Strict Privacy &amp; Ethics</h3>
            <p className="mt-2 text-ink-muted leading-relaxed">
              Your personal conversations, records, and sessions remain strictly confidential under legal and professional codes of conduct.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-ink text-base">Individualised Roadmaps</h3>
            <p className="mt-2 text-ink-muted leading-relaxed">
              No cookie-cutter solutions. We tailor therapeutic activities and dialogue to your personal routines, strengths, and goals.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-ink text-base">Open, Honest Communication</h3>
            <p className="mt-2 text-ink-muted leading-relaxed">
              We welcome your feedback at every session. You always have full autonomy to ask questions, pause, or adjust the direction of care.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink-muted">
            Have a question about whether our clinic is the right fit for your needs?
          </p>
          <div className="flex items-center gap-3">
            <Button to="/contact" variant="secondary">Contact the clinic</Button>
            <Button to="/appointment">Request an appointment <ArrowRight size={16} aria-hidden="true" /></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
