
import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@16.8.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

// Headers CORS pour permettre les requêtes depuis n'importe quelle origine
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  // Gestion des requêtes OPTIONS (CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Récupération du corps de la requête
    const body = await req.text();
    
    if (body.length === 0) {
      console.error("Corps de la requête vide");
      return new Response(
        JSON.stringify({ error: "Corps de la requête vide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Parsing du corps en JSON
    const event = JSON.parse(body);
    console.log("Type d'événement:", event.type);
    
    // Initialisation du client Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Configuration Supabase manquante");
      return new Response(
        JSON.stringify({ error: "Configuration de la base de données manquante" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Traitement des événements de paiement réussi
    if (event.type === 'checkout.session.completed' || 
        event.type === 'charge.succeeded' || 
        event.type === 'payment_intent.succeeded') {
      
      const paymentData = event.data.object;
      console.log("Données de paiement:", JSON.stringify(paymentData));
      
      // Extraction de l'email de l'utilisateur
      let email = null;
      if (paymentData.customer_details && paymentData.customer_details.email) {
        email = paymentData.customer_details.email;
      } else if (paymentData.receipt_email) {
        email = paymentData.receipt_email;
      } else if (paymentData.billing_details && paymentData.billing_details.email) {
        email = paymentData.billing_details.email;
      }
      
      // Extraction du montant
      let amount = 0;
      if (paymentData.amount_total) {
        amount = paymentData.amount_total / 100;
      } else if (paymentData.amount) {
        amount = paymentData.amount / 100;
      }
      
      // Récupération de l'ID utilisateur
      let userId = null;
      
      // Si metadata.userId est présent, on l'utilise directement
      if (paymentData.metadata && paymentData.metadata.userId) {
        userId = paymentData.metadata.userId;
        console.log("ID utilisateur trouvé dans les métadonnées:", userId);
      } 
      // Sinon, on cherche l'utilisateur par email
      else if (email) {
        console.log("Recherche de l'utilisateur par email:", email);
        const { data: users, error } = await supabase.auth.admin.listUsers();
        
        if (!error && users) {
          const matchingUser = users.users.find(user => user.email === email);
          if (matchingUser) {
            userId = matchingUser.id;
            console.log("ID utilisateur trouvé par email:", userId);
          }
        }
      }
      
      // Si on n'a pas trouvé d'utilisateur, on utilise un ID anonyme
      if (!userId) {
        userId = "00000000-0000-0000-0000-000000000000";
        console.log("Utilisation d'un ID anonyme pour la transaction");
      }
      
      // Enregistrement de la transaction si le montant est valide
      if (amount > 0) {
        console.log(`Enregistrement de la transaction: ${amount} EUR pour l'utilisateur ${userId}`);
        
        const { data: transactionData, error: transactionError } = await supabase.from("transactions").insert({
          user_id: userId,
          amount: amount,
          currency: paymentData.currency || "eur",
          status: "completed",
          payment_id: paymentData.payment_intent || paymentData.id,
          payment_method: "stripe"
        }).select();

        if (transactionError) {
          console.error("Erreur d'enregistrement de la transaction:", transactionError);
          throw new Error(`Erreur d'enregistrement de la transaction: ${transactionError.message}`);
        }
        
        console.log("Transaction enregistrée avec succès:", transactionData);
      }
    }
    
    // Réponse de succès à Stripe
    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erreur webhook:", error);
    return new Response(
      JSON.stringify({ 
        error: "Erreur interne du serveur", 
        details: error instanceof Error ? error.message : "Erreur inconnue" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
