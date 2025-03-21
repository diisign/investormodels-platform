
/**
 * Configuration Stripe pour l'application
 */

// Clé publique Stripe (utilisable dans le frontend)
export const STRIPE_PUBLIC_KEY = 'pk_live_4Xti4Wg0H9NQUYr6emhLstEJ';

// URL du webhook Stripe
export const STRIPE_WEBHOOK_URL = 'https://pzqsgvyprttfcpyofgnt.supabase.co/functions/v1/stripe-webhook';

// Devise par défaut
export const DEFAULT_CURRENCY = 'eur';

// Version de l'API Stripe à utiliser (mise à jour vers la dernière version)
export const STRIPE_API_VERSION = '2024-07-31';
