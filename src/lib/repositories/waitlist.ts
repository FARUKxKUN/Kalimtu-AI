/**
 * Repository pattern for waitlist data access
 * Encapsulates all Supabase operations and error handling
 */

import { SupabaseClient } from '@supabase/supabase-js'
import { ApiError } from '@/lib/errors'
import { logger } from '@/lib/logger'

/**
 * Full database schema for waitlist entries
 * (extends the public WaitlistEntry type from types.ts with DB-specific fields)
 */
export interface WaitlistEntryDB {
  id: string
  email: string
  position: number
  source: string
  created_at: string
  updated_at: string
}

export interface CreateWaitlistEntryInput {
  email: string
  source: string
}

/**
 * Result type for repository operations
 * Either success with data or error with ApiError
 */
export type RepositoryResult<T> = { success: true; data: T } | { success: false; error: ApiError }

export class WaitlistRepository {
  constructor(private supabaseAdmin: SupabaseClient) {}

  /**
   * Find existing waitlist entry by email
   * Returns null if not found (success case with null data)
   */
  async findByEmail(email: string): Promise<RepositoryResult<WaitlistEntryDB | null>> {
    try {
      const { data, error } = await this.supabaseAdmin
        .from('waitlist')
        .select('*')
        .eq('email', email.toLowerCase())
        .maybeSingle()

      // PGRST116 = not found, which is a success case with null data
      if (error && error.code !== 'PGRST116') {
        logger.error('Database error while finding email', error, {
          operation: 'findByEmail',
          email: email.toLowerCase()
        })
        return {
          success: false,
          error: ApiError.database('Failed to check email availability', error.code)
        }
      }

      return { success: true, data }
    } catch (err) {
      logger.error('Unexpected error while finding email', err as Error, {
        operation: 'findByEmail'
      })
      return {
        success: false,
        error: ApiError.internal('Unexpected error checking email')
      }
    }
  }

  /**
   * Create new waitlist entry
   */
  async create(input: CreateWaitlistEntryInput): Promise<RepositoryResult<WaitlistEntryDB>> {
    try {
      // Get current count to determine position
      const countResult = await this.getCount()
      const position = countResult.success ? countResult.data + 1 : 1

      const { data, error } = await this.supabaseAdmin
        .from('waitlist')
        .insert({
          email: input.email.toLowerCase(),
          position,
          source: input.source
        })
        .select()
        .single()

      if (error) {
        logger.error('Database error while creating entry', error, {
          operation: 'create',
          email: input.email.toLowerCase()
        })
        return {
          success: false,
          error: ApiError.database('Failed to create waitlist entry', error.code)
        }
      }

      return { success: true, data }
    } catch (err) {
      logger.error('Unexpected error while creating entry', err as Error, {
        operation: 'create'
      })
      return {
        success: false,
        error: ApiError.internal('Unexpected error creating waitlist entry')
      }
    }
  }

  /**
   * Get current waitlist count
   */
  async getCount(): Promise<RepositoryResult<number>> {
    try {
      const { count, error } = await this.supabaseAdmin
        .from('waitlist')
        .select('*', { count: 'exact', head: true })

      if (error) {
        logger.error('Database error while counting entries', error, {
          operation: 'getCount'
        })
        return {
          success: false,
          error: ApiError.database('Failed to get waitlist count', error.code)
        }
      }

      return { success: true, data: count || 0 }
    } catch (err) {
      logger.error('Unexpected error while counting entries', err as Error, {
        operation: 'getCount'
      })
      return {
        success: false,
        error: ApiError.internal('Unexpected error getting waitlist count')
      }
    }
  }

  /**
   * Get all waitlist entries (admin only)
   */
  async findAll(): Promise<RepositoryResult<WaitlistEntryDB[]>> {
    try {
      const { data, error } = await this.supabaseAdmin
        .from('waitlist')
        .select('*')
        .order('position', { ascending: true })

      if (error) {
        logger.error('Database error while fetching all entries', error, {
          operation: 'findAll'
        })
        return {
          success: false,
          error: ApiError.database('Failed to fetch waitlist', error.code)
        }
      }

      return { success: true, data: data || [] }
    } catch (err) {
      logger.error('Unexpected error while fetching all entries', err as Error, {
        operation: 'findAll'
      })
      return {
        success: false,
        error: ApiError.internal('Unexpected error fetching waitlist')
      }
    }
  }
}
