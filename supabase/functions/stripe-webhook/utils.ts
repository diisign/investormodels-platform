
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

// Headers CORS pour permettre les requêtes depuis n'importe quelle origine
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Création du client Supabase
export function initSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Configuration Supabase manquante");
    throw new Error("Configuration de la base de données manquante");
  }
  
  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

// Extraction de l'email de l'utilisateur
export function extractEmail(paymentData: any): string | null {
  if (paymentData.customer_details && paymentData.customer_details.email) {
    return paymentData.customer_details.email;
  } else if (paymentData.receipt_email) {
    return paymentData.receipt_email;
  } else if (paymentData.billing_details && paymentData.billing_details.email) {
    return paymentData.billing_details.email;
  }
  
  return null;
}

// Extraction du montant
export function extractAmount(paymentData: any): number {
  let amount = 0;
  if (paymentData.amount_total) {
    amount = paymentData.amount_total / 100;
  } else if (paymentData.amount) {
    amount = paymentData.amount / 100;
  }
  
  return amount;
}
