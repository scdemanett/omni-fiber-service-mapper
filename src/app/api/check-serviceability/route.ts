import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import { decodeResponse, isServiceable, type ShopperResponse } from '@/lib/omni-decoder';

const API_URL = 'https://shop.omnifiber.com/api/getCatalog';

/**
 * POST /api/check-serviceability
 * Check serviceability for a single address
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    // Fetch from Omni Fiber API
    const shopperData = await fetchShopperData(address);

    if (!shopperData) {
      return NextResponse.json({
        address,
        serviceable: false,
        error: 'Failed to fetch data from API',
        timestamp: new Date().toISOString(),
      });
    }

    // Check serviceability
    const result = isServiceable(shopperData as ShopperResponse);

    return NextResponse.json({
      address,
      ...result,
      timestamp: new Date().toISOString(),
      fullResponse: shopperData,
    });
  } catch (error) {
    console.error('Error in check-serviceability:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * Fetch shopper data from Omni Fiber API
 */
async function fetchShopperData(address: string): Promise<unknown> {
  return new Promise((resolve) => {
    const parsedUrl = new URL(API_URL);
    
    const payload = {
      inputAddress: {
        inputAddress: address,
      },
    };
    
    const postData = JSON.stringify(payload);

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Origin: 'https://shop.omnifiber.com',
      Referer: 'https://shop.omnifiber.com/',
      'Content-Length': Buffer.byteLength(postData).toString(),
    };

    const options: https.RequestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname,
      method: 'POST',
      headers,
    };

    const req = https.request(options, (res) => {
      const contentEncoding = res.headers['content-encoding'] || '';
      const chunks: Buffer[] = [];

      res.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const rawBytes = Buffer.concat(chunks);
        const data = decodeResponse(rawBytes, contentEncoding);
        resolve(data);
      });
    });

    req.on('error', (error) => {
      console.error(`Error fetching data for ${address}:`, error.message);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

