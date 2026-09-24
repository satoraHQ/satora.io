import SwapRoutePage, { swapRouteMetadata } from "@/components/sections/SwapRoutePage";

const title = "Swap USDC to Bitcoin";
export const metadata = swapRouteMetadata(
  title,
  "Convert USDC to BTC for your Bitcoin, Lightning or Arkade wallet. Choose your networks, check the quote and continue in the Satora app.",
  "/swap/usdc-to-bitcoin",
);

export default function UsdcToBitcoinPage() {
  return (
    <SwapRoutePage
      title={title}
      introduction="Move from USDC to Bitcoin in your own wallet, without depositing your stablecoins on a centralized exchange."
      initialSourceId="1:USDC"
      initialTargetId="bitcoin:BTC"
      assetScope="bitcoin-usdc"
      explanation={{
        title: "Get BTC where you want to use it",
        paragraphs: [
          "Use your USDC balance to receive Bitcoin on-chain, fund a Lightning wallet or move into Arkade. Pick the destination that matches your wallet instead of receiving a Bitcoin token on an EVM network.",
          "The quote starts here. In the Satora app, provide your Bitcoin receiving details, review the final amount and follow the USDC funding instructions. Atomic swaps link the two sides of the exchange.",
        ],
      }}
      steps={[
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
      ]}
      networkGuides={[
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
      ]}
      questions={[
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
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
          From a stablecoin balance to spendable sats
        </h2>
        <div className="space-y-5">
          <p>
            If you want to make Lightning payments, choose Lightning as the receiving network and prepare a compatible
            wallet first. You do not need to receive on-chain BTC as an intermediate step for that route.
          </p>
          <p>
            If your goal is to hold BTC in an on-chain wallet, leave Bitcoin selected. The best destination is the one
            you can receive and use, not simply the one with the lowest displayed fee.
          </p>
        </div>
      </div>
      <div className="grid gap-6 border-t border-black/10 pt-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20 dark:border-white/10">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
          Review the amount before funding
        </h2>
        <div className="space-y-5">
          <p>
            The amount you enter is passed to the app, where the quote is refreshed. The other side of the quote can
            change with the market and fees; an estimate is not a completed swap.
          </p>
          <p>
            Check your wallet's receiving requirements and the current swap limits. Keep access to your receiving wallet
            and save any recovery information provided by Satora.
          </p>
        </div>
      </div>
    </SwapRoutePage>
  );
}
