import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import ClinicStructuredData from './ClinicStructuredData';
import { whatsappUrl } from '../../config/site';
import { ClinicDataProvider, useClinicData } from '../../lib/ClinicDataContext';

function LayoutContent() {
  const { pathname } = useLocation();
  const { settings } = useClinicData();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <ClinicStructuredData />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <a
        href={whatsappUrl(`Hello, I would like to know more about ${settings.name}.`, settings.whatsappNumber)} target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (opens WhatsApp; this does not submit an appointment)"
        className="fixed bottom-4 right-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-soft hover:bg-brand-dark"
      >
        <MessageCircle aria-hidden="true" />
      </a>
    </>
  );
}

export default function Layout() {
  return <ClinicDataProvider><LayoutContent /></ClinicDataProvider>;
}
