
import { initSupabaseClient, extractEmail, extractAmount } from "./utils.ts";

// Traitement des données de paiement
export async function processPayment(paymentData: any) {
  try {
    const supabase = initSupabaseClient();
    
    // Extraction de l'email de l'utilisateur
    const email = extractEmail(paymentData);
    
    // Extraction du montant
    const amount = extractAmount(paymentData);
    
    // Récupération de l'ID utilisateur
    let userId = null;
    
    // Si metadata.userId est présent, on l'utilise directement
    if (paymentData.metadata && paymentData.metadata.userId) {
      userId = paymentData.metadata.userId;
      console.log("ID utilisateur trouvé dans les métadonnées:", userId);
    } 
    // Sinon, on cherche l'utilisateur par email
    else if (email) {
      console.log("Recherche de l'utilisateur par email:", email);
      const { data: users, error } = await supabase.auth.admin.listUsers();
      
      if (!error && users) {
        const matchingUser = users.users.find(user => user.email === email);
        if (matchingUser) {
          userId = matchingUser.id;
          console.log("ID utilisateur trouvé par email:", userId);
        }
      }
    }
    
    // Si on n'a pas trouvé d'utilisateur, on utilise un ID anonyme
    if (!userId) {
      userId = "00000000-0000-0000-0000-000000000000";
      console.log("Utilisation d'un ID anonyme pour la transaction");
    }
    
    // Vérification si cette transaction a déjà été enregistrée
    // pour éviter les duplications
    if (paymentData.payment_intent || paymentData.id) {
      const paymentId = paymentData.payment_intent || paymentData.id;
      
      const { data: existingTransaction, error: checkError } = await supabase
        .from("transactions")
        .select("id")
        .eq("payment_id", paymentId)
        .maybeSingle();
      
      if (checkError) {
        console.error("Erreur lors de la vérification de transaction existante:", checkError);
      }
      
      if (existingTransaction) {
        console.log("Transaction déjà enregistrée avec payment_id:", paymentId);
        return { success: true, message: "Transaction déjà enregistrée", data: existingTransaction };
      }
    }
    
    // Enregistrement de la transaction si le montant est valide
    if (amount > 0) {
      console.log(`Enregistrement de la transaction: ${amount} EUR pour l'utilisateur ${userId}`);
      
      const { data: transactionData, error: transactionError } = await supabase.from("transactions").insert({
        user_id: userId,
        amount: amount,
        currency: paymentData.currency || "eur",
        status: "completed",
        payment_id: paymentData.payment_intent || paymentData.id,
        payment_method: "stripe"
      }).select();

      if (transactionError) {
        console.error("Erreur d'enregistrement de la transaction:", transactionError);
        throw new Error(`Erreur d'enregistrement de la transaction: ${transactionError.message}`);
      }
      
      console.log("Transaction enregistrée avec succès:", transactionData);
      return { success: true, data: transactionData };
    }
    
    return { success: true, data: null };
  } catch (error) {
    console.error("Erreur de traitement du paiement:", error);
    throw error;
  }
}
