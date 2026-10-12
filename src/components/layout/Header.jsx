import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { useClinicData } from '../../lib/ClinicDataContext';
import Button from '../ui/Button';

const links = [
  ['/', 'Home'], ['/about', 'About'], ['/services', 'Services'],
  ['/specialists', 'Specialists'], ['/contact', 'Contact'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { settings } = useClinicData();
  const linkCls = ({ isActive }) =>
    `rounded-full px-3 py-2 font-medium ${isActive ? 'bg-brand-soft text-brand-dark' : 'text-ink hover:text-brand'}`;
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-brand-dark">
          <Leaf aria-hidden="true" className="text-brand" /> {settings.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={linkCls}>{label}</NavLink>)}
          <Button to="/appointment" className="ml-3 !py-2">Book an Appointment</Button>
        </nav>
        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
          aria-expanded={open} aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="flex flex-col gap-1 border-t border-line bg-white px-4 pb-4 pt-2 lg:hidden">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkCls} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
          <Button to="/appointment" className="mt-2" onClick={() => setOpen(false)}>Book an Appointment</Button>
        </nav>
      )}
    </header>
  );
}
