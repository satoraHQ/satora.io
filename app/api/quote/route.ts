import { NextResponse } from "next/server";

interface QuoteAsset {
  chain: string;
  token: string;
  bridgeChain?: string;
}

const USDC_ARBITRUM = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
const BASE_UNIT_AMOUNT_PATTERN = /^\d+$/;

const QUOTE_ASSETS: Record<string, QuoteAsset> = {
  "lightning:BTC": { chain: "Lightning", token: "btc" },
  "bitcoin:BTC": { chain: "Bitcoin", token: "btc" },
  "arkade:BTC": { chain: "Arkade", token: "btc" },
  "42161:USDC": { chain: "42161", token: USDC_ARBITRUM },
  "137:USDC": {
    chain: "137",
    token: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  },
  "1:USDC": {
    chain: "1",
    token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  "8453:USDC": {
    chain: "8453",
    token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    bridgeChain: "Base",
  },
  "10:USDC": {
    chain: "10",
    token: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    bridgeChain: "Optimism",
  },
  "43114:USDC": {
    chain: "43114",
    token: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    bridgeChain: "Avalanche",
  },
  "42161:USDT0": {
    chain: "42161",
    token: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  },
  "137:USDT0": {
    chain: "137",
    token: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  },
  "1:USDT": {
    chain: "1",
    token: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
};

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const source = QUOTE_ASSETS[searchParams.get("source") ?? ""];
  const target = QUOTE_ASSETS[searchParams.get("target") ?? ""];
  const sourceAmount = searchParams.get("sourceAmount");
  const targetAmount = searchParams.get("targetAmount");

  if (!source || !target) {
    return NextResponse.json({ error: "Unsupported asset pair" }, { status: 400 });
  }

  if ((sourceAmount == null) === (targetAmount == null)) {
    return NextResponse.json(
      { error: "Provide exactly one amount" },
      { status: 400 },
    );
  }

  const amount = sourceAmount ?? targetAmount ?? "";
  if (
    amount.length > 40
    || !BASE_UNIT_AMOUNT_PATTERN.test(amount)
    || BigInt(amount) <= 0n
  ) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const upstream = new URL("https://api.satora.io/quote");
  let sourceChain = source.chain;
  let sourceToken = source.token;
  let targetChain = target.chain;
  let targetToken = target.token;

  if (target.bridgeChain) {
    targetChain = "42161";
    targetToken = USDC_ARBITRUM;
    upstream.searchParams.set("bridge_target_chain", target.bridgeChain);
  }

  if (source.bridgeChain) {
    sourceChain = "42161";
    sourceToken = USDC_ARBITRUM;
    upstream.searchParams.set("bridge_source_chain", source.bridgeChain);
    upstream.searchParams.set("bridge_source_token_address", source.token);
  }

  upstream.searchParams.set("source_chain", sourceChain);
  upstream.searchParams.set("source_token", sourceToken);
  upstream.searchParams.set("target_chain", targetChain);
  upstream.searchParams.set("target_token", targetToken);
  upstream.searchParams.set(
    sourceAmount == null ? "target_amount" : "source_amount",
    amount,
  );

  try {
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

    return NextResponse.json(body, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "The live quote service is temporarily unavailable" },
      { status: 502 },
    );
  }
}

function getUpstreamError(body: unknown): string {
  if (
    typeof body === "object"
    && body !== null
    && "error" in body
    && typeof body.error === "string"
  ) {
    return body.error;
  }
  return "Unable to fetch a live quote";
}
