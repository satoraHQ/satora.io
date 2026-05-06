"use client";

import { GoArrowUpRight, HiOutlineCheckCircle, HiOutlineClipboard } from "@/components/ui/icons";
import Link from "next/link";
import { useState } from "react";

const NPM_COMMAND = "npm i @lendasat/lendaswap-sdk-pure";

export default function CTA() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(NPM_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <div className="relative rounded-3xl bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl border border-gray-200/50 dark:border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden">
          {/* Glow orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-lime/10 dark:bg-lime-light/[0.06] blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-lime/[0.06] dark:bg-lime-light/[0.03] blur-[80px] rounded-full pointer-events-none" />

          <div className="relative px-8 sm:px-12 py-16 sm:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white max-w-lg mx-auto leading-tight">
              Start building with{" "}
              <span className="whitespace-nowrap">
                satora<span
                  className="inline-block rounded-full bg-lime-400 align-baseline"
                  style={{
                    width: "0.3em",
                    height: "0.3em",
                    marginLeft: "0.05em",
                  }}
                />
              </span>
            </h2>
            <p className="mt-4 text-[15px] text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
              Read the docs, grab the SDK, and ship your first swap in under 10 minutes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3">
              <Link
                href="https://docs.satora.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto h-11 px-5 rounded-full bg-lime-light text-black text-sm font-medium hover:brightness-[0.93] dark:hover:brightness-110 active:scale-95 transition-all duration-150 ease-out shadow-[0_0_20px_rgba(163,196,16,0.25)] dark:shadow-[0_0_20px_rgba(194,232,33,0.2)]"
              >
                Get Started
                <GoArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <button
                onClick={handleCopy}
                className="relative inline-flex items-center justify-center gap-2 w-full sm:w-auto h-11 px-5 rounded-full bg-white/60 dark:bg-white/[0.06] backdrop-blur-lg border border-gray-200/60 dark:border-white/[0.08] text-xs font-semibold text-gray-600 dark:text-gray-300 font-mono hover:bg-white/80 dark:hover:bg-white/[0.1] active:scale-95 transition-all duration-150 ease-out"
              >
                {/* Invisible spacer — keeps the button width locked to the npm command */}
                <span
                  className="invisible flex items-center gap-2"
                  aria-hidden="true"
                >
                  <HiOutlineClipboard className="w-4 h-4 flex-shrink-0" />
                  <span>{NPM_COMMAND}</span>
                </span>
                {/* Visible content — absolutely positioned so width never changes */}
                <span
                  className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-200 ${
                    copied ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <HiOutlineClipboard className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{NPM_COMMAND}</span>
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center gap-2 text-lime dark:text-lime-light transition-opacity duration-200 ${
                    copied ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <HiOutlineCheckCircle className="w-4 h-4 flex-shrink-0" />
                  Copied
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
