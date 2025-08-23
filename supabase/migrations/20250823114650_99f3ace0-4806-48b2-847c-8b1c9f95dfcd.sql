-- Remove the overly permissive RLS policy that allows reading all profiles
DROP POLICY IF EXISTS "Users can read all profiles" ON public.profiles;

-- Ensure we have a proper policy for users to read only their own profile
-- (keeping existing policies that are properly scoped)