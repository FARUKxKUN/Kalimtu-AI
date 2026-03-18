-- Phase 1.5: Audit logs table (optional but recommended)
-- Immutable append-only log for compliance, debugging, and security audits
-- Requires SECURITY DEFINER to bypass RLS

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id BIGSERIAL PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id UUID,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE', 'SYSTEM')),
  old_data JSONB,
  new_data JSONB,
  error_message TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS (admin-only read, service_role-only write)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS audit_logs_table_idx ON public.audit_logs(table_name);
CREATE INDEX IF NOT EXISTS audit_logs_user_id_idx ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS audit_logs_action_idx ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS audit_logs_record_id_idx ON public.audit_logs(record_id);

-- RLS: Service role write-only (audit generation)
CREATE POLICY "audit_logs_service_insert" ON public.audit_logs
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- RLS: Admin-only read
CREATE POLICY "audit_logs_admin_read" ON public.audit_logs
  FOR SELECT
  USING (auth.role() = 'service_role'); -- Can restrict to admin role later

-- Disable all mutations except insert
CREATE POLICY "audit_logs_no_update" ON public.audit_logs
  FOR UPDATE
  USING (false);

CREATE POLICY "audit_logs_no_delete" ON public.audit_logs
  FOR DELETE
  USING (false);

-- Function to log changes (called by triggers on other tables)
CREATE OR REPLACE FUNCTION public.audit_log_change()
RETURNS TRIGGER AS $$
DECLARE
  v_old_data JSONB;
  v_new_data JSONB;
  v_action TEXT;
BEGIN
  v_old_data := CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END;
  v_new_data := CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END;
  v_action := TG_OP;

  INSERT INTO public.audit_logs (
    table_name,
    record_id,
    user_id,
    action,
    old_data,
    new_data,
    created_at
  ) VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    COALESCE(NEW.user_id, OLD.user_id),
    v_action,
    v_old_data,
    v_new_data,
    NOW()
  );

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Optional: Create audit triggers for key tables
-- Uncomment as needed during Phase 2/3
-- CREATE TRIGGER audit_subscriptions AFTER INSERT OR UPDATE OR DELETE ON public.subscriptions
--   FOR EACH ROW EXECUTE FUNCTION public.audit_log_change();
