import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const hasSupabaseConfig = Boolean(supabaseUrl && supabaseKey);

if (!hasSupabaseConfig) {
  console.warn('Missing Supabase environment variables. Auth features are disabled until VITE_SUPABASE_URL and VITE_SUPABASE_KEY are set.');
}

// Use harmless fallbacks so the app can still render public pages without crashing.
export const supabase = createClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseKey || 'public-anon-key',
);
export const isSupabaseConfigured = hasSupabaseConfig;
