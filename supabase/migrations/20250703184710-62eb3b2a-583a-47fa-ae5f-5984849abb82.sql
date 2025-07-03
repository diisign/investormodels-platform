-- Supprimer la transaction dupliquée (la plus récente des deux)
DELETE FROM transactions 
WHERE id = '3c84724a-7b5e-4ee5-80eb-525c1a67f324'
AND payment_id = 'pi_3RgrtYGybbM36faD0QISo1Al';

-- Ajouter une contrainte unique sur payment_id pour éviter les doublons futurs
ALTER TABLE transactions 
ADD CONSTRAINT transactions_payment_id_unique 
UNIQUE (payment_id);

-- Créer un index pour améliorer les performances des vérifications de doublons
CREATE INDEX IF NOT EXISTS idx_transactions_payment_id ON transactions(payment_id) WHERE payment_id IS NOT NULL;