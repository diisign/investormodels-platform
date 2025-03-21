
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

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
    // Établir une connexion à Supabase avec la clé service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error("Variables d'environnement Supabase manquantes");
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Récupérer les événements webhook récents
    const { data: webhookEvents, error: webhookError } = await supabase
      .from("webhook_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    
    if (webhookError) {
      console.error("Erreur lors de la récupération des événements webhook:", webhookError);
      throw webhookError;
    }
    
    // Récupérer les transactions récentes
    const { data: transactions, error: transactionsError } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(15);
    
    if (transactionsError) {
      console.error("Erreur lors de la récupération des transactions:", transactionsError);
      throw transactionsError;
    }
    
    // Créer des logs pour affichage
    const recentLogs = [];
    
    // Ajouter des informations système
    recentLogs.push(`[${new Date().toISOString()}] Vérification de la configuration du webhook Stripe...`);
    recentLogs.push(`[${new Date().toISOString()}] URL du webhook: https://pzqsgvyprttfcpyofgnt.supabase.co/functions/v1/stripe-webhook`);
    
    // Vérifier le secret du webhook
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (webhookSecret) {
      recentLogs.push(`[${new Date().toISOString()}] Secret du webhook Stripe configuré: ${webhookSecret.substring(0, 4)}...${webhookSecret.substring(webhookSecret.length - 4)}`);
    } else {
      recentLogs.push(`[${new Date().toISOString()}] ⚠️ ATTENTION: Secret du webhook Stripe non configuré!`);
      recentLogs.push(`[${new Date().toISOString()}] Ajoutez STRIPE_WEBHOOK_SECRET aux secrets de la fonction Edge`);
    }
    
    // Ajouter des informations sur les événements webhook
    if (webhookEvents && webhookEvents.length > 0) {
      recentLogs.push(`[${new Date().toISOString()}] ${webhookEvents.length} événements webhook trouvés dans la base de données`);
      
      for (const event of webhookEvents) {
        const date = new Date(event.created_at).toISOString();
        recentLogs.push(`[${date}] Webhook Event: ${event.event_type}, ID: ${event.id.substring(0, 8)}..., Traité: ${event.processed ? 'Oui' : 'Non'}`);
        
        // Ajouter plus de détails sur l'événement
        if (event.event_data) {
          const eventDetails = typeof event.event_data === 'string' ? JSON.parse(event.event_data) : event.event_data;
          if (eventDetails.id) {
            recentLogs.push(`    - ID de l'objet: ${eventDetails.id}`);
          }
          if (eventDetails.status) {
            recentLogs.push(`    - Statut: ${eventDetails.status}`);
          }
          if (eventDetails.amount) {
            recentLogs.push(`    - Montant: ${eventDetails.amount / 100} ${eventDetails.currency || 'EUR'}`);
          }
          if (eventDetails.customer_details?.email || eventDetails.billing_details?.email) {
            recentLogs.push(`    - Email: ${eventDetails.customer_details?.email || eventDetails.billing_details?.email}`);
          }
          if (eventDetails.payment_status) {
            recentLogs.push(`    - Statut du paiement: ${eventDetails.payment_status}`);
          }
        }
      }
    } else {
      recentLogs.push(`[${new Date().toISOString()}] Aucun événement webhook trouvé dans la base de données`);
    }
    
    // Ajouter des informations sur les transactions existantes
    if (transactions && transactions.length > 0) {
      recentLogs.push(`[${new Date().toISOString()}] ${transactions.length} transactions trouvées dans la base de données`);
      
      for (const tx of transactions) {
        const date = new Date(tx.created_at).toISOString();
        recentLogs.push(`[${date}] Transaction ID: ${tx.id.substring(0, 8)}..., Montant: ${tx.amount} ${tx.currency}, Méthode: ${tx.payment_method}, Statut: ${tx.status}`);
      }
    } else {
      recentLogs.push(`[${new Date().toISOString()}] Aucune transaction trouvée dans la base de données`);
      recentLogs.push(`[${new Date().toISOString()}] Vérifiez que votre webhook Stripe est correctement configuré`);
      recentLogs.push(`[${new Date().toISOString()}] Assurez-vous d'avoir configuré le secret du webhook dans les variables d'environnement de la fonction (STRIPE_WEBHOOK_SECRET)`);
    }
    
    // Ajouter des instructions de débogage
    recentLogs.push(`[${new Date().toISOString()}] Pour vérifier les logs du webhook en temps réel:`);
    recentLogs.push(`[${new Date().toISOString()}] - Ouvrez Edge Function logs dans Supabase pour la fonction stripe-webhook`);
    recentLogs.push(`[${new Date().toISOString()}] - Visitez la page /webhook-debug dans votre application`);
    
    return new Response(
      JSON.stringify({
        logs: recentLogs,
        webhookEvents: webhookEvents || [],
        transactions: transactions || [],
        message: "Logs et transactions récupérés avec succès"
      }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
    
  } catch (error) {
    console.error("Erreur lors de la récupération des logs:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: "Erreur lors de la récupération des logs du webhook"
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
