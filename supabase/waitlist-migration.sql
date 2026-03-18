-- Kalimtu Waitlist Table Migration
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Create the waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'hero',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Prevent duplicate emails at the database level
  CONSTRAINT waitlist_email_unique UNIQUE (email)
);

-- 2. Create index for email lookups (duplicate check)
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist (email);

-- 3. Create index for sorting by signup date
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist (created_at DESC);

-- 4. Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policy: Only service_role can INSERT (API route uses service key)
-- No public read/write access via anon key
CREATE POLICY "Service role can insert waitlist entries"
  ON public.waitlist
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- 6. RLS Policy: Only service_role can SELECT (for duplicate check + count)
CREATE POLICY "Service role can read waitlist entries"
  ON public.waitlist
  FOR SELECT
  TO service_role
  USING (true);

-- 7. Optional: Grant no access to anon role explicitly
-- (RLS already blocks it, but this is defense in depth)
REVOKE ALL ON public.waitlist FROM anon;

-- Verify: After running, check the table exists
-- SELECT count(*) FROM public.waitlist;
