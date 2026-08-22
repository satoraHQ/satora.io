import { GoArrowUpRight } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";

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
    "Where do I receive my assets?",
    "At the destination wallet you provide before confirming the swap. Check the address and network carefully before funding.",
  ],
  [
    "What happens if a swap does not complete?",
    "The swap flow keeps its status and recovery action visible, so you have a clear next step if settlement is interrupted.",
  ],
];

const INTEGRATIONS = ["TypeScript SDK", "Iframe", "REST API"];

export default function RetailHome() {
  return (
    <>
      <section className="overflow-hidden bg-[#0b0c0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-light">How it works</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              A clear path from one wallet to another.
            </h2>
            <p className="mt-5 leading-relaxed text-white/50">
              Choose what you send and receive. Satora coordinates the swap. The assets arrive at the destination you
              selected.
            </p>
          </div>

          <div className="relative mt-20">
            <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-light/[0.045] blur-[100px]" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_88px_1.25fr_88px_1fr] lg:gap-4">
              <WalletNode
                eyebrow="From your wallet"
                title="Send Bitcoin"
                description="On-chain, Lightning or Arkade."
                icon="/assets/chains/bitcoin.svg"
                alt="Bitcoin"
              />

              <DiagramArrow />

              <div className="text-center">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-lime-light">
                  Atomic swap
                </p>
                <div className="relative mx-auto grid h-44 w-44 place-items-center rounded-full border border-lime-light/25">
                  <span className="absolute inset-3 rounded-full border border-dashed border-lime-light/25" />
                  <span className="absolute inset-7 rounded-full bg-lime-light/10 blur-xl" />
                  <div className="relative grid h-28 w-28 place-items-center rounded-full bg-lime-light text-black shadow-[0_0_50px_rgba(194,232,33,0.12)]">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/50">Powered by</p>
                      <p className="mt-1 text-xl font-bold">Satora</p>
                    </div>
                  </div>
                </div>
                <div className="relative mx-auto mt-7 grid max-w-sm grid-cols-4">
                  <span className="absolute left-[12.5%] right-[12.5%] top-[5px] h-px bg-lime-light/35" />
                  {["Quote", "Fund", "Swap", "Deliver"].map((state) => (
                    <div key={state} className="relative text-center">
                      <span className="relative z-10 mx-auto block h-2.5 w-2.5 rounded-full bg-lime-light" />
                      <p className="mt-2 text-[9px] font-medium uppercase tracking-wide text-white/40">{state}</p>
                    </div>
                  ))}
                </div>
              </div>

              <DiagramArrow />

              <WalletNode
                eyebrow="To your wallet"
                title="Receive stablecoins"
                description="At your chosen EVM address."
                icon="/assets/chains/usdc.svg"
                alt="USDC"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white dark:bg-black">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">For developers</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-5xl dark:text-white">
              Put Bitcoin-to-stablecoin swaps inside your product.
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
            <div className="relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/70 shadow-[0_28px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0d0d0d]">
              <div className="flex flex-wrap items-center gap-1 border-b border-black/[0.07] bg-gray-50/80 p-2 dark:border-white/[0.07] dark:bg-white/[0.02]">
                {INTEGRATIONS.map((integration, index) => (
                  <span
                    key={integration}
                    className={`rounded-lg px-3 py-2 text-[11px] font-medium ${
                      index === 0
                        ? "bg-white text-gray-900 shadow-sm dark:bg-white/[0.1] dark:text-white"
                        : "text-gray-400 dark:text-white/35"
                    }`}
                  >
                    {integration}
                  </span>
                ))}
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-400 dark:text-white/35">Satora SDK</p>
                    <p className="mt-2 text-xl font-semibold text-gray-950 dark:text-white">
                      One integration. Multiple routes.
                    </p>
                  </div>
                  <span className="hidden rounded-full bg-lime-light/15 px-3 py-1.5 text-xs font-medium text-[#728600] sm:inline-block dark:text-lime-light">
                    TypeScript
                  </span>
                </div>

                <div className="mt-7 rounded-2xl bg-[#0b0c0a] p-5 font-mono text-xs leading-6 text-white/65 sm:text-sm">
                  <p>
                    <span className="text-lime-light">$</span> npm install @satora/swap
                  </p>
                  <p className="mt-4 text-white/30">Documentation</p>
                  <p className="text-white/70">docs.satora.io</p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {[
                    ["BTC", "On-chain"],
                    ["BTC", "Lightning"],
                    ["BTC", "Arkade"],
                  ].map(([asset, network]) => (
                    <div
                      key={network}
                      className="rounded-xl border border-black/[0.07] px-3 py-3 dark:border-white/[0.07]"
                    >
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">{asset}</p>
                      <p className="mt-1 text-[10px] text-gray-400 dark:text-white/35">{network}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/[0.07] bg-[#f8f8f5] text-black dark:border-white/[0.07] dark:bg-[#080808] dark:text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">Built-in recovery</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
              Every swap keeps a clear next step.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-500 dark:text-gray-400">
              If a swap completes, your assets are delivered. If settlement is interrupted, the interface keeps the
              status and recovery action visible.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <div className="text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                <span className="text-sm font-semibold">Funded</span>
              </div>
              <span className="mx-auto block h-10 w-px bg-black/15 dark:bg-white/20" />
            </div>
            <div className="relative grid grid-cols-2 gap-6 pt-10 sm:gap-16">
              <span className="absolute left-1/4 right-1/4 top-0 h-px bg-black/15 dark:bg-white/20" />
              <span className="absolute left-1/4 top-0 h-10 w-px bg-black/15 dark:bg-white/20" />
              <span className="absolute right-1/4 top-0 h-10 w-px bg-black/15 dark:bg-white/20" />
              <RecoveryOutcome
                icon="✓"
                title="Delivered"
                description="The assets reach the destination wallet."
              />
              <RecoveryOutcome
                icon="↺"
                title="Recovery available"
                description="The interface shows what to do next."
                outlined
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-black">
        <div className="mx-auto max-w-4xl px-6 py-24 sm:px-8 sm:py-32">
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
        <div className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-8 sm:py-28 lg:px-12">
          <p className="text-xs uppercase tracking-[0.16em] text-lime-light">Make Bitcoin move.</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Move between Bitcoin and stablecoins. Stay in control.
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="https://app.satora.io"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-lime-light px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95"
            >
              Swap now
            </a>
            <Link
              href="/developers"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35"
            >
              Build with Satora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function WalletNode({
  eyebrow,
  title,
  description,
  icon,
  alt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  alt: string;
}) {
  return (
    <div className="text-center">
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">{eyebrow}</p>
      <div className="relative mx-auto grid h-36 w-36 place-items-center rounded-full border border-white/15 bg-white/[0.025]">
        <span className="absolute inset-3 rounded-full border border-dashed border-white/10" />
        <Image src={icon} alt={alt} width={54} height={54} className="relative" />
      </div>
      <p className="mt-5 text-lg font-semibold">{title}</p>
      <p className="mt-1 text-xs text-white/40">{description}</p>
    </div>
  );
}

function DiagramArrow() {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <span className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-lime-light/60 lg:block" />
      <span className="text-2xl text-lime-light">
        <span className="lg:hidden">↓</span>
        <span className="hidden lg:inline">→</span>
      </span>
    </div>
  );
}

function RecoveryOutcome({
  icon,
  title,
  description,
  outlined = false,
}: {
  icon: string;
  title: string;
  description: string;
  outlined?: boolean;
}) {
  return (
    <div className="text-center">
      <span
        className={`mx-auto grid h-12 w-12 place-items-center rounded-full text-xl font-bold ${
          outlined
            ? "border-2 border-lime-light text-lime dark:text-lime-light"
            : "bg-lime-light text-black"
        }`}
      >
        {icon}
      </span>
      <p className="mt-5 text-xl font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-56 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
