/**
 * Centralized error handler for API routes
 * Transforms ApiError and other errors into consistent NextResponse objects
 */

import { NextResponse } from 'next/server'
import { ApiError, isApiError } from '@/lib/errors'
import { logger } from '@/lib/logger'
import { ZodError } from 'zod'

/**
 * Handle ApiError - transform to NextResponse with appropriate status code
 */
export function handleApiError(error: ApiError): NextResponse {
  logger.error(error.toString(), undefined, {
    code: error.code,
    context: error.context
  })

  return NextResponse.json(error.toJSON(), {
    status: error.statusCode
  })
}

/**
 * Handle Zod validation errors
 */
export function handleValidationError(error: ZodError): NextResponse {
  const message = error.issues[0]?.message || 'Validation failed'

  logger.warn('Validation error', {
    errorCount: error.issues.length,
    firstError: message
  })

  return NextResponse.json(
    {
      success: false,
      error: message,
      code: 'VALIDATION_ERROR'
    },
    { status: 400 }
  )
}

/**
 * Handle unexpected errors - generic response without leaking details
 */
export function handleUnexpectedError(error: unknown): NextResponse {
  const message = error instanceof Error ? error.message : 'Unknown error'

  logger.error('Unexpected error in API route', error as Error, {
    type: error?.constructor?.name || 'Unknown'
  })

  return NextResponse.json(
    {
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    },
    { status: 500 }
  )
}

/**
 * Unified error handler for API routes
 * Routes should use this in their catch blocks
 */
export function handleError(error: unknown): NextResponse {
  if (isApiError(error)) {
    return handleApiError(error)
  }

  if (error instanceof ZodError) {
    return handleValidationError(error)
  }

  return handleUnexpectedError(error)
}
