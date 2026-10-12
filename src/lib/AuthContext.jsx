import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [adminState, setAdminState] = useState('checking');

  useEffect(() => {
    if (!supabase) {
      setSessionLoading(false);
      setAdminState('denied');
      return undefined;
    }

    let active = true;
    let authEventReceived = false;
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      authEventReceived = true;
      if (!active) return;
      setSession(nextSession);
      setSessionLoading(false);
      setAdminState(nextSession ? 'checking' : 'denied');
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active || authEventReceived) return;
      setSession(error ? null : data.session);
      setSessionLoading(false);
      setAdminState(error || !data.session ? 'denied' : 'checking');
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;
    if (!session || !supabase) {
      setAdminState('denied');
      return () => { active = false; };
    }
    setAdminState('checking');
    void supabase.rpc('is_admin').then(({ data, error }) => {
      if (active) setAdminState(!error && data === true ? 'allowed' : 'denied');
    });
    return () => { active = false; };
  }, [session]);

  async function signIn(email, password) {
    if (!supabase) throw new Error('Admin access is unavailable because Supabase is not configured.');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signOut() {
    if (supabase) {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        await supabase.auth.signOut({ scope: 'local' });
        setSession(null);
        setAdminState('denied');
        throw error;
      }
    }
    setSession(null);
    setAdminState('denied');
  }

  return (
    <AuthContext.Provider value={{ session, sessionLoading, adminState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}