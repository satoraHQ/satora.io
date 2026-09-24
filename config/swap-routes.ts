import type { SwapAssetScope } from "@/components/sections/HomepageSwapWidget";
import { tokenRouteContent, type TokenRouteKey } from "@/config/token-route-content";

export type Guide = { title: string; text: string };
export type Question = { question: string; answer: string };
export type ContentSection = { title: string; paragraphs: string[]; link?: { href: string; label: string } };

// One entry per `/swap/<slug>` landing page, rendered by `app/swap/[route]`.
export interface SwapRoute {
  slug: string;
  title: string;
  description: string;
  introduction: string;
  initialSourceId: string;
  initialTargetId: string;
  assetScope: Exclude<SwapAssetScope, "all">;
  explanation: { title: string; paragraphs: string[] };
  steps: Guide[];
  networkGuides: Guide[];
  questions: Question[];
  sections: ContentSection[];
}

type Direction = "to-bitcoin" | "from-bitcoin";

// The token routes share one template; their editorial copy lives in `token-route-content`.
function tokenRoute(token: TokenRouteKey, direction: Direction): SwapRoute {
  const content = tokenRouteContent[token];
  const toBitcoin = direction === "to-bitcoin";
  const introduction = toBitcoin ? content.toBitcoin : content.fromBitcoin;
  return {
    slug: toBitcoin ? `${token}-to-bitcoin` : `bitcoin-to-${token}`,
    title: toBitcoin ? `Swap ${content.symbol} to Bitcoin` : `Swap Bitcoin to ${content.symbol}`,
    description: `${introduction} Select your networks, compare the quote and continue in the Satora app.`,
    introduction,
    initialSourceId: toBitcoin ? content.assetId : "bitcoin:BTC",
    initialTargetId: toBitcoin ? "bitcoin:BTC" : content.assetId,
    assetScope: `bitcoin-${token}`,
    explanation: {
      title: toBitcoin ? content.toHeading : content.fromHeading,
      paragraphs: [toBitcoin ? content.toUse : content.fromUse, content.distinction],
    },
    steps: [
      {
        title: toBitcoin ? "Select your token balance" : "Choose your Bitcoin network",
        text: toBitcoin
          ? `Select the network holding your ${content.symbol}. This page starts with Ethereum.`
          : "Choose on-chain Bitcoin, Lightning or Arkade to match the wallet you will pay from.",
      },
      {
        title: toBitcoin ? "Choose where to receive BTC" : `Choose where to receive ${content.symbol}`,
        text: "Select the receiving network and enter either the amount to send or the amount you want to receive.",
      },
      {
        title: "Continue in the Satora app",
        text:
          "Your selection and entered amount are carried over. Add receiving details, review the final quote and follow the funding instructions.",
      },
    ],
    networkGuides: [
      {
        title: `${content.symbol} networks`,
        text:
          `The current Satora token list includes ${content.networks} for ${content.symbol}. Ethereum is selected by default. Use only the exact token and network offered in the selector; availability and quotes can change.`,
      },
      {
        title: toBitcoin ? "Bitcoin receiving details" : "Bitcoin funding instructions",
        text: toBitcoin
          ? "Choose Bitcoin for an on-chain address, Lightning for a compatible payment destination, or Arkade for a compatible wallet. Follow the destination requirements shown in the app."
          : "Pay the on-chain address, Lightning invoice or Arkade destination provided for your swap. These instructions are network-specific and must not be substituted for each other.",
      },
    ],
    questions: [
      { question: content.question, answer: content.answer },
      {
        question: toBitcoin ? "Can I receive on Lightning or Arkade?" : "Can I pay with Lightning or Arkade?",
        answer:
          "Choose the Bitcoin network in the selector and request a quote. The app provides the route-specific instructions. Wallet compatibility, limits and network conditions still apply.",
      },
      {
        question: "What fees will I pay?",
        answer:
          "Satora charges a 0.5% service fee, plus applicable network fees. Review the final quote in the app and any wallet approval or funding fees before paying.",
      },
      {
        question: toBitcoin ? "Do I need gas to send the token?" : "Will I need gas after receiving the token?",
        answer: toBitcoin
          ? "An EVM wallet may need the network's native token to approve and fund the swap. Check the app and wallet prompts; do not assume a gasless receiving step removes source-side fees."
          : "Receiving the token does not require gas in your wallet. Sending it or interacting with an application generally does. This swap does not include a separate gas-token balance.",
      },
      {
        question: "Can I enter the amount I want to receive?",
        answer:
          "Yes. Enter it in the Buy field. That target amount is passed to the app, which requests an updated quote. Amount limits and available liquidity still apply.",
      },
      {
        question: "What happens if the swap cannot complete?",
        answer:
          "Keep the swap details and recovery material. Recovery depends on the funded route and its status; it may require waiting and network fees. Follow the instructions for that swap rather than assuming an immediate refund.",
      },
    ],
    sections: [
      {
        title: `Understand what you ${toBitcoin ? "send" : "receive"}`,
        paragraphs: [content.definition],
        link: { href: content.source, label: `Read about ${content.name}` },
      },
      {
        title: toBitcoin ? "Prepare your receiving wallet" : "Check the destination before funding",
        paragraphs: [
          toBitcoin
            ? "Keep access to the Bitcoin wallet you intend to receive into. Lightning and Arkade destinations have different requirements from a normal Bitcoin address; use the receiving details requested by the app."
            : `Confirm that your wallet or recipient supports ${content.symbol} on the selected network. An EVM address alone does not confirm token support. Do not send to a service deposit address without checking its requirements.`,
          "The module prepares a quote, not a transaction. The amount you entered is carried into the app, while the other side is recalculated. Check the updated amount and limits before funding.",
        ],
      },
    ],
  };
}

