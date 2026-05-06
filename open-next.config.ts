import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  // Use static assets cache for SSG pages - serves build-time values without runtime re-rendering
  // This prevents Cloudflare Workers from exceeding resource limits on docs pages
  // See https://opennext.js.org/cloudflare/caching for more details
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
