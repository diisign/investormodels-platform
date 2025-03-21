
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
        JSON.stringify({ 
          received: true, 
          error: "Configuration Stripe manquante",
          status: "error" 
        }),
        { 
          status: 200, // Toujours renvoyer 200 à Stripe pour éviter les réessais
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });
    
    // Récupérer les données brutes du corps de la requête
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    
    console.log("URL complète reçue:", req.url);
    console.log("Headers reçus:", JSON.stringify([...req.headers.entries()]));
    console.log("Signature Stripe reçue:", signature);
    console.log("Payload reçu (tronqué):", body.substring(0, 500) + (body.length > 500 ? "..." : ""));
    
    // Établir une connexion à Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Variables d'environnement Supabase manquantes");
      return new Response(
        JSON.stringify({ 
          received: true, 
          error: "Configuration Supabase manquante",
          status: "error" 
        }),
        { 
          status: 200, // Toujours renvoyer 200 à Stripe
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Variables pour conserver les informations de l'événement
    let event;
    let eventType = "unknown";
    let eventData = {};
    let signatureVerified = false;
    let parsedBody;
    
    try {
      // Tenter de parser le corps comme JSON
      parsedBody = JSON.parse(body);
      console.log("Événement JSON parsé avec succès");
      
      // Structure principale de l'événement
      if (parsedBody.type) {
        // Format standard d'événement Stripe
        eventType = parsedBody.type;
        console.log(`Type d'événement depuis JSON: ${eventType}`);
        
        if (parsedBody.data && parsedBody.data.object) {
          eventData = parsedBody.data.object;
        }
      } else if (parsedBody.object && parsedBody.object.object === "checkout.session") {
        // Format alternatif où l'objet est directement dans la propriété "object"
        eventType = "checkout.session.completed";
        eventData = parsedBody.object;
      } else if (parsedBody.event_type && parsedBody.event_data) {
        // Format alternatif possible
        eventType = parsedBody.event_type;
        eventData = parsedBody.event_data;
      }
      
      // Si nous avons toujours des données vides mais une structure nested 
      if (Object.keys(eventData).length === 0 && parsedBody.object) {
        const nestedObject = parsedBody.object;
        
        if (typeof nestedObject === 'object') {
          if (nestedObject.object === "checkout.session") {
            eventType = "checkout.session.completed";
            eventData = nestedObject;
            console.log("Données extraites de structure nested:", Object.keys(eventData).join(', '));
          }
        }
      }
    } catch (parseError) {
      console.log("Le corps n'est pas du JSON valide, tentative de construction d'événement avec signature:", parseError.message);
      parsedBody = { raw: body };
    }
    
    // IMPORTANT: Vérification de la signature si disponible
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (signature && webhookSecret) {
      try {
        // Vérifier la signature du webhook
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        console.log("Événement Stripe vérifié avec succès:", event.type);
        eventType = event.type;
        
        // Extraire les données selon la structure de l'événement vérifié
        if (event.data && event.data.object) {
          eventData = event.data.object;
        }
        
        signatureVerified = true;
      } catch (err) {
        console.error(`⚠️ Échec de la vérification de la signature webhook: ${err.message}`);
        
        // Enregistrer l'erreur mais continuer le traitement avec les données parsées
        await supabase.from("webhook_events").insert({
          event_type: "signature_verification_failed",
          event_data: { error: err.message, signature },
          raw_payload: parsedBody,
          processed: false
        });
      }
    } else {
      if (!webhookSecret) {
        console.log("STRIPE_WEBHOOK_SECRET non configuré, traitement sans vérification");
      }
      if (!signature) {
        console.log("Aucune signature Stripe fournie");
      }
    }
    
    console.log("Type d'événement final:", eventType);
    console.log("Données d'événement extraites (clés):", Object.keys(eventData).join(', '));
    
    // Enregistrer l'événement reçu dans la table webhook_events pour référence
    const { data: eventRecord, error: eventError } = await supabase.from("webhook_events").insert({
      event_type: eventType,
      event_data: eventData,
      raw_payload: parsedBody,
      processed: false
    }).select();
    
    if (eventError) {
      console.error("Erreur lors de l'enregistrement de l'événement webhook:", eventError);
    } else {
      console.log("Événement webhook enregistré:", eventRecord[0]?.id);
    }
    
    // Si nous avons des données d'événement valides, traiter le paiement
    if (Object.keys(eventData).length > 0) {
      console.log("Traitement du paiement avec les données extraites");
      await handlePaymentEvent(eventData, supabase);
      
      // Mettre à jour l'événement comme traité (s'il existe)
      if (eventRecord && eventRecord.length > 0) {
        await supabase.from("webhook_events")
          .update({ processed: true })
          .eq("id", eventRecord[0].id);
      }
    } else {
      console.error("Aucune donnée d'événement valide extraite pour traitement");
    }
    
    // Toujours retourner un succès à Stripe, même si nous avons eu des problèmes
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

// Fonction pour traiter les événements de paiement
async function handlePaymentEvent(paymentData, supabase) {
  console.log("Traitement de l'événement de paiement:", JSON.stringify(paymentData).substring(0, 500) + "...");
  
  try {
    // 1. Identifier l'utilisateur
    let userId = null;
    
    // Essayer de trouver l'ID utilisateur dans les métadonnées
    if (paymentData.metadata?.userId) {
      userId = paymentData.metadata.userId;
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
      console.log("Aucun montant trouvé, utilisation du montant par défaut:", amount);
    }
    
    console.log("Montant calculé:", amount);
    
    // 3. Identifier la devise
    const currency = paymentData.currency || "eur";
    
    // 4. Générer un ID de paiement unique
    const paymentId = paymentData.id || paymentData.payment_intent || `generated-${Date.now()}`;
    
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
    
    console.log("Transaction enregistrée avec succès:", data[0]?.id);
  } catch (error) {
    console.error("Erreur lors du traitement de l'événement de paiement:", error);
  }
}
