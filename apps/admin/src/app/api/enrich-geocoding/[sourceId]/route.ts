import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { reverseGeocode } from '@/lib/reverse-geocode';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

function buildAddressString(addr: {
  number: string | null;
  street: string | null;
  unit: string | null;
  city: string | null;
  region: string | null;
  postcode: string | null;
}): string {
  const parts: string[] = [];
  if (addr.number) parts.push(addr.number);
  if (addr.street) parts.push(addr.street);
  if (addr.unit?.trim()) parts.push(addr.unit.trim());
  if (addr.city) parts.push(addr.city);
  if (addr.region) parts.push(addr.region);
  if (addr.postcode) parts.push(addr.postcode);
  return parts.join(' ').toUpperCase();
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ sourceId: string }> },
) {
  const { sourceId } = await params;

  // Validate source exists
  const source = await prisma.geoJSONSource.findUnique({
    where: { id: sourceId },
    select: { id: true },
  });
  if (!source) {
    return new Response(JSON.stringify({ error: 'Source not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Find addresses missing city or postcode
  const addresses = await prisma.address.findMany({
    where: {
      sourceId,
      OR: [
        { city: null },
        { city: '' },
        { postcode: null },
        { postcode: '' },
      ],
    },
    select: {
      id: true,
      latitude: true,
      longitude: true,
      number: true,
      street: true,
      unit: true,
      city: true,
      region: true,
      postcode: true,
    },
  });

  if (addresses.length === 0) {
    return new Response(
      JSON.stringify({ success: true, enriched: 0, total: 0 }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`),
        );
      };

      try {
        send({ type: 'start', total: addresses.length });

        let processed = 0;
        let enriched = 0;
        let failed = 0;

        // Pending DB updates — flushed in batches of 500
        const pendingUpdates: {
          id: string;
          city: string | null;
          postcode: string | null;
          addressString: string;
        }[] = [];

        // Each address update is independent — no transactional atomicity needed.
        // Promise.all avoids the 5 s interactive-transaction timeout that
        // prisma.$transaction() imposes when given an array of operations.
        const flushUpdates = async () => {
          if (pendingUpdates.length === 0) return;
          await Promise.all(
            pendingUpdates.map((u) =>
              prisma.address.update({
                where: { id: u.id },
                data: {
                  city: u.city,
                  postcode: u.postcode,
                  addressString: u.addressString,
                },
              }),
            ),
          );
          pendingUpdates.length = 0;
        };

        for (const address of addresses) {
          try {
            const result = await reverseGeocode(
              address.latitude,
              address.longitude,
            );

            // Only fill fields that are actually missing — never overwrite
            // a valid existing city just because postcode was absent, or vice versa.
            const needsCity = !address.city || address.city === '';
            const needsPostcode = !address.postcode || address.postcode === '';
            const resolvedCity = needsCity ? result.city : address.city;
            const resolvedPostcode = needsPostcode ? result.postcode : address.postcode;

            if ((needsCity && result.city) || (needsPostcode && result.postcode)) {
              pendingUpdates.push({
                id: address.id,
                city: resolvedCity,
                postcode: resolvedPostcode,
                addressString: buildAddressString({
                  number: address.number,
                  street: address.street,
                  unit: address.unit,
                  city: resolvedCity,
                  region: address.region,
                  postcode: resolvedPostcode,
                }),
              });
              enriched++;
            } else {
              failed++;
            }
          } catch {
            failed++;
          }

          processed++;

          // Flush DB writes every 500 to avoid huge transactions
          if (pendingUpdates.length >= 500) {
            await flushUpdates();
          }

          // Stream progress on every address so the bar moves smoothly
          send({
            type: 'progress',
            processed,
            enriched,
            failed,
            total: addresses.length,
            progress: Math.round((processed / addresses.length) * 100),
          });
        }

        await flushUpdates();

        send({
          type: 'complete',
          enriched,
          failed,
          total: addresses.length,
        });
        controller.close();
      } catch (error) {
        console.error('Enrichment error:', error);
        send({
          type: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
