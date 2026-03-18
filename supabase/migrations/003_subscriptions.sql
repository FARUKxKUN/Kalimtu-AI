-- Phase 1.3: Subscriptions table
-- Tracks subscription lifecycle, tier assignment, Stripe integration
-- Central to feature access control and billing

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tier_id UUID NOT NULL REFERENCES public.pricing_tiers(id),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'trial', 'past_due', 'canceled', 'paused')),
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '1 month'),
  trial_ends_at TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,

  -- Stripe integration fields
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  stripe_default_payment_method_id TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT one_subscription_per_user UNIQUE (user_id),
  CONSTRAINT period_logic_check CHECK (current_period_start < current_period_end),
  CONSTRAINT trial_logic_check CHECK (trial_ends_at IS NULL OR trial_ends_at > current_period_start)
);

-- Enable row-level security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS subscriptions_stripe_id_idx ON public.subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS subscriptions_current_period_idx ON public.subscriptions(current_period_end DESC);

-- RLS Policies
-- Policy 1: Users can read their own subscription
CREATE POLICY "subscriptions_read_own" ON public.subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy 2: Service role manages subscriptions (Stripe webhooks, admin)
CREATE POLICY "service_role_manage_subscriptions" ON public.subscriptions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION public.update_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_subscriptions_updated_at_trigger ON public.subscriptions;
CREATE TRIGGER update_subscriptions_updated_at_trigger
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_subscriptions_updated_at();

-- Create default subscription for new users (links to Free tier)
CREATE OR REPLACE FUNCTION public.create_default_subscription()
RETURNS TRIGGER AS $$
DECLARE
  free_tier_id UUID;
BEGIN
  -- Get Free tier ID
  SELECT id INTO free_tier_id FROM public.pricing_tiers WHERE name = 'Free' AND is_active = true LIMIT 1;

  IF free_tier_id IS NOT NULL THEN
    INSERT INTO public.subscriptions (user_id, tier_id, status, current_period_start, current_period_end)
    VALUES (NEW.id, free_tier_id, 'active', NOW(), NOW() + INTERVAL '1 month')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS create_default_subscription_trigger ON public.users;
CREATE TRIGGER create_default_subscription_trigger
AFTER INSERT ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.create_default_subscription();
