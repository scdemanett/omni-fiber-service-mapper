/**
 * Reverse geocoding via Nominatim (OpenStreetMap)
 *
 * - In-process coordinate cache snapped to ~11m grid (4 decimal places)
 *   so that thousands of addresses in the same ZIP area share one API call.
 * - 1.1 s minimum gap between actual Nominatim requests to respect the
 *   1 req/sec usage policy.
 */

export interface ReverseGeocodeResult {
  city: string | null;
  postcode: string | null;
}

function snapCoord(n: number) {
  return Math.round(n * 10000) / 10000;
}

const cache = new Map<string, ReverseGeocodeResult>();
let lastRequestTime = 0;
const NOMINATIM_DELAY_MS = 1100;

export async function reverseGeocode(
  lat: number,
  lon: number,
): Promise<ReverseGeocodeResult> {
  const key = `${snapCoord(lat)},${snapCoord(lon)}`;

  if (cache.has(key)) {
    return cache.get(key)!;
  }

  // Enforce ≥1.1 s between outbound requests
  const wait = NOMINATIM_DELAY_MS - (Date.now() - lastRequestTime);
  if (wait > 0) {
    await new Promise((resolve) => setTimeout(resolve, wait));
  }
  lastRequestTime = Date.now();

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          'User-Agent': 'fiber-service-mapper/1.0',
          Accept: 'application/json',
        },
      },
    );

    if (!res.ok) {
      // Don't cache non-ok responses (e.g. 429 rate-limit, 503) so the
      // coordinate can be retried on the next enrichment run.
      console.warn(`Nominatim ${res.status} for (${lat}, ${lon})`);
      return { city: null, postcode: null };
    }

    const data = await res.json();
    const addr = data.address ?? {};

    const result: ReverseGeocodeResult = {
      city:
        addr.city ??
        addr.town ??
        addr.village ??
        addr.hamlet ??
        addr.suburb ??
        addr.municipality ??   // Ohio/Midwest civil townships (e.g. "Concord Township")
        addr.county ??         // last resort — broad but better than nothing
        null,
      postcode: addr.postcode ?? null,
    };

    cache.set(key, result);
    return result;
  } catch (err) {
    console.warn(`Nominatim fetch failed for (${lat}, ${lon}):`, err);
    // Don't cache errors so they can be retried
    return { city: null, postcode: null };
  }
}

/** Clear the in-process coordinate cache (useful in tests). */
export function clearReverseGeocodeCache() {
  cache.clear();
}
