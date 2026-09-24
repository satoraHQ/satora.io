import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HomepageSwapWidget, { type SwapAssetScope } from "@/components/sections/HomepageSwapWidget";
import SwapRouteTree from "@/components/sections/SwapRouteTree";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Question = { question: string; answer: string };
type Guide = { title: string; text: string };

interface SwapRoutePageProps {
  title: string;
  introduction: string;
  initialSourceId: string;
  initialTargetId: string;
  assetScope: Exclude<SwapAssetScope, "all">;
  explanation: { title: string; paragraphs: string[] };
  steps: Guide[];
  networkGuides: Guide[];
  questions: Question[];
  children: ReactNode;
}

// Keep route titles and canonical URLs explicit in each page for easy review.
export function swapRouteMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Satora`,
      description,
      url: path,
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
}

export default function SwapRoutePage(props: SwapRoutePageProps) {
  const { title, introduction, explanation, steps, networkGuides, questions, children } = props;
  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-[#f5f4ef] dark:bg-black">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(194,232,33,0.12),transparent_65%)]" />
          <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-24 sm:px-8 sm:pb-20 sm:pt-28">
            <h1 className="text-center text-[2.25rem] font-semibold leading-tight tracking-[-0.055em] text-gray-950 sm:text-6xl dark:text-white">
              {title}.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-gray-600 dark:text-gray-400">
              {introduction}
            </p>
            <div className="mx-auto mt-7 w-full min-w-0 max-w-xl sm:mt-9">
              <HomepageSwapWidget
                initialSourceId={props.initialSourceId}
                initialTargetId={props.initialTargetId}
                assetScope={props.assetScope}
              />
            </div>
            <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Choose your networks and amount, then continue in the Satora app to add your receiving details and
              complete the swap.
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-black">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
                {explanation.title}
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {explanation.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <a
                  href="https://docs.satora.io/advanced/htlc"
                  className="font-medium text-[#607300] underline underline-offset-4 dark:text-lime-light"
                >
                  How atomic swaps and timelocks work
                </a>
              </div>
            </div>
            <ol className="mt-14 grid gap-8 border-t border-black/10 pt-8 md:grid-cols-3 dark:border-white/10">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span className="text-sm font-medium text-[#607300] dark:text-lime-light">0{index + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold text-gray-950 dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-600 dark:text-gray-400">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-black/[0.07] bg-[#f8f8f5] px-4 py-16 sm:px-8 sm:py-24 dark:border-white/[0.07] dark:bg-[#080808]">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
              Choose the networks that match your wallets
            </h2>
            <dl className="mt-8 grid gap-8 md:grid-cols-2">
              {networkGuides.map((guide) => (
                <div key={guide.title} className="border-t border-black/10 pt-5 dark:border-white/10">
                  <dt className="text-xl font-semibold text-gray-950 dark:text-white">{guide.title}</dt>
                  <dd className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">{guide.text}</dd>
                </div>
              ))}
            </dl>
            <a
              href="https://docs.satora.io/quotes-rates/supported-tokens"
              className="mt-8 inline-block font-medium text-[#607300] underline underline-offset-4 dark:text-lime-light"
            >
              See supported tokens and networks
            </a>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-black">
          <div className="mx-auto max-w-5xl space-y-10 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            {children}
          </div>
        </section>

        <SwapRouteTree
          key={props.initialSourceId + props.initialTargetId}
          currentToken={(props.initialSourceId.endsWith(":BTC") ? props.initialTargetId : props.initialSourceId).split(
            ":",
          )[1]}
          toBitcoin={!props.initialSourceId.endsWith(":BTC")}
        />

        <section className="border-t border-black/[0.07] bg-[#f8f8f5] px-4 py-16 sm:px-8 sm:py-24 dark:border-white/[0.07] dark:bg-[#080808]">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
              Before you swap
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
              <a href="https://docs.satora.io/faq/troubleshooting" className="underline underline-offset-4">
                Read the recovery and troubleshooting guide
              </a>{" "}
              or <a href="mailto:support@satora.io" className="underline underline-offset-4">contact support</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
