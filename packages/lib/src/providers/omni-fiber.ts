import { fetchShopperData } from '../fiber-shopper-api';
import { isServiceable } from '../fiber-decoder';
import type { ProviderConfig } from './types';

/**
 * Omni Fiber provider adapter.
 *
 * Wraps the existing fetchShopperData / isServiceable pipeline.
 * The referralUrl is intentionally left undefined here so the caller
 * (map page) can inject it from NEXT_PUBLIC_OMNI_REFERRAL_URL at runtime.
 */
const omniFiber: ProviderConfig = {
  id: 'omni-fiber',
  name: 'Omni Fiber',
  futureServiceUrl: 'https://www.omnifiber.com/future-service/',
  referralUrl: undefined,
  isStub: false,

  fetch: (address: string) => fetchShopperData(address),

  decode: (raw: unknown) => isServiceable(raw as Parameters<typeof isServiceable>[0]),
};

export default omniFiber;