const usdcToBitcoin: SwapRoute = {
  slug: "usdc-to-bitcoin",
  title: "Swap USDC to Bitcoin",
  description:
    "Convert USDC to BTC for your Bitcoin, Lightning or Arkade wallet. Choose your networks, check the quote and continue in the Satora app.",
  introduction:
    "Move from USDC to Bitcoin in your own wallet, without depositing your stablecoins on a centralized exchange.",
  initialSourceId: "1:USDC",
  initialTargetId: "bitcoin:BTC",
  assetScope: "bitcoin-usdc",
  explanation: {
    title: "Get BTC where you want to use it",
    paragraphs: [
      "Use your USDC balance to receive Bitcoin on-chain, fund a Lightning wallet or move into Arkade. Pick the destination that matches your wallet instead of receiving a Bitcoin token on an EVM network.",
      "The quote starts here. In the Satora app, provide your Bitcoin receiving details, review the final amount and follow the USDC funding instructions. Atomic swaps link the two sides of the exchange.",
    ],
  },
  steps: [
    {
      title: "Locate your USDC",
      text: "Select the network where your USDC is held. Ethereum is the default, not a requirement.",
    },
    {
      title: "Choose how to receive BTC",
      text: "Select Bitcoin, Lightning or Arkade and enter the amount you want to send or receive.",
    },
    {
      title: "Continue in the app",
      text:
        "Provide compatible receiving details, review fees and follow the wallet approval and funding instructions.",
    },
  ],
  networkGuides: [
    {
      title: "USDC on the right source network",
      text:
        "An address may hold balances on several networks. Select the network containing the USDC you intend to spend, and use the supported token version. Bridged lookalikes are not interchangeable with the listed USDC.",
    },
    {
      title: "Bitcoin on-chain",
      text:
        "Receive BTC at a Bitcoin address from your wallet. Settlement involves Bitcoin confirmations. Do not use an EVM address or a wrapped-Bitcoin deposit address.",
    },
    {
      title: "Lightning",
      text:
        "Choose a wallet that can receive Lightning payments and follow the receiving instructions in the app. Its invoice or destination must be valid for the swap, and wallet receiving limits can apply.",
    },
    {
      title: "Arkade",
      text:
        "Choose this destination for an Arkade-compatible wallet. Use its Arkade receiving details rather than substituting a normal Bitcoin address.",
    },
  ],
  questions: [
    {
      question: "Will I receive BTC or WBTC?",
      answer:
        "You receive BTC on the Bitcoin network selected in the Buy field, not WBTC or tBTC on an EVM chain. Choose the destination your Bitcoin wallet supports.",
    },
    {
      question: "Can I use USDC on a network other than Ethereum?",
      answer:
        "Use the USDC selector to choose a supported source network. Select the network where your funds actually are and review the quote for that route.",
    },
    {
      question: "Do I need ETH to send my USDC?",
      answer:
        "Funding or approving an EVM token can require the source network's native gas token. Follow the app and wallet prompts; do not assume every funding route is gasless.",
    },
    {
      question: "What fees will I pay?",
      answer:
        "Satora charges a 0.5% service fee, plus applicable network fees. Compare the BTC you receive and review the final quote before funding.",
    },
    {
      question: "Can I choose an exact BTC amount to receive?",
      answer:
        "Yes. Enter the amount in the Buy field. The app receives that target amount and requests an updated quote. Network conditions, limits and destination requirements still apply.",
    },
    {
      question: "What if the swap cannot complete?",
      answer:
        "Keep your swap details and recovery material. Recovery depends on the funding route and status, and may involve a waiting period and network fees. Use the route-specific instructions in the app and documentation.",
    },
  ],
  sections: [
    {
      title: "From a stablecoin balance to spendable sats",
      paragraphs: [
        "If you want to make Lightning payments, choose Lightning as the receiving network and prepare a compatible wallet first. You do not need to receive on-chain BTC as an intermediate step for that route.",
        "If your goal is to hold BTC in an on-chain wallet, leave Bitcoin selected. The best destination is the one you can receive and use, not simply the one with the lowest displayed fee.",
      ],
    },
    {
      title: "Review the amount before funding",
      paragraphs: [
        "The amount you enter is passed to the app, where the quote is refreshed. The other side of the quote can change with the market and fees; an estimate is not a completed swap.",
        "Check your wallet's receiving requirements and the current swap limits. Keep access to your receiving wallet and save any recovery information provided by Satora.",
      ],
    },
  ],
};

