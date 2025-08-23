-- Remove the dangerous policy that allows all operations to all authenticated users
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.webhook_events;

-- Create restrictive policies that only allow system/service operations
-- Policy 1: Allow service role (Edge Functions) to insert webhook events
CREATE POLICY "Service role can insert webhook events"
  ON public.webhook_events
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy 2: Allow service role (Edge Functions) to update webhook events (for marking as processed)
CREATE POLICY "Service role can update webhook events"
  ON public.webhook_events
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy 3: Allow service role to select for deduplication checks
CREATE POLICY "Service role can select webhook events"
  ON public.webhook_events
  FOR SELECT
  TO service_role
  USING (true);

-- No policies for regular authenticated users = they cannot access webhook data
-- This protects sensitive payment and system data from unauthorized access