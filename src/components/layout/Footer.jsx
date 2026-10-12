import { Link } from 'react-router-dom';
import { useClinicData } from '../../lib/ClinicDataContext';

export default function Footer() {
  const { settings, services } = useClinicData();
  return (
    <footer className="mt-16 bg-brand-dark text-white/90">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold text-white">{settings.name}</p>
          <p className="mt-2 text-sm">{settings.address}</p>
          <p className="mt-1 text-sm">{settings.phone} · {settings.email}</p>
        </div>
        <nav aria-label="Footer services">
          <p className="font-semibold text-white">Services</p>
          <ul className="mt-2 space-y-1 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link className="hover:underline" to={`/services/${s.slug}`}>{s.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer links">
          <p className="font-semibold text-white">Clinic</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link className="hover:underline" to="/appointment">Book an appointment</Link></li>
            <li><Link className="hover:underline" to="/contact">Contact</Link></li>
            <li><Link className="hover:underline" to="/privacy">Privacy policy</Link></li>
            <li><Link className="hover:underline" to="/terms">Terms</Link></li>
          </ul>
        </nav>
      </div>
      <p className="border-t border-white/15 py-4 text-center text-xs">
        © {new Date().getFullYear()} {settings.name}. Information on this site does not replace professional assessment.
      </p>
    </footer>
  );
}
