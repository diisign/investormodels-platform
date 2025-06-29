
import type { WebhookEvent } from "./types.ts";
import { checkEventDuplication, checkTransactionDuplication } from "./duplication-check.ts";
import { processTransaction } from "./transaction-processor.ts";
import { markEventAsProcessed } from "./event-logger.ts";

export function isPaymentEvent(eventType: string): boolean {
  return eventType === 'checkout.session.completed' || 
         eventType === 'charge.succeeded' || 
         eventType === 'payment_intent.succeeded';
}

export async function handlePaymentEvent(
  supabase: any, 
  event: WebhookEvent, 
  eventRecord: any
): Promise<{ processed: boolean; reason?: string }> {
  // Vérifier si cet événement a déjà été traité (déduplication)
  const isEventDuplicate = await checkEventDuplication(supabase, event);
  if (isEventDuplicate) {
    return { processed: true, reason: "already_processed" };
  }
  
  const paymentData = event.data.object;
  const paymentId = paymentData.payment_intent || paymentData.id;
  
  // Vérifier si une transaction avec ce payment_id existe déjà
  const isTransactionDuplicate = await checkTransactionDuplication(supabase, paymentId);
  if (isTransactionDuplicate) {
    await markEventAsProcessed(supabase, eventRecord);
    return { processed: true, reason: "transaction_exists" };
  }
  
  try {
    await processTransaction(supabase, paymentData);
    await markEventAsProcessed(supabase, eventRecord);
    return { processed: true, reason: "success" };
  } catch (error) {
    console.error("Erreur de traitement du paiement:", error);
    return { processed: false, reason: "processing_error" };
  }
}
