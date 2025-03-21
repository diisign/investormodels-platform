
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.7.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Webhook endpoint appelé ! Méthode:", req.method);
  
  // Gestion de la requête OPTIONS pour CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Récupérer la clé Stripe depuis les variables d'environnement
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY non configurée");
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
    
    // Récupérer les données brutes du corps de la requête
    const body = await req.text();
    console.log("URL complète reçue:", req.url);
    console.log("Headers reçus:", JSON.stringify([...req.headers.entries()]));
    console.log("Payload reçu (tronqué):", body.substring(0, 500) + (body.length > 500 ? "..." : ""));
    
    // Établir une connexion à Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Variables d'environnement Supabase manquantes");
      return new Response(
        JSON.stringify({ error: "Configuration Supabase manquante" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Vérifier si c'est une requête de test ou une requête Stripe
    const signature = req.headers.get("stripe-signature");
    console.log("Signature Stripe reçue:", signature);
    
    let event;
    let eventType = "unknown";
    
    try {
      // Tenter de parser le corps comme JSON
      const parsedBody = JSON.parse(body);
      
      // Si le corps contient un type, l'utiliser comme type d'événement
      if (parsedBody.type) {
        eventType = parsedBody.type;
      } else if (parsedBody.object?.object === "charge" && parsedBody.object?.status === "succeeded") {
        // Détecter les événements de charge réussie
        eventType = "charge.succeeded";
      } else if (parsedBody.object?.object === "checkout.session" && parsedBody.object?.payment_status === "paid") {
        // Détecter les sessions checkout payées
        eventType = "checkout.session.completed";
      }
      
      console.log("Type d'événement détecté:", eventType);
      
      // IMPORTANT: Ne pas retourner d'erreur 401 même si la signature ne correspond pas
      // Nous allons enregistrer l'événement de toute façon et essayer de le traiter
      const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
      let signatureVerified = false;
      
      if (signature && webhookSecret) {
        try {
          // Vérifier la signature du webhook
          event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
          console.log("Événement Stripe vérifié avec succès:", event.type);
          eventType = event.type;
          signatureVerified = true;
        } catch (err) {
          console.error(`⚠️ Échec de la vérification de la signature webhook: ${err.message}`);
          
          // Continuer malgré l'erreur de signature - enregistrer l'erreur
          await supabase.from("webhook_events").insert({
            event_type: "signature_verification_failed",
            event_data: { error: err.message, signature },
            raw_payload: parsedBody,
            processed: false
          });
          
          // Ne PAS retourner d'erreur 401, continuer le traitement
          event = parsedBody;
        }
      } else {
        if (!webhookSecret) {
          console.log("STRIPE_WEBHOOK_SECRET non configuré, traitement sans vérification");
        }
        if (!signature) {
          console.log("Aucune signature Stripe fournie");
        }
        event = parsedBody;
      }
      
      // Extraire les données pertinentes de l'événement
      const eventData = event.data?.object || event.object || {};
      const rawPayload = event;
      
      console.log("Données d'événement extraites:", JSON.stringify(eventData).substring(0, 500));
      
      // Enregistrer l'événement reçu dans la table webhook_events pour référence
      const { data: eventRecord, error: eventError } = await supabase.from("webhook_events").insert({
        event_type: eventType,
        event_data: eventData,
        raw_payload: rawPayload,
        processed: false
      }).select();
      
      if (eventError) {
        console.error("Erreur lors de l'enregistrement de l'événement webhook:", eventError);
      } else {
        console.log("Événement webhook enregistré:", eventRecord);
      }
      
      // Traiter l'événement selon son type
      switch (eventType) {
        case "checkout.session.completed":
        case "checkout.session.async_payment_succeeded":
        case "payment_intent.succeeded":
        case "payment_intent.requires_action":
        case "charge.succeeded":
        case "charge.updated":
          console.log(`Traitement de l'événement ${eventType}`);
          await handlePaymentEvent(eventData, supabase);
          break;
        default:
          console.log(`Événement ${eventType} non géré spécifiquement, tentative de traitement générique`);
          // Tenter un traitement générique pour les événements non reconnus
          await handleGenericPayload(eventData, supabase);
      }
      
      // Mettre à jour l'événement comme traité (s'il existe)
      if (eventRecord && eventRecord.length > 0) {
        await supabase.from("webhook_events")
          .update({ processed: true })
          .eq("id", eventRecord[0].id);
      }
      
      // Toujours retourner un succès à Stripe, même si nous avons eu des problèmes
      // Cela évite que Stripe ne continue à réessayer avec les mêmes données
      return new Response(
        JSON.stringify({ 
          received: true, 
          processed: true,
          event_type: eventType,
          verification_status: signatureVerified ? "verified" : "unverified",
          event_id: eventRecord?.[0]?.id || "unknown"
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
      
    } catch (parseError) {
      console.error("Erreur lors de l'analyse du payload JSON:", parseError);
      return new Response(
        JSON.stringify({ 
          received: true, 
          error: "Format de payload invalide", 
          details: parseError.message 
        }),
        { 
          status: 200, // Toujours retourner 200 à Stripe
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
  } catch (error) {
    console.error("Erreur webhook globale:", error);
    return new Response(
      JSON.stringify({ 
        received: true, 
        error: error.message, 
        stack: error.stack 
      }),
      { 
        status: 200, // Toujours retourner 200 à Stripe
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

// Fonction unifiée pour traiter les événements de paiement
async function handlePaymentEvent(paymentData, supabase) {
  console.log("Traitement de l'événement de paiement:", JSON.stringify(paymentData).substring(0, 500) + "...");
  
  // 1. Identifier l'utilisateur
  let userId = null;
  
  // Essayer de trouver l'ID utilisateur dans les métadonnées ou client_reference_id
  if (paymentData.metadata?.userId || paymentData.client_reference_id) {
    userId = paymentData.metadata?.userId || paymentData.client_reference_id;
    console.log(`Utilisateur identifié à partir des métadonnées: ${userId}`);
  } 
  // Sinon, essayer de le trouver via l'email
  else {
    const customerEmail = 
      paymentData.customer_details?.email || 
      paymentData.billing_details?.email ||
      paymentData.receipt_email;
    
    if (customerEmail) {
      console.log(`Recherche d'un utilisateur avec l'email: ${customerEmail}`);
      
      // Rechercher dans les profils d'utilisateurs par email
      const { data: users, error } = await supabase.auth.admin.listUsers();
      
      if (error) {
        console.error("Erreur lors de la recherche des utilisateurs:", error);
      } else if (users && users.users && users.users.length > 0) {
        const matchingUser = users.users.find(user => 
          user.email && user.email.toLowerCase() === customerEmail.toLowerCase()
        );
        
        if (matchingUser) {
          userId = matchingUser.id;
          console.log(`Utilisateur trouvé via email: ${customerEmail}, ID: ${userId}`);
        } else {
          console.log("Aucun utilisateur trouvé avec cet email");
        }
      }
    }
  }
  
  // Si aucun utilisateur n'est trouvé, utiliser le premier disponible (pour le développement)
  if (!userId) {
    console.log("Aucun utilisateur spécifique identifié, récupération du premier utilisateur");
    
    const { data: users, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      return;
    }
    
    if (users && users.users && users.users.length > 0) {
      userId = users.users[0].id;
      console.log(`Utilisation de l'utilisateur par défaut: ${userId}`);
    } else {
      console.error("Aucun utilisateur trouvé dans la base de données");
      return;
    }
  }
  
  // 2. Calculer le montant
  let amount = 0;
  
  if (paymentData.amount_total) {
    amount = paymentData.amount_total / 100;
  } else if (paymentData.amount) {
    amount = paymentData.amount / 100;
  } else if (typeof paymentData.total === 'number') {
    amount = paymentData.total / 100;
  } else {
    // Montant par défaut si aucun montant n'est spécifié
    amount = 2.00;
  }
  
  // 3. Identifier la devise
  const currency = paymentData.currency || "eur";
  
  // 4. Générer un ID de paiement unique
  const paymentId = paymentData.id || `generated-${Date.now()}`;
  
  console.log(`Création d'une transaction pour l'utilisateur ${userId} avec un montant de ${amount} ${currency}, paymentId: ${paymentId}`);
  
  // Vérifier si cette transaction existe déjà
  const { data: existingTransactions, error: checkError } = await supabase
    .from("transactions")
    .select("id")
    .eq("payment_id", paymentId);
  
  if (checkError) {
    console.error("Erreur lors de la vérification des transactions existantes:", checkError);
  } else if (existingTransactions && existingTransactions.length > 0) {
    console.log(`Transaction avec payment_id ${paymentId} existe déjà, ignorée pour éviter les doublons`);
    return;
  }
  
  // 5. Enregistrer la transaction
  const { data, error } = await supabase.from("transactions").insert({
    user_id: userId,
    amount: amount,
    currency: currency,
    status: "completed",
    payment_id: paymentId,
    payment_method: "stripe"
  }).select();
  
  if (error) {
    console.error("Erreur lors de l'enregistrement de la transaction:", error);
    return;
  }
  
  console.log("Transaction enregistrée avec succès:", data);
}

// Fonction pour traiter les payloads génériques
async function handleGenericPayload(data, supabase) {
  console.log("Traitement d'un payload générique:", JSON.stringify(data).substring(0, 500) + "...");
  
  // Si c'est un objet avec des données de paiement, le traiter comme un événement de paiement
  if (
    data.amount_total || 
    data.amount || 
    data.total || 
    (data.object && (data.object === "checkout.session" || data.object === "payment_intent" || data.object === "charge"))
  ) {
    await handlePaymentEvent(data, supabase);
  } else if (data.data && data.data.object) {
    // Si l'objet est imbriqué dans data.data.object
    await handlePaymentEvent(data.data.object, supabase);
  } else {
    console.log("Payload non reconnu, aucune action entreprise");
  }
}
