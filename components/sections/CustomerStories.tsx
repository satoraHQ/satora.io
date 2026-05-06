"use client";

import {
  HiOutlineArrowsPointingOut,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePlay,
  HiOutlineXMark,
} from "@/components/ui/icons";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Image from "next/image";
import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

interface Story {
  name: string;
  logo?: string;
  logoHeight: string;
  logoFilter?: string;
  url: string;
  useCase: string;
  description: string;
  tag: string;
  video?: string;
}

const STORIES: Story[] = [
  {
    name: "Blitz Wallet",
    logo: "/assets/partners/blitzwallet_logo.png",
    logoHeight: "h-7",
    url: "https://blitz-wallet.com",
    useCase: "Payment Links",
    description:
      "Blitz Wallet integrates LendaSwap to offer CashApp-style payment links. Users share a link, recipients pay via Lightning, and the sender receives stablecoins instantly.",
    tag: "USDC → BTC Lightning · SDK",
    video: "/assets/videos/blitz_demo.mp4",
  },
  {
    name: "Arkade",
    logo: "/assets/partners/arklabs_logo.png",
    logoHeight: "h-6",
    url: "https://arkade.money",
    useCase: "Wallet Iframe Integration",
    description:
      "Arkade embeds LendaSwap via iframe so users can swap between off-chain Bitcoin and stablecoins without leaving the wallet.",
    tag: "Arkade ↔ EVM · Iframe",
    video: "/assets/videos/arkade_iframe_demo.mov",
  },
  {
    name: "Freedomia",
    logo: "/assets/partners/freedomia_logo.png",
    logoHeight: "h-5",
    logoFilter: "grayscale dark:invert",
    url: "https://btc.freedomia.io/",
    useCase: "Bitcoin Credit Card Top-Up",
    description:
      "Freedomia lets users top up prepaid credit cards with Bitcoin. Pay with Lightning or on-chain, get spendable balance in seconds.",
    tag: "BTC & Lightning → USDC · SDK",
    video: "/assets/videos/freedomia_demo_clean.mp4",
  },
];

const ROTATE_INTERVAL = 10000;

export default function CustomerStories() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    rootMargin: "200px",
  });
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [displayed, setDisplayed] = useState(0);
  const [videoExpanded, setVideoExpanded] = useState(false);
  const autoRotateRef = useRef(true);

  useEffect(() => {
    if (!videoExpanded) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoExpanded(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [videoExpanded]);

  const changeTo = useCallback((nextIndex: number) => {
    setFading(true);
    setTimeout(() => {
      setDisplayed(nextIndex);
      setActive(nextIndex);
      setFading(false);
    }, 200);
  }, []);

  const prev = useCallback(() => {
    autoRotateRef.current = false;
    changeTo((active - 1 + STORIES.length) % STORIES.length);
  }, [active, changeTo]);

  const next = useCallback(() => {
    autoRotateRef.current = false;
    changeTo((active + 1) % STORIES.length);
  }, [active, changeTo]);

  const goTo = useCallback(
    (i: number) => {
      autoRotateRef.current = false;
      changeTo(i);
    },
    [changeTo],
  );

  // Auto-rotate — stops permanently after any manual interaction
  useEffect(() => {
    if (!autoRotateRef.current) return;
    const id = setInterval(() => {
      if (!autoRotateRef.current) return;
      changeTo((displayed + 1) % STORIES.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [changeTo, displayed]);

  const story = STORIES[displayed];

  return (
    <section ref={sectionRef} className="w-full bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            See it in action
          </h2>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed sm:text-right max-w-sm">
            See how your satora integration could look like.
          </p>
        </div>

        {/* Single wide card */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-50/80 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left — media */}
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[360px] bg-gray-100 dark:bg-white/[0.03] border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/[0.08] overflow-hidden">
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${fading ? "opacity-0" : "opacity-100"}`}
              >
                {story.video
                  ? (
                    <button
                      type="button"
                      onClick={() => setVideoExpanded(true)}
                      className="relative w-full h-full cursor-pointer group/video"
                    >
                      {isSectionVisible && (
                        <video
                          key={story.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="none"
                          className="h-full mx-auto object-contain"
                        >
                          <source src={story.video} type="video/mp4" />
                        </video>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/video:bg-black/20 transition-colors duration-200">
                        <div className="opacity-0 group-hover/video:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white text-xs font-medium">
                          <HiOutlineArrowsPointingOut className="w-3.5 h-3.5" />
                          Expand
                        </div>
                      </div>
                    </button>
                  )
                  : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400 dark:text-gray-600">
                      <div className="w-14 h-14 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                        <HiOutlinePlay className="w-6 h-6 ml-0.5" />
                      </div>
                      <span className="text-xs font-medium tracking-wide uppercase">
                        Demo coming soon
                      </span>
                    </div>
                  )}
              </div>
            </div>

            {/* Right — story content */}
            <div
              className={`p-8 sm:p-10 flex flex-col justify-center transition-opacity duration-200 ${
                fading ? "opacity-0" : "opacity-100"
              }`}
            >
              {/* Logo / Name */}
              <div className="flex items-center gap-3 mb-6">
                {story.logo
                  ? (
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${story.name}`}
                      className="inline-flex items-center transition-opacity hover:opacity-70"
                    >
                      <Image
                        src={story.logo}
                        alt={story.name}
                        width={100}
                        height={40}
                        className={`${story.logoHeight} w-auto object-contain ${
                          story.logoFilter || "filter brightness-0 dark:invert"
                        }`}
                        style={{ maxWidth: "100px" }}
                      />
                    </a>
                  )
                  : (
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-gray-900 dark:text-white hover:text-lime dark:hover:text-lime-light transition-colors"
                    >
                      {story.name}
                    </a>
                  )}
                <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-lime/10 dark:bg-lime-light/10 text-lime dark:text-lime-light">
                  {story.tag}
                </span>
              </div>

              {/* Use case */}
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {story.useCase}
              </h3>

              {/* Description */}
              <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                {story.description}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation: arrows + customer names + dots */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-lime-light dark:hover:border-lime-light hover:ring-[0.5px] hover:ring-lime-light hover:text-lime dark:hover:text-lime-light transition-colors"
            aria-label="Previous story"
          >
            <HiOutlineChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            {STORIES.map((s, i) => (
              <button
                key={s.name}
                onClick={() => goTo(i)}
                className={`text-xs font-medium transition-all duration-300 ${
                  i === active
                    ? "text-lime dark:text-lime-light"
                    : "text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
                }`}
                aria-label={`Show ${s.name} story`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-lime-light dark:hover:border-lime-light hover:ring-[0.5px] hover:ring-lime-light hover:text-lime dark:hover:text-lime-light transition-colors"
            aria-label="Next story"
          >
            <HiOutlineChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Fullscreen video lightbox */}
      {videoExpanded && story.video && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setVideoExpanded(false)}
        >
          <button
            type="button"
            onClick={() => setVideoExpanded(false)}
            className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <HiOutlineXMark className="w-5 h-5" />
          </button>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="max-h-[90vh] max-w-[90vw] rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <source src={story.video} type="video/mp4" />
          </video>
        </div>
      )}
    </section>
  );
}
