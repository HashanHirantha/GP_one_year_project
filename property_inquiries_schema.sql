-- Property Inquiries Table Schema
CREATE TABLE IF NOT EXISTS public.property_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    reply TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.property_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow buyers to insert their own inquiries
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'property_inquiries' AND policyname = 'Buyers can insert inquiries'
    ) THEN
        CREATE POLICY "Buyers can insert inquiries"
        ON public.property_inquiries FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid() = buyer_id);
    END IF;
END $$;

-- Allow buyers to view their own inquiries
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'property_inquiries' AND policyname = 'Buyers can view own inquiries'
    ) THEN
        CREATE POLICY "Buyers can view own inquiries"
        ON public.property_inquiries FOR SELECT
        TO authenticated
        USING (auth.uid() = buyer_id);
    END IF;
END $$;

-- Allow sellers to view inquiries targeting their properties
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'property_inquiries' AND policyname = 'Sellers can view inquiries'
    ) THEN
        CREATE POLICY "Sellers can view inquiries"
        ON public.property_inquiries FOR SELECT
        TO authenticated
        USING (auth.uid() = seller_id);
    END IF;
END $$;

-- Allow sellers to reply to inquiries
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'property_inquiries' AND policyname = 'Sellers can update inquiries'
    ) THEN
        CREATE POLICY "Sellers can update inquiries"
        ON public.property_inquiries FOR UPDATE
        TO authenticated
        USING (auth.uid() = seller_id);
    END IF;
END $$;

GRANT ALL PRIVILEGES ON TABLE public.property_inquiries TO anon, authenticated;
