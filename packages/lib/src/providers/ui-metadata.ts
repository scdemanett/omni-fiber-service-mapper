/**
 * Client-safe provider metadata — no Node.js imports.
 *
 * This file intentionally has NO imports from server-side modules so it can
 * be used safely in Next.js client components (map pages, etc.).
 *
 * Keep in sync with registry.ts when adding new providers.
 */
export interface ProviderUIMeta {
  id: string;
  name: string;
  futureServiceUrl: string;
  /** True when the provider is a placeholder stub (not yet implemented). */
  isStub?: boolean;
}

export const PROVIDER_UI_METADATA: ProviderUIMeta[] = [
  {
    id: 'omni-fiber',
    name: 'Omni Fiber',
    futureServiceUrl: 'https://www.omnifiber.com/future-service/',
    isStub: false,
  },
  {
    id: 'att-fiber',
    name: 'AT&T Fiber',
    futureServiceUrl: 'https://www.att.com/internet/fiber/',
    isStub: true,
  },
];

/** Only providers that are fully implemented (not stubs). */
export const ACTIVE_PROVIDER_UI_METADATA = PROVIDER_UI_METADATA.filter((p) => !p.isStub);

/** Look up client-safe metadata by provider id. Returns undefined if not found. */
export function getProviderUIMeta(id: string): ProviderUIMeta | undefined {
  return PROVIDER_UI_METADATA.find((p) => p.id === id);
}
