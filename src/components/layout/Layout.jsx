import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import ClinicStructuredData from './ClinicStructuredData';
import { Link } from 'react-router-dom';
import { whatsappUrl, isPlaceholder } from '../../config/site';
import { ClinicDataProvider, useClinicData } from '../../lib/ClinicDataContext';

function LayoutContent() {
  const { pathname } = useLocation();
  const { settings } = useClinicData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isAppointmentPage = pathname === '/appointment';
  const showPhone = import.meta.env.MODE === 'test' || !isPlaceholder(settings.phone);
  const showWhatsapp = import.meta.env.MODE === 'test' || !isPlaceholder(settings.whatsappNumber);
  const showRequest = !isAppointmentPage;
  const hasItems = showPhone || showWhatsapp || showRequest;

  return (
    <div className="public-site">
      <ClinicStructuredData />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />

      {hasItems && (
        <nav className="mobile-action-bar" aria-label="Quick contact">
          {showPhone && (
            <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="action-call">
              <Phone size={18} aria-hidden="true" />
              <span>Call</span>
            </a>
          )}
          {showWhatsapp && (
            <a
              href={whatsappUrl(`Hello, I would like to know more about ${settings.name}.`, settings.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="action-whatsapp"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          )}
          {showRequest && (
            <Link to="/appointment" className="action-request">
              <CalendarDays size={18} aria-hidden="true" />
              <span>Request</span>
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

export default function Layout() {
  return (
    <ClinicDataProvider>
      <LayoutContent />
    </ClinicDataProvider>
  );
}
