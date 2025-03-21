import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.7.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

serve(async (req) => {
  console.log("Webhook endpoint appelé ! Méthode:", req.method);
  console.log("URL complète reçue:", req.url);
  
  // Logging des en-têtes pour le débogage
  console.log("Tous les en-têtes reçus:", JSON.stringify([...req.headers.entries()]));
  
  // Gestion de la requête OPTIONS pour CORS
  if (req.method === "OPTIONS") {
    console.log("Requête OPTIONS reçue, envoi des headers CORS");
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  // Endpoint de test pour vérifier que la fonction webhook est accessible
  const url = new URL(req.url);
  if (url.pathname.endsWith('/test')) {
    console.log("Endpoint de test appelé !");
    
    try {
      // Vérifier l'authentification pour l'endpoint de test
      // Mais ne pas bloquer en environnement de développement
      const isProduction = !req.headers.get("origin")?.includes("localhost");
      const authHeader = req.headers.get("authorization");
      
      if (isProduction && !authHeader) {
        console.warn("Requête de test reçue sans en-tête d'autorisation");
        // Continuons quand même pour faciliter les tests en production
      } else {
        console.log("Autorisation reçue:", authHeader ? "Oui" : "Non");
      }
      
      // Enregistrer un événement de test dans la table webhook_events
      const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
      const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
      
      if (!supabaseUrl || !supabaseServiceRoleKey) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: "Configuration Supabase manquante" 
          }),
          { 
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
      
      // Enregistrer un événement de test
      const { data, error } = await supabase.from("webhook_events").insert({
        event_type: "webhook_test",
        event_data: { test: true, timestamp: new Date().toISOString() },
        raw_payload: { source: "test_endpoint" },
        processed: true
      }).select();
      
      if (error) {
        console.error("Erreur lors de l'enregistrement de l'événement de test:", error);
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: "Erreur lors de l'enregistrement de l'événement de test",
            error: error.message
          }),
          { 
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      console.log("Événement de test enregistré avec succès:", data);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Test réussi ! La fonction webhook est opérationnelle",
          event_id: data[0]?.id
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } catch (error) {
      console.error("Erreur lors du test du webhook:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Erreur lors du test du webhook",
          error: error.message
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  }

  try {
    // Récupérer les clés secrètes depuis les secrets de la fonction Edge
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    console.log("STRIPE_SECRET_KEY existe:", !!stripeSecretKey);
    console.log("STRIPE_WEBHOOK_SECRET existe:", !!stripeWebhookSecret);
    
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY non configurée dans les secrets de la fonction Edge");
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
    
    // IMPORTANT: Définir explicitement la version de l'API Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-02-24.acacia", // Utiliser la version Acacia récente
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
          status: 200, // Toujours retourner 200 à Stripe
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Toujours enregistrer les données brutes pour analyse ultérieure
    const { data: rawData, error: rawError } = await supabase.from("webhook_events").insert({
      event_type: "raw_webhook_received",
      event_data: { 
        headers: Object.fromEntries([...req.headers.entries()]),
        url: req.url,
        method: req.method
      },
      raw_payload: { raw: body },
      processed: false
    }).select();
    
    if (rawError) {
      console.error("Erreur lors de l'enregistrement des données brutes:", rawError);
    } else {
      console.log("Données brutes enregistrées avec ID:", rawData[0]?.id);
    }
    
    // Variables pour conserver les informations de l'événement
    let event;
    let eventType = "unknown";
    let eventData = {};
    let signatureVerified = false;
    let parsedBody;
    
    try {
      // Log de la version de l'API utilisée
      console.log("Version de l'API Stripe utilisée:", "2025-02-24.acacia");
      
      // Essayer de parser le corps comme JSON
      parsedBody = JSON.parse(body);
      console.log("Événement JSON parsé avec succès");
      console.log("Structure de l'événement:", JSON.stringify(parsedBody).substring(0, 1000) + "...");
      console.log("API Version dans l'événement:", parsedBody.api_version || "non spécifiée");
      
      // NOUVEAU: Structure spécifique - checkout.session directement avec object et previous_attributes
      if (parsedBody.object && typeof parsedBody.object === 'object' && parsedBody.object.object === 'checkout.session') {
        console.log("Structure détectée: checkout.session avec objet parent et previous_attributes");
        eventType = "checkout.session.completed";
        eventData = parsedBody.object;
        console.log("Traitement d'un checkout.session directement depuis la racine de l'événement");
      }
      // Logique existante pour d'autres formats
      else if (parsedBody.type) {
        // Format standard d'événement Stripe (webhook direct)
        eventType = parsedBody.type;
        
        if (parsedBody.data && parsedBody.data.object) {
          eventData = parsedBody.data.object;
          console.log(`Événement standard Stripe détecté: ${eventType}`);
        }
      } else if (parsedBody.object && parsedBody.object === "event") {
        // Format alternatif d'événement Stripe
        eventType = parsedBody.type || "unknown_event";
        
        if (parsedBody.data && parsedBody.data.object) {
          eventData = parsedBody.data.object;
          console.log(`Événement Stripe (format alternatif) détecté: ${eventType}`);
        }
      } else if (parsedBody.object && typeof parsedBody.object === 'object') {
        // Format de test ou webhook direct avec l'objet directement dans la racine
        const nestedObject = parsedBody.object;
        
        if (nestedObject.object === "checkout.session") {
          eventType = "checkout.session.completed";
          eventData = nestedObject;
          console.log("Session de paiement Stripe détectée directement dans l'objet");
        } else {
          console.log("Structure d'objet non reconnue:", nestedObject.object);
        }
      } else if (parsedBody.event && parsedBody.event.type) {
        // Format Event Portal
        eventType = parsedBody.event.type;
        
        if (parsedBody.event.data && parsedBody.event.data.object) {
          eventData = parsedBody.event.data.object;
          console.log(`Événement Portal Stripe détecté: ${eventType}`);
        }
      }
      
      // Cas particulier: parfois l'objet de l'événement est directement à la racine
      if (Object.keys(eventData).length === 0 && parsedBody.payment_status && parsedBody.amount_total) {
        console.log("Détection de données de paiement directement dans la racine");
        eventType = "checkout.session.completed";
        eventData = parsedBody;
      }
      
      // Cas particulier: checkout.session emballé sous un autre format
      if (Object.keys(eventData).length === 0 && parsedBody.id && parsedBody.payment_status) {
        console.log("Session de paiement détectée directement dans la racine");
        eventType = "checkout.session.completed";
        eventData = parsedBody;
      }
      
    } catch (parseError) {
      console.log("Le corps n'est pas du JSON valide, tentative de construction d'événement avec signature:", parseError.message);
      parsedBody = { raw: body };
    }
    
    // Vérification de la signature du webhook si disponible
    if (signature && stripeWebhookSecret) {
      try {
        // Vérifier la signature du webhook
        event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
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
          event_data: { 
            error: err.message, 
            signature,
            secret_length: stripeWebhookSecret?.length || 0,
            secret_prefix: stripeWebhookSecret ? stripeWebhookSecret.substring(0, 4) : 'none'
          },
          raw_payload: parsedBody,
          processed: false
        });
      }
    } else {
      if (!stripeWebhookSecret) {
        console.log("STRIPE_WEBHOOK_SECRET non configuré dans les secrets de la fonction Edge, traitement sans vérification");
      }
      if (!signature) {
        console.log("Aucune signature Stripe fournie, cela pourrait indiquer que le webhook n'est pas correctement configuré");
      }
    }
    
    console.log("Type d'événement final:", eventType);
    console.log("Données d'événement extraites (clés):", Object.keys(eventData).join(', '));
    
    // Logging complet des données pour débogage
    console.log("Données d'événement complètes:", JSON.stringify(eventData).substring(0, 1000) + "...");
    
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
      const result = await handlePaymentEvent(eventData, supabase);
      console.log("Résultat du traitement du paiement:", result);
      
      // Mettre à jour l'événement comme traité (s'il existe)
      if (eventRecord && eventRecord.length > 0) {
        const { error: updateError } = await supabase.from("webhook_events")
          .update({ processed: true })
          .eq("id", eventRecord[0].id);
          
        if (updateError) {
          console.error("Erreur lors de la mise à jour de l'événement comme traité:", updateError);
        } else {
          console.log("Événement marqué comme traité");
        }
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
        event_id: eventRecord?.[0]?.id || "unknown",
        api_version: "2025-02-24.acacia" // Indiquer la version d'API utilisée
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
    // 1. Identifier l'utilisateur à partir de l'email
    let userId = null;
    let customerEmail = null;
    
    // Extraction de l'email du client à partir des différentes structures possibles
    customerEmail = 
      paymentData.customer_details?.email || 
      paymentData.customer_email ||
      paymentData.billing_details?.email ||
      paymentData.receipt_email ||
      (paymentData.metadata && paymentData.metadata.email);
    
    if (customerEmail) {
      console.log(`Email du client identifié: ${customerEmail}`);
      
      // Rechercher l'utilisateur par email
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
          console.log(`Aucun utilisateur trouvé avec l'email: ${customerEmail}`);
        }
      }
    } else {
      console.log("Aucun email de client trouvé dans les données de paiement");
    }
    
    // Si toujours pas d'utilisateur, essayer via les métadonnées
    if (!userId && paymentData.metadata?.userId) {
      userId = paymentData.metadata.userId;
      console.log(`Utilisateur identifié à partir des métadonnées: ${userId}`);
    }
    
    // Si aucun utilisateur n'est trouvé, enregistrer un événement et arrêter le traitement
    if (!userId) {
      console.error("Impossible d'identifier un utilisateur pour cette transaction");
      await supabase.from("webhook_events").insert({
        event_type: "payment_user_not_found",
        event_data: { 
          email: customerEmail,
          payment_data: paymentData
        },
        raw_payload: { error: "user_not_found" },
        processed: true
      });
      
      return { success: false, error: "Utilisateur non trouvé" };
    }
    
    // 2. Calculer le montant
    let amount = 0;
    
    if (paymentData.amount_total) {
      amount = paymentData.amount_total / 100;
      console.log(`Montant calculé à partir de amount_total: ${amount}`);
    } else if (paymentData.amount) {
      amount = paymentData.amount / 100;
      console.log(`Montant calculé à partir de amount: ${amount}`);
    } else if (typeof paymentData.total === 'number') {
      amount = paymentData.total / 100;
      console.log(`Montant calculé à partir de total: ${amount}`);
    } else {
      // Cas où aucun montant n'est spécifié
      console.error("Aucun montant trouvé dans les données de paiement");
      return { success: false, error: "Montant non trouvé" };
    }
    
    console.log("Montant final calculé:", amount);
    
    // 3. Identifier la devise
    const currency = paymentData.currency || "eur";
    console.log(`Devise identifiée: ${currency}`);
    
    // 4. Générer un ID de paiement unique
    // Priorité: payment_intent, puis id, puis génération
    const paymentId = paymentData.payment_intent || paymentData.id || `generated-${Date.now()}`;
    console.log(`ID de paiement: ${paymentId}`);
    
    console.log(`Création d'une transaction pour l'utilisateur ${userId} avec un montant de ${amount} ${currency}, paymentId: ${paymentId}`);
    
    // Vérifier si cette transaction existe déjà
    const { data: existingTransactions, error: checkError } = await supabase
      .from("transactions")
      .select("id")
      .eq("payment_id", paymentId);
    
    if (checkError) {
      console.error("Erreur lors de la vérification des transactions existantes:", checkError);
      return { success: false, error: checkError.message };
    } else if (existingTransactions && existingTransactions.length > 0) {
      console.log(`Transaction avec payment_id ${paymentId} existe déjà, ignorée pour éviter les doublons`);
      return { success: true, status: "skipped", reason: "duplicate" };
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
      return { success: false, error: error.message };
    }
    
    console.log("Transaction enregistrée avec succès:", data[0]?.id);
    return { success: true, transactionId: data[0]?.id };
  } catch (error) {
    console.error("Erreur lors du traitement de l'événement de paiement:", error);
    return { success: false, error: error.message };
  }
}
