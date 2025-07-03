-- Supprimer l'investissement non confirmé sur Kayla (creator3)
DELETE FROM investments 
WHERE creator_id = 'creator3' 
AND amount = 200 
AND user_id = 'cf3bae5e-efd3-44f8-9842-9b1a8e26321e';

-- Supprimer aussi la transaction associée si elle existe
DELETE FROM transactions 
WHERE payment_id = 'creator3' 
AND payment_method = 'investment' 
AND amount = -200 
AND user_id = 'cf3bae5e-efd3-44f8-9842-9b1a8e26321e';