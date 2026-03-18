/**
 * Structured logging utility
 * Replaces scattered console.log/error calls with a centralized logger
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
}

class Logger {
  private logLevel: LogLevel

  constructor() {
    const envLogLevel = (process.env.LOG_LEVEL || 'info') as LogLevel
    this.logLevel = envLogLevel || 'info'
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.logLevel]
  }

  private format(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
    const timestamp = new Date().toISOString()

    // Include error stack in development, but not in production logs
    const errorContext = error
      ? {
          errorMessage: error.message,
          errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }
      : {}

    const logEntry = {
      timestamp,
      level,
      message,
      ...context,
      ...errorContext
    }

    return JSON.stringify(logEntry)
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog('debug')) return
    console.debug(this.format('debug', message, context))
  }

  info(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog('info')) return
    console.info(this.format('info', message, context))
  }

  warn(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog('warn')) return
    console.warn(this.format('warn', message, context))
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {
    if (!this.shouldLog('error')) return

    const err = error instanceof Error ? error : new Error(String(error))
    console.error(this.format('error', message, context, err))
  }
}

// Singleton instance
export const logger = new Logger()
