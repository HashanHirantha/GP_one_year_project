-- Add availability flag
ALTER TABLE public.properties ADD COLUMN is_available BOOLEAN DEFAULT true;

-- Add max guests capacity
ALTER TABLE public.properties ADD COLUMN max_guests INTEGER;

-- Make sure contact_number is available to all authenticated/anon roles
GRANT ALL ON public.properties TO anon, authenticated;
