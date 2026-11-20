import { BRIDGE_ASSETS } from "@/config/bridge-assets";

const SATORA_API_URL = "https://api.satora.io";

interface ApiToken {
  token_id: string;
  symbol: string;
  chain: string;
  name: string;
  decimals: number;
}

interface TokenResponse {
  btc_tokens: ApiToken[];
  evm_tokens: ApiToken[];
}

interface BridgeToken extends ApiToken {
  chain_name: string;
}

export interface SwapAssetRecord {
  id: string;
  symbol: string;
  chain: string;
  decimals: number;
  kind: "bitcoin" | "evm";
  icon?: string;
  networkIcon?: string;
  bitcoinTargets?: string[];
  quoteChain: string;
  quoteToken: string;
}

const NETWORK_ICONS: Record<string, string> = {
  "1": "/assets/chains/ethereum.svg",
  "10": "/assets/chains/optimism.svg",
  "137": "/assets/chains/polygon.svg",
  "8453": "/assets/chains/base.svg",
  "42161": "/assets/chains/arbitrum.svg",
  "43114": "/assets/chains/avalanche.svg",
  Bitcoin: "/assets/chains/bitcoin.svg",
  Lightning: "/assets/chains/lightning.svg",
  Arkade: "/assets/chains/arkade.svg",
};

const NETWORK_NAMES: Record<string, string> = {
  "1": "Ethereum",
  "10": "Optimism",
  "137": "Polygon",
  "8453": "Base",
  "42161": "Arbitrum",
  "43114": "Avalanche",
};

const NETWORK_ORDER = new Map(
  ["Lightning", "Bitcoin", "Arkade", "42161", "137", "1", "8453", "10", "43114"]
    .map((chain, index) => [chain, index]),
);

async function getSwapPairs(): Promise<{ source: string; target: string }[] | undefined> {
  try {
    const response = await fetch(`${SATORA_API_URL}/swap-pairs`, {
      next: { revalidate: 300 },
      headers: { "X-Lendaswap-Client": "satora-website/0.0.9" },
      signal: AbortSignal.timeout(1500),
    });
    if (!response.ok) return undefined;
    const body = await response.json() as { pairs: { source: string; target: string }[] };
    return Array.isArray(body.pairs) ? body.pairs : undefined;
  } catch {
    // Keep the core routes available if optional route discovery fails or times out.
    return undefined;
  }
}

export async function getSwapAssets(
  { includeRoutes = false }: { includeRoutes?: boolean } = {},
): Promise<SwapAssetRecord[]> {
  const [response, pairs] = await Promise.all([
    fetch(`${SATORA_API_URL}/tokens`, {
      next: { revalidate: 300 },
      headers: { "X-Lendaswap-Client": "satora-website/0.0.9" },
    }),
    includeRoutes ? getSwapPairs() : Promise.resolve(undefined),
  ]);

  if (!response.ok) {
    throw new Error(`Unable to load Satora tokens (${response.status})`);
  }

  const tokens = await response.json() as TokenResponse;
  const evmAssets = [
    ...tokens.evm_tokens,
    ...BRIDGE_ASSETS.filter((token) => isBridgeAsset(token.symbol)),
  ];

  const records = [
    ...tokens.btc_tokens.map((token) => toAssetRecord(token)),
    ...evmAssets.map((token) => toAssetRecord(token)),
  ];

  const unique = new Map<string, SwapAssetRecord>();
  for (const record of records) {
    if (record.kind === "bitcoin" && pairs) {
      record.bitcoinTargets = pairs
        .filter((pair) => pair.source === record.quoteChain)
        .map((pair) => pair.target);
    }
    if (!unique.has(record.id)) unique.set(record.id, record);
  }

  return [...unique.values()].sort((left, right) => {
    const leftOrder = NETWORK_ORDER.get(left.quoteChain) ?? 100;
    const rightOrder = NETWORK_ORDER.get(right.quoteChain) ?? 100;
    if (leftOrder !== rightOrder) return leftOrder - rightOrder;
    return left.symbol.localeCompare(right.symbol) || left.chain.localeCompare(right.chain);
  });
}

function toAssetRecord(token: ApiToken | BridgeToken): SwapAssetRecord {
  const bitcoin = token.token_id.toLowerCase() === "btc";
  const symbol = bitcoin ? "BTC" : token.symbol;
  const normalizedSymbol = symbol.toUpperCase();
  const chainLabel = bitcoin
    ? token.chain
    : "chain_name" in token
    ? token.chain_name
    : NETWORK_NAMES[token.chain] ?? token.chain;

  return {
    id: bitcoin ? `${token.chain.toLowerCase()}:BTC` : `${token.chain}:${symbol}`,
    symbol,
    chain: chainLabel,
    decimals: token.decimals,
    kind: bitcoin ? "bitcoin" : "evm",
    icon: bitcoin
      ? "/assets/chains/bitcoin.svg"
      : normalizedSymbol === "USDC"
      ? "/assets/chains/usdc.svg"
      : normalizedSymbol === "USDT" || normalizedSymbol === "USDT0"
      ? "/assets/chains/usdt.svg"
      : undefined,
    networkIcon: NETWORK_ICONS[token.chain],
    quoteChain: token.chain,
    quoteToken: token.token_id,
  };
}

function isBridgeAsset(symbol: string): boolean {
  return ["USDC", "USDT", "USDT0"].includes(symbol.toUpperCase());
}
