"use client";

import {
  HiOutlineCheckCircle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineClipboard,
  HiOutlineCodeBracket,
  HiOutlineSparkles,
  SiClaude,
  SiOpenai,
} from "@/components/ui/icons";
import { useEffect, useState } from "react";

// ─── Example tab data ───────────────────────────────────────────

export interface Token {
  text: string;
  type:
    | "keyword"
    | "string"
    | "func"
    | "var"
    | "number"
    | "comment"
    | "text"
    | "punct"
    | "type";
}

export const CODE_LINES: Token[][] = [
  [{ text: "// Import LendaSwap SDK and packages", type: "comment" }],
  [
    { text: "import", type: "keyword" },
    { text: " { ", type: "punct" },
    { text: "Client", type: "type" },
    { text: ", ", type: "punct" },
    { text: "Asset", type: "type" },
    { text: ", ", type: "punct" },
    { text: "InMemoryWalletStorage", type: "type" },
    { text: ", ", type: "punct" },
    { text: "InMemorySwapStorage", type: "type" },
    { text: " }", type: "punct" },
  ],
  [
    { text: "  ", type: "text" },
    { text: "from", type: "keyword" },
    { text: " ", type: "text" },
    { text: "\"@lendasat/lendaswap-sdk-pure\"", type: "string" },
    { text: ";", type: "punct" },
  ],
  [],
  [{ text: "// Initialize client", type: "comment" }],
  [
    { text: "const", type: "keyword" },
    { text: " client = ", type: "text" },
    { text: "await", type: "keyword" },
    { text: " Client.", type: "text" },
    { text: "builder", type: "func" },
    { text: "()", type: "punct" },
  ],
  [
    { text: "  .", type: "punct" },
    { text: "withSignerStorage", type: "func" },
    { text: "(", type: "punct" },
    { text: "new", type: "keyword" },
    { text: " ", type: "text" },
    { text: "InMemoryWalletStorage", type: "type" },
    { text: "())", type: "punct" },
  ],
  [
    { text: "  .", type: "punct" },
    { text: "withSwapStorage", type: "func" },
    { text: "(", type: "punct" },
    { text: "new", type: "keyword" },
    { text: " ", type: "text" },
    { text: "InMemorySwapStorage", type: "type" },
    { text: "())", type: "punct" },
  ],
  [
    { text: "  .", type: "punct" },
    { text: "withApiKey", type: "func" },
    { text: "(process.env.", type: "text" },
    { text: "API_KEY", type: "var" },
    { text: ")", type: "punct" },
  ],
  [
    { text: "  .", type: "punct" },
    { text: "build", type: "func" },
    { text: "();", type: "punct" },
  ],
  [],
  [{ text: "// Swap 100k sats \u2192 USDC on Polygon", type: "comment" }],
  [
    { text: "const", type: "keyword" },
    { text: " { response } = ", type: "text" },
    { text: "await", type: "keyword" },
    { text: " client.", type: "text" },
    { text: "createSwap", type: "func" },
    { text: "({", type: "punct" },
  ],
  [
    { text: "  source", type: "text" },
    { text: ":      ", type: "punct" },
    { text: "Asset", type: "text" },
    { text: ".", type: "punct" },
    { text: "BTC_LIGHTNING", type: "var" },
    { text: ",", type: "punct" },
  ],
  [
    { text: "  target", type: "text" },
    { text: ":      ", type: "punct" },
    { text: "Asset", type: "text" },
    { text: ".", type: "punct" },
    { text: "USDC_POLYGON", type: "var" },
    { text: ",", type: "punct" },
  ],
  [
    { text: "  targetAddress", type: "text" },
    { text: ": ", type: "punct" },
    { text: "\"0xYour...Address\"", type: "string" },
    { text: ",", type: "punct" },
  ],
  [
    { text: "  sourceAmount", type: "text" },
    { text: ": ", type: "punct" },
    { text: "100_000", type: "number" },
    { text: ",", type: "punct" },
  ],
  [{ text: "});", type: "punct" }],
  [],
  [
    {
      text: "// Pay the Lightning invoice to execute the swap",
      type: "comment",
    },
  ],
  [
    { text: "console", type: "text" },
    { text: ".", type: "punct" },
    { text: "log", type: "func" },
    { text: "(", type: "punct" },
    { text: "\"Invoice:\"", type: "string" },
    { text: ", response.", type: "text" },
    { text: "bolt11_invoice", type: "var" },
    { text: ");", type: "punct" },
  ],
];

const PLAIN_CODE = `// Import LendaSwap SDK and packages
import { Client, Asset, InMemoryWalletStorage, InMemorySwapStorage }
  from "@lendasat/lendaswap-sdk-pure";

// Initialize client
const client = await Client.builder()
  .withSignerStorage(new InMemoryWalletStorage())
  .withSwapStorage(new InMemorySwapStorage())
  .withApiKey(process.env.API_KEY)
  .build();

// Swap 100k sats \u2192 USDC on Polygon
const { response } = await client.createSwap({
  source:      Asset.BTC_LIGHTNING,
  target:      Asset.USDC_POLYGON,
  targetAddress: "0xYour...Address",
  sourceAmount: 100_000,
});

// Pay the Lightning invoice to execute the swap
console.log("Invoice:", response.bolt11_invoice);`;

export const TOKEN_COLORS: Record<string, string> = {
  keyword: "text-[#7a8a0e] dark:text-lime-light",
  string: "text-[#e88332] dark:text-[#f7931a]",
  func: "text-[#7a8a0e] dark:text-lime",
  type: "text-[#c07415] dark:text-[#f7931a]",
  var: "text-[#c07415] dark:text-[#f0a94e]",
  number: "text-[#c07415] dark:text-[#f0a94e]",
  comment: "text-gray-400 dark:text-gray-500 italic",
  text: "text-gray-700 dark:text-gray-300",
  punct: "text-gray-400 dark:text-gray-500",
};

// ─── Build with AI tab ──────────────────────────────────────────

interface AiConfig {
  direction: string;
  platform: string;
  gasless: boolean;
  extras: string;
}

