import type { ProviderConfig } from './types';

/**
 * AT&T Fiber provider adapter — STUB.
 *
 * This is a placeholder that establishes the pattern for a second provider.
 * Replace fetch() and decode() with real implementations once the AT&T
 * residential fiber check API endpoint and response shape are known.
 */
const attFiber: ProviderConfig = {
  id: 'att-fiber',
  name: 'AT&T Fiber',
  futureServiceUrl: 'https://www.att.com/internet/fiber/',
  referralUrl: undefined,
  isStub: true,

  fetch: async (_address: string) => {
    console.warn('[att-fiber] Provider not yet implemented — returning null');
    return null;
  },

  decode: (_raw: unknown) => ({
    serviceable: false,
    serviceabilityType: 'none' as const,
  }),
};

export default attFiber;
