// Editorial copy is explicit per token. Asset identifiers preserve API casing.
export const tokenRouteContent = {
  wbtc: {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    assetId: "1:WBTC",
    networks: "Ethereum, Arbitrum and Polygon",
    definition:
      "WBTC is a token representing Bitcoin on other networks. Holding it in an EVM wallet is different from holding BTC in a Bitcoin wallet.",
    toBitcoin:
      "Move WBTC out of your EVM wallet and receive BTC where you want to use it, without an exchange deposit.",
    fromBitcoin: "Exchange Bitcoin for WBTC on a supported EVM network, ready for a compatible wallet or application.",
    toHeading: "From wrapped Bitcoin to a Bitcoin wallet",
    fromHeading: "Use Bitcoin value in an EVM application",
    toUse:
      "If your WBTC is no longer needed in an EVM application, swap it for BTC on-chain, on Lightning or in Arkade. You receive BTC through the selected route, not another wrapped token.",
    fromUse:
      "If an application accepts WBTC, choose its supported network before swapping. Receiving WBTC does not automatically deposit it into a lending protocol, liquidity pool or other product.",
    distinction:
      "This is a market swap, not a request to mint or redeem WBTC with its issuer. Review the net quote instead of assuming you receive exactly 1 BTC for 1 WBTC after fees.",
    question: "Does swapping WBTC to BTC mean redeeming it with the issuer?",
    answer:
      "No. Satora provides a swap route. It is separate from the WBTC issuer's minting and redemption process, and the amount received depends on the quote and fees.",
    source: "https://www.wbtc.network/",
  },
  tbtc: {
    symbol: "tBTC",
    name: "tBTC",
    assetId: "1:tBTC",
    networks: "Ethereum and Arbitrum",
    definition:
      "tBTC is a tokenized form of Bitcoin. It can be used in compatible EVM applications, but it is not BTC held at a Bitcoin address.",
    toBitcoin: "Swap your tBTC balance for BTC in a Bitcoin, Lightning or Arkade wallet.",
    fromBitcoin: "Get tBTC from Bitcoin without first depositing BTC on a centralized exchange.",
    toHeading: "Take tBTC back to the Bitcoin network you use",
    fromHeading: "Receive tBTC for an EVM use case",
    toUse:
      "Choose on-chain Bitcoin if you want BTC at a Bitcoin address, or select Lightning or Arkade for a compatible wallet. You do not need to receive another EVM Bitcoin token first.",
    fromUse:
      "Choose the network where you intend to hold or use tBTC. A protocol that accepts tBTC on Ethereum does not necessarily accept the Arbitrum version, even if your wallet uses the same address.",
    distinction:
      "A Satora swap is distinct from the tBTC protocol's own minting or redemption flow. Check the quote, destination and fees rather than assuming the routes have the same requirements.",
    question: "Can I send tBTC directly to a Bitcoin address?",
    answer:
      "No. tBTC is an EVM token. Use the swap to receive BTC at compatible Bitcoin receiving details; do not transfer tBTC itself to a Bitcoin address.",
    source: "https://docs.threshold.network/tbtc-v2",
  },
  usat: {
    symbol: "USAT",
    name: "USA₮",
    assetId: "1:USAT",
    networks: "Ethereum",
    definition:
      "USA₮, shown as USAT in the selector, is a dollar-backed stablecoin. It is a different token from USDT and USDC.",
    toBitcoin: "Use USAT to receive Bitcoin in your own wallet, with a live quote before you continue to the app.",
    fromBitcoin: "Convert Bitcoin to USAT on Ethereum without using a centralized exchange balance.",
    toHeading: "Move from a USAT balance to BTC",
    fromHeading: "Receive USAT, not USDT",
    toUse:
      "Start with the USAT held in your Ethereum wallet. Select Bitcoin, Lightning or Arkade as your destination and review the BTC amount you will receive after fees.",
    fromUse:
      "Confirm that your wallet or recipient accepts USAT on Ethereum. A service accepting USDT or USDC does not automatically support USAT; the token contract matters as well as the network.",
    distinction:
      "This route exchanges tokens. It is not a bank transfer or a redemption for US dollars. Issuer terms and token risks still apply after an atomic swap.",
    question: "Is USAT interchangeable with USDT?",
    answer:
      "No. They are separate tokens. This page selects USAT explicitly, and the application receives that identifier. Confirm your recipient supports USAT before funding.",
    source:
      "https://tether.io/news/tether-announces-the-launch-of-usat-the-federally-regulated-dollar-backed-stablecoin-made-in-america/",
  },
  xaut: {
    symbol: "XAUt",
    name: "Tether Gold",
    assetId: "1:XAUt",
    networks: "Ethereum",
    definition:
      "XAUt is Tether Gold, a token backed by physical gold. It is not a dollar-pegged stablecoin, and its exchange rate against Bitcoin changes.",
    toBitcoin: "Exchange Tether Gold tokens for Bitcoin and receive BTC in your selected wallet.",
    fromBitcoin: "Swap Bitcoin for XAUt, Tether's gold-backed token, on Ethereum.",
    toHeading: "From tokenized gold to Bitcoin",
    fromHeading: "From Bitcoin to tokenized gold",
    toUse:
      "Select the XAUt balance in your Ethereum wallet, then choose how to receive BTC. The quote expresses what your token amount can buy in Bitcoin, not a fixed dollar conversion.",
    fromUse:
      "Receive XAUt in a compatible Ethereum wallet. This is a token transfer, not delivery of a gold bar or a request for physical redemption.",
    distinction:
      "Gold backing does not remove issuer, custody or smart-contract risks. Physical redemption is a separate issuer process with its own conditions; Satora does not perform it.",
    question: "Does this swap deliver physical gold?",
    answer:
      "No. The BTC-to-XAUt route delivers tokens to a wallet. XAUt-to-BTC exchanges tokens for Bitcoin. Any physical redemption is separate and subject to the issuer's terms.",
    source: "https://gold.tether.to/",
  },
} as const;

export type TokenRouteKey = keyof typeof tokenRouteContent;
