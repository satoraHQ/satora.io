import SwapRoutePage, { swapRouteMetadata } from "@/components/sections/SwapRoutePage";
import { tokenRouteContent, type TokenRouteKey } from "@/config/token-route-content";

type Direction = "to-bitcoin" | "from-bitcoin";
type Props = { token: TokenRouteKey; direction: Direction };

export function tokenRouteMetadata(token: TokenRouteKey, direction: Direction) {
  const content = tokenRouteContent[token];
  const toBitcoin = direction === "to-bitcoin";
  const title = toBitcoin ? `Swap ${content.symbol} to Bitcoin` : `Swap Bitcoin to ${content.symbol}`;
  const slug = toBitcoin ? `${token}-to-bitcoin` : `bitcoin-to-${token}`;
  return swapRouteMetadata(
    title,
    `${
      toBitcoin ? content.toBitcoin : content.fromBitcoin
    } Select your networks, compare the quote and continue in the Satora app.`,
    `/swap/${slug}`,
  );
}

export default function TokenRoutePage({ token, direction }: Props) {
  const content = tokenRouteContent[token];
  const toBitcoin = direction === "to-bitcoin";
  const title = toBitcoin ? `Swap ${content.symbol} to Bitcoin` : `Swap Bitcoin to ${content.symbol}`;
  return (
    <SwapRoutePage
      title={title}
      introduction={toBitcoin ? content.toBitcoin : content.fromBitcoin}
      initialSourceId={toBitcoin ? content.assetId : "bitcoin:BTC"}
      initialTargetId={toBitcoin ? "bitcoin:BTC" : content.assetId}
      assetScope={`bitcoin-${token}`}
      explanation={{
        title: toBitcoin ? content.toHeading : content.fromHeading,
        paragraphs: [toBitcoin ? content.toUse : content.fromUse, content.distinction],
      }}
      steps={[
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
      ]}
      networkGuides={[
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
      ]}
      questions={[
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
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
          Understand what you {toBitcoin ? "send" : "receive"}
        </h2>
        <div className="space-y-5">
          <p>{content.definition}</p>
          <a
            href={content.source}
            className="font-medium text-[#607300] underline underline-offset-4 dark:text-lime-light"
          >
            Read about {content.name}
          </a>
        </div>
      </div>
      <div className="grid gap-6 border-t border-black/10 pt-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20 dark:border-white/10">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
          {toBitcoin ? "Prepare your receiving wallet" : "Check the destination before funding"}
        </h2>
        <div className="space-y-5">
          <p>
            {toBitcoin
              ? "Keep access to the Bitcoin wallet you intend to receive into. Lightning and Arkade destinations have different requirements from a normal Bitcoin address; use the receiving details requested by the app."
              : `Confirm that your wallet or recipient supports ${content.symbol} on the selected network. An EVM address alone does not confirm token support. Do not send to a service deposit address without checking its requirements.`}
          </p>
          <p>
            The module prepares a quote, not a transaction. The amount you entered is carried into the app, while the
            other side is recalculated. Check the updated amount and limits before funding.
          </p>
        </div>
      </div>
    </SwapRoutePage>
  );
}
