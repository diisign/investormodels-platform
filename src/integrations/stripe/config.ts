
/**
 * Configuration Stripe pour l'application
 */

// Clé publique Stripe (utilisable dans le frontend)
export const STRIPE_PUBLIC_KEY = 'pk_live_4Xti4Wg0H9NQUYr6emhLstEJ';

// URL du webhook Stripe
export const STRIPE_WEBHOOK_URL = 'https://pzqsgvyprttfcpyofgnt.supabase.co/functions/v1/stripe-webhook';

// Devise par défaut
export const DEFAULT_CURRENCY = 'eur';

// Version de l'API Stripe à utiliser (mise à jour vers une version valide)
export const STRIPE_API_VERSION = '2023-10-16';

// Configuration des headers pour les requêtes aux fonctions Edge
export const getAuthHeaders = async () => {
  // Importation dynamique pour éviter les problèmes de référence circulaire
  const { supabase } = await import('../supabase/client');
  
  // Récupération du token JWT actuel
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
};
