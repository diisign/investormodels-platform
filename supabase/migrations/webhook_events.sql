
-- Create a table to log webhook events for debugging
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL,
  raw_payload JSONB,
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add index on event_type for faster lookups
CREATE INDEX IF NOT EXISTS webhook_events_event_type_idx ON public.webhook_events (event_type);

-- Add index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS webhook_events_created_at_idx ON public.webhook_events (created_at);

-- Enable RLS but allow all operations for now (for debugging)
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Policy to allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users"
  ON public.webhook_events
  FOR ALL
  TO authenticated
  USING (true);
