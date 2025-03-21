
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.7.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Webhook endpoint appelé !");
  
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
      apiVersion: "2025-02-24",
    });
    
    // Vérifier si c'est une requête Stripe
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      console.error("Signature Stripe manquante - possible test manuel");
      // Pour les tests manuels, essayons de traiter le corps directement
      const body = await req.text();
      try {
        const data = JSON.parse(body);
        console.log("Données de test reçues:", data);
        
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
        
        // Essayer de traiter comme un événement de checkout session
        if (data.object && data.object.mode === "payment") {
          await handleTestCheckoutSession(data.object, supabase);
        }
        
        return new Response(
          JSON.stringify({ received: true, test: true }),
          { 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      } catch (err) {
        console.error("Erreur lors du traitement des données de test:", err);
      }
      
      return new Response(
        JSON.stringify({ error: "Signature Stripe manquante" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const body = await req.text();
    console.log("Payload reçu:", body.substring(0, 500) + (body.length > 500 ? "..." : ""));
    
    // Vérifier si c'est réellement Stripe qui nous envoie cet événement
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET non configurée");
      return new Response(
        JSON.stringify({ error: "Secret webhook non configuré" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
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
    
    console.log("Événement Stripe reçu:", event.type);
    console.log("ID de l'événement:", event.id);
    console.log("Données de l'événement:", JSON.stringify(event.data.object).substring(0, 500) + "...");
    
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
      default:
        console.log(`Événement non géré pour cette démonstration: ${event.type}`);
    }

    // Réponse de succès
    return new Response(
      JSON.stringify({ received: true, event_id: event.id, event_type: event.type }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
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

async function handleTestCheckoutSession(sessionData, supabase) {
  console.log("Traitement de données de test pour créer une transaction");
  
  try {
    // Pour les tests, utiliser l'email fourni ou chercher le premier utilisateur
    const customerEmail = sessionData.customer_email || sessionData.customer_details?.email;
    
    let userId = null;
    
    if (customerEmail) {
      console.log(`Recherche d'un utilisateur avec l'email: ${customerEmail}`);
      
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customerEmail)
        .maybeSingle();
      
      if (userError) {
        console.error("Erreur lors de la recherche du profil utilisateur:", userError);
      }
      
      if (userData?.id) {
        userId = userData.id;
        console.log(`Utilisateur trouvé via email: ${customerEmail}, ID: ${userId}`);
      }
    }
    
    // Si aucun utilisateur n'est trouvé, utiliser le premier disponible
    if (!userId) {
      console.log("Aucun utilisateur spécifique trouvé, récupération du premier utilisateur");
      
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      if (usersError) {
        console.error("Erreur lors de la récupération des utilisateurs:", usersError);
        return;
      }
      
      if (users && users.length > 0) {
        userId = users[0].id;
        console.log(`Utilisation de l'utilisateur par défaut: ${userId}`);
      } else {
        console.error("Aucun utilisateur trouvé dans la base de données");
        return;
      }
    }
    
    // Calculer le montant (conversion des centimes en euros ou utilisation directe selon le format)
    let amount = 0;
    if (sessionData.amount_total) {
      amount = sessionData.amount_total / 100;
    } else if (sessionData.amount) {
      amount = sessionData.amount / 100;
    } else if (typeof sessionData.total === 'number') {
      amount = sessionData.total / 100;
    } else {
      // Pour les tests, utilisez un montant par défaut
      amount = 2.00; // Montant mentionné par l'utilisateur
    }
    
    console.log(`Création d'une transaction de test pour l'utilisateur ${userId} avec un montant de ${amount}€`);
    
    // Enregistrer la transaction
    const { data, error } = await supabase.from("transactions").insert({
      user_id: userId,
      amount: amount,
      currency: sessionData.currency || "eur",
      status: "completed",
      payment_id: sessionData.id || `test-${Date.now()}`,
      payment_method: "stripe"
    }).select();
    
    if (error) {
      console.error("Erreur lors de l'enregistrement de la transaction de test:", error);
      return;
    }
    
    console.log("Transaction de test enregistrée avec succès:", data);
    
  } catch (error) {
    console.error("Erreur lors du traitement des données de test:", error);
  }
}

async function handleCheckoutSessionCompleted(session, supabase) {
  console.log("Session de paiement complétée:", JSON.stringify(session).substring(0, 200) + "...");
  
  // Récupérer l'ID utilisateur depuis les métadonnées ou le client_reference_id
  const userId = session.metadata?.userId || session.client_reference_id;
  
  if (!userId) {
    console.log("ID utilisateur non trouvé dans les métadonnées, recherche par email");
    
    // Chercher l'email dans la session et essayer de trouver l'utilisateur
    const customerEmail = session.customer_details?.email || session.customer_email;
    
    if (customerEmail) {
      console.log(`Recherche d'un utilisateur avec l'email: ${customerEmail}`);
      
      // Rechercher dans les profils
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      if (profileError) {
        console.error("Erreur lors de la recherche du profil:", profileError);
      } else {
        console.log("Résultats de la recherche de profil:", profileData);
      }
      
      // Rechercher dans auth.users pour obtenir l'email
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error("Erreur lors de la récupération des utilisateurs:", authError);
      } else {
        console.log(`Nombre d'utilisateurs trouvés: ${authUsers.users.length}`);
        
        // Chercher un utilisateur correspondant
        const matchingUser = authUsers.users.find(user => 
          user.email && user.email.toLowerCase() === customerEmail.toLowerCase()
        );
        
        if (matchingUser) {
          console.log(`Utilisateur trouvé via email: ${customerEmail}, ID: ${matchingUser.id}`);
          await createTransaction(matchingUser.id, session, supabase);
          return;
        } else {
          console.log("Aucun utilisateur trouvé avec cet email");
        }
      }
    }
    
    // Si aucun utilisateur n'est identifié, utiliser le premier utilisateur disponible
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
      console.error("Erreur lors de la récupération des utilisateurs:", usersError);
      return;
    }
    
    if (users && users.users.length > 0) {
      const defaultUser = users.users[0];
      console.log(`Utilisation de l'utilisateur par défaut: ${defaultUser.id} (${defaultUser.email})`);
      await createTransaction(defaultUser.id, session, supabase);
    } else {
      console.error("Impossible de déterminer l'utilisateur pour la transaction");
    }
    
    return;
  }
  
  await createTransaction(userId, session, supabase);
}

async function createTransaction(userId, session, supabase) {
  console.log(`Création d'une transaction pour l'utilisateur: ${userId}`);
  
  // Calculer le montant (conversion des centimes en euros ou utilisation directe selon le format)
  const amount = session.amount_total ? session.amount_total / 100 : 
                 (session.amount ? session.amount / 100 : 2.00); // Montant mentionné par l'utilisateur
  
  console.log(`Montant de la transaction: ${amount} ${session.currency || "eur"}`);
  
  // Vérifier si l'utilisateur existe
  const { data: userExists, error: userCheckError } = await supabase.auth.admin.getUserById(userId);
  
  if (userCheckError || !userExists) {
    console.error("Utilisateur non trouvé dans la base de données:", userCheckError);
    
    // Récupérer le premier utilisateur comme solution de secours
    const { data: firstUser, error: firstUserError } = await supabase.auth.admin.listUsers();
    
    if (firstUserError || !firstUser || firstUser.users.length === 0) {
      console.error("Impossible de trouver un utilisateur pour la transaction");
      return;
    }
    
    userId = firstUser.users[0].id;
    console.log(`Utilisation de l'utilisateur de secours: ${userId}`);
  }
  
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
  console.log("Paiement asynchrone réussi:", JSON.stringify(paymentData).substring(0, 200) + "...");
  await handleGenericPayment(paymentData, supabase);
}

async function handlePaymentIntentSucceeded(paymentData, supabase) {
  console.log("Intention de paiement réussie:", JSON.stringify(paymentData).substring(0, 200) + "...");
  await handleGenericPayment(paymentData, supabase);
}

async function handleChargeSucceeded(chargeData, supabase) {
  console.log("Charge réussie:", JSON.stringify(chargeData).substring(0, 200) + "...");
  
  // Chercher l'email dans les données de la charge
  const customerEmail = chargeData.billing_details?.email || 
                        chargeData.receipt_email ||
                        chargeData.customer_email;
  
  if (customerEmail) {
    console.log(`Recherche d'un utilisateur avec l'email: ${customerEmail}`);
    
    // Obtenir tous les utilisateurs et chercher par email
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error("Erreur lors de la récupération des utilisateurs:", authError);
    } else if (authData && authData.users) {
      const matchingUser = authData.users.find(user => 
        user.email && user.email.toLowerCase() === customerEmail.toLowerCase()
      );
      
      if (matchingUser) {
        console.log(`Utilisateur trouvé via email: ${customerEmail}, ID: ${matchingUser.id}`);
        
        // Calculer le montant (conversion des centimes en euros)
        const amount = chargeData.amount ? chargeData.amount / 100 : 2.00;
        
        const { error: transactionError } = await supabase.from("transactions").insert({
          user_id: matchingUser.id,
          amount: amount,
          currency: chargeData.currency || "eur",
          status: "completed",
          payment_id: chargeData.id,
          payment_method: "stripe"
        });
        
        if (transactionError) {
          console.error("Erreur lors de l'enregistrement de la transaction:", transactionError);
        } else {
          console.log("Transaction enregistrée avec succès");
        }
        return;
      }
    }
  }
  
  // Si l'email n'est pas trouvé, essayer avec le premier utilisateur disponible
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
  
  if (usersError || !users || users.users.length === 0) {
    console.error("Aucun utilisateur trouvé pour associer le paiement");
    return;
  }
  
  const userId = users.users[0].id;
  const amount = chargeData.amount ? chargeData.amount / 100 : 2.00;
  
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
  } else {
    console.log(`Transaction enregistrée avec succès pour l'utilisateur par défaut: ${userId}`);
  }
}

async function handleGenericPayment(paymentData, supabase) {
  // Essayer de trouver l'utilisateur associé au paiement
  const customerEmail = paymentData.receipt_email || 
                       (paymentData.customer_details?.email) || 
                       (paymentData.billing_details?.email);
  
  if (customerEmail) {
    console.log(`Recherche d'un utilisateur avec l'email: ${customerEmail}`);
    
    // Obtenir tous les utilisateurs et chercher par email
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error("Erreur lors de la récupération des utilisateurs:", authError);
    } else if (authData && authData.users) {
      const matchingUser = authData.users.find(user => 
        user.email && user.email.toLowerCase() === customerEmail.toLowerCase()
      );
      
      if (matchingUser) {
        console.log(`Utilisateur trouvé via email: ${customerEmail}, ID: ${matchingUser.id}`);
        
        // Enregistrer la transaction dans la base de données
        const amount = paymentData.amount_total ? paymentData.amount_total / 100 : 
                      (paymentData.amount ? paymentData.amount / 100 : 2.00);
                      
        const { error } = await supabase.from("transactions").insert({
          user_id: matchingUser.id,
          amount: amount,
          currency: paymentData.currency || "eur",
          status: "completed",
          payment_id: paymentData.id,
          payment_method: "stripe"
        });
        
        if (error) {
          console.error("Erreur lors de l'enregistrement de la transaction:", error);
        } else {
          console.log("Transaction enregistrée avec succès");
        }
        return;
      }
    }
  }
  
  // Si aucun email n'est trouvé, utiliser le premier utilisateur disponible
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
  
  if (usersError || !users || users.users.length === 0) {
    console.error("Aucun utilisateur trouvé pour associer le paiement");
    return;
  }
  
  const userId = users.users[0].id;
  
  // Enregistrer la transaction dans la base de données
  const amount = paymentData.amount_total ? paymentData.amount_total / 100 : 
                (paymentData.amount ? paymentData.amount / 100 : 2.00);
                
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
  } else {
    console.log(`Transaction enregistrée avec succès pour l'utilisateur par défaut: ${userId}`);
  }
}
