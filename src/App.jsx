import { Suspense, lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Specialists from './pages/Specialists';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
// Lazy-loaded administrative pages and layout so public visitors do not download admin code
const AdminLogin = lazy(() =>
  import('./components/admin/AdminUI').then((module) => ({ default: module.AdminLogin }))
);
const ProtectedRoute = lazy(() =>
  import('./components/admin/AdminUI').then((module) => ({ default: module.ProtectedRoute }))
);
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminAppointments = lazy(() => import('./pages/AdminAppointments'));
const AdminServices = lazy(() => import('./pages/AdminServices'));
const AdminSpecialists = lazy(() => import('./pages/AdminSpecialists'));
const AdminSettings = lazy(() => import('./pages/AdminSettings'));

function AdminLoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center text-ink"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-brand/20 border-t-brand mb-3"
        aria-hidden="true"
      />
      <span className="text-sm font-semibold text-ink-muted">Loading administrative console...</span>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<AdminLoadingFallback />}>
            <AdminLogin />
          </Suspense>
        }
      />
      <Route
        element={
          <Suspense fallback={<AdminLoadingFallback />}>
            <ProtectedRoute />
          </Suspense>
        }
      >
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="/admin/dashboard"
          element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <AdminAppointments />
            </Suspense>
          }
        />
        <Route
          path="/admin/services"
          element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <AdminServices />
            </Suspense>
          }
        />
        <Route
          path="/admin/specialists"
          element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <AdminSpecialists />
            </Suspense>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <AdminSettings />
            </Suspense>
          }
        />
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/specialists" element={<Specialists />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
