import { GoArrowUpRight } from "@/components/ui/icons";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-white dark:bg-black overflow-hidden">
      {/* Soft lime glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-lime/[0.035] dark:bg-lime-light/[0.025] blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-lg">
          <h1 className="text-[2.5rem] sm:text-5xl font-semibold leading-[1.08] tracking-tight text-gray-900 dark:text-white">
            Bitcoin Swaps
            <br />
            for Fintechs.
            <br />
            <span className="font-[family-name:var(--font-display)] italic bg-gradient-to-r from-lime via-[#8ab800] to-lime-light dark:from-lime-light dark:via-[#d4f542] dark:to-lime bg-clip-text text-transparent">
              21 lines of code.
            </span>
          </h1>

          <p className="mt-8 text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
            LendaSwap is the developer SDK for non-custodial atomic swaps between Bitcoin and stablecoins. Ship in
            minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="https://docs.satora.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime-light text-black text-sm font-medium hover:brightness-95 dark:hover:brightness-110 active:scale-95 transition-all duration-150 shadow-[0_0_20px_rgba(163,196,16,0.25)] dark:shadow-[0_0_20px_rgba(194,232,33,0.2)]"
            >
              Start Building
              <GoArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="https://app.satora.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/60 dark:bg-white/[0.06] backdrop-blur-lg border border-gray-200/60 dark:border-white/[0.08] text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-white/80 dark:hover:bg-white/[0.1] active:scale-95 transition-all duration-150"
            >
              Open App
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
