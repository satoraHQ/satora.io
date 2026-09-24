import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HomepageSwapWidget from "@/components/sections/HomepageSwapWidget";
import SwapRouteTree from "@/components/sections/SwapRouteTree";
import type { Metadata } from "next";

const title = "Swap Bitcoin to USDC";
const description =
  "Convert Bitcoin to USDC without an exchange deposit. Choose your Bitcoin and USDC networks, get a live quote, and continue in the Satora app.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/swap/bitcoin-to-usdc" },
  openGraph: {
    title: `${title} | Satora`,
    description,
    url: "/swap/bitcoin-to-usdc",
    type: "website",
    images: ["https://satora.io/thumbnail.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Satora`,
    description,
    images: ["https://satora.io/thumbnail.jpg"],
    creator: "@satora_io",
    site: "@satora_io",
  },
};

const questions = [
  {
    question: "Can I swap Bitcoin on-chain, Lightning or Arkade to USDC?",
    answer:
      "Yes. Choose your network in the BTC selector. The module shows available USDC destinations and requests a quote for your selection.",
  },
  {
    question: "Which network will my USDC arrive on?",
    answer:
      "Your USDC arrives on the network selected in the Buy field. Make sure your recipient accepts USDC on that network before funding; the same EVM address can exist on multiple networks.",
  },
  {
    question: "What exchange rate and fees apply?",
    answer:
      "Satora charges a 0.5% service fee, plus applicable network fees. Enter an amount to see the current quote, then review the final quote in the app before funding your swap.",
  },
  {
    question: "Do I need to send my Bitcoin to an exchange first?",
    answer:
      "No. You fund the swap from your Bitcoin wallet, and the USDC goes directly to the receiving address you provide in the app.",
  },
  {
    question: "How long does a Bitcoin to USDC swap take?",
    answer:
      "Timing depends on the route and network conditions. On-chain BTC requires Bitcoin confirmations; Lightning and Arkade use different funding flows. The destination network and any additional bridging steps also affect settlement. Track progress in the app.",
  },
  {
    question: "Are there minimum or maximum swap amounts?",
    answer:
      "Yes. Limits vary by route and can change. Enter your amount and check the current quote in the app before funding.",
    link: {
      href: "https://docs.satora.io/quotes-rates/exchange-rate",
      label: "How quotes and limits work",
    },
  },
  {
    question: "What happens if my swap cannot complete?",
    answer:
      "Recovery depends on your route and swap status. An on-chain Bitcoin refund requires the timelock to expire and a network fee; Lightning and Arkade have different recovery flows. Keep your swap details and recovery material, and follow the route-specific instructions. Refunds are not necessarily immediate.",
    link: {
      href: "https://docs.satora.io/faq/troubleshooting",
      label: "Read the recovery and troubleshooting guide",
    },
  },
];

