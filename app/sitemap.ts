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
