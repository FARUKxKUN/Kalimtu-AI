/**
 * User repository - handles all user profile operations
 * Follows repository pattern with error handling and RLS enforcement
 */

import { SupabaseClient } from '@supabase/supabase-js';
import { User, CreateUserInput, UpdateUserInput, RepositoryResult, ApiError } from '@/lib/types/database';
import { logger } from '@/lib/logger';
import { EmailService } from '@/lib/services/email';

export class UserRepository {
  constructor(private supabaseClient: SupabaseClient) {}

  /**
   * Find user by ID (their own profile or admin lookup)
   */
  async findById(userId: string): Promise<RepositoryResult<User | null>> {
    try {
      const { data, error } = await this.supabaseClient
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        logger.error('Error fetching user', error, { operation: 'findById', userId });
        return {
          success: false,
          error: ApiError.database('Failed to fetch user', error.code)
        };
      }

      return { success: true, data };
    } catch (err) {
      logger.error('Unexpected error fetching user', err as Error, { operation: 'findById' });
      return {
        success: false,
        error: ApiError.internal('Unexpected error fetching user')
      };
    }
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<RepositoryResult<User | null>> {
    try {
      const { data, error } = await this.supabaseClient
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        logger.error('Error finding user by email', error, {
          operation: 'findByEmail',
          email: email.toLowerCase()
        });
        return {
          success: false,
          error: ApiError.database('Failed to find user', error.code)
        };
      }

      return { success: true, data };
    } catch (err) {
      logger.error('Unexpected error finding user by email', err as Error);
      return {
        success: false,
        error: ApiError.internal('Unexpected error finding user')
      };
    }
  }

  /**
   * Create user profile (triggered by Supabase Auth, but can be called manually)
   */
  async create(userId: string, input: CreateUserInput): Promise<RepositoryResult<User>> {
    try {
      // Validate email format
      if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
        return {
          success: false,
          error: ApiError.validation('Invalid email format')
        };
      }

      // Check if email already exists
      const existing = await this.findByEmail(input.email);
      if (!existing.success || existing.data) {
        return {
          success: false,
          error: ApiError.conflict('Email already in use')
        };
      }

      const { data, error } = await this.supabaseClient
        .from('users')
        .insert({
          id: userId,
          email: input.email.toLowerCase(),
          full_name: input.full_name || null,
          company_name: input.company_name || null,
          phone: input.phone || null
        })
        .select()
        .single();

      if (error) {
        logger.error('Error creating user', error, { operation: 'create', userId });
        return {
          success: false,
          error: ApiError.database('Failed to create user', error.code)
        };
      }

      logger.info('User profile created', { userId });

      // Send welcome email asynchronously (don't block response)
      EmailService.sendWelcomeEmail(data.email, data.full_name).catch((err) => {
        logger.error('Failed to send welcome email', err as Error, { userId });
      });

      return { success: true, data };
    } catch (err) {
      logger.error('Unexpected error creating user', err as Error);
      return {
        success: false,
        error: ApiError.internal('Unexpected error creating user')
      };
    }
  }

  /**
   * Update user profile
   */
  async update(userId: string, input: UpdateUserInput): Promise<RepositoryResult<User>> {
    try {
      // Validate phone if provided
      if (input.phone && !/^\+?[0-9\s\-\(\)]+$/.test(input.phone)) {
        return {
          success: false,
          error: ApiError.validation('Invalid phone number format')
        };
      }

      const { data, error } = await this.supabaseClient
        .from('users')
        .update({
          full_name: input.full_name,
          avatar_url: input.avatar_url,
          company_name: input.company_name,
          phone: input.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Error updating user', error, { operation: 'update', userId });
        return {
          success: false,
          error: ApiError.database('Failed to update user', error.code)
        };
      }

      logger.info('User profile updated', { userId });
      return { success: true, data };
    } catch (err) {
      logger.error('Unexpected error updating user', err as Error);
      return {
        success: false,
        error: ApiError.internal('Unexpected error updating user')
      };
    }
  }

  /**
   * Soft delete user (doesn't delete auth.users, just marks as deleted)
   */
  async delete(userId: string): Promise<RepositoryResult<User>> {
    try {
      const { data, error } = await this.supabaseClient
        .from('users')
        .update({
          deleted_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Error deleting user', error, { operation: 'delete', userId });
        return {
          success: false,
          error: ApiError.database('Failed to delete user', error.code)
        };
      }

      logger.info('User soft deleted', { userId });
      return { success: true, data };
    } catch (err) {
      logger.error('Unexpected error deleting user', err as Error);
      return {
        success: false,
        error: ApiError.internal('Unexpected error deleting user')
      };
    }
  }

  /**
   * Get all users (admin-only, should be called with service role)
   */
  async findAll(limit: number = 100, offset: number = 0): Promise<RepositoryResult<User[]>> {
    try {
      const { data, error } = await this.supabaseClient
        .from('users')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        logger.error('Error fetching users', error, { operation: 'findAll' });
        return {
          success: false,
          error: ApiError.database('Failed to fetch users', error.code)
        };
      }

      return { success: true, data: data || [] };
    } catch (err) {
      logger.error('Unexpected error fetching users', err as Error);
      return {
        success: false,
        error: ApiError.internal('Unexpected error fetching users')
      };
    }
  }
}
