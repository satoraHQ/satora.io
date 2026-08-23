import { getSwapAssets, type SwapAssetRecord } from "@/lib/swap-assets";
import { NextResponse } from "next/server";

const BASE_UNIT_AMOUNT_PATTERN = /^\d+$/;
const DIRECT_CHAINS = new Set(["Bitcoin", "Lightning", "Arkade", "1", "137", "42161"]);
const ARBITRUM_USDC = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
const ARBITRUM_USDT0 = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const sourceAmount = searchParams.get("sourceAmount");
  const targetAmount = searchParams.get("targetAmount");

  if ((sourceAmount == null) === (targetAmount == null)) {
    return NextResponse.json({ error: "Provide exactly one amount" }, { status: 400 });
  }

  const amount = sourceAmount ?? targetAmount ?? "";
  if (amount.length > 40 || !BASE_UNIT_AMOUNT_PATTERN.test(amount) || BigInt(amount) <= 0n) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  try {
    const assets = await getSwapAssets();
    const source = assets.find((asset) => asset.id === searchParams.get("source"));
    const target = assets.find((asset) => asset.id === searchParams.get("target"));
    if (!source || !target) {
      return NextResponse.json({ error: "Unsupported asset pair" }, { status: 400 });
    }

    const upstream = new URL("https://api.satora.io/quote");
    const normalizedSource = normalizeBridgeAsset(source, "source", upstream);
    const normalizedTarget = normalizeBridgeAsset(target, "target", upstream);

    upstream.searchParams.set("source_chain", normalizedSource.chain);
    upstream.searchParams.set("source_token", normalizedSource.token);
    upstream.searchParams.set("target_chain", normalizedTarget.chain);
    upstream.searchParams.set("target_token", normalizedTarget.token);
    upstream.searchParams.set(sourceAmount == null ? "target_amount" : "source_amount", amount);

    const response = await fetch(upstream, {
      cache: "no-store",
      headers: {
        "X-Lendaswap-Client": "satora-website/0.0.9",
        "x-satora-server-version": process.env.SATORA_SERVER_VERSION ?? "0.3.10",
      },
    });
    const body = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: getUpstreamError(body) },
        { status: response.status >= 500 ? 502 : response.status },
      );
    }

    return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(
      { error: "The live quote service is temporarily unavailable" },
      { status: 502 },
    );
  }
}

function normalizeBridgeAsset(
  asset: SwapAssetRecord,
  side: "source" | "target",
  upstream: URL,
): { chain: string; token: string } {
  if (asset.kind === "bitcoin" || DIRECT_CHAINS.has(asset.quoteChain)) {
    return { chain: asset.quoteChain, token: asset.quoteToken };
  }

  if (side === "target") {
    upstream.searchParams.set("bridge_target_chain", asset.chain);
  } else {
    upstream.searchParams.set("bridge_source_chain", asset.chain);
    upstream.searchParams.set("bridge_source_token_address", asset.quoteToken);
  }

  return {
    chain: "42161",
    token: asset.symbol.startsWith("USDT") ? ARBITRUM_USDT0 : ARBITRUM_USDC,
  };
}

function getUpstreamError(body: unknown): string {
  if (typeof body === "object" && body !== null && "error" in body && typeof body.error === "string") {
    return body.error;
  }
  return "Unable to fetch a live quote";
}
