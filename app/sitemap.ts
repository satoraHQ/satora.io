import { blogSource } from "@/config/blog-source";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://satora.io";

  // Omit lastModified until genuine modification dates are available.
  // Build timestamps and article publication dates do not track content edits.
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/blog",
    "/developers",
    "/swap/bitcoin-to-usdc",
    "/swap/usdc-to-bitcoin",
    "/swap/bitcoin-to-usdt",
    "/swap/usdt-to-bitcoin",
    "/swap/wbtc-to-bitcoin",
    "/swap/bitcoin-to-wbtc",
    "/swap/tbtc-to-bitcoin",
    "/swap/bitcoin-to-tbtc",
    "/swap/usat-to-bitcoin",
    "/swap/bitcoin-to-usat",
    "/swap/xaut-to-bitcoin",
    "/swap/bitcoin-to-xaut",
    "/press",
    "/privacy",
    "/terms",
    "/cookies",
    "/imprint",
    "/security",
  ].map((path) => ({ url: `${baseUrl}${path}` }));

  const blogPages: MetadataRoute.Sitemap = blogSource
    .getPages()
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slugs.join("/")}`,
    }));

  return [...staticPages, ...blogPages];
}
