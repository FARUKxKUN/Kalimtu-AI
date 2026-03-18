import { WAITLIST } from "./constants";

// In-memory rate limiter for serverless (resets on cold start, which is acceptable)
// For production at scale, swap to Upstash Redis
const requestMap = new Map<string, readonly number[]>();

interface RateLimitResult {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly resetIn: number;
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const windowStart = now - WAITLIST.RATE_LIMIT_WINDOW_MS;

  // Get existing timestamps, filter to current window (immutable)
  const existing = requestMap.get(identifier) ?? [];
  const recentRequests = existing.filter((ts) => ts > windowStart);

  if (recentRequests.length >= WAITLIST.MAX_REQUESTS_PER_MINUTE) {
    const oldestInWindow = recentRequests[0] ?? now;
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil((oldestInWindow + WAITLIST.RATE_LIMIT_WINDOW_MS - now) / 1000),
    };
  }

  // Add current request timestamp (new array, no mutation)
  requestMap.set(identifier, [...recentRequests, now]);

  return {
    allowed: true,
    remaining: WAITLIST.MAX_REQUESTS_PER_MINUTE - recentRequests.length - 1,
    resetIn: Math.ceil(WAITLIST.RATE_LIMIT_WINDOW_MS / 1000),
  };
}
