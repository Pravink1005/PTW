import { useState } from 'react';
import { ArrowRight, Clock3, LockKeyhole, MapPin, Phone } from 'lucide-react';
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
        <img className="home-hero-image" src="/images/counselling-session.webp" alt="A counsellor listening attentively to a client during a conversation" fetchPriority="high" />
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="home-hero-content">
          <p className="home-kicker">{settings.name} <span aria-hidden="true">/</span> Counselling and rehabilitation</p>
          <h1 id="home-heading">You are not<br className="home-desktop-break" /> alone in this.</h1>
          <p className="home-hero-intro">Finding words for what is happening can take time. Start with a question, explore your options, and take the next step at a pace that feels right to you.</p>
          <div className="home-hero-actions">
            <Button to="/appointment" className="home-primary-cta">Request an appointment <ArrowRight size={17} aria-hidden="true" /></Button>
            <Button to="/services" variant="secondary" className="home-secondary-cta">Explore services</Button>
          </div>
          <p className="home-hero-note"><span aria-hidden="true" /> A thoughtful first step can be a small one.</p>
        </div>
        <a className="home-photo-credit" href="https://unsplash.com/photos/therapist-listens-to-patient-in-a-counseling-session-tw-mAZXr6H4" target="_blank" rel="noreferrer"></a>
      </section>

      <section className="we-heard-section" aria-labelledby="we-heard-heading">
        <div className="home-section-shell">
          <div className="we-heard-heading">
            <p className="home-section-kicker">A place to start</p>
            <h2 id="we-heard-heading">We heard you.</h2>
            <p>It is normal to have questions before reaching out. Start with the one that feels closest.</p>
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
                  <span className="we-heard-option-number">0{index + 1}</span>
                  <span>{item.prompt}</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="we-heard-answer" id="we-heard-answer" aria-live="polite">
              <span className="we-heard-answer-mark" aria-hidden="true">“</span>
              <p>{startingPoints[activeStartingPoint].response}</p>
              <Button to="/contact" variant="secondary" className="we-heard-link">Ask the clinic a question <ArrowRight size={16} aria-hidden="true" /></Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceGroup category="counselling" id="counselling" />
      <ServiceGroup category="rehabilitation" id="rehabilitation" />

      <section className="home-specialists-band" aria-labelledby="specialists-h">
        <div className="home-section-shell home-specialists-content">
          <div>
            <p className="home-section-kicker">People who listen</p>
            <h2 id="specialists-h">Meet our specialists.</h2>
            <p>{specialistStatus.source === 'fallback'
              ? 'Team profiles are editable placeholders until the clinic adds and approves professional details.'
              : specialists.length
                ? 'Explore the clinic’s specialist profiles and contact the clinic to confirm availability.'
                : 'No specialist profiles are currently listed.'}</p>
          </div>
          <Button to="/specialists" variant="secondary">Meet the team <ArrowRight size={17} aria-hidden="true" /></Button>
        </div>
      </section>

      <section className="home-privacy-section" aria-labelledby="privacy-heading">
        <div className="home-section-shell home-privacy-layout">
          <span className="home-privacy-icon"><LockKeyhole size={29} strokeWidth={1.6} aria-hidden="true" /></span>
          <div>
            <p className="home-section-kicker">Your information matters</p>
            <h2 id="privacy-heading">We value your privacy.</h2>
            <p>Share only what the clinic needs to respond to your request. The appointment form is for contact and scheduling details; please do not include health information in its message field.</p>
            <Button to="/privacy" variant="secondary" className="home-privacy-link">Read the privacy information <ArrowRight size={16} aria-hidden="true" /></Button>
          </div>
        </div>
      </section>

      <section className="home-visit-section" aria-labelledby="visit-heading">
        <div className="home-section-shell">
          <div className="home-visit-heading">
            <p className="home-section-kicker">The practical details</p>
            <h2 id="visit-heading">When you are ready.</h2>
          </div>
          <ul className="home-visit-list">
            <li><MapPin aria-hidden="true" /><div><h3>Find us</h3><p>{settings.address}</p></div></li>
            <li><Phone aria-hidden="true" /><div><h3>Call the clinic</h3><p><a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}>{settings.phone}</a></p></div></li>
            <li><Clock3 aria-hidden="true" /><div><h3>Opening hours</h3><p>{settings.hours[0]?.[0]}: {settings.hours[0]?.[1]}</p></div></li>
          </ul>
        </div>
      </section>

      <section className="home-closing-band" aria-labelledby="closing-heading">
        <div className="home-section-shell home-closing-content">
          <div><p className="home-section-kicker">Whenever it feels right</p><h2 id="closing-heading">One conversation can be a beginning.</h2></div>
          <Button to="/appointment" className="home-primary-cta">Request an appointment <ArrowRight size={17} aria-hidden="true" /></Button>
        </div>
      </section>
    </>
  );
}
