import { act, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AdminLogin, ProtectedRoute } from '../src/components/admin/AdminUI';
import { AuthProvider } from '../src/lib/AuthContext';

const client = vi.hoisted(() => ({
  authCallback: null,
  auth: {
    getSession: vi.fn(),
    onAuthStateChange: vi.fn(),
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
  },
  rpc: vi.fn(),
}));
vi.mock('../src/lib/supabase', () => ({ supabase: client, supabaseConfigError: '' }));

function renderProtectedRoute() {
  return render(
    <MemoryRouter initialEntries={['/admin/dashboard']}>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<h1>Private dashboard</h1>} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    client.auth.getSession.mockReset();
    client.auth.onAuthStateChange.mockReset();
    client.rpc.mockReset();
    client.authCallback = null;
    client.auth.getSession.mockResolvedValue({ data: { session: null }, error: null });
    client.auth.onAuthStateChange.mockImplementation((callback) => {
      client.authCallback = callback;
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });
    client.rpc.mockResolvedValue({ data: false, error: null });
  });

  it('redirects logged-out visitors to the admin login page', async () => {
    renderProtectedRoute();
    expect(await screen.findByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    await waitFor(() => expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow'));
    expect(screen.queryByRole('heading', { name: 'Private dashboard' })).not.toBeInTheDocument();
    expect(client.rpc).not.toHaveBeenCalled();
  });

  it('checks membership through is_admin before rendering protected content', async () => {
    client.auth.getSession.mockResolvedValue({ data: { session: { user: { id: 'admin-id' } } }, error: null });
    client.rpc.mockResolvedValue({ data: true, error: null });
    renderProtectedRoute();
    expect(await screen.findByRole('heading', { name: 'Private dashboard' })).toBeInTheDocument();
    expect(client.rpc).toHaveBeenCalledWith('is_admin');
  });

  it('denies authenticated users who are not administrators', async () => {
    client.auth.getSession.mockResolvedValue({ data: { session: { user: { id: 'non-admin-id' } } }, error: null });
    client.rpc.mockResolvedValue({ data: false, error: null });
    renderProtectedRoute();
    expect(await screen.findByText('This account is not enabled for clinic administration.')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Private dashboard' })).not.toBeInTheDocument();
  });

  it('returns to login when the session expires', async () => {
    client.auth.getSession.mockResolvedValue({ data: { session: { user: { id: 'admin-id' } } }, error: null });
    client.rpc.mockResolvedValue({ data: true, error: null });
    renderProtectedRoute();
    expect(await screen.findByRole('heading', { name: 'Private dashboard' })).toBeInTheDocument();
    act(() => client.authCallback('SIGNED_OUT', null));
    expect(await screen.findByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });
});