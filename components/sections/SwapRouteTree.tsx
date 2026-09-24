"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./SwapRouteTree.module.css";

const tokens = [
  { symbol: "USDC", slug: "usdc", caption: "Dollar stablecoin" },
  { symbol: "USDT", slug: "usdt", caption: "USDT & USDT0" },
  { symbol: "WBTC", slug: "wbtc", caption: "Wrapped Bitcoin" },
  { symbol: "tBTC", slug: "tbtc", caption: "Tokenized Bitcoin" },
  { symbol: "USAT", slug: "usat", caption: "Dollar stablecoin" },
  { symbol: "XAUt", slug: "xaut", caption: "Tokenized gold" },
];

const bitcoinNetworks = [
  { name: "On-chain", icon: "/assets/chains/bitcoin.svg" },
  { name: "Lightning", icon: "/assets/chains/lightning.svg" },
  { name: "Arkade", icon: "/assets/chains/arkade.svg" },
];

type SwapRouteTreeProps = {
  currentToken?: string;
  toBitcoin?: boolean;
};

function pairPath(tokenSlug: string, toBitcoin: boolean): string {
  return toBitcoin ? `/swap/${tokenSlug}-to-bitcoin` : `/swap/bitcoin-to-${tokenSlug}`;
}

export default function SwapRouteTree({
  currentToken = "USDC",
  toBitcoin = false,
}: SwapRouteTreeProps) {
  const [reverse, setReverse] = useState(toBitcoin);
  const [hovered, setHovered] = useState<string | null>(null);
  const currentTokenSlug = currentToken.toLowerCase();
  const active = hovered ?? currentTokenSlug;
  // This link always reverses the current page, independently of the diagram toggle.
  const reverseRoute = pairPath(currentTokenSlug, !toBitcoin);
  return (
    <section className={styles.section} aria-labelledby="swap-route-tree-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>CONNECTED BY ATOMIC SWAPS</p>
            <h2 id="swap-route-tree-title">More ways to move Bitcoin.</h2>
            <p className={styles.description}>
              Explore another pair. Choose your networks and get a quote on its dedicated page.
            </p>
          </div>
        </div>

        <div className={styles.labels} aria-hidden="true">
          <span>BITCOIN</span>
          <span>EVM TOKENS</span>
        </div>
        <div className={styles.tree}>
          <div className={styles.bitcoinNetworks} aria-label="Bitcoin networks">
            {bitcoinNetworks.map((network) => (
              <div key={network.name} className={styles.bitcoin}>
                <Image src={network.icon} alt="" width={28} height={28} />
                <span>
                  <small>BTC</small>
                  <strong>{network.name}</strong>
                </span>
              </div>
            ))}
          </div>
          <div className={styles.connections}>
            {/* Node centers match the row heights and spacing in the CSS module. */}
            <svg viewBox="0 0 600 384" preserveAspectRatio="none" aria-hidden="true">
              {bitcoinNetworks.map((network, index) => (
                <path
                  key={network.name}
                  d={`M 0 ${96 + index * 96} C 145 ${96 + index * 96}, 155 192, 300 192`}
                  className={styles.path}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {tokens.map((token, index) => (
                <path
                  key={token.slug}
                  d={`M 300 192 C 445 192, 455 ${32 + index * 64}, 600 ${32 + index * 64}`}
                  className={active === token.slug ? styles.activePath : styles.path}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            <button
              type="button"
              className={styles.reverseButton}
              aria-label="Reverse swap direction"
              aria-pressed={reverse}
              title={reverse ? "Switch to Bitcoin → EVM" : "Switch to EVM → Bitcoin"}
              onClick={() => setReverse((value) => !value)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className={reverse ? styles.reversed : undefined}>
                <path
                  d="M5 12h14m-5-5 5 5-5 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className={styles.swapLabel} aria-hidden="true">ATOMIC SWAPS</span>
          </div>
          <nav className={styles.tokens} aria-label="Explore Bitcoin swap pairs">
            {tokens.map((token) => {
              const href = pairPath(token.slug, reverse);
              const isCurrent = reverse === toBitcoin && token.slug === currentTokenSlug;
              return (
                <Link
                  key={token.slug}
                  href={href}
                  aria-current={isCurrent ? "page" : undefined}
                  aria-label={reverse ? `Swap ${token.symbol} to Bitcoin` : `Swap Bitcoin to ${token.symbol}`}
                  className={styles.token}
                  onMouseEnter={() => setHovered(token.slug)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(token.slug)}
                  onBlur={() => setHovered(null)}
                >
                  <span className={styles.tokenDot} aria-hidden="true" />
                  <span>
                    <strong>{token.symbol}</strong>
                    <small>{token.caption}</small>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">{reverse ? "←" : "→"}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className={styles.footer}>
          <span role="status">
            <i aria-hidden="true" />
            {reverse ? "EVM tokens → Bitcoin" : "Bitcoin → EVM tokens"}
          </span>
          <div>
            <p>Pair overview, not live transaction activity. Networks and availability depend on the selected route.</p>
            <Link href={reverseRoute} className={styles.reverseRoute}>
              {toBitcoin ? `Explore Bitcoin → ${currentToken}` : `Explore ${currentToken} → Bitcoin`}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