function buildPrompt(config: AiConfig): string {
  const dirLabels: Record<string, string> = {
    "btc-to-evm": "BTC → EVM (user pays Lightning invoice or sends on-chain BTC, receives EVM tokens)",
    "evm-to-btc": "EVM → BTC (user sends EVM tokens, receives Lightning or on-chain BTC)",
    both: "Both directions (BTC → EVM AND EVM → BTC)",
  };

  const storageImports: Record<string, string> = {
    nextjs: "IdbWalletStorage, IdbSwapStorage",
    node: "InMemoryWalletStorage, InMemorySwapStorage",
    "react-native": "MmkvWalletStorage, MmkvSwapStorage",
    other: "InMemoryWalletStorage, InMemorySwapStorage",
  };

  const storageInit: Record<string, string> = {
    nextjs: "new IdbWalletStorage(), new IdbSwapStorage()",
    node: "new InMemoryWalletStorage(), new InMemorySwapStorage()",
    "react-native": "new MmkvWalletStorage(), new MmkvSwapStorage()",
    other: "new InMemoryWalletStorage(), new InMemorySwapStorage()",
  };

  const storageLabels: Record<string, string> = {
    nextjs: "IdbWalletStorage and IdbSwapStorage (IndexedDB for browser persistence)",
    node: "InMemoryWalletStorage and InMemorySwapStorage (server-side)",
    "react-native": "MmkvWalletStorage and MmkvSwapStorage (MMKV for React Native)",
    other: "InMemoryWalletStorage and InMemorySwapStorage (replace with platform-appropriate adapters)",
  };

  const platLabels: Record<string, string> = {
    nextjs: "Next.js / React (browser)",
    node: "Node.js backend",
    "react-native": "React Native",
    other: "Other",
  };

  const dir = dirLabels[config.direction] || config.direction;
  const plat = platLabels[config.platform] || config.platform;
  const store = storageLabels[config.platform] || storageLabels.other;
  const storageImport = storageImports[config.platform] || storageImports.other;
  const [walletStorageInit, swapStorageInit] = (
    storageInit[config.platform] || storageInit.other
  ).split(", ");

  // ── Build complete code examples ──
  const claimMethod = config.gasless ? "claimViaGasless" : "claim";

  const btcToEvmExample = `\`\`\`ts
${
    config.platform === "nextjs"
      ? `"use client"; // REQUIRED in Next.js  - SDK uses IndexedDB which is browser-only\n`
      : ""
  }import { Client, Asset, ${storageImport} } from "@lendasat/lendaswap-sdk-pure";

// 1. Initialize client (singleton  - reuse across your app)
${
    config.platform === "nextjs"
      ? `// In Next.js, dynamically import the SDK to avoid SSR issues (IndexedDB is browser-only):
// const { Client, Asset, ${storageImport} } = await import("@lendasat/lendaswap-sdk-pure");
`
      : ""
  }const client = await Client.builder()
  .withSignerStorage(${walletStorageInit})
  .withSwapStorage(${swapStorageInit})
  // .withApiKey("optional-for-analytics")  // API key is optional
  // .withMnemonic("your twelve words ...")  // omit to auto-generate & persist
  .build();

// On app startup, recover any swaps interrupted by browser close / app kill:
await client.recoverSwaps();

// Also on app startup: resume polling for any non-terminal swap in storage,
// so users returning mid-swap don't need to re-trigger anything.
const stored = await client.listAllSwaps();
const NON_TERMINAL = new Set(["pending", "clientfundingseen", "clientfunded", "serverfunded"]);
for (const s of stored.filter(x => NON_TERMINAL.has(x.response.status))) {
  // hand each to your background poller (store/provider/service  - not a component)
  resumePoll(s.swapId);
}

// 2. Discover pair limits ONCE (cache for the session). Use this BEFORE showing
// the user the swap UI  - disable the flow if their balance is below min_sats.
const { pairs } = await client.getSwapPairs();
const lnToUsdcPair = pairs.find(p => p.source === "Lightning" && p.target === "137");
console.log("LN→Polygon limits:", lnToUsdcPair?.min_sats, "-", lnToUsdcPair?.max_sats, "sats");

// 3. Get a quote  - show the user exchange rate & fees before committing
const quote = await client.getQuote({
  sourceChain: "Lightning",        // or "Bitcoin" for on-chain, "Arkade" for Arkade
  sourceToken: "BTC",
  targetChain: "137",              // Polygon. Use "1" for Ethereum, "42161" for Arbitrum
  targetToken: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC on Polygon
  sourceAmount: 100_000,           // 100k sats. Specify sourceAmount OR targetAmount, not both
});

console.log("Rate:", quote.exchange_rate);
console.log("You send:", quote.source_amount, "sats");
console.log("You receive:", quote.target_amount, "USDC (smallest unit)");
console.log("Network fee:", quote.network_fee, "sats");
console.log("Protocol fee:", quote.protocol_fee, "sats (", quote.protocol_fee_rate * 100, "%)");
console.log("Limits:", quote.min_amount, "-", quote.max_amount, "sats");

