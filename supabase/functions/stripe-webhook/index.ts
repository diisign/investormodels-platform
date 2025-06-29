
import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import type { WebhookEvent } from "./types.ts";
import { handleCorsRequest, createJsonResponse } from "./cors.ts";
import { validateRequest, parseRequestBody } from "./validation.ts";
import { createSupabaseClient } from "./supabase-client.ts";
import { logWebhookEvent } from "./event-logger.ts";
import { isPaymentEvent, handlePaymentEvent } from "./payment-handler.ts";

// Point d'entrée principal de la fonction
serve(async (req: Request) => {
  // Gestion des requêtes OPTIONS (CORS)
  if (req.method === "OPTIONS") {
    return handleCorsRequest();
  }

  try {
    // Validation de la requête
    const validation = validateRequest(req);
    if (!validation.isValid) {
      return validation.error!;
    }

    // Parsing du corps de la requête
    const { body, error: bodyError } = await parseRequestBody(req);
    if (bodyError) {
      return bodyError;
    }
    
    // Parsing du corps en JSON
    const event: WebhookEvent = JSON.parse(body);
    console.log(`Webhook reçu: ${event.type}`);
    
    // Initialisation du client Supabase
    const supabase = createSupabaseClient();

    // Enregistrer tous les événements pour traçabilité
    const eventRecord = await logWebhookEvent(supabase, event);

    // Vérifier si c'est un événement de paiement
    if (isPaymentEvent(event.type)) {
      const result = await handlePaymentEvent(supabase, event, eventRecord);
      
      return createJsonResponse({ 
        received: true, 
        status: result.reason || "processed" 
      });
    }
    
    // Réponse immédiate de succès à Stripe
    return createJsonResponse({ received: true });
    
  } catch (error) {
    console.error("Erreur webhook:", error);
    return createJsonResponse({ 
      error: "Erreur interne du serveur", 
      details: error instanceof Error ? error.message : "Erreur inconnue" 
    }, 500);
  }
});
