import type { ServiceabilityResult } from '../fiber-decoder';

/**
 * Configuration and adapter interface for a single ISP provider.
 *
 * Each provider encapsulates its own API call and response decoding so the
 * rest of the system stays provider-agnostic.
 */
export interface ProviderConfig {
  /** Slug stored in the database, e.g. "omni-fiber". Never change after data exists. */
  id: string;

  /** Human-readable display name shown in UI, e.g. "Omni Fiber". */
  name: string;

  /** URL for users at addresses with no current service to register interest. Omit if the provider has no such form. */
  futureServiceUrl?: string;

  /**
   * Referral / order link. Optional — set from env at runtime so the URL
   * stays out of source code and can differ per deployment.
   */
  referralUrl?: string;

  /** Whether this provider is a placeholder stub (not yet implemented). */
  isStub?: boolean;

  /**
   * Optional per-provider rate-limit overrides for the batch processor.
   * Values here take precedence over the BATCH_DELAY_MS / BATCH_MAX_IN_FLIGHT
   * environment variables so aggressive providers can stay fast while
   * sensitive APIs are kept polite without touching global config.
   */
  rateLimit?: {
    /** Minimum ms between request starts (start-to-start). */
    delayMs?: number;
    /** Maximum concurrent in-flight API requests. */
    maxInFlight?: number;
  };

  /** Fetch raw serviceability data from the provider API for a given address. Returns null on failure. */
  fetch: (address: string) => Promise<unknown | null>;

  /** Decode a raw API response into a normalized ServiceabilityResult. */
  decode: (raw: unknown) => ServiceabilityResult;
}