// IMPORTANT: Validate amount is within limits before creating swap
if (100_000 < quote.min_amount || 100_000 > quote.max_amount) {
  throw new Error(\`Amount must be between \${quote.min_amount} and \${quote.max_amount} sats\`);
}

// 4. Create the swap
const { response } = await client.createSwap({
  source: Asset.BTC_LIGHTNING,     // or Asset.BTC_ONCHAIN, Asset.BTC_ARKADE
  target: Asset.USDC_POLYGON,      // or any { chain: "137", tokenId: "0x..." }
  targetAddress: "0xRecipientEvmAddress",
  sourceAmount: 100_000,
});

// response.id             → swap ID  - PERSIST AND SHOW IN UI (the only recovery key)
// response.bolt11_invoice → Lightning invoice (if source is BTC_LIGHTNING)
// response.btc_htlc_address → on-chain address (if source is BTC_ONCHAIN)

// 5. Surface the swap ID immediately  - copyable in the UI, logged, added to history list
console.log("Swap ID (save this!):", response.id);

// 6. Present payment to user
console.log("Pay this Lightning invoice:", response.bolt11_invoice);

// 7. Poll until Satora locks the EVM side (timeout after 30 min).
//    In production, move this into your background poller so it survives navigation.
const POLL_INTERVAL = 3_000;  // 3s for Lightning, use 10_000 for on-chain
const POLL_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const startTime = Date.now();

let swap = await client.getSwap(response.id);
while (swap.status !== "serverfunded" && swap.status !== "expired") {
  if (Date.now() - startTime > POLL_TIMEOUT) {
    throw new Error("Swap polling timed out  - check swap status manually");
  }
  await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  swap = await client.getSwap(response.id);
  console.log("Status:", swap.status);
  // Statuses: "pending" → "clientfundingseen" → "clientfunded" → "serverfunded"
}

if (swap.status === "expired") {
  console.log("Swap expired  - no payment was received");
  return;
}

// 8. Claim the EVM tokens
try {
${
    config.gasless
      ? `  // Gasless: Satora submits the claim tx, small fee deducted from amount
  const claim = await client.claimViaGasless(response.id, "0xRecipientEvmAddress");
  console.log("Claimed! TX:", claim.txHash);`
      : `  // Manual: user's wallet submits the claim tx and pays gas
  const claim = await client.claim(response.id);
  console.log("Claimed! TX:", claim.txHash);`
  }
} catch (err) {
  console.error("Claim failed  - retry from the history view or wait for refund:", err);
  // Expose retry + refund as actions in your swap-history row (keyed by swap ID),
  // not as one-shot console snippets. The user may only discover the failure
  // after reload, so recovery must be reachable from the history view.
  //
  // Retry claim: call claimViaGasless(swapId, destinationAddress) again.
  // Refund: only possible AFTER the HTLC locktime expires (typically 24h):
  //   await client.refundSwap(swapId, {
  //     destinationAddress: "bc1qYourBtcAddress",
  //     feeRateSatPerVb: 2,
  //   });
}
\`\`\``;

  const evmToBtcExample = `\`\`\`ts
${
    config.platform === "nextjs"
      ? `"use client"; // REQUIRED in Next.js  - SDK uses IndexedDB which is browser-only\n`
      : ""
  }import { Client, Asset, ${storageImport} } from "@lendasat/lendaswap-sdk-pure";
import type { EvmSigner } from "@lendasat/lendaswap-sdk-pure";
${
    config.platform === "nextjs"
      ? `import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";`
      : ""
  }

// 1. Initialize client
${
    config.platform === "nextjs"
      ? `// In Next.js, dynamically import the SDK to avoid SSR issues (IndexedDB is browser-only):
// const { Client, Asset, ${storageImport} } = await import("@lendasat/lendaswap-sdk-pure");
`
      : ""
  }const client = await Client.builder()
  .withSignerStorage(${walletStorageInit})
  .withSwapStorage(${swapStorageInit})
  .build();

// On app startup, recover any swaps interrupted by browser close / app kill:
await client.recoverSwaps();

// Also on app startup: resume polling for any non-terminal swap in storage.
// CRITICAL for EVM→BTC: if the user reloads after fundSwap, their EVM tokens
// are locked and only the background poller can carry the swap to settlement
// (or surface the refund CTA if things go wrong).
const stored = await client.listAllSwaps();
const NON_TERMINAL = new Set(["pending", "clientfundingseen", "clientfunded", "serverfunded"]);
for (const s of stored.filter(x => NON_TERMINAL.has(x.response.status))) {
  resumePoll(s.swapId);  // lives in a store/provider/service  - NOT a component
}

// 2. Discover pair limits ONCE (cache for the session). Disable the flow in the UI
// if the user's USDC balance is below min_sats-equivalent  - don't fail at getQuote().
const { pairs } = await client.getSwapPairs();
const usdcToLnPair = pairs.find(p => p.source === "137" && p.target === "Lightning");
console.log("USDC→LN limits (sats):", usdcToLnPair?.min_sats, "-", usdcToLnPair?.max_sats);

// 3. Get a quote
const quote = await client.getQuote({
  sourceChain: "137",
  sourceToken: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC on Polygon
  targetChain: "Lightning",        // or "Bitcoin" for on-chain, "Arkade" for Arkade
  targetToken: "BTC",
  sourceAmount: 5_000_000,         // 5 USDC (6 decimals)
});

console.log("Rate:", quote.exchange_rate);
console.log("You send:", quote.source_amount, "USDC (smallest unit)");
console.log("You receive:", quote.target_amount, "sats");

// Validate amount is within limits
if (5_000_000 < quote.min_amount || 5_000_000 > quote.max_amount) {
  throw new Error(\`Amount out of range: \${quote.min_amount} - \${quote.max_amount}\`);
}

// 4. Create the swap
const { response } = await client.createSwap({
  source: Asset.USDC_POLYGON,
  target: Asset.BTC_LIGHTNING,     // or Asset.BTC_ONCHAIN, Asset.BTC_ARKADE
  sourceAmount: 5_000_000,
});

// response.id → swap ID  - PERSIST AND SHOW IN UI (the only recovery key).
// For EVM→BTC especially: once fundSwap is called, losing this ID means losing
// the ability to trigger a collaborative refund if Satora fails to settle.
console.log("Swap ID (save this!):", response.id);

// 5. Build an EvmSigner from your wallet library
//    This example uses wagmi/viem  - adapt to your wallet setup.
//    The signer handles: allowance checks, ERC-20 approvals, Permit2 signing, and tx submission.
${
    config.platform === "nextjs"
      ? `const publicClient = createPublicClient({ chain: polygon, transport: http() });

const evmSigner: EvmSigner = {
  address: walletClient.account.address,    // from wagmi useWalletClient()
  chainId: polygon.id,
  signTypedData: (td) =>
    walletClient.signTypedData({ ...td, account: walletClient.account }),
  sendTransaction: (tx) =>
    walletClient.sendTransaction({ to: tx.to, data: tx.data, chain: polygon, gas: tx.gas }),
  waitForReceipt: (hash) =>
    publicClient.waitForTransactionReceipt({ hash }).then((r) => ({
      status: r.status, blockNumber: Number(r.blockNumber), transactionHash: r.transactionHash,
    })),
  getTransaction: (hash) =>
    publicClient.getTransaction({ hash }).then((t) => ({
      to: t.to, input: t.input, from: t.from,
    })),
  call: (tx) =>
    publicClient.call({
      to: tx.to as \`0x\${string}\`, data: tx.data as \`0x\${string}\`,
      account: tx.from as \`0x\${string}\`,
    }).then((r) => r.data!),
};`
      : `// Build an EvmSigner that implements:
// {
//   address: string;           // User's EVM address
//   chainId: number;           // e.g. 137 for Polygon
//   signTypedData(td: TypedDataDefinition): Promise<\`0x\${string}\`>;
//   sendTransaction(tx: { to, data, gas? }): Promise<\`0x\${string}\`>;
//   waitForReceipt(hash): Promise<{ status, blockNumber, transactionHash }>;
//   getTransaction(hash): Promise<{ to, input, from }>;
//   call(tx: { to, data, from }): Promise<\`0x\${string}\`>;
// }
const evmSigner: EvmSigner = { /* ... your wallet adapter ... */ };`
  }

// 6. Fund the swap  - SDK handles allowance, approval, Permit2, and tx submission
try {
  const { txHash } = await client.fundSwap(response.id, evmSigner);
  console.log("Funded! TX:", txHash);
} catch (err) {
  console.error("Funding failed:", err);
  // User may have rejected the wallet popup, or insufficient balance/allowance.
  // The swap can be retried  - call fundSwap again with the same swapId (do not
  // create a new swap  - that would leak the old one into a pending/expired state).
  return;
}

// 7. Poll until settlement (timeout after 30 min).
//    In production, move this into your background poller so it survives navigation.
//    Reason: fundSwap already locked the user's EVM tokens  - if they close the
//    modal now, polling MUST continue so settlement or refund can still fire.
const POLL_INTERVAL = 3_000;
const POLL_TIMEOUT = 30 * 60 * 1000;
const startTime = Date.now();

let swap = await client.getSwap(response.id);
while (swap.status !== "serverredeemed" && swap.status !== "expired") {
  if (Date.now() - startTime > POLL_TIMEOUT) {
    throw new Error("Swap polling timed out  - check swap status manually");
  }
  await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  swap = await client.getSwap(response.id);
  console.log("Status:", swap.status);
}

if (swap.status === "serverredeemed") {
  console.log("Success! BTC received on Lightning.");
}

// 8. Error recovery  - expose these as buttons in your swap-history view, not
// as console snippets. Users must be able to trigger them from the history row
// (looking up the swap by its ID) without knowing any internal state.
//
// Collaborative refund (faster, Satora cooperates):
// await client.collabRefundEvmSwap(response.id, "swap-back");
//
// Timeout refund (after 24h, if Satora is unresponsive):
// await client.refundEvmWithSigner(response.id, evmSigner, "swap-back");
//
// Settlement modes:
//   "swap-back" → converts WBTC back to your original token (e.g. USDC) via DEX
//   "direct"    → returns the locked WBTC/tBTC directly to your address
\`\`\``;

  // ── Assemble the full prompt ──
  let codeExamples = "";
  if (config.direction === "btc-to-evm" || config.direction === "both") {
    codeExamples += `\n\n### Complete BTC → EVM example\n${btcToEvmExample}`;
  }
  if (config.direction === "evm-to-btc" || config.direction === "both") {
    codeExamples += `\n\n### Complete EVM → BTC example\n${evmToBtcExample}`;
  }

  return `## Step 0: Read the docs first

**Before writing ANY code, you MUST fetch and read the full SDK documentation:**
- **https://docs.satora.io/llms-full.txt**  - this is a single text file designed for LLM consumption. It contains every method signature, every type definition, every parameter, and every edge case.
- The docs are the **single source of truth**. If anything in this prompt conflicts with the docs, the docs are correct.
- The code examples below are for orientation only  - always cross-reference method names, parameter shapes, and return types against the docs.

## About Satora Swaps
Satora Swaps is non-custodial atomic swap infrastructure for Bitcoin. It lets developers add instant, trustless Bitcoin ↔ EVM token swaps to any app with a single TypeScript SDK  - no custody, no intermediaries. Swaps are secured by Hash Time-Locked Contracts (HTLCs), meaning funds are cryptographically guaranteed: either both sides complete, or neither does. Satora handles all the complexity  - DEX routing, gas abstraction, multi-chain bridging  - so developers can ship in minutes, not months.

- Documentation: https://docs.satora.io
- Full docs for AI context: https://docs.satora.io/llms-full.txt
- Package: \`npm install @lendasat/lendaswap-sdk-pure\`

## My setup
- **Swap direction**: ${dir}
- **Platform**: ${plat}
- **Storage adapters**: ${store}
- **Gasless claiming**: ${
    config.gasless
      ? "Yes  - use client.claimViaGasless() so users never need gas tokens"
      : "No  - users claim with their own wallet and pay gas"
  }
${config.extras ? `- **Additional context**: ${config.extras}` : ""}

## What I need
Production-ready TypeScript code using the Satora Swaps SDK that:

1. **Initializes the client** using Client.builder() with ${store}
2. **Discovers pair limits up front** using \`client.getSwapPairs()\` on app init  - cache the \`min_sats\` / \`max_sats\` / \`fee_percentage\` for every supported pair. Use these to gate the UI *before* the user even starts a swap (e.g. disable the flow, show the minimum, or hide the option entirely if the user's balance is below \`min_sats\`). Do **not** wait until \`getQuote()\` to surface this  - \`getQuote()\` is per-amount, \`getSwapPairs()\` is the source of truth for \"is this pair usable at all.\"
3. **Gets quotes** using client.getQuote() before creating swaps  - display exchange rate, fees, and limits to user. Re-validate against \`quote.min_amount\` / \`quote.max_amount\` (which can be tighter than pair limits).
4. **Creates swaps** using client.createSwap() with the Asset enum
5. **Handles the full swap lifecycle**: status polling → claiming (${
    config.gasless ? "gasless" : "manual"
  }) → error recovery with refund paths
6. **Persists and surfaces swap IDs in the UI**  - this is mandatory, not optional. The swap ID is the only recovery key for interrupted flows. Requirements:
   - **Always display the swap ID** during an active swap (copyable) so users can reference it in support or DevTools.
   - **Build a \"Swaps\" / history view** backed by \`client.listAllSwaps()\`. Each row shows: swap ID, direction, amount, status, and per-row actions (inspect, claim, refund).
   - **Never rely on the user holding a reference to an in-flight swap**  - if they close the modal or reload mid-swap, they must be able to find it again from the history view.
7. **Polling that survives navigation and reload.** On app mount, enumerate all stored swaps via \`listAllSwaps()\`, filter for non-terminal statuses, and resume polling for each one in the background. Do **not** tie polling to the send-modal's lifecycle  - polling must live in a store/provider/service that outlives any individual view. When a non-terminal swap reaches \`serverfunded\` (BTC→EVM) the claim should fire automatically (if gasless) or surface a prominent \"Claim\" CTA in the history view.
8. **Recovers interrupted swaps** on app startup via \`client.recoverSwaps()\` (fire-and-forget alongside  - this repopulates storage from the server for any swap the client's local storage lost).

## Complete working code examples

Use these as your reference implementation. They show the exact SDK methods, parameters, and response shapes:${codeExamples}

## SDK reference

### Client initialization
\`\`\`ts
import { Client, Asset, ${storageImport} } from "@lendasat/lendaswap-sdk-pure";

const client = await Client.builder()
  .withSignerStorage(${walletStorageInit})   // persists mnemonic & key index
  .withSwapStorage(${swapStorageInit})     // persists swap state
  // .withMnemonic("twelve word phrase")    // optional: omit to auto-generate & persist
  // .withApiKey("key")                     // optional: for analytics only
  .build();
\`\`\`

### Key methods
| Method | Description |
|--------|-------------|
| \`client.getSwapPairs()\` | **Call on app init.** Returns every supported pair with \`min_sats\`, \`max_sats\`, and \`fee_percentage\`. Cache this and use it to gate the UI before a user commits to a swap. |
| \`client.getQuote({sourceChain, sourceToken, targetChain, targetToken, sourceAmount?})\` | Get exchange rate, fees, and amount-specific limits before creating a swap |
| \`client.createSwap({source, target, targetAddress?, sourceAmount?})\` | Create a swap. Specify sourceAmount OR targetAmount, not both |
| \`client.getSwap(swapId)\` | Get current swap status |
| \`client.${claimMethod}(${config.gasless ? "swapId, destinationAddress" : "swapId"})\` | Claim ${
    config.gasless
      ? "(gasless  - Satora submits tx, fee deducted from amount)"
      : "(manual  - user pays gas)"
  } |
| \`client.fundSwap(swapId, evmSigner)\` | Fund EVM→BTC swap (handles approval + Permit2 + tx) |
| \`client.refundSwap(swapId, {destinationAddress, feeRateSatPerVb})\` | Refund BTC (after 24h locktime expiry) |
| \`client.collabRefundEvmSwap(swapId, "swap-back"\\|"direct")\` | Refund EVM (collaborative, faster) |
| \`client.refundEvmWithSigner(swapId, evmSigner, "swap-back"\\|"direct")\` | Refund EVM (timeout, after 24h) |
| \`client.recoverSwaps()\` | Resume in-progress swaps from storage |
| \`client.listAllSwaps()\` | List all stored swaps |
| \`client.getTokens(chainId?)\` | Discover available tokens on a chain |

### Swap statuses
**Terminal** (swap is done):
- \`"serverredeemed"\`  - Success: both parties received funds
- \`"expired"\`  - No payment was made
- \`"clientrefunded"\`  - Client reclaimed funds
- \`"clientfundedserverrefunded"\`  - EVM HTLC timed out

**Intermediate** (swap in progress):
- \`"pending"\` → \`"clientfundingseen"\` → \`"clientfunded"\` → \`"serverfunded"\`

For BTC→EVM: claim when status is \`"serverfunded"\`.
For EVM→BTC: swap settles automatically; terminal success is \`"serverredeemed"\`.

### Asset enum
**BTC**: \`Asset.BTC_LIGHTNING\`, \`Asset.BTC_ONCHAIN\`, \`Asset.BTC_ARKADE\`
**EVM**: \`Asset.USDC_POLYGON\`, \`Asset.USDC_ARBITRUM\`, \`Asset.USDT_POLYGON\`, \`Asset.USDT_ARBITRUM\`, \`Asset.WBTC_ETHEREUM\`, \`Asset.WBTC_POLYGON\`, \`Asset.TBTC_ETHEREUM\`
**Any ERC-20**: \`{ chain: "137", tokenId: "0xContractAddress" }\`

### Quote chain & token IDs
- BTC chains: \`"Lightning"\`, \`"Bitcoin"\`, \`"Arkade"\`  - token is always \`"BTC"\`
- EVM chains: \`"137"\` (Polygon), \`"1"\` (Ethereum), \`"42161"\` (Arbitrum)  - token is the ERC-20 contract address

### createSwap response shape
- BTC Lightning source: \`response.bolt11_invoice\` (invoice to pay)
- BTC on-chain source: \`response.btc_htlc_address\` (P2WSH address to fund)
- BTC Arkade source: \`response.btc_vhtlc_address\`
- Always: \`response.id\`, \`response.source_amount\`, \`response.target_amount\`
${
    config.direction !== "btc-to-evm"
      ? `
### EvmSigner interface (for EVM→BTC swaps)
\`\`\`ts
interface EvmSigner {
  address: string;
  chainId: number;
  signTypedData(td: TypedDataDefinition): Promise<\`0x\${string}\`>;
  sendTransaction(tx: { to: string; data: string; gas?: bigint }): Promise<\`0x\${string}\`>;
  waitForReceipt(hash: \`0x\${string}\`): Promise<{ status: "success"|"reverted"; blockNumber: number; transactionHash: string }>;
  getTransaction(hash: \`0x\${string}\`): Promise<{ to: string|null; input: string; from: string }>;
  call(tx: { to: string; data: string; from: string }): Promise<\`0x\${string}\`>;
}
\`\`\`
Build this from wagmi/viem, ethers.js, or any EVM wallet library. See the code example above for a wagmi/viem implementation.
`
      : ""
  }
### Amount units
- **BTC amounts** are always in **satoshis** (1 BTC = 100,000,000 sats)
- **EVM token amounts** are always in the token's **smallest unit** (e.g. USDC has 6 decimals → 1 USDC = 1,000,000; WBTC has 8 decimals → 1 WBTC = 100,000,000)
- This applies to createSwap, getQuote, and all response fields (source_amount, target_amount, min_amount, max_amount)
- Always validate the amount against quote.min_amount and quote.max_amount before creating a swap

### Pair limits preflight (do this once on init, not per-swap)
\`\`\`ts
// On app mount  - cache this and reuse across the app.
const { pairs } = await client.getSwapPairs();
// pairs[i] = { source, target, min_sats, max_sats, fee_percentage }

// Then, before offering a flow (e.g. LN → USDC on Polygon):
const pair = pairs.find(p => p.source === "Lightning" && p.target === "137");
if (!pair || userBalanceSats < pair.min_sats) {
  // Disable the flow or show "Minimum ${"${"}pair?.min_sats${"}"} sats required"
  //  - do NOT let the user type an amount and then fail at getQuote().
}
\`\`\`

### Swap persistence & recovery (required UX)
Swap IDs are the only way to recover an interrupted flow. Treat them as first-class:

\`\`\`ts
// On app mount  - resume any in-flight swaps, regardless of which screen the user lands on:
const all = await client.listAllSwaps();
const NON_TERMINAL = new Set(["pending", "clientfundingseen", "clientfunded", "serverfunded"]);
const active = all.filter(s => NON_TERMINAL.has(s.response.status));
for (const s of active) {
  startBackgroundPolling(s.swapId);  // lives in a store/provider, not a component
}

// Build a "Swaps" history view wired to listAllSwaps() with per-row actions:
//   - Copy swap ID
//   - Inspect (calls getSwap())
//   - Claim (if status === "serverfunded" for BTC→EVM)
//   - Refund (collabRefundEvmSwap / refundSwap depending on direction & locktime)
\`\`\`

**Do not** tie the polling loop to the send-modal's lifecycle. If the user closes the modal, reloads, or navigates away mid-swap, polling must continue in the background and the history view must let them pick up where they left off.
${
    config.platform === "nextjs"
      ? `
### Next.js / SSR important notes
- The SDK uses IndexedDB (via IdbWalletStorage/IdbSwapStorage) which is **browser-only**. Mark all components that use the SDK with \`"use client"\`.
- Consider using dynamic imports to avoid SSR bundling issues: \`const { Client, Asset } = await import("@lendasat/lendaswap-sdk-pure")\`
- Initialize the client lazily (e.g. in a useEffect or on user action), not at module scope
- Use a singleton pattern  - build the client once, reuse across the app
`
      : ""
  }
### Mnemonic & key management
- The SDK auto-generates a 12-word BIP39 mnemonic if none is provided via \`.withMnemonic()\`
- The mnemonic derives all signing keys, HTLC preimages, and user IDs deterministically
- ${
    config.platform === "nextjs"
      ? "IdbWalletStorage persists the mnemonic in IndexedDB  - same keys across browser sessions"
      : config.platform === "react-native"
      ? "MmkvWalletStorage persists the mnemonic in MMKV  - same keys across app sessions"
      : "The WalletStorage adapter persists the mnemonic  - same keys across sessions"
  }
- **Critical**: Always call \`client.recoverSwaps()\` on app startup to resume any in-progress swaps

### Developer portal & organization tracking
If the user wants to track swaps, view analytics, and manage their organization's integration, direct them to the **Satora Developer Portal**: https://developer.lendaswap.com/

Once registered, they receive an **org code** that can optionally be passed to the SDK to associate swaps with their organization:
\`\`\`ts
const client = await Client.builder()
  .withSignerStorage(${walletStorageInit})
  .withSwapStorage(${swapStorageInit})
  .withOrgCode("your-org-code")    // optional: links swaps to your developer portal org
  .build();
\`\`\`
This enables swap tracking, volume analytics, and fee reporting in the developer dashboard.

Please write clean, production-ready code based on the examples and reference above. Adapt the examples to my platform (${plat}) and requirements. Include proper error handling with try/catch around each SDK call, validation of quote limits before creating swaps, polling timeouts, and refund paths for error recovery.

**Reminder: You MUST read https://docs.satora.io/llms-full.txt before writing code. Verify every method name, parameter, and return type against the docs. The examples above are illustrative  - the docs are authoritative.**`;
}

// ─── Component ──────────────────────────────────────────────────

const PILL_BASE = "px-3 py-1.5 text-[12px] rounded-lg border transition-all duration-150 cursor-pointer";
const PILL_ACTIVE = "border-lime-light bg-lime-light/10 text-gray-900 dark:text-white font-medium";
const PILL_INACTIVE =
  "border-gray-200 dark:border-white/[0.08] bg-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/[0.15]";

// Wizard option card (mobile)
interface WizardOption<T extends string | boolean> {
  value: T;
  title: string;
  description: string;
}

function WizardCard<T extends string | boolean>({
  option,
  selected,
  onSelect,
}: {
  option: WizardOption<T>;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-full text-left p-4 rounded-2xl border transition-all duration-150 active:scale-[0.99] ${
        selected
          ? "border-lime-light bg-lime-light/[0.08] dark:bg-lime-light/[0.06]"
          : "border-gray-200 dark:border-white/[0.08] bg-white/40 dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/[0.15]"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            selected
              ? "border-lime dark:border-lime-light bg-lime dark:bg-lime-light"
              : "border-gray-300 dark:border-white/20"
          }`}
        >
          {selected && <span className="block w-1.5 h-1.5 rounded-full bg-white dark:bg-black" />}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-medium text-gray-900 dark:text-white">
            {option.title}
          </div>
          <div className="mt-0.5 text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
            {option.description}
          </div>
        </div>
      </div>
    </button>
  );
}

const DIRECTION_OPTIONS: WizardOption<string>[] = [
  {
    value: "btc-to-evm",
    title: "BTC → EVM",
    description: "Lightning or on-chain BTC → stablecoins on EVM chains",
  },
  {
    value: "evm-to-btc",
    title: "EVM → BTC",
    description: "Stablecoins → Lightning, on-chain, or Arkade BTC",
  },
  {
    value: "both",
    title: "Both directions",
    description: "Bidirectional swaps for full coverage",
  },
];

const PLATFORM_OPTIONS: WizardOption<string>[] = [
  {
    value: "nextjs",
    title: "React / Next.js",
    description: "Browser SDK with IndexedDB persistence",
  },
  {
    value: "node",
    title: "Node.js",
    description: "Server-side, in-memory storage",
  },
  {
    value: "react-native",
    title: "React Native",
    description: "Mobile apps with MMKV storage",
  },
  {
    value: "other",
    title: "Other",
    description: "Custom platform — provide your own storage adapters",
  },
];

const GASLESS_OPTIONS: WizardOption<boolean>[] = [
  {
    value: true,
    title: "Yes, gasless",
    description: "Satora submits EVM claim txs — users never need gas tokens",
  },
  {
    value: false,
    title: "Manual claim",
    description: "Users submit claim txs themselves and pay gas",
  },
];

const WIZARD_STEPS = ["direction", "platform", "gasless", "extras"] as const;

export default function CodeWindow({ wizard = false }: { wizard?: boolean } = {}) {
  const [tab, setTab] = useState<"example" | "ai">("example");
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [config, setConfig] = useState<AiConfig>({
    direction: "btc-to-evm",
    platform: "nextjs",
    gasless: true,
    extras: "",
  });

  // Reset wizard when switching tabs or leaving prompt view
  useEffect(() => {
    if (tab !== "ai") {
      setWizardStep(0);
      setShowPrompt(false);
    }
  }, [tab]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prompt = buildPrompt(config);
  const isReady = config.direction && config.platform;

  return (
    <div className="w-full h-full flex flex-col rounded-2xl border border-gray-200/40 dark:border-white/[0.10] bg-white/50 dark:bg-[#0d0d0d]/60 backdrop-blur-2xl backdrop-saturate-150 shadow-sm dark:shadow-md dark:shadow-black/30 overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center justify-between px-3 h-11 border-b border-gray-100/80 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02] flex-shrink-0">
        <div className="flex items-center gap-0.5 bg-gray-100/80 dark:bg-white/[0.04] rounded-lg p-0.5">
          <button
            onClick={() => setTab("example")}
            className={`px-3 py-1.5 text-[11px] font-medium rounded-[7px] transition-all duration-200 inline-flex items-center gap-1.5 ${
              tab === "example"
                ? "text-gray-900 dark:text-white bg-white dark:bg-white/[0.10] shadow-sm"
                : "text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/50"
            }`}
          >
            <HiOutlineCodeBracket className="w-3 h-3" />
            Integration Example
          </button>
          <button
            onClick={() => setTab("ai")}
            className={`px-3 py-1.5 text-[11px] font-medium rounded-[7px] transition-all duration-200 inline-flex items-center gap-1.5 ${
              tab === "ai"
                ? "text-gray-900 dark:text-white bg-white dark:bg-white/[0.10] shadow-sm"
                : "text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/50"
            }`}
          >
            <HiOutlineSparkles className="w-3 h-3" />
            Build with AI
          </button>
        </div>

        <button
          onClick={() => handleCopy(tab === "example" ? PLAIN_CODE : prompt)}
          className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 transition-colors"
          aria-label="Copy"
        >
          {copied
            ? (
              <span className="inline-flex items-center gap-1.5 text-lime dark:text-lime-light">
                <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                Copied
              </span>
            )
            : (
              <>
                <HiOutlineClipboard className="w-3.5 h-3.5" />
                Copy
              </>
            )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {tab === "example"
          ? (
            /* ─── Code tab ─── */
            <div className="py-4 font-mono text-[13px] leading-[1.7]">
              {CODE_LINES.map((tokens, i) => (
                <div
                  key={i}
                  className="flex hover:bg-gray-50 dark:hover:bg-white/[0.02] px-4 min-h-[1.7em]"
                >
                  <span className="w-6 flex-shrink-0 text-right mr-4 select-none text-gray-300 dark:text-white/15 text-[12px]">
                    {i + 1}
                  </span>
                  <span className="whitespace-pre">
                    {tokens.map((token, j) => (
                      <span key={j} className={TOKEN_COLORS[token.type]}>
                        {token.text}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          )
          : showPrompt
          ? (
            /* ─── Generated prompt view ─── */
            <div className="flex flex-col h-full p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Your prompt
                </h3>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="text-[11px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  ← Edit
                </button>
              </div>
              <div className="flex-1 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-4 overflow-y-auto mb-4">
                <pre className="text-[11px] leading-[1.6] text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono">
								{prompt}
                </pre>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(prompt)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-400 dark:text-gray-500 text-[12px] hover:text-gray-600 dark:hover:text-gray-300 active:scale-95 transition-all duration-150"
                >
                  {copied
                    ? (
                      <span className="inline-flex items-center gap-1.5 text-lime dark:text-lime-light">
                        <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                        Copied!
                      </span>
                    )
                    : (
                      <>
                        <HiOutlineClipboard className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                </button>
                <div className="flex-1" />
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(prompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 text-[12px] font-medium hover:border-gray-300 dark:hover:border-white/[0.15] active:scale-95 transition-all duration-150"
                >
                  <SiClaude className="w-3.5 h-3.5" />
                  Claude
                </a>
                <a
                  href={`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 text-[12px] font-medium hover:border-gray-300 dark:hover:border-white/[0.15] active:scale-95 transition-all duration-150"
                >
                  <SiOpenai className="w-3.5 h-3.5" />
                  ChatGPT
                </a>
              </div>
            </div>
          )
          : wizard
          ? (
            /* ─── AI wizard (mobile, step-by-step) ─── */
            <div className="flex flex-col h-full">
              {/* Progress bar */}
              <div className="flex items-center gap-1.5 px-5 pt-4 pb-3 flex-shrink-0">
                {WIZARD_STEPS.map((s, i) => (
                  <span
                    key={s}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === wizardStep
                        ? "w-8 bg-lime dark:bg-lime-light"
                        : i < wizardStep
                        ? "w-2 bg-lime/50 dark:bg-lime-light/50"
                        : "w-2 bg-gray-200 dark:bg-white/10"
                    }`}
                  />
                ))}
                <span className="ml-auto text-[11px] font-medium text-gray-400 dark:text-gray-500 tabular-nums">
                  {wizardStep + 1} / {WIZARD_STEPS.length}
                </span>
              </div>

              {/* Step body */}
              <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-4">
                {wizardStep === 0 && (
                  <div>
                    <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white tracking-tight">
                      Which way will users swap?
                    </h3>
                    <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      Pick the swap direction your app needs.
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      {DIRECTION_OPTIONS.map((opt) => (
                        <WizardCard
                          key={opt.value}
                          option={opt}
                          selected={config.direction === opt.value}
                          onSelect={() => setConfig({ ...config, direction: opt.value })}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {wizardStep === 1 && (
                  <div>
                    <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white tracking-tight">
                      Which platform are you on?
                    </h3>
                    <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      We'll tailor storage adapters and SSR notes.
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      {PLATFORM_OPTIONS.map((opt) => (
                        <WizardCard
                          key={opt.value}
                          option={opt}
                          selected={config.platform === opt.value}
                          onSelect={() => setConfig({ ...config, platform: opt.value })}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {wizardStep === 2 && (
                  <div>
                    <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white tracking-tight">
                      How should users claim?
                    </h3>
                    <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      Gasless lets users receive tokens without holding gas.
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      {GASLESS_OPTIONS.map((opt) => (
                        <WizardCard
                          key={String(opt.value)}
                          option={opt}
                          selected={config.gasless === opt.value}
                          onSelect={() => setConfig({ ...config, gasless: opt.value })}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {wizardStep === 3 && (
                  <div>
                    <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white tracking-tight">
                      Anything else?
                    </h3>
                    <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      Optional — add specifics like tokens, chains, or constraints.
                    </p>
                    <textarea
                      value={config.extras}
                      onChange={(e) => setConfig({ ...config, extras: e.target.value })}
                      placeholder="e.g. USDC on Polygon, webhook on completion, specific amount range..."
                      rows={5}
                      className="mt-5 w-full px-4 py-3 text-[14px] bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-lime dark:focus:border-lime-light transition-colors resize-none leading-relaxed"
                    />
                    <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">
                      Skip this step if you don't have anything specific in mind.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer nav */}
              <div className="flex items-center gap-3 px-5 py-3 border-t border-gray-100 dark:border-white/[0.06] bg-white/40 dark:bg-black/20 backdrop-blur-md flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setWizardStep(Math.max(0, wizardStep - 1))}
                  disabled={wizardStep === 0}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all duration-150 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <HiOutlineChevronLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <div className="flex-1" />
                {wizardStep < WIZARD_STEPS.length - 1
                  ? (
                    <button
                      type="button"
                      onClick={() => setWizardStep(wizardStep + 1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime-light text-black text-sm font-medium hover:brightness-95 dark:hover:brightness-110 active:scale-95 transition-all duration-150 shadow-[0_0_20px_rgba(163,196,16,0.25)] dark:shadow-[0_0_20px_rgba(194,232,33,0.2)]"
                    >
                      Next
                      <HiOutlineChevronRight className="w-4 h-4" />
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      onClick={() => isReady && setShowPrompt(true)}
                      disabled={!isReady}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime-light text-black text-sm font-medium hover:brightness-95 dark:hover:brightness-110 active:scale-95 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(163,196,16,0.25)] dark:shadow-[0_0_20px_rgba(194,232,33,0.2)]"
                    >
                      <HiOutlineSparkles className="w-4 h-4" />
                      Generate
                    </button>
                  )}
              </div>
            </div>
          )
          : (
            /* ─── AI config form (desktop) ─── */
            <div className="flex flex-col h-full p-5 overflow-y-auto">
              {/* Direction */}
              <div className="mb-5">
                <label className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 block">
                  Swap direction
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { value: "btc-to-evm", label: "BTC → EVM" },
                    { value: "evm-to-btc", label: "EVM → BTC" },
                    { value: "both", label: "Both" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setConfig({ ...config, direction: opt.value })}
                      className={`${PILL_BASE} ${config.direction === opt.value ? PILL_ACTIVE : PILL_INACTIVE}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="mb-5">
                <label className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 block">
                  Platform
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { value: "nextjs", label: "React / Next.js" },
                    { value: "node", label: "Node.js" },
                    { value: "react-native", label: "React Native" },
                    { value: "other", label: "Other" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setConfig({ ...config, platform: opt.value })}
                      className={`${PILL_BASE} ${config.platform === opt.value ? PILL_ACTIVE : PILL_INACTIVE}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gasless */}
              <div className="mb-5">
                <label className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 block">
                  Gasless claiming
                </label>
                <div className="flex gap-1.5 mb-2">
                  <button
                    onClick={() => setConfig({ ...config, gasless: true })}
                    className={`${PILL_BASE} ${config.gasless ? PILL_ACTIVE : PILL_INACTIVE}`}
                  >
                    Yes, gasless
                  </button>
                  <button
                    onClick={() => setConfig({ ...config, gasless: false })}
                    className={`${PILL_BASE} ${!config.gasless ? PILL_ACTIVE : PILL_INACTIVE}`}
                  >
                    Manual claim
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">
                  {config.gasless
                    ? "Satora submits EVM claim txs for your users  - they never need gas tokens."
                    : "Users submit claim transactions themselves with their own wallet and pay gas."}
                </p>
              </div>

              {/* Extras */}
              <div className="mb-5">
                <label className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 block">
                  Additional details <span className="normal-case font-normal">(optional)</span>
                </label>
                <textarea
                  value={config.extras}
                  onChange={(e) => setConfig({ ...config, extras: e.target.value })}
                  placeholder="e.g. USDC on Polygon, webhook on completion, specific amount range, error handling needs..."
                  rows={3}
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-lime dark:focus:border-lime-light transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Generate */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => isReady && setShowPrompt(true)}
                  disabled={!isReady}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-lime-light text-black text-[12px] font-medium hover:brightness-95 dark:hover:brightness-110 active:scale-95 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <HiOutlineSparkles className="w-3 h-3" />
                  Generate prompt
                </button>
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                  for Claude, ChatGPT, or Cursor
                </span>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
