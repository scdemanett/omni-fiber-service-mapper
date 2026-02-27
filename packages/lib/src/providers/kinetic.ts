import https from 'https';
import crypto from 'crypto';
import type { ProviderConfig } from './types';
import type { ServiceabilityResult } from '../fiber-decoder';

/**
 * Kinetic (Windstream) provider adapter.
 *
 * Auth flow:
 *   1. POST /api/v1/auth/session?context=residential  (Basic kinetic:SecuRe!CoNneCt1)
 *      → returns a short-lived JWT Bearer token (1-hour TTL)
 *   2. POST /api/v1/address/search  (Bearer + x-resource-id)
 *      → returns dfAddressId, techType, validationResult, uqualProvisioningResult, …
 *
 * Service is determined entirely from the address/search response — no need to
 * call product-availability for the service mapper use-case.
 *
 * Service classification:
 *   techType = FIBER                             → serviceable  (fiber available)
 *   techType = COPPER + householdSegmentType=DSL → none         (DSL-suppressed territory)
 *   validationResult = AddressNeedsFix / *Unserviceable* / empty dfAddressId → none
 */

const BASE_URL = 'https://buy.gokinetic.com';
const BASIC_CREDS = Buffer.from('kinetic:SecuRe!CoNneCt1').toString('base64');

const agent = new https.Agent({ keepAlive: true, maxSockets: 8, maxFreeSockets: 8 });

// ---------------------------------------------------------------------------
// Token cache — one shared token, refreshed before expiry
// ---------------------------------------------------------------------------
let cachedToken: string | null = null;
let tokenExpiresAt = 0; // epoch ms
let tokenRefreshInFlight: Promise<string> | null = null; // prevents parallel refresh races

async function getToken(): Promise<string> {
  // Fast path: cached token is still valid.
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  // If a refresh is already in progress, wait for it instead of firing another.
  if (tokenRefreshInFlight) {
    return tokenRefreshInFlight;
  }

  tokenRefreshInFlight = (async () => {
    try {
      const body = JSON.stringify({ brazeDeviceId: crypto.randomUUID() });
      const raw = await httpPost(
        `${BASE_URL}/api/v1/auth/session?context=residential`,
        body,
        { Authorization: `Basic ${BASIC_CREDS}` }
      );

      const json = JSON.parse(raw) as { token?: string };
      if (!json.token) throw new Error('[kinetic] auth/session returned no token');

      // JWT payload contains "exp" (epoch seconds).
      const payloadB64 = json.token.split('.')[1];
      const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString()) as {
        exp?: number;
      };
      tokenExpiresAt = (payload.exp ?? 0) * 1000;
      cachedToken = json.token;
      return json.token;
    } finally {
      tokenRefreshInFlight = null;
    }
  })();

  return tokenRefreshInFlight;
}

