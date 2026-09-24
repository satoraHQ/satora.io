import SwapRoutePage, { swapRouteMetadata } from "@/components/sections/SwapRoutePage";

const title = "Swap Bitcoin to USDT";
export const metadata = swapRouteMetadata(
  title,
  "Convert BTC to USDT from Bitcoin on-chain, Lightning or Arkade. Choose a supported receiving network, get a quote and continue in the Satora app.",
  "/swap/bitcoin-to-usdt",
);

export default function BitcoinToUsdtPage() {
  return (
    <SwapRoutePage
      title={title}
      introduction="Turn Bitcoin into USDT for a payment or your own wallet, without first depositing BTC on a centralized exchange."
      initialSourceId="bitcoin:BTC"
      initialTargetId="1:USDT"
      assetScope="bitcoin-usdt"
      explanation={{
        title: "Pay in Bitcoin, receive Tether",
        paragraphs: [
          "Keep the funding step in your Bitcoin wallet. Satora sends the USDT to the receiving address you enter in the app, whether it is yours or a recipient's address.",
          "Atomic swaps link the Bitcoin payment and the release of funds on the receiving side. If the swap cannot complete, recovery follows the conditions of the selected route rather than an exchange withdrawal process.",
        ],
      }}
      steps={[
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
      ]}
      networkGuides={[
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
      ]}
      questions={[
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
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
          Check the recipient before sending
        </h2>
        <div className="space-y-5">
          <p>
            A wallet address is not enough to identify the receiving network. For a payment, ask the recipient which
            USDT network and token version they accept. For a service deposit, also check its minimum deposit and
            supported transfer methods.
          </p>
          <p>
            You can use a new receiving wallet, but a new address does not guarantee anonymity. Transactions remain
            public and can be linked to other activity.
          </p>
        </div>
      </div>
      <div className="grid gap-6 border-t border-black/10 pt-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20 dark:border-white/10">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
          Plan for using your USDT
        </h2>
        <div className="space-y-5">
          <p>
            Receiving USDT does not require a gas balance. Sending it later generally requires the native token of that
            network. This swap does not include a separate gas-token balance.
          </p>
          <p>
            Do not assume that a gasless swap service removes every approval cost. In particular, a fresh wallet may
            still need gas to approve USDT spending. Check the external service's token and network requirements first.
          </p>
        </div>
      </div>
    </SwapRoutePage>
  );
}
