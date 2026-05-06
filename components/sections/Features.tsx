import {
  HiOutlineArrowPath,
  HiOutlineBolt,
  HiOutlineCodeBracket,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  PiGasPumpBold,
} from "@/components/ui/icons";
import Image from "next/image";
import Globe from "./Globe";

const CHAIN_ICONS = [
  { name: "Bitcoin", src: "/assets/chains/bitcoin.svg" },
  { name: "Lightning", src: "/assets/chains/lightning.svg" },
  { name: "Ethereum", src: "/assets/chains/ethereum.svg" },
  { name: "Polygon", src: "/assets/chains/polygon.svg" },
  { name: "Arbitrum", src: "/assets/chains/arbitrum.svg" },
  { name: "Base", src: "/assets/chains/base.svg" },
  { name: "Optimism", src: "/assets/chains/optimism.svg" },
  { name: "Avalanche", src: "/assets/chains/avalanche.svg" },
  { name: "USDC", src: "/assets/chains/usdc.svg" },
  { name: "USDT", src: "/assets/chains/usdt.svg" },
];

const cardClass = `group relative overflow-hidden rounded-2xl p-7 sm:p-8 transition-all duration-200
  bg-gray-50/80 dark:bg-white/[0.02]
  border border-gray-200 dark:border-white/[0.08]
  hover:border-lime-light dark:hover:border-lime-light hover:ring-[0.5px] hover:ring-lime-light`;

export default function Features() {
  return (
    <section className="w-full bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Built for production
          </h2>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed sm:text-right max-w-sm">
            Bitcoin Swaps for Fintechs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {/* Row 1: Developer SDK (wide) + Multi-chain (narrow) */}
          <div className={`${cardClass} sm:col-span-3`}>
            <div className="text-lime-light mb-4">
              <HiOutlineCodeBracket className="w-7 h-7" />
            </div>
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5">
              Developer-first SDK
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Full TypeScript type safety. In-memory or IndexedDB storage adapters. Works in Node.js, browsers, and
              React Native.
            </p>
            {/* Globe decoration */}
            <div className="absolute -bottom-[145px] -right-[125px] w-[280px] h-[280px] pointer-events-none opacity-50">
              <Globe />
            </div>
          </div>

          <div className={`${cardClass} sm:col-span-2`}>
            <div className="text-lime-light mb-4">
              <HiOutlineGlobeAlt className="w-7 h-7" />
            </div>
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5">
              Multi-chain support
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              USDC and USDT on every major EVM chain. One integration, all networks.
            </p>
            <div className="flex items-center -space-x-2.5">
              {CHAIN_ICONS.map((chain) => (
                <div
                  key={chain.name}
                  className="w-5 h-5 rounded-full border-[1.5px] border-white dark:border-[#0d0d0d] bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.4] hover:z-10"
                  title={chain.name}
                >
                  <Image
                    src={chain.src}
                    alt={chain.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover grayscale transition-all duration-200 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Three pillars (wide) + Non-custodial (narrow) */}
          <div className={`${cardClass} sm:col-span-3`}>
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-6">
              Why LendaSwap
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-lime-light mb-2.5">
                  <HiOutlineBolt className="w-6 h-6" />
                </div>
                <p className="text-[13px] font-semibold text-gray-900 dark:text-white mb-0.5">
                  Instant
                </p>
                <p className="text-[12px] text-gray-400 dark:text-gray-500 leading-relaxed">
                  Lightning swaps settle in seconds
                </p>
              </div>
              <div>
                <div className="text-lime-light mb-2.5">
                  <HiOutlineShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-[13px] font-semibold text-gray-900 dark:text-white mb-0.5">
                  Trustless
                </p>
                <p className="text-[12px] text-gray-400 dark:text-gray-500 leading-relaxed">
                  Atomic swaps, no intermediaries
                </p>
              </div>
              <div>
                <div className="text-lime-light mb-2.5">
                  <PiGasPumpBold className="w-6 h-6" />
                </div>
                <p className="text-[13px] font-semibold text-gray-900 dark:text-white mb-0.5">
                  Gasless
                </p>
                <p className="text-[12px] text-gray-400 dark:text-gray-500 leading-relaxed">
                  Users never need gas tokens
                </p>
              </div>
            </div>
          </div>

          <div className={`${cardClass} sm:col-span-2`}>
            <div className="text-lime-light mb-4">
              <HiOutlineArrowPath className="w-7 h-7" />
            </div>
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5">
              Built-in recovery
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Refunds are built into the protocol. Funds are always recoverable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
