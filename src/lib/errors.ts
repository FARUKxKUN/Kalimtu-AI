/**
 * Centralized error handling for API routes
 * All application errors should be expressed as ApiError
 */

export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'RATE_LIMIT_ERROR'
  | 'NOT_FOUND'
  | 'DUPLICATE_ENTRY'
  | 'INTERNAL_ERROR'
  | 'DATABASE_ERROR'
  | 'EMAIL_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'

export class ApiError extends Error {
  readonly statusCode: number
  readonly code: ApiErrorCode
  readonly context: Record<string, unknown>

  constructor(
    statusCode: number,
    code: ApiErrorCode,
    message: string,
    context: Record<string, unknown> = {}
  ) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.code = code
    this.context = context
    Object.setPrototypeOf(this, ApiError.prototype)
  }

  // Factory methods for common error scenarios
  static validation(message: string, details?: Record<string, unknown>): ApiError {
    return new ApiError(400, 'VALIDATION_ERROR', message, details)
  }

  static rateLimit(resetInSeconds: number): ApiError {
    return new ApiError(429, 'RATE_LIMIT_ERROR', 'Too many requests. Please try again later.', {
      resetInSeconds
    })
  }

  static notFound(resource: string): ApiError {
    return new ApiError(404, 'NOT_FOUND', `${resource} not found`)
  }

  static duplicate(resource: string, details?: Record<string, unknown>): ApiError {
    return new ApiError(409, 'DUPLICATE_ENTRY', `${resource} already exists`, details)
  }

  static internal(message: string = 'Internal server error'): ApiError {
    return new ApiError(500, 'INTERNAL_ERROR', message)
  }

  static database(message: string, code?: string): ApiError {
    return new ApiError(500, 'DATABASE_ERROR', message, code ? { code } : {})
  }

  static email(message: string): ApiError {
    return new ApiError(500, 'EMAIL_ERROR', message)
  }

  static unauthorized(message: string = 'Unauthorized'): ApiError {
    return new ApiError(401, 'UNAUTHORIZED', message)
  }

  static forbidden(message: string = 'Forbidden'): ApiError {
    return new ApiError(403, 'FORBIDDEN', message)
  }

  toJSON() {
    return {
      success: false,
      error: this.message,
      code: this.code
    }
  }

  toString(): string {
    return `[${this.code}] ${this.message}`
  }
}

/**
 * Type guard to check if an error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}
