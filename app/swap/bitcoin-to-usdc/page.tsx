import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HomepageSwapWidget from "@/components/sections/HomepageSwapWidget";
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
      "Satora supports these Bitcoin networks. This page starts with on-chain Bitcoin; use the BTC selector to choose another network. Available routes and quotes depend on the networks you select.",
  },
  {
    question: "Which network will my USDC arrive on?",
    answer:
      "The network shown in the Buy field is your destination. This page starts with USDC on Ethereum. You can change it before continuing. Your receiving wallet must support USDC on the selected network; an EVM address alone does not identify a network.",
  },
  {
    question: "What exchange rate and fees apply?",
    answer:
      "Enter an amount to request a live quote for your selected route. Review the amount you will receive and the fee breakdown in the app before funding. Quotes can change with market and network conditions.",
  },
  {
    question: "Do I need to send my Bitcoin to an exchange first?",
    answer:
      "No exchange deposit is required. In the app, enter your receiving address, review the swap details and follow the funding instructions from your Bitcoin wallet. Your USDC is sent to the destination you provide.",
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
            <div className="mx-auto mt-7 w-full min-w-0 max-w-xl sm:mt-9">
              <HomepageSwapWidget initialSourceId="bitcoin:BTC" initialTargetId="1:USDC" assetScope="bitcoin-usdc" />
            </div>
            <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Swap opens the Satora app with your selected assets and amount. Add your receiving address and review the
              final quote there.
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-black">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
                From Bitcoin.<br />To your USDC wallet.
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  Convert BTC to USDC without depositing funds on a centralized exchange. Choose the Bitcoin network you
                  are sending from and the network where you want to receive USDC.
                </p>
                <p>
                  USDC is available on multiple networks. Satora supports destinations including Arbitrum, Ethereum and
                  Polygon, with additional routes through Circle CCTP. Check the selector and live quote for your chosen
                  route before proceeding.
                </p>
                <a
                  href="https://docs.satora.io/quotes-rates/supported-tokens"
                  className="inline-block font-medium text-[#607300] underline underline-offset-4 hover:text-black dark:text-lime-light dark:hover:text-white"
                >
                  See supported tokens and networks
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

        <section className="border-t border-black/[0.07] bg-white px-4 py-16 sm:px-8 sm:py-24 dark:border-white/[0.07] dark:bg-black">
          <div className="mx-auto max-w-5xl space-y-12 sm:space-y-16">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
                Receive USDC in a fresh wallet
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  You can receive USDC in a newly created wallet instead of reusing an address associated with your
                  previous activity. Create a receiving address in a wallet that supports your chosen network, then
                  enter it in the Satora app when setting up your swap.
                </p>
                <p>
                  A fresh address starts without previous transaction history. It does not make your swap anonymous or
                  erase the history of your funds. On-chain transactions remain public and may be linked to other
                  activity.
                </p>
              </div>
            </div>
            <div className="grid gap-6 border-t border-black/10 pt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20 dark:border-white/10">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
                Using your USDC after the swap
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  Your receiving wallet does not need a gas balance to receive USDC. Sending it or using it in other
                  apps generally requires the network&apos;s native token, such as ETH on Ethereum. This Satora swap
                  delivers USDC, not a separate balance of gas tokens.
                </p>
                <p>
                  One option is to swap a small portion of your USDC for the network&apos;s native token through
                  1inch Fusion, where supported. Resolvers cover swap execution, and eligible tokens can use a signed
                  permit instead of a separate paid approval. This can let you swap without holding gas tokens first.
                </p>
                <p>
                  Check that both Fusion and a gasless permit are available for your token, network and wallet. If a
                  paid approval is required, you will still need gas to start. Gasless does not mean fee-free; review
                  the quote and choose the native gas token, not its wrapped version.
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
                <p className="text-sm">
                  1inch is an external service. Availability, fees and requirements are set by 1inch, not Satora.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-black/[0.07] bg-[#f8f8f5] px-4 py-16 sm:px-8 sm:py-24 dark:border-white/[0.07] dark:bg-[#080808]">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
              Before you swap BTC to USDC
            </h2>
            <div className="mt-8 divide-y divide-black/10 dark:divide-white/10">
              {questions.map(({ question, answer }) => (
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
