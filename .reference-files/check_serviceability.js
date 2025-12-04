const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { promisify } = require('util');

// Configuration
const API_URL = 'https://shop.omnifiber.com/api/getCatalog';
const DELAY_MS = 2000; // Delay between requests (2 seconds to be respectful to the API)
const INPUT_FILE = path.join(__dirname, '..', 'input', 'addresses.txt');
const OUTPUT_FILE = path.join(__dirname, '..', 'output', 'servicable_addresses.json');
const RESULTS_FILE = path.join(__dirname, '..', 'output', 'all_results.json');

/**
 * ROT13 cipher - rotates letters by 13 positions
 */
function rot13(text) {
    let result = '';
    for (let char of text) {
        if (/[a-z]/i.test(char)) {
            const isLower = char === char.toLowerCase();
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
function customUudecode(data) {
    let i = false;
    let r = 0;
    let a = 0;
    let n = 0;
    const t = Buffer.from(data);
    const s = t.length;
    const l = Buffer.alloc(s);
    
    while (!i) {
        if (r < s) {
            let u = (t[r] - 32) & 63;
            r++;
            if (u > 45) {
                throw new Error("Invalid Data");
            }
            
            if (u < 45) {
                i = true;
            }
            
            n += u;
            while (u > 0) {
                // Decode 4 bytes into 3 bytes
                if (r + 3 < s) {
                    const n_val = t[r];
                    const t_val = t[r + 1];
                    const s_val = t[r + 2];
                    const l_val = t[r + 3];
                    
                    const u_decoded = ((n_val - 32) & 63) << 2 | ((t_val - 32) & 63) >> 4;
                    const m_decoded = ((t_val - 32) & 63) << 4 | ((s_val - 32) & 63) >> 2;
                    const d_decoded = ((s_val - 32) & 63) << 6 | (l_val - 32) & 63;
                    
                    l[a] = u_decoded & 255;
                    l[a + 1] = m_decoded & 255;
                    l[a + 2] = d_decoded & 255;
                    
                    a += 3;
                    r += 4;
                    u -= 3;
                } else {
                    break;
                }
            }
            r++;
        } else {
            i = true;
        }
    }
    
    return l.slice(0, n);
}

/**
 * Decode the API response: Brotli → ROT13 → Custom UUdecode → JSON
 */
function decodeResponse(rawBytes, contentEncoding) {
    try {
        if (!contentEncoding || contentEncoding === 'br') {
            // Step 1: Decompress Brotli (gives us UUencoded text)
            // Check if data is already text (starts with 'Z' which is UUencoded)
            let uuencodedText;
            const firstByte = rawBytes[0];
            if (firstByte === 0x5a) { // 'Z' - already UUencoded text
                // Data is already decompressed, use it directly
                uuencodedText = rawBytes.toString('utf-8');
            } else {
                // Try Brotli decompression
                try {
                    const decompressed = zlib.brotliDecompressSync(rawBytes);
                    uuencodedText = decompressed.toString('utf-8');
                } catch (e) {
                    // If Brotli fails, try using raw bytes as text
                    uuencodedText = rawBytes.toString('utf-8');
                }
            }
            
            // Step 2: Apply ROT13 cipher (hq function in JS)
            const rot13Text = rot13(uuencodedText);
            
            // Step 3: Custom UUdecode the text (convert string to Buffer first)
            let decodedBytes;
            try {
                const rot13Bytes = Buffer.from(rot13Text, 'utf-8');
                decodedBytes = customUudecode(rot13Bytes);
                if (!decodedBytes || decodedBytes.length === 0) {
                    return null;
                }
            } catch (e) {
                return null;
            }
            
            // Step 4: Check if UUdecoded bytes are gzip-compressed
            let jsonText;
            if (decodedBytes.length >= 2 && decodedBytes[0] === 0x1f && decodedBytes[1] === 0x8b) {
                // It's gzip compressed, decompress it
                try {
                    jsonText = zlib.gunzipSync(decodedBytes).toString('utf-8');
                } catch (e) {
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
                    } catch (e) {
                        return null;
                    }
                }
                return null;
            }
            
            try {
                // Try parsing from the first {
                return JSON.parse(jsonText.substring(jsonStart));
            } catch (e) {
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
        console.error('Error decoding response:', error.message);
        return null;
    }
}

/**
 * Check if an address is serviceable (not just pre-order)
 */
function isServiceable(shopperResponse) {
    try {
        if (!shopperResponse || typeof shopperResponse !== 'object') {
            return false;
        }
        
        // The response has structure: {statusCode, statusMessage, shopper}
        // The shopper object contains the actual data
        let shopper = shopperResponse.shopper;
        if (!shopper || typeof shopper !== 'object') {
            shopper = shopperResponse;
        }
        
        if (!shopper || typeof shopper !== 'object') {
            return false;
        }
        
        // matchedAddress is directly on shopper object, not in state.serviceability
        const matchedAddress = shopper.matchedAddress;
        const state = shopper.state || {};
        const configItems = state.configItems || {};
        
        if (!matchedAddress || typeof matchedAddress !== 'object') {
            return false;
        }
        
        // Primary checks
        const tags = matchedAddress.tags || {};
        const salesType = matchedAddress.salesType;
        const status = tags.status;
        const cstatus = tags.cstatus;
        const isPreSale = configItems.isPreSale;
        
        // Service available if:
        // Note: isPreSale might be undefined, so we check it's not 1 if it exists
        const isServiceable = (
            salesType === "serviceable" &&
            status === "SERVICEABLE" &&
            cstatus === "schedulable" &&
            (isPreSale === undefined || isPreSale === 0 || isPreSale === "0")
        );
        
        return isServiceable;
    } catch (error) {
        console.error('Error checking serviceability:', error);
        return false;
    }
}

/**
 * Fetch shopper data from /api/getCatalog
 * The response contains the full shopper object with serviceability data
 */
async function fetchShopperData(address) {
    try {
        // Try using fetch (Node 18+) or fallback to node-fetch
        let fetch;
        if (typeof globalThis.fetch === 'function') {
            fetch = globalThis.fetch;
        } else {
            try {
                // If fetch is not available, you'll need to install node-fetch
                // npm install node-fetch
                const nodeFetch = require('node-fetch');
                fetch = nodeFetch.default || nodeFetch;
            } catch (e) {
                console.error('  Error: fetch is not available. Please install node-fetch: npm install node-fetch');
                return null;
            }
        }
        
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Origin': 'https://shop.omnifiber.com',
            'Referer': 'https://shop.omnifiber.com/',
        };
        
        // Use the correct payload format: nested inputAddress structure
        const payload = {
            inputAddress: {
                inputAddress: address
            }
        };
        
        // Call /api/getCatalog
        // Note: We need to get the raw compressed response
        // In Node.js, we can use the http/https modules directly to avoid auto-decompression
        const https = require('https');
        const url = require('url');
        
        return new Promise((resolve, reject) => {
            const parsedUrl = new URL(API_URL);
            const postData = JSON.stringify(payload);
            
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || 443,
                path: parsedUrl.pathname,
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Length': Buffer.byteLength(postData)
                },
                // Don't auto-decompress
                decompress: false
            };
            
            const req = https.request(options, (res) => {
                const contentEncoding = res.headers['content-encoding'] || '';
                const chunks = [];
                
                res.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                
                res.on('end', () => {
                    const rawBytes = Buffer.concat(chunks);
                    
                    // Decode the response
                    const data = decodeResponse(rawBytes, contentEncoding);
                    resolve(data);
                });
            });
            
            req.on('error', (error) => {
                console.error(`  Error fetching data for ${address}:`, error.message);
                resolve(null);
            });
            
            req.write(postData);
            req.end();
        });
    } catch (error) {
        console.error(`  Error fetching data for ${address}:`, error.message);
        if (error.stack) {
            console.error(error.stack);
        }
        return null;
    }
        
}

/**
 * Load addresses from file
 */
function loadAddresses(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`Input file not found: ${filePath}`);
            return [];
        }
        
        const content = fs.readFileSync(filePath, 'utf-8');
        const addresses = content
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        return addresses;
    } catch (error) {
        console.error('Error loading addresses:', error);
        return [];
    }
}

