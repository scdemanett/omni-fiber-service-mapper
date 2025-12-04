/**
 * GeoJSON Parser - Handles both FeatureCollection and line-delimited GeoJSON
 * from OpenAddress.io
 */

export interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    hash?: string;
    number?: string;
    street?: string;
    unit?: string;
    city?: string;
    district?: string;
    region?: string;
    postcode?: string;
    id?: string;
    [key: string]: unknown;
  };
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export interface ParsedAddress {
  longitude: number;
  latitude: number;
  number: string | null;
  street: string | null;
  unit: string | null;
  city: string | null;
  region: string | null;
  postcode: string | null;
  addressString: string;
  properties: string; // JSON string of all properties
}

/**
 * Format a GeoJSON feature into an address string for API calls
 */
export function formatAddressString(feature: GeoJSONFeature): string {
  const props = feature.properties || {};
  const number = props.number || '';
  const street = props.street || '';
  const unit = (props.unit || '').trim();
  const city = props.city || '';
  const region = props.region || '';
  const postcode = props.postcode || '';

  // Build address string
  const addressParts: string[] = [];
  if (number) addressParts.push(number);
  if (street) addressParts.push(street);
  if (unit) addressParts.push(unit);
  if (city) addressParts.push(city);
  if (region) addressParts.push(region);
  if (postcode) addressParts.push(postcode);

  return addressParts.join(' ').toUpperCase();
}

/**
 * Parse a GeoJSON feature into a database-ready format
 */
export function parseFeature(feature: GeoJSONFeature): ParsedAddress | null {
  try {
    const coords = feature.geometry?.coordinates;
    if (!coords || coords.length < 2) {
      return null;
    }

    const props = feature.properties || {};

    return {
      longitude: coords[0],
      latitude: coords[1],
      number: props.number || null,
      street: props.street || null,
      unit: props.unit || null,
      city: props.city || null,
      region: props.region || null,
      postcode: props.postcode || null,
      addressString: formatAddressString(feature),
      properties: JSON.stringify(props),
    };
  } catch {
    return null;
  }
}

/**
 * Parse GeoJSON content - handles both FeatureCollection and line-delimited format
 * Uses streaming to handle large files efficiently
 */
export function* parseGeoJSONContent(content: string): Generator<GeoJSONFeature> {
  // First try to parse as a full JSON document (FeatureCollection)
  const trimmed = content.trim();
  
  if (trimmed.startsWith('{')) {
    // Try parsing as FeatureCollection first
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed.type === 'FeatureCollection' && Array.isArray(parsed.features)) {
        for (const feature of parsed.features) {
          yield feature;
        }
        return;
      } else if (parsed.type === 'Feature') {
        // Single feature
        yield parsed;
        return;
      }
    } catch {
      // Not valid JSON as a whole, try line-by-line
    }
  }

  // Parse as line-delimited GeoJSON (OpenAddress.io format)
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    try {
      const feature = JSON.parse(trimmedLine);
      if (feature.type === 'Feature') {
        yield feature;
      }
    } catch {
      // Skip invalid lines
      continue;
    }
  }
}

/**
 * Parse GeoJSON and return all features as an array
 */
export function parseGeoJSON(content: string): GeoJSONFeature[] {
  return Array.from(parseGeoJSONContent(content));
}

/**
 * Get unique values for a property across all features
 */
export function getUniquePropertyValues(features: GeoJSONFeature[], propertyName: string): string[] {
  const values = new Set<string>();
  
  for (const feature of features) {
    const value = feature.properties?.[propertyName];
    if (value != null && value !== '') {
      values.add(String(value));
    }
  }
  
  return Array.from(values).sort();
}

/**
 * Filter features by property values
 */
export function filterFeatures(
  features: GeoJSONFeature[],
  filters: Record<string, string | string[]>
): GeoJSONFeature[] {
  return features.filter(feature => {
    for (const [key, filterValue] of Object.entries(filters)) {
      const propValue = feature.properties?.[key];
      
      if (Array.isArray(filterValue)) {
        // Multiple allowed values (OR)
        if (!filterValue.some(v => String(propValue) === v)) {
          return false;
        }
      } else {
        // Single value match
        if (String(propValue) !== filterValue) {
          return false;
        }
      }
    }
    return true;
  });
}

/**
 * Validate GeoJSON content structure
 */
export function validateGeoJSON(content: string): { valid: boolean; error?: string; featureCount?: number } {
  try {
    let count = 0;
    for (const feature of parseGeoJSONContent(content)) {
      if (!feature.geometry?.coordinates) {
        return { valid: false, error: `Feature missing coordinates` };
      }
      count++;
    }
    
    if (count === 0) {
      return { valid: false, error: 'No valid GeoJSON features found' };
    }
    
    return { valid: true, featureCount: count };
  } catch (e) {
    return { valid: false, error: e instanceof Error ? e.message : 'Unknown parsing error' };
  }
}

