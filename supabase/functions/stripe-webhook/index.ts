
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
      apiVersion: "2025-02-24",
    });
    
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      console.error("Signature Stripe manquante");
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
    console.log("Données de l'événement:", JSON.stringify(event.data.object));
    
    // Traiter différents types d'événements
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object, supabase);
        break;
      case "checkout.session.async_payment_succeeded":
        await handleAsyncPaymentSucceeded(event.data.object, supabase);
        break;
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object, supabase);
        break;
      case "charge.succeeded":
        await handleChargeSucceeded(event.data.object, supabase);
        break;
      case "charge.failed":
        console.log("Charge échouée:", event.data.object);
        break;
      case "charge.refunded":
        console.log("Charge remboursée:", event.data.object);
        break;
      case "charge.dispute.created":
      case "charge.dispute.closed":
      case "charge.dispute.funds_reinstated":
      case "charge.dispute.funds_withdrawn":
        console.log("Litige de charge:", event.type, event.data.object);
        break;
      case "refund.created":
      case "refund.failed":
      case "refund.updated":
        console.log("Événement de remboursement:", event.type, event.data.object);
        break;
      case "payment_intent.canceled":
      case "payment_intent.payment_failed":
      case "payment_intent.processing":
      case "payment_intent.requires_action":
        console.log("Événement d'intention de paiement:", event.type, event.data.object);
        break;
      case "checkout.session.expired":
      case "checkout.session.async_payment_failed":
        console.log("Événement de session de paiement:", event.type, event.data.object);
        break;
      default:
        console.log(`Événement non géré: ${event.type}`);
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

async function handleCheckoutSessionCompleted(session, supabase) {
  console.log("Session de paiement complétée:", session);
  
  // Récupérer l'ID utilisateur depuis les métadonnées ou le client_reference_id
  const userId = session.metadata?.userId || session.client_reference_id;
  
  if (!userId) {
    console.error("ID utilisateur non trouvé dans les métadonnées ou client_reference_id");
    
    // Chercher l'email dans la session et essayer de trouver l'utilisateur
    const customerEmail = session.customer_details?.email;
    if (customerEmail) {
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customerEmail)
        .maybeSingle();
      
      if (userData?.id) {
        console.log(`Utilisateur trouvé via email: ${customerEmail}, ID: ${userData.id}`);
        return await createTransaction(userData.id, session, supabase);
      } else {
        console.error(`Aucun utilisateur trouvé avec l'email: ${customerEmail}`);
      }
    }
    
    // Si aucun utilisateur n'est identifié, essayons avec le premier utilisateur dans la base (pour le développement)
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (users && users.length > 0) {
      console.log(`Utilisation de l'utilisateur par défaut pour le développement: ${users[0].id}`);
      return await createTransaction(users[0].id, session, supabase);
    }
    
    console.error("Impossible de déterminer l'utilisateur pour la transaction");
    return;
  }
  
  await createTransaction(userId, session, supabase);
}

async function createTransaction(userId, session, supabase) {
  console.log(`Création d'une transaction pour l'utilisateur: ${userId}`);
  
  // Calculer le montant (conversion des centimes en euros ou utilisation directe selon le format)
  const amount = session.amount_total ? session.amount_total / 100 : 
                (session.amount ? session.amount / 100 : 0);
  
  console.log(`Montant de la transaction: ${amount} ${session.currency || "eur"}`);
  
  // Enregistrer la transaction dans la base de données
  const { data, error } = await supabase.from("transactions").insert({
    user_id: userId,
    amount: amount,
    currency: session.currency || "eur",
    status: "completed",
    payment_id: session.id,
    payment_method: "stripe"
  }).select();
  
  if (error) {
    console.error("Erreur lors de l'enregistrement de la transaction:", error);
    return;
  }
  
  console.log("Transaction enregistrée avec succès:", data);
}

async function handleAsyncPaymentSucceeded(paymentData, supabase) {
  console.log("Paiement asynchrone réussi:", paymentData);
  await handleGenericPayment(paymentData, supabase);
}

async function handlePaymentIntentSucceeded(paymentData, supabase) {
  console.log("Intention de paiement réussie:", paymentData);
  await handleGenericPayment(paymentData, supabase);
}

async function handleChargeSucceeded(chargeData, supabase) {
  console.log("Charge réussie:", chargeData);
  
  // Chercher l'email dans les données de la charge
  const customerEmail = chargeData.billing_details?.email || 
                        chargeData.receipt_email ||
                        chargeData.customer_email;
  
  if (customerEmail) {
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', customerEmail)
      .maybeSingle();
    
    if (userData?.id) {
      console.log(`Utilisateur trouvé via email: ${customerEmail}, ID: ${userData.id}`);
      
      // Calculer le montant (conversion des centimes en euros)
      const amount = chargeData.amount ? chargeData.amount / 100 : 0;
      
      const { error } = await supabase.from("transactions").insert({
        user_id: userData.id,
        amount: amount,
        currency: chargeData.currency || "eur",
        status: "completed",
        payment_id: chargeData.id,
        payment_method: "stripe"
      });
      
      if (error) {
        console.error("Erreur lors de l'enregistrement de la transaction:", error);
        return;
      }
      
      console.log("Transaction enregistrée avec succès");
      return;
    }
  }
  
  // Si l'email n'est pas trouvé, essayer avec le customer_id
  if (chargeData.customer) {
    // Pour le développement, utiliser le premier utilisateur disponible
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (users && users.length > 0) {
      const userId = users[0].id;
      const amount = chargeData.amount ? chargeData.amount / 100 : 0;
      
      const { error } = await supabase.from("transactions").insert({
        user_id: userId,
        amount: amount,
        currency: chargeData.currency || "eur",
        status: "completed",
        payment_id: chargeData.id,
        payment_method: "stripe"
      });
      
      if (error) {
        console.error("Erreur lors de l'enregistrement de la transaction:", error);
        return;
      }
      
      console.log(`Transaction enregistrée avec succès pour l'utilisateur par défaut: ${userId}`);
    } else {
      console.error("Aucun utilisateur trouvé pour associer le paiement");
    }
  }
}

async function handleGenericPayment(paymentData, supabase) {
  // Essayer de trouver l'utilisateur associé au paiement
  const customerEmail = paymentData.receipt_email || 
                       (paymentData.customer_details?.email) || 
                       (paymentData.billing_details?.email);
  
  if (customerEmail) {
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', customerEmail)
      .maybeSingle();
    
    if (userData?.id) {
      console.log(`Utilisateur trouvé via email: ${customerEmail}, ID: ${userData.id}`);
      
      // Enregistrer la transaction dans la base de données
      const amount = paymentData.amount_total ? paymentData.amount_total / 100 : 
                    (paymentData.amount ? paymentData.amount / 100 : 0);
                    
      const { error } = await supabase.from("transactions").insert({
        user_id: userData.id,
        amount: amount,
        currency: paymentData.currency || "eur",
        status: "completed",
        payment_id: paymentData.id,
        payment_method: "stripe"
      });
      
      if (error) {
        console.error("Erreur lors de l'enregistrement de la transaction:", error);
        return;
      }
      
      console.log("Transaction enregistrée avec succès");
      return;
    }
  }
  
  // Si aucun email n'est trouvé, utiliser le premier utilisateur disponible (pour le développement)
  const { data: users, error: usersError } = await supabase
    .from('profiles')
    .select('id')
    .limit(1);
  
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
      return;
    }
    
    console.log(`Transaction enregistrée avec succès pour l'utilisateur par défaut: ${userId}`);
  } else {
    console.error("Aucun utilisateur trouvé pour associer le paiement");
  }
}
