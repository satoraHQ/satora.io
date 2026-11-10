import { blogSource } from "@/config/blog-source";
import { customSwapRoutes, swapRoutes } from "@/config/swap-routes";

// Built at build time, like the sitemap, so new routes and posts appear without editing this file.
export const dynamic = "force-static";

const site = "https://satora.io";

function item(title: string, url: string, description?: string): string {
  return description ? `- [${title}](${url}): ${description}` : `- [${title}](${url})`;
}

export function GET(): Response {
  const routes = [...customSwapRoutes, ...swapRoutes].map((route) =>
    item(route.title, `${site}/swap/${route.slug}`, route.introduction)
  );

  // Newest first, like the blog index.
  const posts = blogSource
    .getPages()
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((post) =>
      item(post.data.title, `${site}/blog/${post.slugs.join("/")}`, post.data.subtitle ?? post.data.description)
    );

  const body = [
    "# Satora",
    "",
    "> Satora is a self-custodial swap service between Bitcoin and stablecoins. It connects Bitcoin on-chain, Lightning and Arkade with USDC, USDT, EURe and other tokens on Ethereum, Polygon and Arbitrum, and with RBTC on Rootstock, using hash time-locked contracts (HTLCs). USDC and USDT can also be delivered to many more chains, such as Base, Solana, Optimism and Avalanche, through the CCTP and LayerZero bridges.",
    "",
    "## Product",
    "",
    item("Satora app", "https://app.satora.io", "Swap Bitcoin and stablecoins from your wallet."),
    item(
      "Developers",
      `${site}/developers`,
      "Integrate swaps between Bitcoin and stablecoins with the TypeScript SDK.",
    ),
    item("Security", `${site}/security`),
    item("Press kit", `${site}/press`),
    "",
    "## Swap routes",
    "",
    ...routes,
    "",
    "## Documentation",
    "",
    item("Documentation index", "https://docs.satora.io/llms.txt", "API reference, SDK guides and FAQ."),
    item("Full documentation", "https://docs.satora.io/llms-full.txt"),
    "",
    "## Blog",
    "",
    ...posts,
    "",
    "## Optional",
    "",
    item("Terms", `${site}/terms`),
    item("Privacy", `${site}/privacy`),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
