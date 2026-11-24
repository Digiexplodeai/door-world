-- ==============================================================================
-- DOOR WORLD — Supabase Database Migration
-- Version: 20261124_01
-- Description: Creates the 'enquiries' schema, indexes, updated_at trigger, and
--              Row Level Security (RLS) policies for anonymous website submissions
--              and authenticated staff / admin panel access.
-- ==============================================================================

-- 1. Create enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    name TEXT NOT NULL CHECK (char_length(trim(name)) >= 2),
    phone TEXT NOT NULL CHECK (char_length(trim(phone)) >= 10),
    door_type TEXT NOT NULL,
    message TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'contact_section',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'closed', 'archived')),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    notes TEXT
);

-- 2. Performance indexes
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_phone ON public.enquiries (phone);
CREATE INDEX IF NOT EXISTS idx_enquiries_source ON public.enquiries (source);

-- 3. Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_enquiries_updated_at ON public.enquiries;
CREATE TRIGGER set_enquiries_updated_at
    BEFORE UPDATE ON public.enquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Allow anyone (public/anonymous users from website forms) to INSERT enquiries
DROP POLICY IF EXISTS "Allow public website visitors to submit enquiries" ON public.enquiries;
CREATE POLICY "Allow public website visitors to submit enquiries"
    ON public.enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(name)) >= 2 AND
        char_length(trim(phone)) >= 10 AND
        char_length(trim(door_type)) >= 1
    );

-- Prevent anonymous users from viewing, editing or deleting existing enquiries
-- Only authenticated users (admins/staff) can view and manage enquiries
DROP POLICY IF EXISTS "Allow authenticated staff to read enquiries" ON public.enquiries;
CREATE POLICY "Allow authenticated staff to read enquiries"
    ON public.enquiries
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated staff to update enquiries" ON public.enquiries;
CREATE POLICY "Allow authenticated staff to update enquiries"
    ON public.enquiries
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated staff to delete enquiries" ON public.enquiries;
CREATE POLICY "Allow authenticated staff to delete enquiries"
    ON public.enquiries
    FOR DELETE
    TO authenticated
    USING (true);

-- 6. Schema Grants
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON TABLE public.enquiries TO anon;
GRANT ALL ON TABLE public.enquiries TO authenticated;
