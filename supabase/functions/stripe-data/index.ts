
import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@16.8.0";
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
    // Récupérer la clé secrète Stripe depuis les variables d'environnement
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Configuration de l'API Stripe manquante" }),
        { 
          status: 503, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Créer l'instance Stripe avec la version correcte
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-02-24.acacia",
      httpClient: Stripe.createFetchHttpClient({
        fetchApi: fetch,
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
    });

    // Analyser les paramètres de la requête
    const url = new URL(req.url);
    const endpoint = url.searchParams.get("endpoint") || "payments";
    const limit = parseInt(url.searchParams.get("limit") || "10");
    
    console.log(`Récupération des données Stripe: ${endpoint}, limite: ${limit}`);
    
    let data;
    
    // Récupérer les données en fonction de l'endpoint demandé
    switch (endpoint) {
      case "payments":
        // Récupérer les paiements récents
        const charges = await stripe.charges.list({
          limit: limit,
          expand: ["data.customer"]
        });
        
        // Transformation des données pour les afficher plus facilement
        data = charges.data.map(charge => ({
          id: charge.id,
          amount: charge.amount / 100, // Convertir en euros/dollars
          currency: charge.currency,
          created: new Date(charge.created * 1000).toISOString(),
          status: charge.status,
          customer: charge.customer ? {
            id: typeof charge.customer === 'string' ? charge.customer : charge.customer.id,
            email: typeof charge.customer === 'string' ? null : charge.customer.email,
            name: typeof charge.customer === 'string' ? null : charge.customer.name
          } : null
        }));
        break;
        
      case "customers":
        // Récupérer les clients
        const customers = await stripe.customers.list({
          limit: limit
        });
        
        data = customers.data;
        break;
        
      case "summary":
        // Récupérer un résumé des paiements par devise
        const allCharges = await stripe.charges.list({
          limit: 100 // Nombre plus élevé pour les statistiques
        });
        
        // Grouper les paiements par devise
        const summary = {};
        allCharges.data.forEach(charge => {
          const currency = charge.currency;
          if (!summary[currency]) {
            summary[currency] = {
              count: 0,
              total: 0
            };
          }
          
          summary[currency].count += 1;
          summary[currency].total += charge.amount / 100;
        });
        
        data = Object.entries(summary).map(([currency, stats]) => ({
          currency,
          count: stats.count,
          total: stats.total
        }));
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: "Endpoint non reconnu" }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
    }
    
    // Retourner les données formatées
    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des données Stripe:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Erreur lors de la récupération des données", 
        details: error instanceof Error ? error.message : "Erreur inconnue" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
