"use client";

import { GoArrowUpRight } from "@/components/ui/icons";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Image from "next/image";

export default function LendasatPlatform() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <section ref={ref} className="w-full bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-24 md:pb-32">
        <div
          className={`relative rounded-3xl bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl border border-gray-200/50 dark:border-white/[0.06] overflow-hidden transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Soft accent glow */}
          <div className="absolute -top-20 -right-10 w-[400px] h-[280px] bg-lime/[0.06] dark:bg-lime-light/[0.04] blur-[100px] rounded-full pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-10 p-8 sm:p-12 items-center">
            {/* Logo column */}
            <div className="md:col-span-2 flex md:justify-start">
              <a
                href="https://lendasat.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Lendasat"
                className="inline-flex items-center transition-opacity hover:opacity-80"
              >
                <Image
                  src="/assets/partners/lendasat_logo.svg"
                  alt="Lendasat"
                  width={180}
                  height={48}
                  className="h-10 sm:h-12 w-auto object-contain filter brightness-0 dark:invert"
                />
              </a>
            </div>

            {/* Content column */}
            <div className="md:col-span-3">
              <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Powered by
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">
                Built by the team behind{" "}
                <span className="font-[family-name:var(--font-display)] italic bg-gradient-to-r from-lime via-[#8ab800] to-lime-light dark:from-lime-light dark:via-[#d4f542] dark:to-lime bg-clip-text text-transparent">
                  Lendasat
                </span>
              </h2>
              <p className="mt-4 text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                Lendasat is the non-custodial Bitcoin lending platform behind satora. Same engineering principles, same
                focus on user sovereignty — borrow against your BTC without giving up your keys.
              </p>

              <a
                href="https://lendasat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 dark:bg-white/[0.06] backdrop-blur-lg border border-gray-200/60 dark:border-white/[0.08] text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-white/80 dark:hover:bg-white/[0.1] active:scale-95 transition-all duration-150"
              >
                Visit Lendasat
                <GoArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
