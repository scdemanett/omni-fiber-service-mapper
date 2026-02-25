import https from 'https';
import { decodeResponse } from './fiber-decoder';

const API_URL = 'https://shop.omnifiber.com/api/getCatalog';

// Reuse sockets across requests for better throughput/latency.
const agent = new https.Agent({
  keepAlive: true,
  maxSockets: 16,
  maxFreeSockets: 16,
});

/**
 * Fetch shopper data from the fiber service API.
 *
 * Returns `null` on network/transport failures.
 */
export async function fetchShopperData(address: string): Promise<unknown | null> {
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
      agent,
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
        try {
          const rawBytes = Buffer.concat(chunks);
          const data = decodeResponse(rawBytes, contentEncoding);
          resolve(data);
        } catch (e) {
          console.error(`Error decoding response for ${address}:`, e);
          resolve(null);
        }
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
