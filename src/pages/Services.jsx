import ServiceGroup from '../components/services/ServiceGroup';
import usePageMetadata from '../hooks/usePageMetadata';

export default function Services() {
  usePageMetadata('Our Services', 'Browse counselling, rehabilitation and therapy services offered by MindCare Therapy Centre.');
  return (
    <>
      <div className="public-page page-intro services-page-intro">
        <h1>Our services</h1>
        <p>Explore counselling first, then browse therapy and rehabilitation services. Each page explains what to expect and how to ask about a first visit.</p>
      </div>
      <ServiceGroup category="counselling" id="counselling" />
      <ServiceGroup category="rehabilitation" id="rehabilitation" />
    </>
  );
}
