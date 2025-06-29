
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

export function createSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Configuration Supabase manquante");
  }
  
  return createClient(supabaseUrl, supabaseKey);
}
