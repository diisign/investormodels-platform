
import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@16.8.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, userId, returnUrl } = await req.json();
    
    if (!amount || !userId) {
      return new Response(
        JSON.stringify({ error: "Le montant et l'identifiant utilisateur sont requis" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY non configurée");
      return new Response(
        JSON.stringify({ error: "Configuration du service de paiement manquante" }),
        { 
          status: 503, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-07-31",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Dépôt d'argent",
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
      },
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Erreur paiement:", error);
    
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
