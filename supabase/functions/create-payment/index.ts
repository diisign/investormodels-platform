
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
    console.log("Starting payment creation process");
    
    // Parse the request body
    let requestData;
    try {
      requestData = await req.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const { amount, userId, returnUrl, creatorId, returnRate } = requestData;
    
    console.log("Request data:", { amount, userId, returnUrl, creatorId, returnRate });
    
    if (!amount || !userId) {
      console.error("Missing required fields:", { amount, userId });
      return new Response(
        JSON.stringify({ error: "Le montant et l'identifiant utilisateur sont requis" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Vérifier le montant minimum (100 euros)
    if (amount < 100) {
      console.error("Amount too low:", amount);
      return new Response(
        JSON.stringify({ error: "Le montant minimum est de 100€" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Configuration du service de paiement manquante" }),
        { 
          status: 503, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    console.log("Creating Stripe instance with API version 2025-02-24.acacia");
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

    // Déterminer le type de paiement et le nom du produit
    const isInvestment = creatorId && returnRate !== undefined;
    const productName = isInvestment ? "Investissement" : "Dépôt d'argent";
    
    console.log("Creating checkout session with amount:", amount, "EUR, type:", isInvestment ? "investment" : "deposit");
    
    try {
      const sessionData = {
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: productName,
              },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${returnUrl}?canceled=true`,
        metadata: {
          userId: userId,
          ...(isInvestment && { 
            creatorId: creatorId,
            returnRate: returnRate.toString(),
            type: "investment"
          })
        },
      };

      const session = await stripe.checkout.sessions.create(sessionData);

      console.log("Checkout session created successfully:", {
        sessionId: session.id,
        url: session.url,
        type: isInvestment ? "investment" : "deposit"
      });
      
      return new Response(
        JSON.stringify({ url: session.url }),
        { 
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } catch (stripeError) {
      console.error("Stripe checkout session creation error:", stripeError);
      
      // Si la création de session échoue, utiliser l'URL fixe
      console.log("Falling back to static Stripe payment URL");
      return new Response(
        JSON.stringify({ url: "https://buy.stripe.com/bIY28x2vDcyR97G5kl" }),
        { 
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    console.error("Payment error:", error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return new Response(
        JSON.stringify({ 
          error: "Erreur du service de paiement", 
          details: error.message 
        }),
        { 
          status: 402, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        error: "Erreur interne du serveur", 
        details: error instanceof Error ? error.message : "Erreur inconnue" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
    );
  }
});