// ---------------------------------------------------------------------------
// Generic HTTPS POST helper — returns response body as string, rejects on non-2xx
// ---------------------------------------------------------------------------
function httpPost(
  url: string,
  body: string,
  extraHeaders: Record<string, string> = {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(
      {
        agent,
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: parsed.pathname + parsed.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          ...extraHeaders,
        },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (c: Buffer) => chunks.push(c));
        res.on('end', () => {
          const responseBody = Buffer.concat(chunks).toString('utf-8');
          const status = res.statusCode ?? 0;
          if (status < 200 || status >= 300) {
            // Reject so the caller's try/catch treats this as a real error,
            // not a "no service" result. Include the body for diagnostics.
            reject(new Error(`[kinetic] HTTP ${status}: ${responseBody.substring(0, 200)}`));
          } else {
            resolve(responseBody);
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Address search
// ---------------------------------------------------------------------------

/** Raw shape of the fields we care about from /api/v1/address/search */
export interface KineticAddressSearchResponse {
  dfAddressId?: string;
  validationResult?: string;
  techType?: string;
  maxQual?: string;
  errorCode?: number;
  address?: {
    householdSegmentType?: string;
    marketSegmentType?: string;
    billingStatus?: string;
  };
  addressCandidates?: unknown[];
}

async function fetchAddressSearch(address: string): Promise<KineticAddressSearchResponse | null> {
  const parsed = parseAddress(address);
  const body = JSON.stringify(parsed);

  // Attempt the address search, retrying once on 403.
  // Kinetic appears to impose a per-session quota: the first 403 is the signal
  // to rotate the auth token. We clear the cache, pause briefly, then retry
  // with a fresh token before giving up.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const token = await getToken();
      const resourceId = crypto.createHash('sha256').update(token).digest('hex');

      const raw = await httpPost(`${BASE_URL}/api/v1/address/search`, body, {
        Authorization: `Bearer ${token}`,
        'x-resource-id': resourceId,
      });

      return JSON.parse(raw) as KineticAddressSearchResponse;
    } catch (err) {
      const is403 = err instanceof Error && err.message.includes('HTTP 403');

      if (is403 && attempt === 0) {
        // Force token rotation and wait before retrying.
        console.warn('[kinetic] 403 on address/search — rotating token and retrying in 10 s');
        cachedToken = null;
        tokenExpiresAt = 0;
        await new Promise((r) => setTimeout(r, 10_000));
        continue;
      }

      console.error('[kinetic] address search error:', err);
      return null;
    }
  }

  return null;
}

/**
 * Parse a free-text address string into the fields Kinetic expects.
 *
 * Handles two formats:
 *
 * 1. Comma-separated (manually typed or test addresses):
 *      "993 Stanhope-Kelloggsville Rd, Dorset, OH 44032"
 *
 * 2. Space-separated, all-caps (OpenAddresses.io / our GeoJSON pipeline):
 *      "993 STANHOPE-KELLOGGSVILLE RD DORSET OH 44032"
 *
 *    For format 2, we:
 *      a. Strip the ZIP (last token: 5 digits) and STATE (token before ZIP: 2 letters).
 *      b. Find the last occurrence of a common street-type abbreviation in the
 *         remaining text — everything up to and including that token is the street,
 *         everything after is the city.
 *      c. If no recognizable street type is found, the whole remaining string is
 *         sent as addressLine1 (the API handles it best-effort).
 */
function parseAddress(address: string): {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
} {
  const normalized = address.trim();

  // ── Format 1: comma-separated ────────────────────────────────────────────
  // "123 Main St, City, ST 12345"  or  "123 Main St, City ST 12345"
  const commaMatch = normalized.match(
    /^(.+?),\s*(.+?),?\s+([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/i
  );
  if (commaMatch) {
    return {
      addressLine1: commaMatch[1].trim(),
      addressLine2: '',
      city: commaMatch[2].trim(),
      state: commaMatch[3].toUpperCase(),
      postalCode: commaMatch[4],
    };
  }

  // ── Format 2: space-separated (OpenAddresses / GeoJSON pipeline) ─────────
  // "993 STANHOPE-KELLOGGSVILLE RD DORSET OH 44032"
  const spaceMatch = normalized.match(
    /^(.+?)\s+([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/i
  );
  if (spaceMatch) {
    const beforeStateZip = spaceMatch[1].trim();
    const state = spaceMatch[2].toUpperCase();
    const postalCode = spaceMatch[3];

    // Find the last token that is a standard street-type abbreviation.
    // Everything from the start through that token → addressLine1.
    // Everything after → city  (handles multi-word cities like "EAST CLEVELAND").
    const suffixPattern =
      /\b(ALY|AVE|BLVD|BYP|CIR|CT|CV|DR|EST|EXPY|EXT|FWY|HWY|IS|JCT|LN|LOOP|PASS|PKWY|PL|PLZ|PT|RD|ROW|SQ|SR|ST|STA|SPUR|TER|TPKE|TRL|VIA|VIS|WAY|XING)\b/gi;

    let lastSuffixEnd = -1;
    let m: RegExpExecArray | null;
    while ((m = suffixPattern.exec(beforeStateZip)) !== null) {
      lastSuffixEnd = m.index + m[0].length;
    }

    if (lastSuffixEnd > 0) {
      const streetPart = beforeStateZip.substring(0, lastSuffixEnd).trim();
      const cityPart = beforeStateZip.substring(lastSuffixEnd).trim();
      if (cityPart) {
        return { addressLine1: streetPart, addressLine2: '', city: cityPart, state, postalCode };
      }
    }

    // No recognisable street suffix — send everything as addressLine1 with
    // the state and ZIP we already found (better than nothing).
    return { addressLine1: beforeStateZip, addressLine2: '', city: '', state, postalCode };
  }

  // ── Fallback ──────────────────────────────────────────────────────────────
  return { addressLine1: normalized, addressLine2: '', city: '', state: '', postalCode: '' };
}

// ---------------------------------------------------------------------------
// Decode
// ---------------------------------------------------------------------------

/**
 * Map a KineticAddressSearchResponse to the normalized ServiceabilityResult.
 *
 * Kinetic service tiers:
 *   - techType=FIBER           → serviceable (fiber available today)
 *   - techType=COPPER, DSL     → none        (DSL-suppressed, no direct signup)
 *   - all other / unrecognized → none        (outside footprint)
 *
 * The "preorder" state does not appear to be surfaced by Kinetic's address
 * search API at this time; if Kinetic adds a futureQual / planned-fiber
 * indicator this can be extended.
 */
function decodeKineticResponse(raw: unknown): ServiceabilityResult {
  const defaultResult: ServiceabilityResult = {
    serviceable: false,
    serviceabilityType: 'none',
  };

  try {
    const r = raw as KineticAddressSearchResponse;

    if (!r || typeof r !== 'object') return defaultResult;

    const validationResult = r.validationResult ?? '';
    const techType = (r.techType ?? '').toUpperCase();
    const householdSegment = (r.address?.householdSegmentType ?? '').toUpperCase();

    // Address not found / outside territory
    const unserviceableResults = [
      'AddressNeedsFix',
      'AddressNotFound',
      'AddressUnserviceableInTerritory',
      'AddressUnserviceableOutOfTerritory',
      'ZipCodeWithinFootprintNotFound',
      'UqualNotReachable',
      'UQualDbNotReachable',
    ];
    if (!validationResult || unserviceableResults.includes(validationResult) || !r.dfAddressId) {
      return defaultResult;
    }

    if (techType === 'FIBER') {
      return {
        serviceable: true,
        serviceabilityType: 'serviceable',
        matchType: validationResult,
        status: r.maxQual,
      };
    }

    // Copper / DSL territory — Kinetic has infrastructure but sells DSL via partner
    if (techType === 'COPPER' && householdSegment === 'DSL') {
      return {
        serviceable: false,
        serviceabilityType: 'none',
        matchType: validationResult,
        status: r.maxQual,
      };
    }

    // Copper (non-DSL-suppressed) or any unknown tech — not fiber-serviceable
    return {
      serviceable: false,
      serviceabilityType: 'none',
      matchType: validationResult,
      status: r.maxQual,
    };
  } catch (err) {
    console.error('[kinetic] decode error:', err);
    return defaultResult;
  }
}

// ---------------------------------------------------------------------------
// ProviderConfig export
// ---------------------------------------------------------------------------

const kinetic: ProviderConfig = {
  id: 'kinetic',
  name: 'Kinetic',
  referralUrl: undefined,
  isStub: false,

  // Kinetic's consumer signup API rate-limits aggressively (~20 req/min observed).
  // 1 in-flight + 3 s between starts ≈ 20 req/min — stays safely under the limit.
  // A 403 mid-batch triggers a token rotation + 10 s pause then a single retry.
  rateLimit: {
    delayMs: 3000,
    maxInFlight: 1,
  },

  fetch: (address: string) => fetchAddressSearch(address),

  decode: (raw: unknown) => decodeKineticResponse(raw),
};

export default kinetic;
