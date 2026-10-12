import ServiceGroup from '../components/services/ServiceGroup';
import usePageMetadata from '../hooks/usePageMetadata';

export default function Services() {
  usePageMetadata('Our Services', 'Browse counselling, rehabilitation and therapy services offered by MindCare Therapy Centre.');
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">Choose a service to learn what it involves and what to expect at a first appointment.</p>
      </div>
      <ServiceGroup category="counselling" id="counselling" />
      <ServiceGroup category="rehabilitation" id="rehabilitation" />
    </>
  );
}
