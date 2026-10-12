import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Leaf, ArrowUpRight } from 'lucide-react';
import { useClinicData } from '../../lib/ClinicDataContext';
import Button from '../ui/Button';

const links = [
  ['/', 'Home'], ['/about', 'About'], ['/services', 'Services'],
  ['/specialists', 'Specialists'], ['/contact', 'Contact'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { settings } = useClinicData();
  const linkCls = ({ isActive }) => `site-nav-link${isActive ? ' is-active' : ''}`;
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-brand" aria-label={`${settings.name} home`}>
          <span className="site-brand-icon"><Leaf aria-hidden="true" /></span>
          <span className="site-brand-copy"><span className="site-brand-name">{settings.name}</span><span className="site-brand-tagline">{settings.tagline}</span></span>
        </Link>
        <nav aria-label="Main" className="site-nav site-nav-desktop">
          {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={linkCls}>{label}</NavLink>)}
          <Button to="/appointment" className="site-nav-cta">Request a visit <ArrowUpRight size={16} aria-hidden="true" /></Button>
        </nav>
        <button
          className="site-menu-button"
          aria-expanded={open} aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          type="button"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="site-nav site-nav-mobile">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkCls} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
          <Button to="/appointment" className="site-nav-cta" onClick={() => setOpen(false)}>Request a visit <ArrowUpRight size={16} aria-hidden="true" /></Button>
        </nav>
      )}
    </header>
  );
}
