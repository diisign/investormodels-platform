
import type { WebhookEvent } from "./types.ts";

export async function logWebhookEvent(supabase: any, event: WebhookEvent) {
  const { data: eventRecord, error: eventError } = await supabase
    .from("webhook_events")
    .insert({
      event_type: event.type,
      event_data: event.data.object,
      raw_payload: event,
      processed: false
    })
    .select()
    .single();
  
  if (eventError) {
    console.error("Erreur d'enregistrement de l'événement:", eventError);
  }
  
  return eventRecord;
}

export async function markEventAsProcessed(supabase: any, eventRecord: any) {
  if (eventRecord) {
    await supabase
      .from("webhook_events")
      .update({ processed: true })
      .eq("id", eventRecord.id);
  }
}
