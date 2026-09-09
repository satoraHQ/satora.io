import { GoArrowUpRight } from "@/components/ui/icons";
import Link from "next/link";
import CodeWindow from "./CodeWindow";
import EcosystemOrbitMap from "./EcosystemOrbitMap";

const FAQS = [
  [
    "Do I need to deposit funds on an exchange?",
    "No. You fund the swap from your wallet and choose the address where you want to receive the other asset.",
  ],
  [
    "Which Bitcoin networks can I use?",
    "Satora supports Bitcoin on-chain, Lightning and Arkade. The available destination assets and networks are shown in the app.",
  ],
  [
    "Which assets and EVM networks are available?",
    "Available EVM assets include USDC, USDT and USDT0, USAT, EURC, EURe, WBTC, tBTC and XAUt. Availability varies by network and swap direction, while USDC and USDT bridge routes extend to additional supported networks. The Satora app shows the live routes for your chosen source.",
  ],
  [
    "What fees will I pay?",
    "Satora's service fee is dynamic and depends on supply and demand. Applicable network fees are charged separately. The live quote shows the amount you receive and fees before you continue.",
  ],
  [
    "How long does a swap take?",
    "Timing depends on the Bitcoin rail, destination network and required confirmations. The swap status remains visible throughout the process.",
  ],
  [
    "Where do I receive my assets?",
    "At the destination wallet you provide before confirming the swap. Check the address and network carefully before funding.",
  ],
  [
    "What happens if a swap does not complete?",
    "Locked up funds can be refunded after a timeout.",
  ],
];

export default function RetailHome() {
  return (
    <>
      <section className="overflow-hidden bg-[#0b0c0a] text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-light">How it works</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              Non-custodial Bitcoin Swaps.
            </h2>
            <p className="mt-5 leading-relaxed text-white/50">
              Satora connects Bitcoin on-chain, Lightning and Arkade with USDC and USDT across supported networks
              through atomic swaps.
            </p>
          </div>

          <div className="relative mt-14 sm:mt-20">
            <EcosystemOrbitMap />
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white dark:bg-black">
        <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-12 px-4 py-20 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">For developers</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-5xl dark:text-white">
              Put Bitcoin-stablecoin swaps inside your product.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Satora gives wallets, fintechs and payment apps several ways to integrate the swap experience, from a
              ready-to-embed interface to a complete TypeScript SDK.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/developers"
                className="group inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-lime-light dark:text-black dark:hover:brightness-95"
              >
                Explore Satora for developers
                <GoArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="https://docs.satora.io"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-black/25 dark:border-white/10 dark:text-white dark:hover:border-white/25"
              >
                Read the docs
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-16 rounded-full bg-lime-light/10 blur-[100px]" />
            <div className="relative h-[500px] min-w-0 sm:h-[560px] lg:h-[620px]">
              <CodeWindow />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/[0.07] bg-[#f8f8f5] text-black dark:border-white/[0.07] dark:bg-[#080808] dark:text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-8 sm:py-32">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
            Questions before you swap
          </p>
          <h2 className="mt-5 text-center text-4xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-5xl dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 divide-y divide-black/[0.08] border-y border-black/[0.08] dark:divide-white/[0.08] dark:border-white/[0.08]">
            {FAQS.map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-semibold text-gray-900 dark:text-white">
                  <span>{question}</span>
                  <span className="text-2xl text-lime transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0c0a] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-8 sm:py-28 lg:px-12">
          <p className="text-xs uppercase tracking-[0.16em] text-lime-light">Make Bitcoin move.</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Move between Bitcoin and stablecoins. Stay in control.
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="https://app.satora.io"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-lime-light px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95 min-[360px]:w-auto"
            >
              Swap now
            </a>
            <Link
              href="/developers"
              className="w-full rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35 min-[360px]:w-auto"
            >
              Build with Satora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
