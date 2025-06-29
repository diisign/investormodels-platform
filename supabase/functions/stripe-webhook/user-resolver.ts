
import type { PaymentData } from "./types.ts";

export async function resolveUserId(supabase: any, paymentData: PaymentData): Promise<string> {
  let userId = null;
  let email = null;
  
  // Chercher l'ID utilisateur dans les métadonnées
  if (paymentData.metadata && paymentData.metadata.userId) {
    userId = paymentData.metadata.userId;
  }
  
  // Chercher l'email
  if (paymentData.customer_details && paymentData.customer_details.email) {
    email = paymentData.customer_details.email;
  } else if (paymentData.receipt_email) {
    email = paymentData.receipt_email;
  } else if (paymentData.billing_details && paymentData.billing_details.email) {
    email = paymentData.billing_details.email;
  }
  
  // Si on a un email mais pas d'ID utilisateur, chercher l'utilisateur par email
  if (email && !userId) {
    const { data: users } = await supabase.auth.admin.listUsers();
    
    if (users) {
      const matchingUser = users.users.find(user => user.email === email);
      if (matchingUser) {
        userId = matchingUser.id;
      }
    }
  }
  
  // Si toujours pas d'utilisateur, utiliser un ID anonyme
  if (!userId) {
    userId = "00000000-0000-0000-0000-000000000000";
  }
  
  return userId;
}
