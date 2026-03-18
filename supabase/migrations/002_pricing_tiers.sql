-- Phase 1.2: Pricing tiers lookup table
-- Immutable reference data defining Free, Pro, Enterprise tiers
-- Determines feature access and resource limits

CREATE TABLE IF NOT EXISTS public.pricing_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  monthly_minutes INT NOT NULL DEFAULT 0,
  max_concurrent_jobs INT NOT NULL DEFAULT 1,
  storage_gb INT NOT NULL DEFAULT 1,
  price_usd_monthly DECIMAL(10, 2) NOT NULL DEFAULT 0,
  stripe_price_id TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT monthly_minutes_non_negative CHECK (monthly_minutes >= 0),
  CONSTRAINT max_concurrent_jobs_positive CHECK (max_concurrent_jobs > 0),
  CONSTRAINT storage_gb_positive CHECK (storage_gb > 0),
  CONSTRAINT price_non_negative CHECK (price_usd_monthly >= 0)
);

-- Enable row-level security (read-only for users)
ALTER TABLE public.pricing_tiers ENABLE ROW LEVEL SECURITY;

-- Index for lookups
CREATE INDEX IF NOT EXISTS pricing_tiers_name_idx ON public.pricing_tiers(name);
CREATE INDEX IF NOT EXISTS pricing_tiers_is_active_idx ON public.pricing_tiers(is_active);

-- RLS Policies
-- Policy 1: Anyone can read active pricing tiers (public information)
CREATE POLICY "pricing_tiers_public_read" ON public.pricing_tiers
  FOR SELECT
  USING (is_active = true);

-- Policy 2: Service role can manage pricing tiers (admin-only)
CREATE POLICY "service_role_manage_tiers" ON public.pricing_tiers
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Seed data: Standard SaaS tiers
INSERT INTO public.pricing_tiers (name, description, monthly_minutes, max_concurrent_jobs, storage_gb, price_usd_monthly, stripe_price_id, is_active)
VALUES
  ('Free', 'Get started with Kalimtu', 30, 1, 1, 0, NULL, true),
  ('Pro', 'For teams and professionals', 300, 5, 50, 29, NULL, true),
  ('Enterprise', 'Unlimited transcription with dedicated support', 10000, 50, 500, 299, NULL, true)
ON CONFLICT (name) DO NOTHING;
