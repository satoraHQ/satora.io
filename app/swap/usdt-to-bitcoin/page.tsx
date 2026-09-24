import SwapRoutePage, { swapRouteMetadata } from "@/components/sections/SwapRoutePage";

const title = "Swap USDT to Bitcoin";
export const metadata = swapRouteMetadata(
  title,
  "Swap Tether USDT or supported USDT0 to BTC without an exchange deposit. Select your networks, compare the quote and continue in the Satora app.",
  "/swap/usdt-to-bitcoin",
);

export default function UsdtToBitcoinPage() {
  return (
    <SwapRoutePage
      title={title}
      introduction="Use your Tether balance to receive Bitcoin on-chain, on Lightning or in an Arkade wallet, with a quote for your selected route."
      initialSourceId="1:USDT"
      initialTargetId="bitcoin:BTC"
      assetScope="bitcoin-usdt"
      explanation={{
        title: "Turn your USDT balance into Bitcoin",
        paragraphs: [
          "You do not need to deposit USDT on a centralized exchange and request a separate BTC withdrawal. Prepare the swap here, then fund it from your wallet in the Satora app.",
          "Your destination determines how you receive Bitcoin. On-chain, Lightning and Arkade use different receiving details; none of these options gives you a wrapped Bitcoin token on an EVM chain.",
        ],
      }}
      steps={[
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
      ]}
      networkGuides={[
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
      ]}
      questions={[
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
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
          USDT is not the same route on every chain
        </h2>
        <div className="space-y-5">
          <p>
            The token name alone does not identify your funds. Check the network in your sending wallet before selecting
            a route. USDT on Ethereum and USDT0 on another network use different contracts and funding paths.
          </p>
          <p>
            This matters especially when moving funds out of a service. If you first need to withdraw to your own
            wallet, check the withdrawal network and fees before preparing the Satora swap.
          </p>
        </div>
      </div>
      <div className="grid gap-6 border-t border-black/10 pt-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20 dark:border-white/10">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
          Compare the BTC you will receive
        </h2>
        <div className="space-y-5">
          <p>
            Enter the amount you want to send and compare the quoted BTC output. Fees and routing can differ between
            networks, so a service-fee percentage alone does not describe the full cost.
          </p>
          <p>
            The app refreshes your quote before funding. Review it with the receiving details and current limits; no
            swap is executed by entering an amount on this page.
          </p>
        </div>
      </div>
    </SwapRoutePage>
  );
}
