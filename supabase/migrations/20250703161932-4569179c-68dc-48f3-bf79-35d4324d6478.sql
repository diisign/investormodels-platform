-- Supprimer tous les investissements et transactions pour paulyleo91@yahoo.fr

-- D'abord, trouver l'ID utilisateur pour cet email
-- L'email est stocké dans auth.users, mais on peut identifier l'utilisateur via ses données

-- Supprimer tous les investissements pour l'utilisateur paulyleo91@yahoo.fr (ID: cf3bae5e-efd3-44f8-9842-9b1a8e26321e)
DELETE FROM investments 
WHERE user_id = 'cf3bae5e-efd3-44f8-9842-9b1a8e26321e';

-- Supprimer toutes les transactions pour cet utilisateur
DELETE FROM transactions 
WHERE user_id = 'cf3bae5e-efd3-44f8-9842-9b1a8e26321e';

-- Remettre à zéro les statistiques de parrainage dans le profil
UPDATE profiles 
SET total_referrals = 0, 
    total_referral_earnings = 0 
WHERE id = 'cf3bae5e-efd3-44f8-9842-9b1a8e26321e';

-- Supprimer tous les parrainages où cet utilisateur est le parrain ou le parrainé
DELETE FROM affiliations 
WHERE referrer_id = 'cf3bae5e-efd3-44f8-9842-9b1a8e26321e' 
   OR referred_id = 'cf3bae5e-efd3-44f8-9842-9b1a8e26321e';

-- Supprimer tous les parrainages de la table referrals
DELETE FROM referrals 
WHERE user_id = 'cf3bae5e-efd3-44f8-9842-9b1a8e26321e';