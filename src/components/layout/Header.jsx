import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
import { useClinicData } from '../../lib/ClinicDataContext';
import { site, whatsappUrl } from '../../config/site';
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
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkCls = ({ isActive }) =>
    `site-nav-link${isActive ? ' is-active' : ''}`;

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-brand" aria-label={`${settings.name} home`}>
          {settings.name}
        </Link>
        <nav aria-label="Main" className="site-nav site-nav-desktop">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkCls}>
              {label}
            </NavLink>
          ))}
          <Button to="/appointment" className="site-nav-cta">
            Request an appointment <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </nav>
        <button
          className="site-menu-button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          type="button"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Full-Screen Mobile Navigation Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#FAFBF7] md:hidden">
          {/* Top bar inside mobile overlay */}
          <div className="site-header-inner flex items-center justify-between border-b border-line px-5 py-3.5 min-h-[68px]">
            <Link
              to="/"
              className="site-brand text-lg font-display font-semibold text-ink no-underline"
              onClick={() => setOpen(false)}
            >
              {settings.name}
            </Link>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink hover:bg-brand-cream/50 transition-colors"
              aria-label="Close menu"
              type="button"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="flex-1 overflow-y-auto px-6 py-6 space-y-1.5"
          >
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between py-3.5 px-4 rounded-2xl text-lg font-medium transition-colors no-underline ${
                    isActive
                      ? 'bg-brand-soft text-brand-dark font-semibold'
                      : 'text-ink hover:bg-brand-cream/60'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                <span>{label}</span>
                <span className="text-xs text-brand font-bold">→</span>
              </NavLink>
            ))}

            {/* Quick Contact & Details in Menu */}
            <div className="mt-8 pt-6 border-t border-line space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted px-2">
                Direct Clinic Contact
              </p>
              <a
                href={`tel:${clinicPhone.replace(/[^\d+]/g, '')}`}
                className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-white border border-line text-sm font-medium text-ink no-underline hover:bg-brand-cream/40"
              >
                <Phone size={17} className="text-brand shrink-0" />
                <span>Call Clinic: {clinicPhone}</span>
              </a>
              <a
                href={whatsappUrl(
                  `Hello, I would like to know more about ${settings.name}.`,
                  clinicWhatsapp
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-white border border-line text-sm font-medium text-ink no-underline hover:bg-brand-cream/40"
              >
                <MessageCircle size={17} className="text-brand shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </nav>

          {/* Bottom Primary Action Bar */}
          <div className="border-t border-line bg-white/90 backdrop-blur-xs p-5 pb-6">
            <Button
              to="/appointment"
              className="w-full justify-center min-h-[48px] py-3 text-base shadow-sm"
              onClick={() => setOpen(false)}
            >
              Request an appointment <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
