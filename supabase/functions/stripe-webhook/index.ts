
import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import { corsHeaders } from "./utils.ts";
import { processPayment } from "./paymentHandler.ts";

serve(async (req: Request) => {
  // Gestion des requêtes OPTIONS (CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Vérification de la méthode de requête
    if (req.method !== "POST") {
      console.error(`Méthode non autorisée: ${req.method}`);
      return new Response(
        JSON.stringify({ error: `Méthode ${req.method} non autorisée` }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Vérification du content-type
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Content-Type invalide: ${contentType}`);
      return new Response(
        JSON.stringify({ error: "Le Content-Type doit être application/json" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Récupération du corps de la requête
    const body = await req.text();
    
    // Vérification du contenu de la requête
    if (!body || body.length === 0) {
      console.error("Corps de la requête vide");
      return new Response(
        JSON.stringify({ error: "Corps de la requête vide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Log des données reçues pour le débogage (version tronquée pour éviter de surcharger les logs)
    console.log(`Webhook reçu: ${body.substring(0, 200)}...`);
    
    try {
      // Parsing du corps en JSON
      const event = JSON.parse(body);
      
      // Vérification des champs requis
      if (!event.type || !event.data || !event.data.object) {
        console.error("Structure d'événement Stripe invalide:", JSON.stringify(event).substring(0, 200));
        return new Response(
          JSON.stringify({ error: "Structure d'événement Stripe invalide" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      console.log("Type d'événement:", event.type);
      
      // Pour les événements de paiement réussi, lancer le traitement en arrière-plan
      if (event.type === 'checkout.session.completed' || 
          event.type === 'charge.succeeded' || 
          event.type === 'payment_intent.succeeded') {
        
        const paymentData = event.data.object;
        console.log("Données de paiement reçues:", JSON.stringify(paymentData).substring(0, 500));
        
        // Lancer le traitement en arrière-plan sans attendre sa complétion
        // pour répondre rapidement à Stripe
        EdgeRuntime.waitUntil(
          (async () => {
            try {
              console.log("Début du traitement de paiement en arrière-plan");
              await processPayment(paymentData);
              console.log("Traitement de paiement terminé avec succès");
            } catch (error) {
              console.error("Erreur lors du traitement en arrière-plan:", error);
            }
          })()
        );
      } else {
        console.log(`Type d'événement ignoré: ${event.type}`);
      }
    } catch (parseError) {
      console.error("Erreur de parsing JSON:", parseError);
      return new Response(
        JSON.stringify({ error: "Corps de la requête n'est pas un JSON valide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Réponse immédiate de succès à Stripe (indépendamment du type d'événement)
    // Stripe attend une réponse 200 rapide
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
