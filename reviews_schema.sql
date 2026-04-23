-- Reviews Table Schema
CREATE TABLE IF NOT EXISTS public.property_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.property_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view reviews
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'property_reviews' AND policyname = 'Public can view reviews'
    ) THEN
        CREATE POLICY "Public can view reviews"
        ON public.property_reviews FOR SELECT
        TO public
        USING (true);
    END IF;
END $$;

-- Authenticated users can insert reviews
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'property_reviews' AND policyname = 'Authenticated users can create reviews'
    ) THEN
        CREATE POLICY "Authenticated users can create reviews"
        ON public.property_reviews FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- Grant access to the API roles (CRITICAL FOR FIXING PERMISSION ERROR)
GRANT ALL PRIVILEGES ON TABLE public.property_reviews TO anon;
GRANT ALL PRIVILEGES ON TABLE public.property_reviews TO authenticated;
