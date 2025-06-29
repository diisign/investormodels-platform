
import type { WebhookEvent } from "./types.ts";

export async function checkEventDuplication(supabase: any, event: WebhookEvent): Promise<boolean> {
  if (!event.id) return false;
  
  const { data: existingEvent } = await supabase
    .from("webhook_events")
    .select("id")
    .eq("event_data->id", event.id)
    .eq("processed", true)
    .maybeSingle();
  
  if (existingEvent) {
    console.log("Événement déjà traité, ID:", event.id);
    return true;
  }
  
  return false;
}

export async function checkTransactionDuplication(supabase: any, paymentId: string): Promise<boolean> {
  if (!paymentId) return false;
  
  const { data: existingTransaction } = await supabase
    .from("transactions")
    .select("id")
    .eq("payment_id", paymentId)
    .maybeSingle();
  
  if (existingTransaction) {
    console.log("Transaction déjà enregistrée avec payment_id:", paymentId);
    return true;
  }
  
  return false;
}
