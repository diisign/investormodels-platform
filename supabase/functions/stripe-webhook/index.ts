
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
    
    // Traitement uniquement des événements de paiement réussi
    if (event.type === 'checkout.session.completed' || 
        event.type === 'charge.succeeded' || 
        event.type === 'payment_intent.succeeded') {
      
      const paymentData = event.data.object;
      console.log("Données de paiement:", JSON.stringify(paymentData));
      
      await processPayment(paymentData);
    }
    
    // Réponse de succès à Stripe
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
