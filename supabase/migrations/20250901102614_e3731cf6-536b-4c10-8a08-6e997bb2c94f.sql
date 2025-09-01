-- Mise à jour de la table investments pour le système de parts avec dividendes mensuels
ALTER TABLE investments 
ADD COLUMN shares_owned boolean DEFAULT true,
ADD COLUMN sold_at timestamp with time zone DEFAULT null,
ADD COLUMN last_dividend_date timestamp with time zone DEFAULT null;

-- Créer une table pour tracker les dividendes versés
CREATE TABLE public.dividends (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  investment_id uuid NOT NULL,
  user_id uuid NOT NULL,
  amount numeric NOT NULL,
  dividend_date date NOT NULL,
  yield_rate numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS sur la table dividends
ALTER TABLE public.dividends ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour dividends
CREATE POLICY "Users can view their own dividends" 
ON public.dividends 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert dividends" 
ON public.dividends 
FOR INSERT 
WITH CHECK (true);

-- Ajouter index pour les requêtes fréquentes
CREATE INDEX idx_dividends_user_id ON public.dividends(user_id);
CREATE INDEX idx_dividends_investment_id ON public.dividends(investment_id);
CREATE INDEX idx_dividends_date ON public.dividends(dividend_date);

-- Mettre à jour la table investments pour permettre la vente
ALTER TABLE investments 
ADD CONSTRAINT check_sold_shares CHECK (
  (shares_owned = false AND sold_at IS NOT NULL) OR 
  (shares_owned = true AND sold_at IS NULL)
);

-- Fonction pour calculer les dividendes mensuels
CREATE OR REPLACE FUNCTION calculate_monthly_dividend(investment_amount numeric, yield_rate numeric)
RETURNS numeric
LANGUAGE plpgsql
AS $$
BEGIN
  -- Convertir le yield annuel en dividende mensuel
  RETURN investment_amount * (yield_rate / 100 / 12);
END;
$$;