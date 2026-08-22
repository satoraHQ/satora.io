import HomepageSwapWidget from "@/components/sections/HomepageSwapWidget";
import { GoArrowUpRight } from "@/components/ui/icons";
import Link from "next/link";

const BENEFITS = [
  "No exchange deposit",
  "Receive in your wallet",
  "Recovery paths built in",
];

export default function RetailHero() {
  return (
    <section className="relative min-h-[780px] w-full overflow-hidden bg-[#f5f4ef] dark:bg-black">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-25" />
      <div className="pointer-events-none absolute right-[6%] top-20 h-[520px] w-[520px] rounded-full bg-lime-light/20 blur-[150px] dark:bg-lime-light/10" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.12em] text-gray-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300">
              <span className="h-2 w-2 rounded-full bg-lime-light shadow-[0_0_12px_rgba(194,232,33,0.8)]" />
              Bitcoin ↔ stablecoins
            </p>

            <h1 className="mt-7 text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.055em] text-gray-950 sm:text-6xl lg:text-[4.2rem] xl:text-[4.75rem] dark:text-white">
              Swap Bitcoin and stablecoins without sending your funds to an exchange.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400">
              Move between Bitcoin and stablecoins while staying in control. Send from your wallet and receive directly
              at your chosen destination.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://app.satora.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-lime-light px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_35px_rgba(163,196,16,0.28)] transition-all duration-150 hover:brightness-95 active:scale-95"
              >
                Swap now
                <GoArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                href="/developers"
                className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-6 py-3 text-sm font-semibold text-gray-700 backdrop-blur-lg transition-all duration-150 hover:bg-white active:scale-95 dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-gray-200 dark:hover:bg-white/[0.09]"
              >
                Build with Satora
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-gray-500 dark:text-gray-400">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-10 rounded-full bg-lime-light/15 blur-[80px]" />
            <HomepageSwapWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
