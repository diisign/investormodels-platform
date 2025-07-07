
import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

// Headers CORS pour permettre les requêtes depuis n'importe quelle origine
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Point d'entrée principal de la fonction
serve(async (req: Request) => {
  // Gestion des requêtes OPTIONS (CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Vérification de la méthode de requête
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: `Méthode ${req.method} non autorisée` }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Récupération du corps de la requête
    const body = await req.text();
    if (!body) {
      return new Response(
        JSON.stringify({ error: "Corps de la requête vide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Parsing du corps en JSON
    const event = JSON.parse(body);
    console.log(`Webhook reçu: ${event.type}`);
    
    // Initialisation du client Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Configuration Supabase manquante");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Enregistrer tous les événements pour traçabilité
    const { data: eventRecord, error: eventError } = await supabase
      .from("webhook_events")
      .insert({
        event_type: event.type,
        event_data: event.data.object,
        raw_payload: event,
        processed: false
      })
      .select()
      .single();
    
    if (eventError) {
      console.error("Erreur d'enregistrement de l'événement:", eventError);
    }

    // Vérifier si c'est un événement de paiement - UNIQUEMENT checkout.session.completed pour éviter les doublons
    if (event.type === 'checkout.session.completed') {
      
      // Vérifier si cet événement a déjà été traité (déduplication)
      if (event.id) {
        const { data: existingEvent } = await supabase
          .from("webhook_events")
          .select("id")
          .eq("event_data->id", event.id)
          .eq("processed", true)
          .maybeSingle();
        
        if (existingEvent) {
          console.log("Événement déjà traité, ID:", event.id);
          return new Response(
            JSON.stringify({ received: true, status: "already_processed" }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
      
      const paymentData = event.data.object;
      
      try {
        // Extraire les informations essentielles du paiement
        let amount = 0;
        if (paymentData.amount_total) {
          amount = paymentData.amount_total / 100;
        } else if (paymentData.amount) {
          amount = paymentData.amount / 100;
        }
        
        // Extraire l'ID utilisateur ou l'email
        let userId = null;
        let email = null;
        
        // Chercher l'ID utilisateur dans les métadonnées
        if (paymentData.metadata && paymentData.metadata.userId) {
          userId = paymentData.metadata.userId;
        }
        
        // Chercher l'email
        if (paymentData.customer_details && paymentData.customer_details.email) {
          email = paymentData.customer_details.email;
        } else if (paymentData.receipt_email) {
          email = paymentData.receipt_email;
        } else if (paymentData.billing_details && paymentData.billing_details.email) {
          email = paymentData.billing_details.email;
        }
        
        // Si on a un email mais pas d'ID utilisateur, chercher l'utilisateur par email
        if (email && !userId) {
          const { data: users } = await supabase.auth.admin.listUsers();
          
          if (users) {
            const matchingUser = users.users.find(user => user.email === email);
            if (matchingUser) {
              userId = matchingUser.id;
            }
          }
        }
        
        // Si toujours pas d'utilisateur, utiliser un ID anonyme
        if (!userId) {
          userId = "00000000-0000-0000-0000-000000000000";
        }
        
        // Vérifier si une transaction avec ce payment_id existe déjà
        const paymentId = paymentData.payment_intent || paymentData.id;
        
        if (paymentId) {
          const { data: existingTransaction } = await supabase
            .from("transactions")
            .select("id")
            .eq("payment_id", paymentId)
            .maybeSingle();
          
          if (existingTransaction) {
            console.log("Transaction déjà enregistrée avec payment_id:", paymentId);
            
            // Marquer l'événement comme traité
            if (eventRecord) {
              await supabase
                .from("webhook_events")
                .update({ processed: true })
                .eq("id", eventRecord.id);
            }
            
            return new Response(
              JSON.stringify({ received: true, status: "transaction_exists" }),
              { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
        }
        
        // Enregistrer la transaction si le montant est valide
        if (amount > 0) {
          console.log(`Enregistrement de la transaction: ${amount} EUR pour l'utilisateur ${userId}`);
          
          const { data: transaction, error: transactionError } = await supabase
            .from("transactions")
            .insert({
              user_id: userId,
              amount: amount,
              currency: paymentData.currency || "eur",
              status: "completed",
              payment_id: paymentId,
              payment_method: "stripe"
            })
            .select();
          
          if (transactionError) {
            throw new Error(`Erreur d'enregistrement: ${transactionError.message}`);
          }
          
          console.log("Transaction enregistrée avec succès:", transaction);
          
          // Vérifier si c'est le premier dépôt d'un utilisateur affilié et s'il dépôt au moins 100€
          if (amount >= 100 && userId !== "00000000-0000-0000-0000-000000000000") {
            // Vérifier s'il existe une affiliation pour cet utilisateur
            const { data: affiliation } = await supabase
              .from("affiliations")
              .select("*")
              .eq("referred_id", userId)
              .eq("status", "pending")
              .maybeSingle();
            
            if (affiliation) {
              console.log("Affiliation trouvée pour l'utilisateur:", userId);
              
              // Vérifier que c'est bien son premier dépôt (pas d'autres transactions)
              const { data: previousTransactions } = await supabase
                .from("transactions")
                .select("id")
                .eq("user_id", userId)
                .neq("id", transaction[0].id); // Exclure la transaction actuelle
              
              if (!previousTransactions || previousTransactions.length === 0) {
                console.log("Premier dépôt détecté, attribution du bonus de 50€");
                
                // Créditer 50€ de bonus
                const { error: bonusError } = await supabase
                  .from("transactions")
                  .insert({
                    user_id: userId,
                    amount: 50,
                    currency: "eur",
                    status: "completed",
                    payment_id: `bonus_${paymentId}`,
                    payment_method: "affiliation_bonus"
                  });
                
                if (bonusError) {
                  console.error("Erreur lors de l'attribution du bonus:", bonusError);
                } else {
                  console.log("Bonus de 50€ attribué avec succès");
                  
                  // Mettre à jour l'affiliation
                  await supabase
                    .from("affiliations")
                    .update({
                      first_investment_amount: amount,
                      first_investment_date: new Date().toISOString(),
                      status: "confirmed"
                    })
                    .eq("id", affiliation.id);
                }
              }
            }
          }
        }
        
        // Marquer l'événement comme traité
        if (eventRecord) {
          await supabase
            .from("webhook_events")
            .update({ processed: true })
            .eq("id", eventRecord.id);
        }
        
      } catch (error) {
        console.error("Erreur de traitement du paiement:", error);
      }
    }
    
    // Réponse immédiate de succès à Stripe
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
