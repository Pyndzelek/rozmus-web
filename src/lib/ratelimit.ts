interface RateLimitEntry {
  count: number;
  resetTime: number;
  lastAttempt: number;
}

class InMemoryRateLimit {
  private store: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly blockDurationMs: number;

  constructor(
    maxRequests: number = 5,
    windowMs: number = 3600000,
    blockDurationMs: number = 900000
  ) {
    this.maxRequests = maxRequests; // 5 requests
    this.windowMs = windowMs; // 1 hour window
    this.blockDurationMs = blockDurationMs; // 15 minutes block

    // Clean up old entries every 10 minutes
    setInterval(() => this.cleanup(), 600000);
  }

  async limit(
    identifier: string
  ): Promise<{ success: boolean; remaining?: number; reset?: number }> {
    const now = Date.now();
    const key = this.hashIdentifier(identifier);

    let entry = this.store.get(key);

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired one
      entry = {
        count: 0,
        resetTime: now + this.windowMs,
        lastAttempt: now,
      };
    }

    // Check if user is currently blocked
    if (
      entry.count >= this.maxRequests &&
      now < entry.lastAttempt + this.blockDurationMs
    ) {
      return {
        success: false,
        remaining: 0,
        reset: entry.lastAttempt + this.blockDurationMs,
      };
    }

    // Reset count if block period has passed
    if (
      entry.count >= this.maxRequests &&
      now >= entry.lastAttempt + this.blockDurationMs
    ) {
      entry.count = 0;
      entry.resetTime = now + this.windowMs;
    }

    entry.count++;
    entry.lastAttempt = now;
    this.store.set(key, entry);

    if (entry.count > this.maxRequests) {
      return {
        success: false,
        remaining: 0,
        reset: now + this.blockDurationMs,
      };
    }

    return {
      success: true,
      remaining: Math.max(0, this.maxRequests - entry.count),
      reset: entry.resetTime,
    };
  }

  private hashIdentifier(identifier: string): string {
    // Simple hash function (in production, consider using crypto.createHash)
    let hash = 0;
    for (let i = 0; i < identifier.length; i++) {
      const char = identifier.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      // Remove entries that are older than the block duration + window
      if (now > entry.lastAttempt + this.blockDurationMs + this.windowMs) {
        this.store.delete(key);
      }
    }
  }

  // Method to get current status without incrementing
  async check(
    identifier: string
  ): Promise<{ remaining: number; reset: number; blocked: boolean }> {
    const now = Date.now();
    const key = this.hashIdentifier(identifier);
    const entry = this.store.get(key);

    if (!entry || now > entry.resetTime) {
      return {
        remaining: this.maxRequests,
        reset: now + this.windowMs,
        blocked: false,
      };
    }

    const blocked =
      entry.count >= this.maxRequests &&
      now < entry.lastAttempt + this.blockDurationMs;

    return {
      remaining: Math.max(0, this.maxRequests - entry.count),
      reset: blocked
        ? entry.lastAttempt + this.blockDurationMs
        : entry.resetTime,
      blocked,
    };
  }
}

export const ratelimit = new InMemoryRateLimit();