const bitcoinToUsdt: SwapRoute = {
  slug: "bitcoin-to-usdt",
  title: "Swap Bitcoin to USDT",
  description:
    "Convert BTC to USDT from Bitcoin on-chain, Lightning or Arkade. Choose a supported receiving network, get a quote and continue in the Satora app.",
  introduction:
    "Turn Bitcoin into USDT for a payment or your own wallet, without first depositing BTC on a centralized exchange.",
  initialSourceId: "bitcoin:BTC",
  initialTargetId: "1:USDT",
  assetScope: "bitcoin-usdt",
  explanation: {
    title: "Pay in Bitcoin, receive Tether",
    paragraphs: [
      "Keep the funding step in your Bitcoin wallet. Satora sends the USDT to the receiving address you enter in the app, whether it is yours or a recipient's address.",
      "Atomic swaps link the Bitcoin payment and the release of funds on the receiving side. If the swap cannot complete, recovery follows the conditions of the selected route rather than an exchange withdrawal process.",
    ],
  },
  steps: [
    {
      title: "Choose the USDT network",
      text: "Check which network and token version your recipient accepts, then select them in the Buy field.",
    },
    {
      title: "Review the quote",
      text: "Enter your BTC amount or desired USDT amount. Continue to the app and add the receiving address.",
    },
    {
      title: "Pay from your Bitcoin wallet",
      text: "Follow the on-chain, Lightning or Arkade instructions and track settlement in the app.",
    },
  ],
  networkGuides: [
    {
      title: "Send BTC on your existing network",
      text:
        "Use Bitcoin on-chain for a normal BTC transaction, Lightning to pay an invoice, or Arkade for funds in a compatible wallet. Each has its own payment instructions.",
    },
    {
      title: "Receive USDT or USDT0",
      text:
        "Ethereum USDT is selected by default. Some other networks use USDT0, shown under its own name in the selector. Confirm that the receiving wallet or service accepts that exact token on that network.",
    },
  ],
  questions: [
    {
      question: "Is this a Bitcoin to USDT TRC20 swap?",
      answer:
        "This page is not a TRON/TRC20 swap page. Use only the networks offered in the selector. Do not enter a TRON address for an Ethereum or other EVM destination.",
    },
    {
      question: "Why does the selector show USDT0?",
      answer:
        "Some supported networks use USDT0 rather than Ethereum USDT. The selected token and network are carried into the app. Do not assume a service that accepts USDT accepts every network or variant.",
    },
    {
      question: "Can I send USDT directly to someone else?",
      answer:
        "Yes. Enter their receiving address in the app after confirming the token and network with them. You fund the Bitcoin side; they receive the selected stablecoin.",
    },
    {
      question: "What fees will I pay?",
      answer:
        "Satora charges a 0.5% service fee, plus applicable network fees. Review the final quote in the app before funding.",
    },
    {
      question: "How long does the swap take?",
      answer:
        "Timing depends on Bitcoin funding, destination settlement and any bridging steps. An on-chain payment requires confirmations. Follow the swap status in the app rather than assuming a fixed completion time.",
    },
    {
      question: "What are the limits and recovery options?",
      answer:
        "Limits depend on the current route and quote. Keep the swap details and recovery material. If a funded swap cannot complete, follow its recovery instructions; refunds can require waiting and network fees.",
    },
  ],
  sections: [
    {
      title: "Check the recipient before sending",
      paragraphs: [
        "A wallet address is not enough to identify the receiving network. For a payment, ask the recipient which USDT network and token version they accept. For a service deposit, also check its minimum deposit and supported transfer methods.",
        "You can use a new receiving wallet, but a new address does not guarantee anonymity. Transactions remain public and can be linked to other activity.",
      ],
    },
    {
      title: "Plan for using your USDT",
      paragraphs: [
        "Receiving USDT does not require a gas balance. Sending it later generally requires the native token of that network. This swap does not include a separate gas-token balance.",
        "Do not assume that a gasless swap service removes every approval cost. In particular, a fresh wallet may still need gas to approve USDT spending. Check the external service's token and network requirements first.",
      ],
    },
  ],
};

