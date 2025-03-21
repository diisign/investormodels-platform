
import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@16.8.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
  const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  
  if (!stripeSecretKey || !stripeWebhookSecret) {
    console.error("Configuration Stripe manquante");
    return new Response(
      JSON.stringify({ error: "Configuration du service de paiement manquante" }),
      { 
        status: 503, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Signature Stripe manquante" }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const body = await req.text();
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-07-31",
    });

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
    } catch (err) {
      console.error(`Signature webhook invalide: ${err.message}`);
      return new Response(
        JSON.stringify({ error: "Signature webhook invalide" }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Configuration Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Configuration de la base de données manquante" }),
        { 
          status: 503, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Only process completed checkout sessions to avoid duplicate transactions
    if (event.type === 'checkout.session.completed') {
      const result = await handlePaymentEvent(event.data.object, supabase);

      if (!result.success) {
        return new Response(
          JSON.stringify({ error: result.error }),
          { 
            status: 422, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Erreur webhook:", error);
    return new Response(
      JSON.stringify({ error: "Erreur interne du serveur", details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

// Fonction pour traiter les événements de paiement
async function handlePaymentEvent(paymentData, supabase) {
  try {
    const userId = paymentData.metadata?.userId;
    if (!userId) {
      return { success: false, error: "ID utilisateur manquant" };
    }

    let amount = 0;
    if (paymentData.amount_total) {
      amount = paymentData.amount_total / 100;
    } else if (paymentData.amount) {
      amount = paymentData.amount / 100;
    } else {
      return { success: false, error: "Montant invalide" };
    }

    const { error } = await supabase.from("transactions").insert({
      user_id: userId,
      amount: amount,
      currency: paymentData.currency || "eur",
      status: "completed",
      payment_id: paymentData.payment_intent || paymentData.id,
      payment_method: "stripe"
    });

    if (error) {
      console.error("Erreur d'enregistrement de la transaction:", error);
      return { success: false, error: "Erreur d'enregistrement de la transaction" };
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur de traitement du paiement:", error);
    return { success: false, error: "Erreur de traitement du paiement" };
  }
}
