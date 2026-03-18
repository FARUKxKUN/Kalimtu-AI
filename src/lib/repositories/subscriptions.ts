/**
 * Subscription repository - manages user subscription lifecycle
 * Integrates with Stripe webhook updates
 */

import { SupabaseClient } from '@supabase/supabase-js';
import {
  Subscription,
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  RepositoryResult,
  ApiError,
  PricingTier,
  User
} from '@/lib/types/database';
import { logger } from '@/lib/logger';
import { EmailService } from '@/lib/services/email';

export class SubscriptionRepository {
  constructor(private supabaseClient: SupabaseClient) {}

  /**
   * Get subscription by user ID
   */
  async findByUserId(userId: string): Promise<RepositoryResult<Subscription | null>> {
    try {
      const { data, error } = await this.supabaseClient
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        logger.error('Error fetching subscription', error, { operation: 'findByUserId', userId });
        return {
          success: false,
          error: ApiError.database('Failed to fetch subscription', error.code)
        };
      }

      return { success: true, data };
    } catch (err) {
      logger.error('Unexpected error fetching subscription', err as Error);
      return {
        success: false,
        error: ApiError.internal('Unexpected error fetching subscription')
      };
    }
  }

  /**
   * Get subscription with tier details (joined query)
   */
  async findWithTierByUserId(userId: string): Promise<RepositoryResult<(Subscription & { tier: PricingTier }) | null>> {
    try {
      const { data, error } = await this.supabaseClient
        .from('subscriptions')
        .select(`
          *,
          tier:pricing_tiers (
            id,
            name,
            description,
            monthly_minutes,
            max_concurrent_jobs,
            storage_gb,
            price_usd_monthly,
            stripe_price_id,
            is_active,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        logger.error('Error fetching subscription with tier', error, { operation: 'findWithTierByUserId', userId });
        return {
          success: false,
          error: ApiError.database('Failed to fetch subscription', error.code)
        };
      }

      return { success: true, data: data as (Subscription & { tier: PricingTier }) | null };
    } catch (err) {
      logger.error('Unexpected error fetching subscription with tier', err as Error);
      return {
        success: false,
        error: ApiError.internal('Unexpected error fetching subscription')
      };
    }
  }

  /**
   * Find by Stripe subscription ID (for webhook updates)
   */
  async findByStripeId(stripeSubscriptionId: string): Promise<RepositoryResult<Subscription | null>> {
    try {
      const { data, error } = await this.supabaseClient
        .from('subscriptions')
        .select('*')
        .eq('stripe_subscription_id', stripeSubscriptionId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        logger.error('Error finding subscription by Stripe ID', error, {
          operation: 'findByStripeId'
        });
        return {
          success: false,
          error: ApiError.database('Failed to find subscription', error.code)
        };
      }

      return { success: true, data };
    } catch (err) {
      logger.error('Unexpected error finding subscription by Stripe ID', err as Error);
      return {
        success: false,
        error: ApiError.internal('Unexpected error finding subscription')
      };
    }
  }

  /**
   * Create subscription (usually called after user signup)
   */
  async create(input: CreateSubscriptionInput): Promise<RepositoryResult<Subscription>> {
    try {
      // Validate tier exists
      const tierResult = await this.validateTierExists(input.tier_id);
      if (!tierResult) {
        return {
          success: false,
          error: ApiError.validation('Invalid pricing tier')
        };
      }

      const { data, error } = await this.supabaseClient
        .from('subscriptions')
        .insert({
          user_id: input.user_id,
          tier_id: input.tier_id,
          status: input.status || 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          stripe_subscription_id: input.stripe_subscription_id || null,
          stripe_customer_id: input.stripe_customer_id || null
        })
        .select()
        .single();

      if (error) {
        logger.error('Error creating subscription', error, { operation: 'create', userId: input.user_id });
        return {
          success: false,
          error: ApiError.database('Failed to create subscription', error.code)
        };
      }

      logger.info('Subscription created', { userId: input.user_id, tierId: input.tier_id });

      // Fetch user email and send confirmation (asynchronously)
      const userResult = await this.supabaseClient
        .from('users')
        .select('email, full_name')
        .eq('id', input.user_id)
        .single();

      if (userResult.data) {
        const tierName = await this.getTierName(input.tier_id);
        EmailService.sendSubscriptionConfirmation(
          userResult.data.email,
          tierName || 'Premium',
          userResult.data.full_name
        ).catch((err) => {
          logger.error('Failed to send subscription confirmation', err as Error, { userId: input.user_id });
        });
      }

      return { success: true, data };
    } catch (err) {
      logger.error('Unexpected error creating subscription', err as Error);
      return {
        success: false,
        error: ApiError.internal('Unexpected error creating subscription')
      };
    }
  }

  /**
   * Update subscription (e.g., tier upgrade, status change from Stripe webhook)
   */
  async update(subscriptionId: string, input: UpdateSubscriptionInput): Promise<RepositoryResult<Subscription>> {
    try {
      // Validate tier if changing
      if (input.tier_id) {
        const tierValid = await this.validateTierExists(input.tier_id);
        if (!tierValid) {
          return {
            success: false,
            error: ApiError.validation('Invalid pricing tier')
          };
        }
      }

      const updateData: Record<string, unknown> = {
        updated_at: new Date().toISOString()
      };

      if (input.tier_id) updateData.tier_id = input.tier_id;
      if (input.status) updateData.status = input.status;
      if (input.current_period_end) updateData.current_period_end = input.current_period_end;
      if (input.stripe_subscription_id) updateData.stripe_subscription_id = input.stripe_subscription_id;
      if (input.stripe_default_payment_method_id)
        updateData.stripe_default_payment_method_id = input.stripe_default_payment_method_id;
      if (input.canceled_at !== undefined) updateData.canceled_at = input.canceled_at;

      const { data, error } = await this.supabaseClient
        .from('subscriptions')
        .update(updateData)
        .eq('id', subscriptionId)
        .select()
        .single();

      if (error) {
        logger.error('Error updating subscription', error, { operation: 'update', subscriptionId });
        return {
          success: false,
          error: ApiError.database('Failed to update subscription', error.code)
        };
      }

      logger.info('Subscription updated', { subscriptionId });

      // Send cancellation email if status changed to canceled
      if (input.status === 'canceled') {
        const userResult = await this.supabaseClient
          .from('users')
          .select('email, full_name')
          .eq('id', data.user_id)
          .single();

        if (userResult.data) {
          EmailService.sendCancellationNotice(userResult.data.email, userResult.data.full_name).catch((err) => {
            logger.error('Failed to send cancellation notice', err as Error, { subscriptionId });
          });
        }
      }

      return { success: true, data };
    } catch (err) {
      logger.error('Unexpected error updating subscription', err as Error);
      return {
        success: false,
        error: ApiError.internal('Unexpected error updating subscription')
      };
    }
  }

  /**
   * Get all active subscriptions (admin, pagination)
   */
  async findAllActive(limit: number = 100, offset: number = 0): Promise<RepositoryResult<Subscription[]>> {
    try {
      const { data, error } = await this.supabaseClient
        .from('subscriptions')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        logger.error('Error fetching active subscriptions', error, { operation: 'findAllActive' });
        return {
          success: false,
          error: ApiError.database('Failed to fetch subscriptions', error.code)
        };
      }

      return { success: true, data: data || [] };
    } catch (err) {
      logger.error('Unexpected error fetching active subscriptions', err as Error);
      return {
        success: false,
        error: ApiError.internal('Unexpected error fetching subscriptions')
      };
    }
  }

  /**
   * Helper: Validate tier exists
   */
  private async validateTierExists(tierId: string): Promise<boolean> {
    try {
      const { data } = await this.supabaseClient
        .from('pricing_tiers')
        .select('id')
        .eq('id', tierId)
        .eq('is_active', true)
        .single();

      return !!data;
    } catch {
      return false;
    }
  }

  /**
   * Helper: Get tier name by ID
   */
  private async getTierName(tierId: string): Promise<string | null> {
    try {
      const { data } = await this.supabaseClient
        .from('pricing_tiers')
        .select('name')
        .eq('id', tierId)
        .single();

      return data?.name || null;
    } catch {
      return null;
    }
  }
}
