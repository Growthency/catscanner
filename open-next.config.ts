import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// Default config: SSR + API routes on the Workers runtime (nodejs_compat).
// No R2/KV cache override yet — ISR/unstable_cache fall back to in-worker caching,
// which is fine for this app (short-lived caches). Add an incremental cache later
// if we start relying on long-lived ISR.
export default defineCloudflareConfig({})
