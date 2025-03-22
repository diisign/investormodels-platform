
/**
 * Configuration Stripe pour l'application
 */

// Clé publique Stripe (utilisable dans le frontend)
export const STRIPE_PUBLIC_KEY = 'pk_live_51CsAgBGybbM36faDKS1M2kzzPYDtLeAw1w5YQPzdvji7HQRh7YPAl8AkDTA4d99rgggyELrIF3aRSCVi1Geds7SR0076K9rWBb';

// URL du webhook Stripe
export const STRIPE_WEBHOOK_URL = 'https://pzqsgvyprttfcpyofgnt.supabase.co/functions/v1/stripe-webhook';

// Devise par défaut
export const DEFAULT_CURRENCY = 'eur';

// Version de l'API Stripe à utiliser
export const STRIPE_API_VERSION = '2025-02-24.acacia';
