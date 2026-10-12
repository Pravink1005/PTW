import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CalendarDays, ClipboardList, LayoutDashboard, LogOut, Settings, Stethoscope, Users } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { supabaseConfigError } from '../../lib/supabase';

const navigation = [
  ['/admin/dashboard', 'Overview', LayoutDashboard],
  ['/admin/appointments', 'Appointments', ClipboardList],
  ['/admin/services', 'Services', Stethoscope],
  ['/admin/specialists', 'Specialists', Users],
  ['/admin/settings', 'Clinic settings', Settings],
];

export function useDialogFocus(isOpen, onClose) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
  useEffect(() => {
    if (!isOpen) return undefined;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const selector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = () => [...dialog.querySelectorAll(selector)].filter((element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true');
    (focusable()[0] ?? dialog).focus();
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const elements = focusable();
      if (!elements.length) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && document.activeElement === elements[0]) {
        event.preventDefault();
        elements.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === elements.at(-1)) {
        event.preventDefault();
        elements[0].focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [isOpen]);
  return dialogRef;
}

function useAdminMetadata(title, description) {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = document.querySelector('meta[name="description"]')?.content;
    const previousRobots = document.querySelector('meta[name="robots"]')?.content;
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.name = 'description';
      document.head.append(descriptionTag);
    }
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.name = 'robots';
      document.head.append(robotsTag);
    }
    document.title = title;
    descriptionTag.content = description;
    robotsTag.content = 'noindex, nofollow';
    return () => {
      document.title = previousTitle;
      if (previousDescription === undefined) descriptionTag.remove();
      else descriptionTag.content = previousDescription;
      if (previousRobots === undefined) robotsTag.remove();
      else robotsTag.content = previousRobots;
    };
  }, [title, description]);
}

export function ProtectedRoute() {
  const { session, sessionLoading, adminState } = useAuth();
  const location = useLocation();
  if (sessionLoading || (session && adminState === 'checking')) return <div className="admin-loading" role="status">Verifying administrator access…</div>;
  if (!session || adminState !== 'allowed') return <Navigate to="/admin/login" replace state={{ from: location }} />;
  return <AdminLayout />;
}

export function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState('');
  useAdminMetadata('Clinic Administration', 'Restricted administration area for clinic staff.');
  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 3500);
  };
  async function handleSignOut() {
    try {
      await signOut();
    } catch {
      notify('Signed out on this device. Remote sign-out could not be confirmed.');
    }
    navigate('/admin/login', { replace: true });
  }
  return (
    <div className="admin-frame">
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-white focus:p-3" href="#admin-content">Skip to content</a>
      <aside className="admin-sidebar">
        <Link className="admin-brand" to="/admin/dashboard"><span className="admin-brand-mark">M</span><span>MindCare <small>ADMINISTRATION</small></span></Link>
        <nav aria-label="Administration">
          {navigation.map(([to, label, Icon]) => <NavLink key={to} to={to} className={({ isActive }) => `admin-nav-link${isActive ? ' is-active' : ''}`}><Icon size={18} aria-hidden="true" />{label}</NavLink>)}
        </nav>
        <button className="admin-signout" type="button" onClick={handleSignOut}><LogOut size={18} aria-hidden="true" />Sign out</button>
      </aside>
      <main id="admin-content" className="admin-main"><Outlet context={{ notify }} /></main>
      {toast && <div className="admin-toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

export function AdminLogin() {
  const { session, sessionLoading, adminState, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  useAdminMetadata('Admin Sign In | MindCare Clinic', 'Restricted sign-in for MindCare Clinic administrators.');
  if (sessionLoading || (session && adminState === 'checking')) return <div className="admin-loading" role="status">Verifying administrator access…</div>;
  if (session && adminState === 'allowed') return <Navigate to="/admin/dashboard" replace />;

  async function submit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      navigate(location.state?.from?.pathname || '/admin/dashboard', { replace: true });
    } catch {
      setError('Sign-in failed. Check your email and password, then try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-panel" aria-labelledby="admin-login-title">
        <Link className="admin-brand" to="/"><span className="admin-brand-mark">M</span><span>MindCare <small>CLINIC ADMIN</small></span></Link>
        <p className="admin-eyebrow">Staff access</p>
        <h1 id="admin-login-title">Sign in</h1>
        <p className="admin-muted">Use your clinic administrator account.</p>
        {session && adminState === 'denied' && <p className="admin-error" role="alert">This account is not enabled for clinic administration.</p>}
        {!import.meta.env.VITE_SUPABASE_URL && <p className="admin-error" role="alert">{supabaseConfigError || 'Supabase is not configured.'}</p>}
        {error && <p className="admin-error" role="alert">{error}</p>}
        <form className="admin-form" onSubmit={submit}>
          <label>Email<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <button className="admin-button admin-button-primary" type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button>
        </form>
      </section>
    </main>
  );
}

export function PageHeader({ eyebrow = 'Administration', title, description, children }) {
  return <header className="admin-page-header"><div><p className="admin-eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p className="admin-muted">{description}</p>}</div>{children}</header>;
}

export function LoadingError({ loading, error, onRetry }) {
  if (loading) return <p className="admin-state" role="status">Loading clinic data…</p>;
  if (error) return <div className="admin-error" role="alert">{error}{onRetry && <button className="admin-text-button" type="button" onClick={onRetry}>Try again</button>}</div>;
  return null;
}

export function Field({ label, as = 'input', children, ...props }) {
  const Control = as;
  return <label className="admin-field">{label}{as === 'textarea' ? <textarea {...props}>{children}</textarea> : as === 'select' ? <select {...props}>{children}</select> : <Control {...props} />}</label>;
}

export function confirmAction(message) {
  return window.confirm(message);
}

