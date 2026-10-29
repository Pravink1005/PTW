import { Link } from 'react-router-dom';
import { useClinicData } from '../../lib/ClinicDataContext';

export default function Footer() {
  const { settings, services } = useClinicData();
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-intro">
          <Link to="/" className="site-footer-brand">
            {settings.name}
            <span aria-hidden="true">.</span>
          </Link>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#c4d1c4]">
            {settings.tagline}
          </p>
          <p className="site-footer-address text-sm sm:text-base leading-relaxed mt-4">
            {settings.address}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm sm:text-base">
            <a
              href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex min-h-[44px] items-center text-[#edf1e9] hover:text-[#B8D3DA] font-medium"
            >
              {settings.phone}
            </a>
            <span aria-hidden="true" className="text-[#89a291]">
              ·
            </span>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex min-h-[44px] items-center text-[#edf1e9] hover:text-[#B8D3DA] font-medium"
            >
              {settings.email}
            </a>
          </div>
        </div>

        <nav aria-label="Footer services" className="site-footer-nav site-footer-explore">
          <p className="font-semibold text-base text-[#B8D3DA] mb-3">Explore Services</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-x-6 sm:gap-y-2 list-none p-0 m-0">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  className="inline-flex min-h-[40px] items-center text-sm sm:text-base text-[#e0e8df] hover:text-white hover:underline"
                  to={`/services/${s.slug}`}
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer clinic links" className="site-footer-nav">
          <p className="font-semibold text-base text-[#B8D3DA] mb-3">Clinic Information</p>
          <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 list-none p-0 m-0">
            <li>
              <Link
                className="inline-flex min-h-[40px] items-center text-sm sm:text-base text-[#e0e8df] hover:text-white hover:underline"
                to="/appointment"
              >
                Request an appointment
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex min-h-[40px] items-center text-sm sm:text-base text-[#e0e8df] hover:text-white hover:underline"
                to="/contact"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex min-h-[40px] items-center text-sm sm:text-base text-[#e0e8df] hover:text-white hover:underline"
                to="/privacy"
              >
                Privacy policy
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex min-h-[40px] items-center text-sm sm:text-base text-[#e0e8df] hover:text-white hover:underline"
                to="/terms"
              >
                Terms
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="site-footer-bottom">
        <p>© {new Date().getFullYear()} {settings.name}</p>
        <p>Information here is general and does not replace professional assessment.</p>
      </div>
    </footer>
  );
}
