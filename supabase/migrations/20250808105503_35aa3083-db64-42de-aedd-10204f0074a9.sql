-- Add duration_months column to investments table to track investment lock period
ALTER TABLE public.investments 
ADD COLUMN duration_months integer DEFAULT 3 NOT NULL;