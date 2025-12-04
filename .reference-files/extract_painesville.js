const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_FILE = path.join(__dirname, '..', 'address-source-data', 'source.geojson');
const OUTPUT_GEOJSON = path.join(__dirname, '..', 'output', 'painesville_city.geojson');
const OUTPUT_ADDRESSES = path.join(__dirname, '..', 'input', 'addresses-test.txt');

/**
 * Format a GeoJSON feature into an address string
 */
function formatAddress(feature) {
    const props = feature.properties || {};
    const number = props.number || '';
    const street = props.street || '';
    const unit = (props.unit || '').trim();
    const city = props.city || '';
    const region = props.region || '';
    const postcode = props.postcode || '';
    
    // Build address string
    const addressParts = [];
    if (number) addressParts.push(number);
    if (street) addressParts.push(street);
    if (unit) addressParts.push(unit);
    if (city) addressParts.push(city);
    if (region) addressParts.push(region);
    if (postcode) addressParts.push(postcode);
    
    return addressParts.join(' ');
}

/**
 * Load and filter PAINESVILLE CITY addresses from source.geojson
 */
function extractAddresses() {
    const painesvilleFeatures = [];
    const addresses = [];
    
    if (!fs.existsSync(SOURCE_FILE)) {
        console.error(`Error: ${SOURCE_FILE} not found!`);
        return { painesvilleFeatures, addresses };
    }
    
    console.log(`Reading ${SOURCE_FILE}...`);
    const content = fs.readFileSync(SOURCE_FILE, 'utf-8');
    const lines = content.split('\n');
    
    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
        const line = lines[lineNum].trim();
        if (!line) continue;
        
        try {
            const feature = JSON.parse(line);
            const city = feature?.properties?.city || '';
            
            if (city === 'PAINESVILLE CITY') {
                painesvilleFeatures.push(feature);
                const address = formatAddress(feature);
                addresses.push(address);
            }
        } catch (error) {
            console.warn(`Warning: Could not parse line ${lineNum + 1}: ${error.message}`);
            continue;
        }
    }
    
    return { painesvilleFeatures, addresses };
}

/**
 * Save filtered GeoJSON as FeatureCollection
 */
function saveGeoJSON(features) {
    const geojsonOutput = {
        type: 'FeatureCollection',
        features: features
    };
    
    fs.writeFileSync(OUTPUT_GEOJSON, JSON.stringify(geojsonOutput, null, 2));
    console.log(`✓ Saved ${features.length} features to ${OUTPUT_GEOJSON}`);
}

/**
 * Save addresses.txt for serviceability checker
 */
function saveAddresses(addresses) {
    // Ensure the input directory exists
    const inputDir = path.dirname(OUTPUT_ADDRESSES);
    if (!fs.existsSync(inputDir)) {
        fs.mkdirSync(inputDir, { recursive: true });
    }
    
    fs.writeFileSync(OUTPUT_ADDRESSES, addresses.join('\n'));
    console.log(`✓ Saved ${addresses.length} addresses to ${OUTPUT_ADDRESSES}`);
}

/**
 * Main function
 */
function main() {
    console.log('=== Extracting PAINESVILLE CITY addresses ===\n');
    
    // Extract addresses
    const { painesvilleFeatures, addresses } = extractAddresses();
    
    if (painesvilleFeatures.length === 0) {
        console.log('No PAINESVILLE CITY addresses found.');
        return;
    }
    
    console.log(`Found ${painesvilleFeatures.length} PAINESVILLE CITY addresses\n`);
    
    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_GEOJSON);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save filtered GeoJSON
    console.log(`Writing ${OUTPUT_GEOJSON}...`);
    saveGeoJSON(painesvilleFeatures);
    
    // Save addresses.txt
    console.log(`\nWriting ${OUTPUT_ADDRESSES}...`);
    saveAddresses(addresses);
    
    // Show first few addresses as preview
    console.log(`\nFirst 5 addresses:`);
    addresses.slice(0, 5).forEach((addr, i) => {
        console.log(`  ${i + 1}. ${addr}`);
    });
    if (addresses.length > 5) {
        console.log(`  ... and ${addresses.length - 5} more`);
    }
    
    console.log(`\n✓ Done! You can now run check_serviceability.js to check these addresses.`);
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { formatAddress, extractAddresses, saveGeoJSON, saveAddresses };

