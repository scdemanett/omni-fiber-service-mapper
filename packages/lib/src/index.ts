export * from './fiber-decoder';
export * from './fiber-shopper-api';
export * from './geojson-parser';
export * from './batch-processor';
export * from './utils';
// Provider adapters (registry, omni-fiber, att-fiber) are server-only and expose
// Node.js built-ins (https). They must NOT be re-exported from this client-facing
// barrel — use the '@fsm/lib/providers/ui' or '@fsm/lib/providers' subpath exports instead.
export type { ProviderConfig } from './providers/types';
export type { ProviderUIMeta } from './providers/ui-metadata';
export { PROVIDER_UI_METADATA, ACTIVE_PROVIDER_UI_METADATA, getProviderUIMeta } from './providers/ui-metadata';
