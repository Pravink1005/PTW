import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
import { useClinicData } from '../../lib/ClinicDataContext';
import { site, whatsappUrl, isPlaceholder } from '../../config/site';
import Button from '../ui/Button';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/specialists', 'Specialists'],
  ['/contact', 'Contact'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { settings } = useClinicData();
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const overlayRef = useRef(null);
  const wasOpenRef = useRef(false);

  const clinicPhone = settings?.phone || site.phone;
  const clinicWhatsapp = settings?.whatsappNumber || site.whatsappNumber;

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Auto focus close button when opened
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      if (wasOpenRef.current) {
        menuButtonRef.current?.focus();
      }
    }
    wasOpenRef.current = open;
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handle Escape key and focus trap
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key === 'Tab' && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const focusableElements = Array.from(focusable).filter(
          (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const linkCls = ({ isActive }) =>
    `site-nav-link${isActive ? ' is-active' : ''}`;

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          to="/"
          className="site-brand min-w-0 flex items-center gap-2 text-xl sm:text-2xl font-display font-medium text-ink no-underline truncate"
          aria-label={`${settings.name} home`}
        >
          <span className="truncate">{settings.name}</span>
        </Link>

        {/* Desktop navigation - strictly visible at 1024px+ */}
        <nav aria-label="Main" className="site-nav site-nav-desktop hidden lg:flex items-center">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkCls}>
              {label}
            </NavLink>
          ))}
          <Button to="/appointment" className="site-nav-cta">
            Request an appointment <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </nav>

        {/* Mobile/Tablet Menu Button - visible below 1024px */}
        <button
          ref={menuButtonRef}
          className="site-menu-button flex lg:hidden items-center justify-center"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          type="button"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Full-Screen Mobile Navigation Overlay - synced at lg:hidden, always mounted so aria-controls ID exists */}
      <div
        ref={overlayRef}
        id="mobile-nav-container"
        className={`fixed inset-0 z-50 flex flex-col bg-[#FAFBF7] lg:hidden transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none hidden'
        }`}
        aria-hidden={!open}
      >
        {/* Top bar inside mobile overlay */}
        <div className="site-header-inner flex items-center justify-between border-b border-line px-5 py-3.5 min-h-[68px]">
          <Link
            to="/"
            className="site-brand text-lg font-display font-semibold text-ink no-underline truncate max-w-[calc(100%-60px)]"
            onClick={() => setOpen(false)}
          >
            {settings.name}
          </Link>
          <button
            ref={closeButtonRef}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:bg-brand-cream/50 transition-colors"
            aria-label="Close menu"
            type="button"
            onClick={() => setOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Nav links */}
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-2"
        >
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center justify-between py-3.5 px-4 rounded-2xl text-lg font-medium transition-colors no-underline min-h-[48px] ${
                  isActive
                    ? 'bg-brand-soft text-brand-dark font-semibold'
                    : 'text-ink hover:bg-brand-cream/60'
                }`
              }
              onClick={() => setOpen(false)}
            >
              <span>{label}</span>
              <span className="text-xs text-brand font-bold" aria-hidden="true">→</span>
            </NavLink>
          ))}

          {/* Quick Contact & Details in Menu */}
          {(!isPlaceholder(clinicPhone) || !isPlaceholder(clinicWhatsapp)) && (
            <div className="mt-6 pt-5 border-t border-line space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted px-2">
                Direct Clinic Contact
              </p>
              {!isPlaceholder(clinicPhone) && (
                <a
                  href={`tel:${clinicPhone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-white border border-line text-sm font-medium text-ink no-underline hover:bg-brand-cream/40 min-h-[48px]"
                >
                  <Phone size={17} className="text-brand shrink-0" aria-hidden="true" />
                  <span>Call Clinic: {clinicPhone}</span>
                </a>
              )}
              {!isPlaceholder(clinicWhatsapp) && (
                <a
                  href={whatsappUrl(
                    `Hello, I would like to know more about ${settings.name}.`,
                    clinicWhatsapp
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-white border border-line text-sm font-medium text-ink no-underline hover:bg-brand-cream/40 min-h-[48px]"
                >
                  <MessageCircle size={17} className="text-brand shrink-0" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}
            </div>
          )}
        </nav>

        {/* Bottom Primary Action Bar in Menu */}
        <div className="border-t border-line bg-white/90 backdrop-blur-xs p-4 sm:p-5 pb-6">
          <Button
            to="/appointment"
            className="w-full justify-center min-h-[48px] py-3 text-base shadow-sm"
            onClick={() => setOpen(false)}
          >
            Request an appointment <ArrowUpRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  );
}
