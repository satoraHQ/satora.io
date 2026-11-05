import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_COLORS = [
  { name: "Primary Black", hex: "#000000", desc: "Main brand color" },
  { name: "White", hex: "#FFFFFF", desc: "Light mode backgrounds" },
  { name: "Dark Background", hex: "#0A0908", desc: "Dark mode background" },
  { name: "Secondary Gray", hex: "#737373", desc: "Secondary text" },
];

const STATS = [
  { label: "Active Users", value: "2,400+" },
  { label: "Fund Losses", value: "Zero" },
  { label: "Platform Status", value: "Live" },
  { label: "Security Audit", value: "Passed" },
];

function PressPage(): ReactNode {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-[#0A0908]">
        {/* Hero */}
        <section className="px-6 pt-28 pb-24 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-medium mb-6">Press Kit</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            Official media resources and brand assets for Satora.
          </p>
        </section>

        {/* About */}
        <section className="px-6 py-16 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-medium mb-6">About Satora</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
            Satora lets people and apps swap between Bitcoin and stablecoins without sending funds to an exchange. Swaps
            connect Bitcoin on-chain, Lightning and Arkade with tokens such as USDC, USDT and EURe on EVM networks. Hash
            time-locked contracts (HTLCs) define how each swap is claimed, or refunded if it cannot complete.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div className="text-2xl font-medium">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Logos */}
        <section className="px-6 py-16 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-medium mb-6">Logo Files</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-lg flex flex-col items-start">
              <Image
                src="/favicon/dot.svg"
                alt="Satora Dot"
                width={48}
                height={48}
                className="h-12 w-auto mb-4"
              />
              <p className="text-sm text-gray-500 mb-4">
                Brand Mark (green dot)
              </p>
              <Link href="/favicon/dot.svg" className="text-sm underline">
                Download SVG
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Colors */}
        <section className="px-6 py-16 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-medium mb-6">Brand Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BRAND_COLORS.map((color) => (
              <div key={color.name}>
                <div
                  className="h-20 rounded-lg mb-2 border border-gray-200"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="font-medium text-sm">{color.name}</div>
                <div className="text-xs text-gray-500">{color.hex}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Boilerplate */}
        <section className="px-6 py-16 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-medium mb-6">Boilerplate</h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-medium mb-2">Short (50 words)</h3>
              <p className="text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                Satora is a self-custodial swap service between Bitcoin and stablecoins. Users move between Bitcoin
                on-chain, Lightning or Arkade and tokens such as USDC, USDT and EURe on EVM networks, without opening an
                exchange account. Hash time-locked contracts define how each swap is claimed or refunded.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Medium (100 words)</h3>
              <p className="text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                Satora is a self-custodial swap service that connects Bitcoin and stablecoins. Users swap between
                Bitcoin on-chain, Lightning or Arkade and tokens such as USDC, USDT and EURe on Ethereum, Polygon and
                Arbitrum, from their own wallet and without opening an exchange account. Each swap relies on hash
                time-locked contracts (HTLCs), which define how funds are claimed and how they are refunded if a swap
                cannot complete. Wallets, fintechs and payment apps integrate Satora through a TypeScript SDK, an API or
                an embeddable widget. Satora was formerly known as Lendasat and LendaSwap.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="px-6 py-16 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-medium mb-6">Media Contact</h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>
              <strong>Website:</strong>{" "}
              <a href="https://satora.io" className="underline">
                satora.io
              </a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:press@satora.io" className="underline">
                press@satora.io
              </a>
            </p>
            <p>
              <strong>X:</strong>{" "}
              <a href="https://x.com/satora_io" className="underline">
                @satora_io
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default PressPage;
