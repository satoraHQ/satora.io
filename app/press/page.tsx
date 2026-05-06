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
            Satora is a Bitcoin-backed lending platform that enables Bitcoiners to access liquidity without selling
            their BTC. Through non-custodial smart contracts, users lock Bitcoin as collateral and receive loans while
            maintaining exposure to Bitcoin&apos;s price appreciation.
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
                Satora is a Bitcoin-backed lending platform that enables users to access liquidity without selling their
                BTC. Through non-custodial smart contracts, users lock Bitcoin as collateral and receive cash loans
                while maintaining exposure to Bitcoin&apos;s price appreciation.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Medium (100 words)</h3>
              <p className="text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                Satora provides Bitcoin-backed loans that let Bitcoiners access liquidity without selling their
                holdings. The platform uses non-custodial smart contract technology where users lock Bitcoin as
                collateral to receive cash in USD, EUR, or USDC. Unlike selling Bitcoin -which triggers immediate
                capital gains tax -borrowing creates no taxable event. With 2,400+ active users, hundreds of successful
                loans completed, and zero customer fund losses, we&apos;ve proven that non-custodial Bitcoin lending
                works in practice.
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
              <strong>Twitter:</strong>{" "}
              <a href="https://twitter.com/satora" className="underline">
                @satora
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
