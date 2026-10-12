import { Link } from 'react-router-dom';
import { useClinicData } from '../../lib/ClinicDataContext';

export default function Footer() {
  const { settings, services } = useClinicData();
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-intro">
          <Link to="/" className="site-footer-brand">{settings.name}<span aria-hidden="true">.</span></Link>
          <p>{settings.tagline}</p>
          <p className="site-footer-address">{settings.address}</p>
          <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}>{settings.phone}</a>
          <span aria-hidden="true"> · </span>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
        </div>
        <nav aria-label="Footer services" className="site-footer-nav">
          <p>Explore</p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}><Link className="hover:underline" to={`/services/${s.slug}`}>{s.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer clinic links" className="site-footer-nav">
          <p>Clinic</p>
          <ul>
            <li><Link className="hover:underline" to="/appointment">Request an appointment</Link></li>
            <li><Link className="hover:underline" to="/contact">Contact</Link></li>
            <li><Link className="hover:underline" to="/privacy">Privacy policy</Link></li>
            <li><Link className="hover:underline" to="/terms">Terms</Link></li>
          </ul>
        </nav>
      </div>
      <div className="site-footer-bottom"><p>© {new Date().getFullYear()} {settings.name}</p><p>Information here is general and does not replace professional assessment.</p></div>
    </footer>
  );
}
