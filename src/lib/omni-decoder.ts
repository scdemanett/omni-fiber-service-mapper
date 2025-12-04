/**
 * Omni Fiber API Response Decoder
 * Handles: Brotli → ROT13 → Custom UUdecode → JSON
 */

import zlib from 'zlib';

/**
 * ROT13 cipher - rotates letters by 13 positions
 */
export function rot13(text: string): string {
  let result = '';
  for (const char of text) {
    if (/[a-z]/i.test(char)) {
      const charCode = char.charCodeAt(0);
      if (char.toLowerCase() <= 'm') {
        result += String.fromCharCode(charCode + 13);
      } else {
        result += String.fromCharCode(charCode - 13);
      }
    } else {
      result += char;
    }
  }
  return result;
}

/**
 * Custom UUdecode implementation based on the JavaScript mq function
 * This is NOT standard UUencoding - it's a custom encoding scheme
 */
export function customUudecode(data: Buffer): Buffer {
  let finished = false;
  let inputPos = 0;
  let outputPos = 0;
  let totalBytes = 0;
  const inputLength = data.length;
  const output = Buffer.alloc(inputLength);

  while (!finished) {
    if (inputPos < inputLength) {
      let lineLength = (data[inputPos] - 32) & 63;
      inputPos++;
      
      if (lineLength > 45) {
        throw new Error('Invalid Data');
      }

      if (lineLength < 45) {
        finished = true;
      }

      totalBytes += lineLength;
      
      while (lineLength > 0) {
        // Decode 4 bytes into 3 bytes
        if (inputPos + 3 < inputLength) {
          const b1 = data[inputPos];
          const b2 = data[inputPos + 1];
          const b3 = data[inputPos + 2];
          const b4 = data[inputPos + 3];

          const decoded1 = ((b1 - 32) & 63) << 2 | ((b2 - 32) & 63) >> 4;
          const decoded2 = ((b2 - 32) & 63) << 4 | ((b3 - 32) & 63) >> 2;
          const decoded3 = ((b3 - 32) & 63) << 6 | (b4 - 32) & 63;

          output[outputPos] = decoded1 & 255;
          output[outputPos + 1] = decoded2 & 255;
          output[outputPos + 2] = decoded3 & 255;

          outputPos += 3;
          inputPos += 4;
          lineLength -= 3;
        } else {
          break;
        }
      }
      inputPos++;
    } else {
      finished = true;
    }
  }

  return output.subarray(0, totalBytes);
}

/**
 * Decode the API response: Brotli → ROT13 → Custom UUdecode → JSON
 */