const usdtToBitcoin: SwapRoute = {
  slug: "usdt-to-bitcoin",
  title: "Swap USDT to Bitcoin",
  description:
    "Swap Tether USDT or supported USDT0 to BTC without an exchange deposit. Select your networks, compare the quote and continue in the Satora app.",
  introduction:
    "Use your Tether balance to receive Bitcoin on-chain, on Lightning or in an Arkade wallet, with a quote for your selected route.",
  initialSourceId: "1:USDT",
  initialTargetId: "bitcoin:BTC",
  assetScope: "bitcoin-usdt",
  explanation: {
    title: "Turn your USDT balance into Bitcoin",
    paragraphs: [
      "You do not need to deposit USDT on a centralized exchange and request a separate BTC withdrawal. Prepare the swap here, then fund it from your wallet in the Satora app.",
      "Your destination determines how you receive Bitcoin. On-chain, Lightning and Arkade use different receiving details; none of these options gives you a wrapped Bitcoin token on an EVM chain.",
    ],
  },
  steps: [
    {
      title: "Match your Tether balance",
      text: "Choose the source network and check whether your wallet holds USDT or USDT0.",
    },
    {
      title: "Select your Bitcoin wallet",
      text: "Choose on-chain, Lightning or Arkade and enter a USDT amount or a target BTC amount.",
    },
    {
      title: "Review and fund in the app",
      text: "Add the receiving details, check the quote and approve only the funding actions you understand.",
    },
  ],
  networkGuides: [
    {
      title: "Ethereum USDT by default",
      text:
        "The page starts with USDT on Ethereum. If your funds are on another supported network, change the source before requesting a quote. An Ethereum selection cannot spend funds held on a different chain.",
    },
    {
      title: "USDT0 on supported networks",
      text:
        "USDT0 options keep their own token names and network identifiers. Select the exact asset you hold; the app may include additional routing steps for that network.",
    },
    {
      title: "Receive on-chain BTC",
      text:
        "Use a Bitcoin receiving address from your wallet. Allow for settlement and confirmations rather than treating the quote as an immediate wallet balance.",
    },
    {
      title: "Receive through Lightning or Arkade",
      text:
        "Select the network your wallet supports and provide the corresponding receiving details in the app. Lightning payment destinations and Arkade addresses are not interchangeable.",
    },
  ],
  questions: [
    {
      question: "Can I send USDT from TRON?",
      answer:
        "This page does not offer a TRON/TRC20 source. Select only a network listed in the module and fund with that exact asset. Do not send TRC20 USDT to EVM funding instructions.",
    },
    {
      question: "Is USDT0 treated as USDT on Ethereum?",
      answer:
        "No. The module preserves the selected network and token identifier. USDT0 on another chain must not be funded as though it were Ethereum USDT.",
    },
    {
      question: "Will I need gas for USDT approval?",
      answer:
        "Your wallet may require a token approval and network fees before funding. A gasless claim on the other side does not automatically make the source approval gasless. Review the app and wallet prompts.",
    },
    {
      question: "What fees will I pay?",
      answer:
        "Satora charges a 0.5% service fee, plus applicable network fees. Check the final BTC amount and any source-wallet transaction fees before funding.",
    },
    {
      question: "Can I receive Bitcoin directly on Lightning?",
      answer:
        "Choose Lightning in the BTC selector and follow the app's receiving instructions. Availability of a quote does not guarantee that every wallet or invoice can receive the payment; wallet limits and payment routing still apply.",
    },
    {
      question: "What happens if my funded swap gets stuck?",
      answer:
        "Follow the status and recovery instructions for that swap. Keep the recovery material and access to the funding wallet. Depending on the route, recovery can require a waiting period and network fees.",
    },
  ],
  sections: [
    {
      title: "USDT is not the same route on every chain",
      paragraphs: [
        "The token name alone does not identify your funds. Check the network in your sending wallet before selecting a route. USDT on Ethereum and USDT0 on another network use different contracts and funding paths.",
        "This matters especially when moving funds out of a service. If you first need to withdraw to your own wallet, check the withdrawal network and fees before preparing the Satora swap.",
      ],
    },
    {
      title: "Compare the BTC you will receive",
      paragraphs: [
        "Enter the amount you want to send and compare the quoted BTC output. Fees and routing can differ between networks, so a service-fee percentage alone does not describe the full cost.",
        "The app refreshes your quote before funding. Review it with the receiving details and current limits; no swap is executed by entering an amount on this page.",
      ],
    },
  ],
};

// Order is the sitemap order.
export const swapRoutes: SwapRoute[] = [
  usdcToBitcoin,
  bitcoinToUsdt,
  usdtToBitcoin,
  tokenRoute("wbtc", "to-bitcoin"),
  tokenRoute("wbtc", "from-bitcoin"),
  tokenRoute("tbtc", "to-bitcoin"),
  tokenRoute("tbtc", "from-bitcoin"),
  tokenRoute("usat", "to-bitcoin"),
  tokenRoute("usat", "from-bitcoin"),
  tokenRoute("xaut", "to-bitcoin"),
  tokenRoute("xaut", "from-bitcoin"),
];

// Swap pages with their own hand-built layout under `app/swap/<slug>`. A static
// folder takes precedence over the `[route]` segment.
export const customSwapRouteSlugs = ["bitcoin-to-usdc"] as const;

export const swapRoutePaths = [
  ...customSwapRouteSlugs.map((slug) => `/swap/${slug}`),
  ...swapRoutes.map((route) => `/swap/${route.slug}`),
];

export function findSwapRoute(slug: string): SwapRoute | undefined {
  return swapRoutes.find((route) => route.slug === slug);
}
