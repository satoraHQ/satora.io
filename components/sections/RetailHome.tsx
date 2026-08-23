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
    "Satora's standard service fee is 0.5%. Applicable network fees are charged separately. The live quote shows the exact amount you receive and all fees before you continue.",
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
    "The swap flow keeps its status and recovery action visible, so you have a clear next step if settlement is interrupted.",
  ],
];

export default function RetailHome() {
  return (
    <>
      <section className="overflow-hidden bg-[#0b0c0a] text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-light">How it works</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              Bitcoin rails meet stablecoin networks.
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
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">Built-in recovery</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
              A stopped swap is not a dead end.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Every swap keeps its status and available actions visible. If settlement is interrupted, you return to
              the same swap to see the next recovery step.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl rounded-[2rem] border border-black/[0.08] bg-white p-4 shadow-[0_24px_70px_rgba(0,0,0,0.06)] sm:p-7 dark:border-white/[0.08] dark:bg-[#0d0d0d]">
            <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-4">
              <RecoveryStep
                number="1"
                eyebrow="Your wallet"
                title="Fund the swap"
                description="Send the selected asset from the wallet you control."
              />
              <FlowArrow />
              <RecoveryStep
                number="2"
                eyebrow="Atomic settlement"
                title="Both sides settle"
                description="Satora coordinates the Bitcoin and stablecoin legs of the swap."
                active
              />
              <FlowArrow />
              <RecoveryStep
                number="3"
                eyebrow="Destination wallet"
                title="Receive your asset"
                description="The output is delivered to the address you selected."
              />
            </div>

            <div className="mt-4 grid gap-3 rounded-[1.5rem] border border-lime/20 bg-lime-light/[0.08] p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-5 sm:p-5 dark:border-lime-light/20">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-lime-light text-lg font-bold text-black">
                ↺
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#728600] dark:text-lime-light">
                  If settlement is interrupted
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-950 dark:text-white">
                  The same swap stays visible with its current status.
                </p>
              </div>
              <Link
                href="https://docs.satora.io/faq/integration"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
              >
                Explore recovery guides
                <GoArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-black">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-8 sm:py-32">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
            Questions before you swap
          </p>
          <h2 className="mt-5 text-center text-4xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-5xl dark:text-white">
            Know what happens before you send.
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

function RecoveryStep({
  number,
  eyebrow,
  title,
  description,
  active = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.5rem] border p-5 sm:p-6 ${
        active
          ? "border-lime/30 bg-lime-light/[0.1] dark:border-lime-light/25"
          : "border-black/[0.07] bg-[#f8f8f5] dark:border-white/[0.07] dark:bg-white/[0.025]"
      }`}
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold ${
          active ? "bg-lime-light text-black" : "bg-black text-white dark:bg-white dark:text-black"
        }`}
      >
        {number}
      </span>
      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 dark:text-white/35">
        {eyebrow}
      </p>
      <p className="mt-2 text-xl font-semibold text-gray-950 dark:text-white">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="grid place-items-center text-xl text-black/20 dark:text-white/20" aria-hidden="true">
      <span className="md:hidden">↓</span>
      <span className="hidden md:block">→</span>
    </div>
  );
}
