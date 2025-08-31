-- Create table for creator applications
CREATE TABLE public.creator_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  platform TEXT NOT NULL,
  username TEXT NOT NULL,
  followers TEXT NOT NULL,
  monthly_revenue TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.creator_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to insert applications
CREATE POLICY "Anyone can submit creator applications" 
ON public.creator_applications 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins to view all applications (you'll need to implement admin role later)
CREATE POLICY "Authenticated users can view all applications" 
ON public.creator_applications 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_creator_applications_updated_at
BEFORE UPDATE ON public.creator_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_creator_applications_created_at ON public.creator_applications(created_at DESC);
CREATE INDEX idx_creator_applications_status ON public.creator_applications(status);