export default function BitcoinToUsdcPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-[#f5f4ef] dark:bg-black">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(194,232,33,0.12),transparent_65%)]" />
          <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-24 sm:px-8 sm:pb-20 sm:pt-28">
            <h1 className="text-center text-[2.25rem] font-semibold leading-tight tracking-[-0.055em] text-gray-950 sm:text-6xl dark:text-white">
              Swap Bitcoin to <span className="whitespace-nowrap">USDC.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Convert Bitcoin from on-chain, Lightning or Arkade to USDC on your preferred supported network, without
              depositing funds on a centralized exchange.
            </p>
            <div className="mx-auto mt-7 w-full min-w-0 max-w-xl sm:mt-9">
              <HomepageSwapWidget initialSourceId="bitcoin:BTC" initialTargetId="1:USDC" assetScope="bitcoin-usdc" />
            </div>
            <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Choose your networks and amount, then continue in the Satora app to add your receiving address and
              complete the swap.
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-black">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
                Swap Bitcoin to USDC without a centralized exchange
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  Send Bitcoin from your wallet and receive USDC at your chosen address. There is no exchange balance to
                  top up or withdraw from.
                </p>
                <p>
                  Satora uses atomic swaps to link the Bitcoin payment and the release of funds on the receiving side.
                  If a funded swap cannot complete, recovery follows the conditions and deadlines of your selected
                  route.
                </p>
                <a
                  href="https://docs.satora.io/advanced/htlc"
                  className="inline-block font-medium text-[#607300] underline underline-offset-4 hover:text-black dark:text-lime-light dark:hover:text-white"
                >
                  How atomic swaps and timelocks work
                </a>
              </div>
            </div>
            <ol className="mt-14 grid gap-8 border-t border-black/10 pt-8 md:grid-cols-3 dark:border-white/10">
              {[
                [
                  "Choose your route",
                  "Select the Bitcoin and USDC networks, then enter an amount to see a live quote.",
                ],
                [
                  "Review in the app",
                  "Continue with your selection, add your USDC receiving address and check the swap details.",
                ],
                [
                  "Fund your swap",
                  "Follow the payment instructions in the app and track the swap through to completion.",
                ],
              ].map(([heading, text], index) => (
                <li key={heading}>
                  <span className="text-sm font-medium text-[#607300] dark:text-lime-light">0{index + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold text-gray-950 dark:text-white">{heading}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-black/[0.07] bg-[#f8f8f5] px-4 py-16 sm:px-8 sm:py-24 dark:border-white/[0.07] dark:bg-[#080808]">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
              Choose your Bitcoin and USDC networks
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Choose the network your Bitcoin wallet uses, then the network where you want to receive USDC.
            </p>
            <h3 className="mt-9 text-xl font-semibold text-gray-950 dark:text-white">Sending Bitcoin</h3>
            <dl className="mt-5 grid gap-7 md:grid-cols-3">
              {[
                [
                  "Bitcoin on-chain",
                  "Send to the Bitcoin address provided by the app. Funding requires Bitcoin confirmations and a network fee.",
                ],
                [
                  "Lightning",
                  "Pay the swap invoice from a Lightning wallet. Payment routing and fees depend on your wallet.",
                ],
                [
                  "Arkade",
                  "Use BTC held in an Arkade-compatible wallet and follow the Arkade payment instructions in the app.",
                ],
              ].map(([network, guidance]) => (
                <div key={network} className="border-t border-black/10 pt-5 dark:border-white/10">
                  <dt className="text-lg font-semibold text-gray-950 dark:text-white">{network}</dt>
                  <dd className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">{guidance}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 grid gap-6 border-t border-black/10 pt-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20 dark:border-white/10">
              <h3 className="text-xl font-semibold text-gray-950 dark:text-white">Receiving USDC</h3>
              <div className="space-y-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  Ethereum is selected by default. Change it to the network accepted by your receiving wallet, app or
                  recipient. An EVM address alone does not tell you which network to use.
                </p>
                <p>
                  Use the USDC selector to see available networks. Compare the amount you will receive and plan for
                  network fees when you later send or spend your USDC.
                </p>
                <a
                  href="https://docs.satora.io/quotes-rates/supported-tokens"
                  className="inline-block font-medium text-[#607300] underline underline-offset-4 hover:text-black dark:text-lime-light dark:hover:text-white"
                >
                  See supported tokens and networks
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-black/[0.07] bg-white px-4 py-16 sm:px-8 sm:py-24 dark:border-white/[0.07] dark:bg-black">
          <div className="mx-auto max-w-5xl space-y-12 sm:space-y-16">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
                Receive USDC in a fresh wallet
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  Receive USDC in a new wallet instead of reusing an address associated with your previous activity.
                  Create an address on your chosen network, then enter it in the Satora app.
                </p>
                <p>
                  A fresh address has no previous transaction history, but it does not guarantee anonymity. On-chain
                  transactions remain public and may be linked to other activity.
                </p>
              </div>
            </div>
            <div className="grid gap-6 border-t border-black/10 pt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20 dark:border-white/10">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
                Using your USDC after the swap
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  You do not need gas to receive USDC. To send or use it afterwards, you generally need the
                  network&apos;s native token, such as ETH on Ethereum. This swap delivers USDC, not a separate gas
                  balance.
                </p>
                <p>
                  Where supported, 1inch Fusion can help you exchange some USDC for gas tokens without holding gas
                  first. Check the requirements below before relying on this option.
                </p>
                <details className="group border-t border-black/10 pt-4 dark:border-white/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-gray-950 dark:text-white">
                    Before using 1inch without gas
                    <span
                      aria-hidden="true"
                      className="text-xl text-[#607300] group-open:rotate-45 dark:text-lime-light"
                    >
                      +
                    </span>
                  </summary>
                  <div className="mt-4 space-y-4">
                    <p>
                      Resolvers cover Fusion swap execution. Eligible tokens can authorize spending with a signed permit
                      instead of a separate paid approval. Check support for your token, network and wallet; if a paid
                      approval is required, you will still need gas to start.
                    </p>
                    <p>
                      Review the quote and choose the network&apos;s native gas token, not its wrapped version. 1inch is
                      an external service with its own availability, fees and requirements. Gasless does not mean
                      fee-free.
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                      <a
                        href="https://help.1inch.com/en/articles/6796085-what-is-1inch-fusion-and-how-does-it-work"
                        className="font-medium text-[#607300] underline underline-offset-4 hover:text-black dark:text-lime-light dark:hover:text-white"
                      >
                        How 1inch Fusion works
                      </a>
                      <a
                        href="https://help.1inch.com/en/articles/5435386-permit-signed-token-approvals-and-how-they-work-on-1inch"
                        className="font-medium text-[#607300] underline underline-offset-4 hover:text-black dark:text-lime-light dark:hover:text-white"
                      >
                        Check permit requirements
                      </a>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        <SwapRouteTree currentToken="USDC" />

        <section className="border-t border-black/[0.07] bg-[#f8f8f5] px-4 py-16 sm:px-8 sm:py-24 dark:border-white/[0.07] dark:bg-[#080808]">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
              Before you swap BTC to USDC
            </h2>
            <div className="mt-8 divide-y divide-black/10 dark:divide-white/10">
              {questions.map(({ question, answer, link }) => (
                <details key={question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-semibold text-gray-950 dark:text-white">
                    {question}
                    <span
                      aria-hidden="true"
                      className="text-2xl text-[#607300] group-open:rotate-45 dark:text-lime-light"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">{answer}</p>
                  {link && (
                    <a
                      href={link.href}
                      className="mt-4 inline-block font-medium text-[#607300] underline underline-offset-4 hover:text-black dark:text-lime-light dark:hover:text-white"
                    >
                      {link.label}
                    </a>
                  )}
                </details>
              ))}
            </div>
            <p className="mt-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Need help with a pending swap?{" "}
              <a
                href="https://docs.satora.io/faq/troubleshooting"
                className="underline underline-offset-4 hover:text-black dark:hover:text-white"
              >
                Read the troubleshooting guide
              </a>{" "}
              or{" "}
              <a
                href="mailto:support@satora.io"
                className="underline underline-offset-4 hover:text-black dark:hover:text-white"
              >
                contact support
              </a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
