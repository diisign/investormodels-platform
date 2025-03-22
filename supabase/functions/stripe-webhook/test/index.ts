
import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Webhook test endpoint called");
    
    // Supabase configuration
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Supabase configuration missing");
      return new Response(
        JSON.stringify({ success: false, message: "Configuration de la base de données manquante" }),
        { 
          status: 503, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Creating Supabase client with service role key");
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Handle test webhook
    const testEvent = {
      id: crypto.randomUUID(),
      event_type: "webhook_test",
      event_data: { test: true, timestamp: new Date().toISOString() },
      raw_payload: { source: "test_endpoint" },
      processed: true
    };
    
    const { data, error } = await supabase.from("webhook_events").insert(testEvent).select();
    
    if (error) {
      console.error("Error creating test event:", error);
      return new Response(
        JSON.stringify({ success: false, message: "Erreur lors de la création de l'événement de test" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    console.log("Événement de test enregistré avec succès:", data);
    return new Response(
      JSON.stringify({ success: true, message: "Test du webhook réussi", data }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Webhook test error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Erreur interne lors du test", 
        details: error instanceof Error ? error.message : "Erreur inconnue" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
