// Configuración de Supabase para los archivos estáticos HTML (Portal y Landing)

const SUPABASE_URL = "https://lam7a.elfakir.com";
const SUPABASE_ANON_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc4OTkxODUwMCwiZXhwIjo0OTQ1NTkyMTAwLCJyb2xlIjoiYW5vbiJ9.BO0AL139qok5hXKYeU5c7tmD2J0QroXeFuqndyhln0Y";

// Inicializamos el cliente en window.supabaseClient para evitar colisiones con el objeto window.supabase del CDN
if (window.supabase && typeof window.supabase.createClient === 'function') {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.error("Supabase CDN script not loaded yet.");
}
