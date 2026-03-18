/**
 * Database type definitions for Kalimtu
 * Auto-generate these from Supabase schema in production
 */

// Users (Profile enrichment for Supabase Auth)
export interface User {
  readonly id: string; // UUID, FK auth.users.id
  readonly email: string;
  readonly full_name: string | null;
  readonly avatar_url: string | null;
  readonly company_name: string | null;
  readonly phone: string | null;
  readonly created_at: string; // ISO timestamp
  readonly updated_at: string; // ISO timestamp
  readonly deleted_at: string | null; // ISO timestamp
}

export interface CreateUserInput {
  readonly email: string;
  readonly full_name?: string;
  readonly company_name?: string;
  readonly phone?: string;
}

export interface UpdateUserInput {
  readonly full_name?: string;
  readonly avatar_url?: string;
  readonly company_name?: string;
  readonly phone?: string;
}

// Pricing Tiers
export interface PricingTier {
  readonly id: string; // UUID
  readonly name: 'Free' | 'Pro' | 'Enterprise';
  readonly description: string | null;
  readonly monthly_minutes: number;
  readonly max_concurrent_jobs: number;
  readonly storage_gb: number;
  readonly price_usd_monthly: number; // Decimal as string in API
  readonly stripe_price_id: string | null;
  readonly is_active: boolean;
  readonly created_at: string;
  readonly updated_at: string;
}

// Subscriptions
export type SubscriptionStatus = 'active' | 'trial' | 'past_due' | 'canceled' | 'paused';

export interface Subscription {
  readonly id: string; // UUID
  readonly user_id: string; // UUID, FK users.id
  readonly tier_id: string; // UUID, FK pricing_tiers.id
  readonly status: SubscriptionStatus;
  readonly current_period_start: string; // ISO timestamp
  readonly current_period_end: string; // ISO timestamp
  readonly trial_ends_at: string | null; // ISO timestamp
  readonly canceled_at: string | null; // ISO timestamp
  readonly stripe_subscription_id: string | null;
  readonly stripe_customer_id: string | null;
  readonly stripe_default_payment_method_id: string | null;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface CreateSubscriptionInput {
  readonly user_id: string;
  readonly tier_id: string;
  readonly status?: SubscriptionStatus;
  readonly stripe_subscription_id?: string;
  readonly stripe_customer_id?: string;
}

export interface UpdateSubscriptionInput {
  readonly tier_id?: string;
  readonly status?: SubscriptionStatus;
  readonly current_period_end?: string;
  readonly stripe_subscription_id?: string;
  readonly stripe_default_payment_method_id?: string;
  readonly canceled_at?: string | null;
}

// Features
export interface Feature {
  readonly id: string; // UUID
  readonly key: string; // e.g., 'transcription', 'code_switching'
  readonly name: string;
  readonly description: string | null;
  readonly is_active: boolean;
  readonly created_at: string;
}

// Tier-Feature Junction
export interface TierFeature {
  readonly id: string; // UUID
  readonly tier_id: string; // UUID
  readonly feature_id: string; // UUID
  readonly created_at: string;
}

// Audit Logs
export interface AuditLog {
  readonly id: number; // BIGSERIAL
  readonly table_name: string;
  readonly record_id: string | null; // UUID
  readonly user_id: string | null; // UUID
  readonly action: 'INSERT' | 'UPDATE' | 'DELETE' | 'SYSTEM';
  readonly old_data: Record<string, unknown> | null; // JSONB
  readonly new_data: Record<string, unknown> | null; // JSONB
  readonly error_message: string | null;
  readonly ip_address: string | null; // INET
  readonly user_agent: string | null;
  readonly created_at: string; // ISO timestamp
}

// API Response Envelopes
export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly meta?: Record<string, unknown>;
}

// Repository Result Type
export type RepositoryResult<T> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: ApiError };

// Error Details
export class ApiError extends Error {
  constructor(
    readonly code: string,
    readonly message: string,
    readonly statusCode: number = 500,
    readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static validation(message: string, details?: Record<string, unknown>): ApiError {
    return new ApiError('VALIDATION_ERROR', message, 400, details);
  }

  static notFound(message: string = 'Resource not found'): ApiError {
    return new ApiError('NOT_FOUND', message, 404);
  }

  static unauthorized(message: string = 'Unauthorized'): ApiError {
    return new ApiError('UNAUTHORIZED', message, 401);
  }

  static forbidden(message: string = 'Forbidden'): ApiError {
    return new ApiError('FORBIDDEN', message, 403);
  }

  static database(message: string, code?: string): ApiError {
    return new ApiError('DATABASE_ERROR', message, 500, { code });
  }

  static internal(message: string = 'Internal server error'): ApiError {
    return new ApiError('INTERNAL_ERROR', message, 500);
  }

  static conflict(message: string = 'Resource already exists'): ApiError {
    return new ApiError('CONFLICT', message, 409);
  }
}
