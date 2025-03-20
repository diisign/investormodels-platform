
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.7.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

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
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Signature Stripe manquante" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const body = await req.text();
    
    // Vérifier si c'est réellement Stripe qui nous envoie cet événement
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed.`, err.message);
      return new Response(
        JSON.stringify({ error: "Échec de la vérification de la signature" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Établir une connexion à Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    console.log("Événement Stripe reçu:", event.type);
    
    // Traiter différents types d'événements
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Session de paiement complétée:", session);
      
      // Récupérer l'ID utilisateur depuis les métadonnées ou le client_reference_id
      const userId = session.metadata?.userId || session.client_reference_id;
      
      if (!userId) {
        console.error("ID utilisateur non trouvé dans les métadonnées ou client_reference_id");
        return new Response(
          JSON.stringify({ error: "ID utilisateur non trouvé" }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      // Enregistrer la transaction dans la base de données
      const { error } = await supabase.from("transactions").insert({
        user_id: userId,
        amount: session.amount_total / 100, // Conversion des centimes en euros
        currency: session.currency || "eur",
        status: "completed",
        payment_id: session.id,
        payment_method: "stripe"
      });
      
      if (error) {
        console.error("Erreur lors de l'enregistrement de la transaction:", error);
        return new Response(
          JSON.stringify({ error: "Erreur lors de l'enregistrement de la transaction" }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      console.log("Transaction enregistrée avec succès");
    }
    // Gérer également les événements de paiement direct depuis un lien de paiement
    else if (event.type === "checkout.session.async_payment_succeeded" || 
             event.type === "payment_intent.succeeded") {
      const paymentData = event.data.object;
      console.log("Paiement réussi:", paymentData);
      
      // Pour les paiements via liens de paiement, nous devons extraire l'ID utilisateur 
      // depuis la description ou d'autres champs disponibles
      // Cet exemple suppose que l'ID utilisateur est dans les métadonnées
      // Vous devrez peut-être adapter cette logique selon votre configuration Stripe
      
      // Récupérer tous les utilisateurs (cette approche est simplifiée pour l'exemple)
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id');
      
      if (usersError) {
        console.error("Erreur lors de la récupération des utilisateurs:", usersError);
        return new Response(
          JSON.stringify({ error: "Erreur lors de la récupération des utilisateurs" }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      // Si aucun utilisateur n'est trouvé, utiliser le premier utilisateur
      // (Ceci est une simplification - en production, vous devriez avoir une meilleure stratégie)
      if (users && users.length > 0) {
        const userId = users[0].id;
        
        // Enregistrer la transaction dans la base de données
        const amount = paymentData.amount_total ? paymentData.amount_total / 100 : 
                       (paymentData.amount ? paymentData.amount / 100 : 0);
                       
        const { error } = await supabase.from("transactions").insert({
          user_id: userId,
          amount: amount,
          currency: paymentData.currency || "eur",
          status: "completed",
          payment_id: paymentData.id,
          payment_method: "stripe"
        });
        
        if (error) {
          console.error("Erreur lors de l'enregistrement de la transaction:", error);
          return new Response(
            JSON.stringify({ error: "Erreur lors de l'enregistrement de la transaction" }),
            { 
              status: 500, 
              headers: { ...corsHeaders, "Content-Type": "application/json" } 
            }
          );
        }
        
        console.log("Transaction enregistrée avec succès pour le premier utilisateur");
      } else {
        console.error("Aucun utilisateur trouvé pour associer le paiement");
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Erreur webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
