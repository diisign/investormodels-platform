
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.7.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Gestion de la requête OPTIONS pour CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, userId, returnUrl } = await req.json();
    
    // Vérification des données reçues
    if (!amount || !userId) {
      return new Response(
        JSON.stringify({ error: "Le montant et l'identifiant utilisateur sont requis" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Création d'une session de paiement: montant=${amount}€, userId=${userId}`);

    // Initialisation de Stripe avec la clé API
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY") || "";
    
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY non configurée dans les secrets de la fonction Edge");
      return new Response(
        JSON.stringify({ error: "Configuration Stripe manquante" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Création d'une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Dépôt d'argent",
            },
            unit_amount: Math.round(amount * 100), // Stripe utilise des centimes
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

    console.log(`Session de paiement créée: ${session.id}, URL: ${session.url}`);

    return new Response(
      JSON.stringify({ success: true, url: session.url }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Erreur paiement:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
