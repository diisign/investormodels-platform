
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
      apiVersion: "2023-10-16", // Mise à jour de la version de l'API pour correspondre à celle utilisée par create-payment
    });
    
    // Récupérer les données brutes du corps de la requête
    const body = await req.text();
    console.log("URL complète reçue:", req.url);
    console.log("Headers reçus:", JSON.stringify([...req.headers.entries()]));
    console.log("Payload reçu:", body.substring(0, 500) + (body.length > 500 ? "..." : ""));
    
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
    let event;
    
    if (!signature) {
      console.log("Aucune signature Stripe trouvée - traitement comme donnée de test");
      try {
        // Pour les tests ou les requêtes directes, analyser le corps directement
        const data = JSON.parse(body);
        console.log("Données reçues:", JSON.stringify(data).substring(0, 500) + "...");
        
        if (data.type === "checkout.session.completed" || data.object?.mode === "payment") {
          // Traiter comme un événement de session checkout
          console.log("Traitement d'un événement checkout.session.completed de test");
          const session = data.object || data.data?.object;
          
          if (session) {
            await handlePaymentEvent(session, supabase);
            return new Response(
              JSON.stringify({ received: true, processed_as: "test_payment" }),
              { headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
        } else if (data.type === "payment_intent.succeeded" || data.object?.object === "payment_intent") {
          // Traiter comme un événement de paiement réussi
          console.log("Traitement d'un événement payment_intent.succeeded de test");
          const paymentIntent = data.object || data.data?.object;
          
          if (paymentIntent) {
            await handlePaymentEvent(paymentIntent, supabase);
            return new Response(
              JSON.stringify({ received: true, processed_as: "test_payment_intent" }),
              { headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
        } else {
          // Pour les tests manuels, essayer de trouver des informations de transaction
          console.log("Type d'événement non reconnu, tentative de traitement générique");
          await handleGenericPayload(data, supabase);
        }
      } catch (err) {
        console.error("Erreur lors du traitement des données sans signature:", err);
      }
      
      return new Response(
        JSON.stringify({ received: true, warning: "Processed without Stripe signature verification" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Vérifier la signature Stripe si présente
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        console.log("Événement Stripe vérifié:", event.type);
      } catch (err) {
        console.error(`⚠️ Échec de la vérification de la signature webhook: ${err.message}`);
        return new Response(
          JSON.stringify({ error: "Échec de la vérification de la signature" }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    } else {
      console.log("STRIPE_WEBHOOK_SECRET non configuré, traitement sans vérification");
      try {
        event = JSON.parse(body);
      } catch (err) {
        console.error("Erreur lors de l'analyse du corps de la requête:", err);
        return new Response(
          JSON.stringify({ error: "Impossible d'analyser le corps de la requête" }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    }
    
    // À ce stade, nous avons soit un événement Stripe vérifié, soit des données analysées
    console.log("Traitement de l'événement:", event.type || "donnée sans type d'événement");
    
    // Extraction des données de l'événement
    const eventData = event.data?.object || event.object;
    
    if (!eventData) {
      console.error("Données d'événement introuvables");
      return new Response(
        JSON.stringify({ error: "Données d'événement introuvables" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
      );
    }
    
    // Traitement de l'événement selon son type
    if (event.type) {
      switch (event.type) {
        case "checkout.session.completed":
          await handlePaymentEvent(eventData, supabase);
          break;
        case "checkout.session.async_payment_succeeded":
          await handlePaymentEvent(eventData, supabase);
          break;
        case "payment_intent.succeeded":
          await handlePaymentEvent(eventData, supabase);
          break;
        case "charge.succeeded":
          await handlePaymentEvent(eventData, supabase);
          break;
        default:
          console.log(`Événement ${event.type} non géré pour cette démonstration`);
      }
    } else {
      // Si pas de type d'événement, essayer de traiter comme un payload générique
      await handleGenericPayload(eventData, supabase);
    }

    // Réponse de succès
    return new Response(
      JSON.stringify({ received: true, processed: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erreur webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      { 
        status: 500, 
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
      paymentData.receipt_email || 
      paymentData.billing_details?.email;
    
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
  
  // Si aucun utilisateur n'est trouvé, utiliser le premier disponible
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
  
  console.log(`Création d'une transaction pour l'utilisateur ${userId} avec un montant de ${amount} ${currency}`);
  
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
    (data.object && (data.object === "checkout.session" || data.object === "payment_intent"))
  ) {
    await handlePaymentEvent(data, supabase);
  } else if (data.data && data.data.object) {
    // Si l'objet est imbriqué dans data.data.object
    await handlePaymentEvent(data.data.object, supabase);
  } else {
    console.log("Payload non reconnu, aucune action entreprise");
  }
}
