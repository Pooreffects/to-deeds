import { createClient } from '@supabase/supabase-js';

const supabaseAPIKey = import.meta.env.VITE_SUPABASE_URL;
const supabaseANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseAPIKey, supabaseANON);

export default supabase;
