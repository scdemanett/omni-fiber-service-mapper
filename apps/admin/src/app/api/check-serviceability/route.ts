import { NextRequest, NextResponse } from 'next/server';
import { isServiceable, type ShopperResponse } from '@/lib/fiber-decoder';
import { fetchShopperData } from '@/lib/fiber-shopper-api';

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

    // Fetch from fiber service API
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
