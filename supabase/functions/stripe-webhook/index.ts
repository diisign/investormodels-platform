
import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import { corsHeaders } from "./utils.ts";
import { processPayment } from "./paymentHandler.ts";

serve(async (req: Request) => {
  // Gestion des requêtes OPTIONS (CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Récupération du corps de la requête
    const body = await req.text();
    
    if (body.length === 0) {
      console.error("Corps de la requête vide");
      return new Response(
        JSON.stringify({ error: "Corps de la requête vide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Parsing du corps en JSON
    const event = JSON.parse(body);
    console.log("Type d'événement:", event.type);
    
    // Pour les événements de paiement réussi, lancer le traitement en arrière-plan
    if (event.type === 'checkout.session.completed' || 
        event.type === 'charge.succeeded' || 
        event.type === 'payment_intent.succeeded') {
      
      const paymentData = event.data.object;
      console.log("Données de paiement reçues:", JSON.stringify(paymentData));
      
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
