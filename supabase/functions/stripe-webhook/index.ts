
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
    
    // Get the request body
    const body = await req.text();
    console.log("Received webhook body length:", body.length);
    
    // Parse the body as JSON
    let event;
    try {
      // Simply parse the event without verification
      event = JSON.parse(body);
      console.log("Webhook event parsed:", event.type);
    } catch (err) {
      console.error(`Error parsing webhook payload: ${err.message}`);
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload", details: err.message }),
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
    
    // Process various payment-related events
    let paymentData = null;
    
    // Log the event in the webhook_events table for debugging
    await logWebhookEvent(supabase, event);
    
    // Process checkout session completion
    if (event.type === 'checkout.session.completed') {
      console.log("Processing checkout.session.completed event");
      paymentData = event.data.object;
    } 
    // Process charge succeeded event
    else if (event.type === 'charge.succeeded') {
      console.log("Processing charge.succeeded event");
      paymentData = event.data.object;
    }
    // Process payment intent succeeded
    else if (event.type === 'payment_intent.succeeded') {
      console.log("Processing payment_intent.succeeded event");
      paymentData = event.data.object;
    }
    
    // If we have payment data, process it
    if (paymentData) {
      console.log("Payment data found:", JSON.stringify(paymentData, null, 2));
      
      // Extract customer email
      let email = null;
      if (paymentData.customer_details && paymentData.customer_details.email) {
        email = paymentData.customer_details.email;
      } else if (paymentData.receipt_email) {
        email = paymentData.receipt_email;
      } else if (paymentData.billing_details && paymentData.billing_details.email) {
        email = paymentData.billing_details.email;
      }
      
      console.log("Customer email:", email);
      
      // Extract amount
      let amount = 0;
      if (paymentData.amount_total) {
        amount = paymentData.amount_total / 100;
      } else if (paymentData.amount) {
        amount = paymentData.amount / 100;
      }
      
      console.log("Payment amount:", amount);
      
      // Get user ID from metadata if available
      let userId = null;
      if (paymentData.metadata && paymentData.metadata.userId) {
        userId = paymentData.metadata.userId;
      }
      
      console.log("User ID from metadata:", userId);
      
      // If we have an email but no user ID, try to find the user by email
      if (email && !userId) {
        console.log("Trying to find user by email:", email);
        const { data: users, error } = await supabase.auth.admin.listUsers();
        
        if (!error && users) {
          const matchingUser = users.users.find(user => user.email === email);
          if (matchingUser) {
            userId = matchingUser.id;
            console.log("Found user ID by email:", userId);
          }
        } else {
          console.error("Error finding user by email:", error);
        }
      }
      
      // If we still don't have a user ID, generate a default one
      if (!userId) {
        // If we couldn't find a user ID, use a default one for anonymous transactions
        userId = "00000000-0000-0000-0000-000000000000";
        console.log("Using default user ID for transaction");
      }
      
      // Record the transaction
      if (amount > 0) {
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
          return new Response(
            JSON.stringify({ error: "Erreur d'enregistrement de la transaction", details: error.message }),
            { 
              status: 500, 
              headers: { ...corsHeaders, "Content-Type": "application/json" } 
            }
          );
        }
        
        console.log("Transaction recorded successfully");
      } else {
        console.warn("Invalid amount, transaction not recorded");
      }
    } else {
      console.log("No payment data found in the event or unsupported event type");
    }
    
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
