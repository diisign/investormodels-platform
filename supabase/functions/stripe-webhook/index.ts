
import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@16.8.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Webhook received from Stripe");
    
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeSecretKey || !stripeWebhookSecret) {
      console.error("Stripe configuration missing");
      return new Response(
        JSON.stringify({ error: "Configuration du service de paiement manquante" }),
        { 
          status: 503, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get the signature from the headers
    const signature = req.headers.get("stripe-signature");
    
    // Log the presence of the signature
    console.log("Stripe signature present:", !!signature);
    
    if (!signature) {
      console.error("Missing Stripe signature");
      return new Response(
        JSON.stringify({ error: "Signature Stripe manquante" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get the request body for signature verification
    const body = await req.text();
    console.log("Received webhook body length:", body.length);
    
    // Create Stripe instance
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    let event;
    try {
      // Verify the event with Stripe signature
      event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
      console.log("Webhook event verified and received:", event.type);
    } catch (err) {
      console.error(`Invalid webhook signature: ${err.message}`);
      return new Response(
        JSON.stringify({ error: "Signature webhook invalide", details: err.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Supabase configuration
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Supabase configuration missing");
      return new Response(
        JSON.stringify({ error: "Configuration de la base de données manquante" }),
        { 
          status: 503, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Creating Supabase client with service role key");
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Only process completed checkout sessions to avoid duplicate transactions
    if (event.type === 'checkout.session.completed') {
      console.log("Processing checkout.session.completed event");
      
      // Log the event data
      console.log("Event data:", JSON.stringify(event.data.object, null, 2));
      
      const result = await handlePaymentEvent(event.data.object, supabase);

      if (!result.success) {
        console.error("Error handling payment event:", result.error);
        return new Response(
          JSON.stringify({ error: result.error }),
          { 
            status: 422, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      console.log("Payment event processed successfully");
    }
    
    // Log the event in the webhook_events table for debugging
    await logWebhookEvent(supabase, event);

    // Return a success response to Stripe
    return new Response(
      JSON.stringify({ received: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Webhook error:", error);
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

// Function to process payment events
async function handlePaymentEvent(paymentData, supabase) {
  try {
    console.log("Handling payment event:", paymentData.id);
    
    const userId = paymentData.metadata?.userId;
    if (!userId) {
      console.error("Missing user ID in payment metadata");
      return { success: false, error: "ID utilisateur manquant" };
    }

    let amount = 0;
    if (paymentData.amount_total) {
      amount = paymentData.amount_total / 100;
    } else if (paymentData.amount) {
      amount = paymentData.amount / 100;
    } else {
      console.error("Invalid amount in payment data");
      return { success: false, error: "Montant invalide" };
    }

    console.log(`Recording transaction: ${amount} EUR for user ${userId}`);
    const { error } = await supabase.from("transactions").insert({
      user_id: userId,
      amount: amount,
      currency: paymentData.currency || "eur",
      status: "completed",
      payment_id: paymentData.payment_intent || paymentData.id,
      payment_method: "stripe"
    });

    if (error) {
      console.error("Error recording transaction:", error);
      return { success: false, error: "Erreur d'enregistrement de la transaction" };
    }

    console.log("Transaction recorded successfully");
    return { success: true };
  } catch (error) {
    console.error("Error processing payment:", error);
    return { success: false, error: "Erreur de traitement du paiement" };
  }
}

// Function to log webhook events for debugging
async function logWebhookEvent(supabase, event) {
  try {
    console.log(`Logging webhook event: ${event.type}`);
    const { error } = await supabase.from("webhook_events").insert({
      event_type: event.type,
      event_data: event.data.object,
      raw_payload: event,
      processed: true
    });
    
    if (error) {
      console.warn("Could not log webhook event:", error.message);
    } else {
      console.log("Webhook event logged successfully");
    }
  } catch (err) {
    console.warn("Error logging webhook event:", err.message);
  }
}
