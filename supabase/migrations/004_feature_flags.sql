-- Phase 1.4: Feature flags and tier-to-feature mapping
-- Decouple features from pricing tiers for flexibility
-- Supports A/B testing and gradual feature rollouts

CREATE TABLE IF NOT EXISTS public.features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT feature_key_format CHECK (key ~ '^[a-z_]+$')
);

-- Enable row-level security
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;

-- Index
CREATE INDEX IF NOT EXISTS features_key_idx ON public.features(key);
CREATE INDEX IF NOT EXISTS features_is_active_idx ON public.features(is_active);

-- RLS: Public read-only
CREATE POLICY "features_public_read" ON public.features
  FOR SELECT
  USING (is_active = true);

-- RLS: Service role manage
CREATE POLICY "service_role_manage_features" ON public.features
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Junction table: Tier-to-Feature mapping
CREATE TABLE IF NOT EXISTS public.tier_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_id UUID NOT NULL REFERENCES public.pricing_tiers(id) ON DELETE CASCADE,
  feature_id UUID NOT NULL REFERENCES public.features(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_tier_feature UNIQUE (tier_id, feature_id)
);

-- Enable RLS
ALTER TABLE public.tier_features ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX IF NOT EXISTS tier_features_tier_id_idx ON public.tier_features(tier_id);
CREATE INDEX IF NOT EXISTS tier_features_feature_id_idx ON public.tier_features(feature_id);

-- RLS: Public read
CREATE POLICY "tier_features_public_read" ON public.tier_features
  FOR SELECT
  USING (true);

-- RLS: Service role manage
CREATE POLICY "service_role_manage_tier_features" ON public.tier_features
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Seed standard features
INSERT INTO public.features (key, name, description, is_active)
VALUES
  ('transcription', 'Transcription Engine', 'Core transcription capability', true),
  ('code_switching', 'Code-Switching Support', 'Automatically handle Tunisian/French/Arabic code-switching', true),
  ('api_access', 'REST API Access', 'Programmatic access to transcription API', true),
  ('team_members', 'Team Members', 'Add team members to account', true),
  ('priority_support', 'Priority Support', 'Direct support channel', true),
  ('sso', 'Single Sign-On (SSO)', 'Enterprise SSO integration', true),
  ('advanced_analytics', 'Advanced Analytics', 'Detailed usage and performance analytics', true),
  ('webhook_integration', 'Webhook Integration', 'Receive webhooks for transcription events', true),
  ('custom_vocabulary', 'Custom Vocabulary', 'Add domain-specific terms and names', true)
ON CONFLICT (key) DO NOTHING;

-- Map features to tiers
-- Free tier
INSERT INTO public.tier_features (tier_id, feature_id)
SELECT pt.id, f.id FROM public.pricing_tiers pt, public.features f
WHERE pt.name = 'Free' AND f.key IN ('transcription', 'code_switching')
ON CONFLICT (tier_id, feature_id) DO NOTHING;

-- Pro tier
INSERT INTO public.tier_features (tier_id, feature_id)
SELECT pt.id, f.id FROM public.pricing_tiers pt, public.features f
WHERE pt.name = 'Pro' AND f.key IN ('transcription', 'code_switching', 'api_access', 'team_members', 'advanced_analytics', 'webhook_integration', 'custom_vocabulary')
ON CONFLICT (tier_id, feature_id) DO NOTHING;

-- Enterprise tier (all features)
INSERT INTO public.tier_features (tier_id, feature_id)
SELECT pt.id, f.id FROM public.pricing_tiers pt, public.features f
WHERE pt.name = 'Enterprise'
ON CONFLICT (tier_id, feature_id) DO NOTHING;
