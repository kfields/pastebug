import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const options = {
  schema: 'public',
  //headers: { 'x-my-custom-header': 'my-app-name' },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

/*export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
console.log(supabase)
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);
});*/


export default function useSupabase() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
  console.log(supabase)
  /*supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
  });*/  
  return {
    supabase,
  };
}