/**
 * Save results to file
 * @param {boolean} verbose - If true, print save messages
 */
function saveResults(serviceableAddresses, allResults, verbose = false) {
    try {
        // Save serviceable addresses
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(serviceableAddresses, null, 2));
        
        // Save all results for reference
        fs.writeFileSync(RESULTS_FILE, JSON.stringify(allResults, null, 2));
        
        if (verbose) {
            console.log(`\n[OK] Saved ${serviceableAddresses.length} serviceable addresses to ${OUTPUT_FILE}`);
            console.log(`[OK] Saved all results to ${RESULTS_FILE}`);
        }
    } catch (error) {
        console.error('Error saving results:', error);
    }
}

/**
 * Main function
 */
async function main() {
    console.log('=== Omni Fiber Serviceability Checker ===\n');
    
    // Load addresses
    const addresses = loadAddresses(INPUT_FILE);
    
    if (addresses.length === 0) {
        console.log('No addresses to check. Exiting.');
        return;
    }
    
    console.log(`Found ${addresses.length} addresses to check\n`);
    
    const serviceableAddresses = [];
    const allResults = [];
    
    // Process each address
    for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i];
        const progress = `[${i + 1}/${addresses.length}]`;
        
        console.log(`${progress} Checking: ${address}`);
        
        // Fetch data from API
        const shopperData = await fetchShopperData(address);
        
        if (!shopperData) {
            console.log(`  X Failed to fetch data\n`);
            allResults.push({
                address: address,
                serviceable: false,
                error: 'Failed to fetch data',
                timestamp: new Date().toISOString()
            });
            continue;
        }
        
        // Check if serviceable
        const serviceable = isServiceable(shopperData);
        
        // Extract shopper object from response
        const shopper = shopperData.shopper || shopperData;
        const matchedAddress = shopper.matchedAddress || {};
        const tags = matchedAddress.tags || {};
        const state = shopper.state || {};
        const configItems = state.configItems || {};
        
        const result = {
            address: address,
            serviceable: serviceable,
            salesType: matchedAddress.salesType,
            status: tags.status,
            cstatus: tags.cstatus,
            isPreSale: configItems.isPreSale,
            timestamp: new Date().toISOString()
        };
        
        allResults.push(result);
        
        if (serviceable) {
            console.log(`  [OK] SERVICEABLE\n`);
            serviceableAddresses.push({
                address: address,
                ...result,
                fullResponse: shopperData // Include full response for reference
            });
        } else {
            console.log(`  [PRE-ORDER] Pre-order only (salesType: ${result.salesType}, status: ${result.status})\n`);
        }
        
        // Save results after each address (so progress isn't lost if script stops)
        // Only print save message every 10 addresses to reduce console noise
        saveResults(serviceableAddresses, allResults, (i + 1) % 10 === 0);
        
        // Delay between requests to avoid rate limiting
        if (i < addresses.length - 1) {
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
    }
    
    // Final summary and save
    console.log('\n=== Results Summary ===');
    console.log(`Total addresses checked: ${addresses.length}`);
    console.log(`Serviceable: ${serviceableAddresses.length}`);
    console.log(`Pre-order only: ${addresses.length - serviceableAddresses.length}`);
    
    // Final save with message
    saveResults(serviceableAddresses, allResults, true);
}

// Run the script
if (require.main === module) {
    main().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

module.exports = { isServiceable, fetchShopperData };
