import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import ClinicStructuredData from './ClinicStructuredData';
import { Link } from 'react-router-dom';
import { whatsappUrl } from '../../config/site';
import { ClinicDataProvider, useClinicData } from '../../lib/ClinicDataContext';

function LayoutContent() {
  const { pathname } = useLocation();
  const { settings } = useClinicData();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="public-site">
      <ClinicStructuredData />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <nav className="mobile-action-bar" aria-label="Quick contact">
        <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}><Phone size={18} aria-hidden="true" /><span>Call</span></a>
        <a href={whatsappUrl(`Hello, I would like to know more about ${settings.name}.`, settings.whatsappNumber)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /><span>WhatsApp</span></a>
        <Link to="/appointment"><CalendarDays size={18} aria-hidden="true" /><span>Request</span></Link>
      </nav>
    </div>
  );
}

export default function Layout() {
  return <ClinicDataProvider><LayoutContent /></ClinicDataProvider>;
}
