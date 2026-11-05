import { blogSource } from "@/config/blog-source";
import { swapRoutes } from "@/config/swap-routes";

// Built at build time, like the sitemap, so new routes and posts appear without editing this file.
export const dynamic = "force-static";

const baseUrl = "https://satora.io";

function link(title: string, path: string, description?: string): string {
  return description ? `- [${title}](${baseUrl}${path}): ${description}` : `- [${title}](${baseUrl}${path})`;
}

export function GET(): Response {
  const routes = [
    link(
      "Swap Bitcoin to USDC",
      "/swap/bitcoin-to-usdc",
      "Convert Bitcoin to USDC without an exchange deposit.",
    ),
    ...swapRoutes.map((route) => link(route.title, `/swap/${route.slug}`, route.introduction)),
  ];

  const posts = blogSource
    .getPages()
    .map((post) => link(post.data.title, `/blog/${post.slugs.join("/")}`, post.data.subtitle ?? post.data.description));

  const body = [
    "# Satora",
    "",
    "> Satora is a self-custodial swap service between Bitcoin and stablecoins. It connects Bitcoin on-chain, Lightning and Arkade with tokens such as USDC, USDT and EURe on EVM networks, using hash time-locked contracts (HTLCs).",
    "",
    "Developer documentation, the API reference and SDK guides are on docs.satora.io, which publishes its own index.",
    "",
    "## Product",
    "",
    "- [Satora app](https://app.satora.io): Swap Bitcoin and stablecoins from your wallet.",
    link(
      "Developers",
      "/developers",
      "Integrate swaps between Bitcoin and stablecoins with the Satora TypeScript SDK.",
    ),
    link("Security", "/security"),
    link("Press kit", "/press"),
    "",
    "## Swap routes",
    "",
    ...routes,
    "",
    "## Documentation",
    "",
    "- [Documentation index](https://docs.satora.io/llms.txt)",
    "- [Full documentation](https://docs.satora.io/llms-full.txt)",
    "",
    "## Blog",
    "",
    ...posts,
    "",
    "## Optional",
    "",
    link("Terms", "/terms"),
    link("Privacy", "/privacy"),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
