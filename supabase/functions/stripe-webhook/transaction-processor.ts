
import type { PaymentData, TransactionRecord } from "./types.ts";
import { extractAmount } from "./amount-extractor.ts";
import { resolveUserId } from "./user-resolver.ts";

export async function processTransaction(supabase: any, paymentData: PaymentData): Promise<void> {
  const amount = extractAmount(paymentData);
  
  if (amount <= 0) {
    console.log("Montant invalide, transaction ignorée");
    return;
  }
  
  const userId = await resolveUserId(supabase, paymentData);
  const paymentId = paymentData.payment_intent || paymentData.id;
  
  console.log(`Enregistrement de la transaction: ${amount} EUR pour l'utilisateur ${userId}`);
  
  const transactionRecord: TransactionRecord = {
    user_id: userId,
    amount: amount,
    currency: paymentData.currency || "eur",
    status: "completed",
    payment_id: paymentId,
    payment_method: "stripe"
  };
  
  const { data: transaction, error: transactionError } = await supabase
    .from("transactions")
    .insert(transactionRecord)
    .select();
  
  if (transactionError) {
    throw new Error(`Erreur d'enregistrement: ${transactionError.message}`);
  }
  
  console.log("Transaction enregistrée avec succès:", transaction);
}
