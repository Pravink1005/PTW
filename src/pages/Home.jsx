import { useState } from 'react';
import { ArrowRight, Clock3, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
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
  usePageMetadata('Home', `A supportive first step with ${settings.name}. Explore counselling, therapy and rehabilitation services at your own pace.`);
  return (
    <>
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero-inner">
          <div className="home-hero-content">
            <h1 id="home-heading">You are not alone in this.</h1>
            <p className="home-hero-intro">Finding words for what is happening can take time. Start with a question, explore your options, and take the next step at a pace that feels right to you.</p>
            <div className="home-hero-actions">
              <Button to="/appointment" className="home-primary-cta">Request an appointment <ArrowRight size={17} aria-hidden="true" /></Button>
              <a className="home-quiet-link" href="#counselling">Explore services <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <p className="home-request-note">An appointment request is not a confirmed booking. The clinic will contact you about availability.</p>
          </div>
          <img className="home-hero-image" src="/images/counselling-session.webp" alt="A counsellor listening attentively to a client during a conversation" fetchpriority="high" />
        </div>
      </section>

      <section className="we-heard-section" aria-labelledby="we-heard-heading">
        <div className="home-section-shell">
          <div className="we-heard-heading">
            <h2 id="we-heard-heading">Where to start</h2>
            <p>It is normal to have questions before reaching out. Choose the one that feels closest, and take it from there.</p>
          </div>
          <div className="we-heard-content">
            <div className="we-heard-options" role="group" aria-label="Choose a question">
              {startingPoints.map((item, index) => (
                <button
                  key={item.prompt}
                  type="button"
                  className={`we-heard-option${activeStartingPoint === index ? ' is-selected' : ''}`}
                  aria-pressed={activeStartingPoint === index}
                  aria-controls="we-heard-answer"
                  onClick={() => setActiveStartingPoint(index)}
                >
                  <span>{item.prompt}</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="we-heard-answer" id="we-heard-answer" aria-live="polite">
              <p>{startingPoints[activeStartingPoint].response}</p>
              <Link to="/contact" className="home-quiet-link">Ask the clinic a question <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceGroup category="counselling" id="counselling" />

      <section className="first-visit-section" aria-labelledby="first-visit-heading">
        <div className="home-section-shell">
          <h2 id="first-visit-heading">A simple first step</h2>
          <ol className="first-visit-steps">
            <li><span>1</span><p>You send a request</p></li>
            <li><span>2</span><p>The clinic contacts you to confirm availability</p></li>
            <li><span>3</span><p>You have a first conversation</p></li>
          </ol>
          <p className="first-visit-note">Sending a request does not confirm an appointment.</p>
        </div>
      </section>

      <ServiceGroup category="rehabilitation" id="rehabilitation" />

      <section className="home-specialists-band" aria-labelledby="specialists-h">
        <div className="home-section-shell home-specialists-content">
          <div>
            <h2 id="specialists-h">Meet our specialists</h2>
            <p>{specialistStatus.source === 'fallback'
              ? 'Team profiles are editable placeholders until the clinic adds and approves professional details.'
              : specialists.length
                ? 'Explore the clinic’s specialist profiles and contact the clinic to confirm availability.'
                : 'No specialist profiles are currently listed.'}</p>
          </div>
          <Button to="/specialists" variant="secondary">Meet the team <ArrowRight size={17} aria-hidden="true" /></Button>
        </div>
      </section>

      <aside className="home-privacy-note" aria-label="Privacy reassurance">
        <p>Share only the details needed for the clinic to respond, and please leave health information out of the message field.</p>
        <Link to="/privacy">Read the privacy information <ArrowRight size={16} aria-hidden="true" /></Link>
      </aside>

      <section className="home-closing-band" aria-labelledby="closing-heading">
        <div className="home-section-shell home-closing-content">
          <h2 id="closing-heading">Whenever you feel ready, reach out.</h2>
          <Button to="/appointment" className="home-primary-cta">Request an appointment <ArrowRight size={17} aria-hidden="true" /></Button>
        </div>
      </section>

      <section className="home-visit-section" aria-labelledby="visit-heading">
        <div className="home-section-shell">
          <h2 id="visit-heading">Clinic details</h2>
          <ul className="home-visit-list">
            <li><MapPin aria-hidden="true" /><div><h3>Address</h3><p>{settings.address}</p></div></li>
            <li><Phone aria-hidden="true" /><div><h3>Phone</h3><p><a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}>{settings.phone}</a></p></div></li>
            <li><Clock3 aria-hidden="true" /><div><h3>Hours</h3><p>{settings.hours[0]?.[0]}: {settings.hours[0]?.[1]}</p></div></li>
          </ul>
        </div>
      </section>
    </>
  );
}