export function decodeResponse(rawBytes: Buffer, contentEncoding?: string): unknown {
  try {
    if (!contentEncoding || contentEncoding === 'br') {
      // Step 1: Decompress Brotli (gives us UUencoded text)
      // Check if data is already text (starts with 'Z' which is UUencoded)
      let uuencodedText: string;
      const firstByte = rawBytes[0];
      
      if (firstByte === 0x5a) { // 'Z' - already UUencoded text
        // Data is already decompressed, use it directly
        uuencodedText = rawBytes.toString('utf-8');
      } else {
        // Try Brotli decompression
        try {
          const decompressed = zlib.brotliDecompressSync(rawBytes);
          uuencodedText = decompressed.toString('utf-8');
        } catch {
          // If Brotli fails, try using raw bytes as text
          uuencodedText = rawBytes.toString('utf-8');
        }
      }

      // Step 2: Apply ROT13 cipher
      const rot13Text = rot13(uuencodedText);

      // Step 3: Custom UUdecode the text
      let decodedBytes: Buffer;
      try {
        const rot13Bytes = Buffer.from(rot13Text, 'utf-8');
        decodedBytes = customUudecode(rot13Bytes);
        if (!decodedBytes || decodedBytes.length === 0) {
          return null;
        }
      } catch {
        return null;
      }

      // Step 4: Check if UUdecoded bytes are gzip-compressed
      let jsonText: string;
      if (decodedBytes.length >= 2 && decodedBytes[0] === 0x1f && decodedBytes[1] === 0x8b) {
        // It's gzip compressed, decompress it
        try {
          jsonText = zlib.gunzipSync(decodedBytes).toString('utf-8');
        } catch {
          return null;
        }
      } else {
        // Try to decode as UTF-8 directly
        jsonText = decodedBytes.toString('utf-8');
      }

      if (!jsonText || jsonText.length === 0) {
        return null;
      }

      // Step 5: Parse JSON - find JSON object in the text
      const jsonStart = jsonText.indexOf('{');
      if (jsonStart === -1) {
        const arrayStart = jsonText.indexOf('[');
        if (arrayStart >= 0) {
          try {
            return JSON.parse(jsonText.substring(arrayStart));
          } catch {
            return null;
          }
        }
        return null;
      }

      try {
        // Try parsing from the first {
        return JSON.parse(jsonText.substring(jsonStart));
      } catch {
        // Try to extract valid JSON by finding matching braces
        let depth = 0;
        let inString = false;
        let escapeNext = false;
        let startPos = jsonStart;

        for (let i = jsonStart; i < jsonText.length; i++) {
          const char = jsonText[i];
          if (escapeNext) {
            escapeNext = false;
            continue;
          }
          if (char === '\\') {
            escapeNext = true;
            continue;
          }
          if (char === '"') {
            inString = !inString;
            continue;
          }
          if (!inString) {
            if (char === '{' || char === '[') {
              if (depth === 0) {
                startPos = i;
              }
              depth++;
            } else if (char === '}' || char === ']') {
              depth--;
              if (depth === 0) {
                // Found complete JSON object
                const jsonStr = jsonText.substring(startPos, i + 1);
                return JSON.parse(jsonStr);
              }
            }
          }
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Error decoding response:', error);
    return null;
  }
}

export interface ShopperResponse {
  statusCode: string;
  statusMessage: string;
  shopper?: {
    clientId: string;
    orgId: string;
    saAddressLine1?: string;
    saAddressLine2?: string;
    saCity?: string;
    saState?: string;
    saZip?: string;
    market?: string;
    brand?: string;
    inputAddress?: string;
    matchType?: string;
    matchedAddress?: {
      salesType?: string;
      tags?: {
        status?: string;
        cstatus?: string;
        salesStatus?: string;
        salesType?: string;
      };
    };
    state?: {
      configItems?: {
        isPreSale?: number;
      };
    };
    catalog?: {
      Config?: Array<{
        Key?: string;
        Name?: string;
        'Config Value'?: string | number;
      }>;
    };
  };
}

export type ServiceabilityType = 'serviceable' | 'preorder' | 'none';

export interface ServiceabilityResult {
  serviceable: boolean;
  serviceabilityType: ServiceabilityType;
  salesType?: string;
  status?: string;
  cstatus?: string;
  isPreSale?: number;
  salesStatus?: string;
  matchType?: string;
  apiCreateDate?: string;
  apiUpdateDate?: string;
}

/**
 * Check if an address is serviceable and determine serviceability type
 */
export function isServiceable(shopperResponse: ShopperResponse): ServiceabilityResult {
  const defaultResult: ServiceabilityResult = {
    serviceable: false,
    serviceabilityType: 'none',
  };

  try {
    if (!shopperResponse || typeof shopperResponse !== 'object') {
      return defaultResult;
    }

    // The response has structure: {statusCode, statusMessage, shopper}
    let shopper = shopperResponse.shopper;
    if (!shopper || typeof shopper !== 'object') {
      return defaultResult;
    }

    // Get matchType from shopper
    const matchType = shopper.matchType;

    // matchedAddress is directly on shopper object
    const matchedAddress = shopper.matchedAddress;
    const state = shopper.state || {};
    const configItems = state.configItems || {};

    // Check for no service (outside service area)
    if (matchType === 'NONE' || !matchedAddress || typeof matchedAddress !== 'object') {
      return {
        serviceable: false,
        serviceabilityType: 'none',
        matchType,
      };
    }

    // Extract relevant fields
    const tags = matchedAddress.tags || {};
    const salesType = matchedAddress.salesType || tags.salesType;
    const status = tags.status;
    const cstatus = tags.cstatus;
    const salesStatus = tags.salesStatus;
    
    // Check isPreSale from catalog config
    let isPreSale = configItems.isPreSale;
    if (isPreSale === undefined && shopper.catalog?.Config) {
      const preSaleConfig = shopper.catalog.Config.find(
        (c) => c.Name === 'isPreSale' || c.Key === 'isPreSale'
      );
      if (preSaleConfig && preSaleConfig['Config Value'] !== undefined) {
        isPreSale = Number(preSaleConfig['Config Value']);
      }
    }

    // Determine serviceability type based on multiple signals
    let serviceabilityType: ServiceabilityType = 'none';
    
    // Check for preorder/planned service
    if (
      cstatus === 'presales' ||
      status === 'PLANNED' ||
      salesStatus === 'P' ||
      isPreSale === 1
    ) {
      serviceabilityType = 'preorder';
    }
    // Check for serviceable now
    else if (
      cstatus === 'schedulable' ||
      status === 'SERVICEABLE' ||
      salesStatus === 'Y' ||
      (salesType === 'serviceable' && isPreSale === 0)
    ) {
      serviceabilityType = 'serviceable';
    }
    // Check for no service
    else if (
      cstatus === 'future-service' ||
      salesType === 'none' ||
      matchType === 'NONE'
    ) {
      serviceabilityType = 'none';
    }

    // serviceable boolean is true only for immediate service
    const serviceable = serviceabilityType === 'serviceable';

    return {
      serviceable,
      serviceabilityType,
      salesType,
      status,
      cstatus,
      isPreSale,
      salesStatus,
      matchType,
    };
  } catch (error) {
    console.error('Error checking serviceability:', error);
    return defaultResult;
  }
}

