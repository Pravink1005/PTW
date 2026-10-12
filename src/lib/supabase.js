import { createClient } from '@supabase/supabase-js';

const environment = import.meta.env ?? {};
const supabaseUrl = environment.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = environment.VITE_SUPABASE_ANON_KEY?.trim();

let supabase = null;
let supabaseConfigError = '';

if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [
    !supabaseUrl && 'VITE_SUPABASE_URL',
    !supabaseAnonKey && 'VITE_SUPABASE_ANON_KEY',
  ].filter(Boolean);
  supabaseConfigError = `Missing ${missing.join(' and ')}. Configure the variables in .env.local.`;
} else {
  try {
    const parsedUrl = new URL(supabaseUrl);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('The Supabase URL must use HTTP or HTTPS.');
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  } catch (error) {
    supabaseConfigError = `Supabase configuration is invalid: ${error.message}`;
  }
}

export { supabase, supabaseConfigError };