const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_PUBLIC_ANON_KEY";

// Make SUPABASE_URL globally accessible
window.SUPABASE_URL = SUPABASE_URL;

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
