"use client";

import { HiOutlineChevronDown, HiOutlineXMark } from "@/components/ui/icons";
import Image from "next/image";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";

type AssetKind = "bitcoin" | "stablecoin";
type SelectorSide = "source" | "target";
type Category =
  | "all"
  | "bitcoin"
  | "usdc"
  | "usdt"
  | "ethereum"
  | "arbitrum"
  | "polygon"
  | "base"
  | "optimism"
  | "other";

interface SwapAsset {
  id: string;
  symbol: string;
  chain: string;
  decimals: number;
  kind: AssetKind;
  icon: string;
  networkIcon?: string;
}

interface QuoteResponse {
  exchange_rate: string;
  net_source_amount: string;
  net_target_amount: string;
}

type QuoteStatus = "idle" | "loading" | "success" | "error";

const DECIMAL_AMOUNT_PATTERN = /^\d+(\.\d*)?$/;
const LARGE_RATE_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});
const SMALL_RATE_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 8,
});

const ASSETS: SwapAsset[] = [
  {
    id: "lightning:BTC",
    symbol: "BTC",
    chain: "Lightning",
    decimals: 8,
    kind: "bitcoin",
    icon: "/assets/chains/bitcoin.svg",
    networkIcon: "/assets/chains/lightning.svg",
  },
  {
    id: "bitcoin:BTC",
    symbol: "BTC",
    chain: "Bitcoin",
    decimals: 8,
    kind: "bitcoin",
    icon: "/assets/chains/bitcoin.svg",
    networkIcon: "/assets/chains/bitcoin.svg",
  },
  {
    id: "arkade:BTC",
    symbol: "BTC",
    chain: "Arkade",
    decimals: 8,
    kind: "bitcoin",
    icon: "/assets/chains/bitcoin.svg",
    networkIcon: "/assets/chains/arkade.svg",
  },
  {
    id: "42161:USDC",
    symbol: "USDC",
    chain: "Arbitrum",
    decimals: 6,
    kind: "stablecoin",
    icon: "/assets/chains/usdc.svg",
    networkIcon: "/assets/chains/arbitrum.svg",
  },
  {
    id: "137:USDC",
    symbol: "USDC",
    chain: "Polygon",
    decimals: 6,
    kind: "stablecoin",
    icon: "/assets/chains/usdc.svg",
    networkIcon: "/assets/chains/polygon.svg",
  },
  {
    id: "1:USDC",
    symbol: "USDC",
    chain: "Ethereum",
    decimals: 6,
    kind: "stablecoin",
    icon: "/assets/chains/usdc.svg",
    networkIcon: "/assets/chains/ethereum.svg",
  },
  {
    id: "8453:USDC",
    symbol: "USDC",
    chain: "Base",
    decimals: 6,
    kind: "stablecoin",
    icon: "/assets/chains/usdc.svg",
    networkIcon: "/assets/chains/base.svg",
  },
  {
    id: "10:USDC",
    symbol: "USDC",
    chain: "Optimism",
    decimals: 6,
    kind: "stablecoin",
    icon: "/assets/chains/usdc.svg",
    networkIcon: "/assets/chains/optimism.svg",
  },
  {
    id: "43114:USDC",
    symbol: "USDC",
    chain: "Avalanche",
    decimals: 6,
    kind: "stablecoin",
    icon: "/assets/chains/usdc.svg",
    networkIcon: "/assets/chains/avalanche.svg",
  },
  {
    id: "42161:USDT0",
    symbol: "USDT0",
    chain: "Arbitrum",
    decimals: 6,
    kind: "stablecoin",
    icon: "/assets/chains/usdt.svg",
    networkIcon: "/assets/chains/arbitrum.svg",
  },
  {
    id: "137:USDT0",
    symbol: "USDT0",
    chain: "Polygon",
    decimals: 6,
    kind: "stablecoin",
    icon: "/assets/chains/usdt.svg",
    networkIcon: "/assets/chains/polygon.svg",
  },
  {
    id: "1:USDT",
    symbol: "USDT",
    chain: "Ethereum",
    decimals: 6,
    kind: "stablecoin",
    icon: "/assets/chains/usdt.svg",
    networkIcon: "/assets/chains/ethereum.svg",
  },
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bitcoin", label: "Bitcoin" },
  { id: "usdc", label: "USDC" },
  { id: "usdt", label: "USDT" },
  { id: "ethereum", label: "Ethereum" },
  { id: "arbitrum", label: "Arbitrum" },
  { id: "polygon", label: "Polygon" },
  { id: "base", label: "Base" },
  { id: "optimism", label: "Optimism" },
  { id: "other", label: "Other" },
];

const DEFAULT_SOURCE = ASSETS[0];
const DEFAULT_TARGET = ASSETS[3];

export default function HomepageSwapWidget() {
  const [source, setSource] = useState(DEFAULT_SOURCE);
  const [target, setTarget] = useState(DEFAULT_TARGET);
  const [sourceAmount, setSourceAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [lastEdited, setLastEdited] = useState<SelectorSide>("source");
  const [selector, setSelector] = useState<SelectorSide | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [quoteStatus, setQuoteStatus] = useState<QuoteStatus>("idle");

  const availableTargets = getAvailableTargets(source);
  const canSwitch = isValidPair(target, source);
  const activeAmount = lastEdited === "source" ? sourceAmount : targetAmount;
  const sourceId = source.id;
  const sourceDecimals = source.decimals;
  const targetId = target.id;
  const targetDecimals = target.decimals;
  const swapUrl = useMemo(() => {
    const url = new URL(`https://app.satora.io/${source.id}/${target.id}`);
    const activeAmount = lastEdited === "source" ? sourceAmount : targetAmount;
    const activeDecimals = lastEdited === "source" ? sourceDecimals : targetDecimals;
    const baseUnits = decimalToBaseUnits(activeAmount, activeDecimals);
    if (baseUnits && baseUnits !== "0") {
      url.searchParams.set(lastEdited === "source" ? "sourceAmount" : "targetAmount", baseUnits);
    }
    return url.toString();
  }, [lastEdited, source, sourceAmount, target, targetAmount]);

  useEffect(() => {
    const activeAsset = lastEdited === "source" ? source : target;
    const baseUnits = decimalToBaseUnits(activeAmount, activeAsset.decimals);

    if (!baseUnits || baseUnits === "0") {
      setQuote(null);
      setQuoteStatus("idle");
      return;
    }

    const controller = new AbortController();
    setQuote(null);
    setQuoteStatus("loading");

    const timeout = window.setTimeout(async () => {
      const params = new URLSearchParams({
        source: sourceId,
        target: targetId,
        [lastEdited === "source" ? "sourceAmount" : "targetAmount"]: baseUnits,
      });

      try {
        const response = await fetch(`/api/quote?${params}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok) throw new Error(result.error ?? "Quote unavailable");
        if (controller.signal.aborted) return;

        if (!isQuoteResponse(result)) throw new Error("Invalid quote response");
        const nextQuote = result;
        setQuote(nextQuote);
        setQuoteStatus("success");
        if (lastEdited === "source") {
          setTargetAmount(
            baseUnitsToDecimal(nextQuote.net_target_amount, targetDecimals),
          );
        } else {
          setSourceAmount(
            baseUnitsToDecimal(nextQuote.net_source_amount, sourceDecimals),
          );
        }
      } catch {
        if (controller.signal.aborted) return;
        setQuoteStatus("error");
      }
    }, 300);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [activeAmount, lastEdited, sourceDecimals, sourceId, targetDecimals, targetId]);

  const openSelector = (side: SelectorSide) => setSelector(side);

  const handleSourceSelect = (asset: SwapAsset) => {
    setSource(asset);
    if (!isValidPair(asset, target)) {
      setTarget(getAvailableTargets(asset)[0]);
    }
    resetAmounts();
  };

  const handleTargetSelect = (asset: SwapAsset) => {
    setTarget(asset);
    resetAmounts();
  };

  const resetAmounts = () => {
    setSourceAmount("");
    setTargetAmount("");
    setLastEdited("source");
  };

  const handleSwitch = () => {
    if (!isValidPair(target, source)) return;
    setSource(target);
    setTarget(source);
    setSourceAmount(targetAmount);
    setTargetAmount(sourceAmount);
    setLastEdited(lastEdited === "source" ? "target" : "source");
  };

  const handleSourceAmount = (value: string) => {
    setSourceAmount(normalizeAmount(value, source.decimals));
    setTargetAmount("");
    setLastEdited("source");
  };

  const handleTargetAmount = (value: string) => {
    setTargetAmount(normalizeAmount(value, target.decimals));
    setSourceAmount("");
    setLastEdited("target");
  };

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setIsLeaving(true);
    window.setTimeout(() => window.location.assign(swapUrl), 180);
  };

  return (
    <div
      className={`relative rounded-[2rem] border border-black/10 bg-[#0b0c0a] p-3 shadow-[0_35px_100px_rgba(0,0,0,0.28)] transition duration-200 dark:border-white/10 sm:p-4 ${
        isLeaving ? "scale-[0.985] opacity-70" : "scale-100 opacity-100"
      }`}
    >
      <div className="rounded-[1.5rem] border border-white/[0.08] bg-[#11130f] p-3 sm:p-4">
        <div className="relative">
          <AmountPanel
            label="Sell"
            asset={source}
            amount={sourceAmount}
            onAmountChange={handleSourceAmount}
            onSelect={() => openSelector("source")}
            isLoading={quoteStatus === "loading" && lastEdited === "target"}
          />

          <button
            type="button"
            onClick={handleSwitch}
            disabled={!canSwitch}
            aria-label="Switch sell and buy assets"
            title={canSwitch ? "Switch sell and buy assets" : "This route is currently one-way"}
            className="group absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#11130f] p-1 transition-transform duration-200 hover:scale-110 active:scale-125 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] bg-[#20231f] text-xl text-white/55 transition-colors group-hover:text-lime-light">
              ↓
            </span>
          </button>

          <AmountPanel
            label="Buy"
            asset={target}
            amount={targetAmount}
            onAmountChange={handleTargetAmount}
            onSelect={() => openSelector("target")}
            className="mt-1"
            isLoading={quoteStatus === "loading" && lastEdited === "source"}
          />
        </div>

        <QuoteLine
          quote={quote}
          status={quoteStatus}
          source={source}
          target={target}
        />

        <a
          href={swapUrl}
          onClick={handleNavigate}
          className="block w-full rounded-2xl bg-lime-light py-3.5 text-center text-sm font-semibold text-black transition hover:brightness-95 active:scale-[0.99]"
        >
          {isLeaving ? "Opening Satora…" : "Swap"}
        </a>
      </div>

      {selector && (
        <TokenSelector
          side={selector}
          selected={selector === "source" ? source : target}
          assets={selector === "source" ? ASSETS : availableTargets}
          onClose={() => setSelector(null)}
          onSelect={(asset) => {
            if (selector === "source") handleSourceSelect(asset);
            else handleTargetSelect(asset);
            setSelector(null);
          }}
        />
      )}
    </div>
  );
}

function AmountPanel({
  label,
  asset,
  amount,
  onAmountChange,
  onSelect,
  isLoading = false,
  className = "",
}: {
  label: "Sell" | "Buy";
  asset: SwapAsset;
  amount: string;
  onAmountChange: (value: string) => void;
  onSelect: () => void;
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-white/[0.075] bg-[#1c1f1d]/80 p-4 sm:p-5 ${className}`}>
      <p className="mb-2 text-sm text-white/45">{label}</p>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="text-2xl text-white/30 sm:text-3xl">{asset.kind === "bitcoin" ? "₿" : "$"}</span>
          <input
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            inputMode="decimal"
            aria-label={`${label} amount in ${asset.symbol}`}
            placeholder={isLoading ? "…" : "0"}
            className="min-w-0 flex-1 bg-transparent text-3xl font-medium tracking-tight text-white outline-none placeholder:text-white/25 sm:text-4xl"
          />
        </div>
        <AssetButton asset={asset} onClick={onSelect} />
      </div>
      <p className="mt-2 h-4 text-right text-[11px] text-white/25">{asset.chain}</p>
    </div>
  );
}

function QuoteLine({
  quote,
  status,
  source,
  target,
}: {
  quote: QuoteResponse | null;
  status: QuoteStatus;
  source: SwapAsset;
  target: SwapAsset;
}) {
  let content = "Enter an amount to see the live rate.";
  let className = "text-white/35";

  if (status === "loading") {
    content = "Fetching live quote…";
    className = "text-white/50";
  } else if (status === "error") {
    content = "Live quote unavailable. You can continue in the app.";
    className = "text-amber-200/60";
  } else if (status === "success" && quote) {
    const stablecoin = source.kind === "stablecoin" ? source : target;
    content = source.kind === target.kind
      ? "1 BTC = 1 BTC · Live quote"
      : `1 BTC ≈ ${formatRate(quote.exchange_rate)} ${stablecoin.symbol} · Live quote`;
    className = "text-lime-light/75";
  }

  return (
    <p
      aria-live="polite"
      className={`min-h-10 px-2 pb-2 pt-4 text-center text-[11px] leading-relaxed ${className}`}
    >
      {content}
    </p>
  );
}

function AssetButton({ asset, onClick }: { asset: SwapAsset; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Select ${asset.symbol} on ${asset.chain}`}
      className="flex shrink-0 items-center gap-2 rounded-full bg-[#0d0e0d] py-2 pl-2 pr-3 text-white transition-colors hover:bg-black"
    >
      <AssetIcon asset={asset} size="small" />
      <span className="text-sm font-semibold sm:text-base">{asset.symbol}</span>
      <HiOutlineChevronDown className="h-4 w-4 text-white/40" />
    </button>
  );
}

function TokenSelector({
  side,
  selected,
  assets,
  onClose,
  onSelect,
}: {
  side: SelectorSide;
  selected: SwapAsset;
  assets: SwapAsset[];
  onClose: () => void;
  onSelect: (asset: SwapAsset) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const visibleCategories = CATEGORIES.filter(
    (item) => item.id === "all" || assets.some((asset) => matchesCategory(asset, item.id)),
  );
  const filteredAssets = assets.filter((asset) => {
    const matchesTab = category === "all" || matchesCategory(asset, category);
    const normalizedQuery = query.trim().toLowerCase();
    const matchesSearch = !normalizedQuery
      || asset.symbol.toLowerCase().includes(normalizedQuery)
      || asset.chain.toLowerCase().includes(normalizedQuery);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close token selector"
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="token-selector-title"
        className="relative z-10 max-h-[86dvh] w-full min-w-0 max-w-full overflow-hidden rounded-t-[1.5rem] border border-white/10 bg-[#0c0d0c] text-white shadow-2xl sm:max-w-md sm:rounded-[1.5rem]"
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <h2 id="token-selector-title" className="text-lg font-semibold">
            Select a currency to {side === "source" ? "sell" : "buy"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full text-white/45 transition hover:bg-white/[0.07] hover:text-white"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 px-5 py-3">
          {visibleCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                category === item.id ? "bg-white text-black" : "bg-white/[0.07] text-white/55 hover:bg-white/[0.11]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="px-5 pb-2 pt-1">
          <label className="flex h-11 items-center gap-3 rounded-2xl bg-white/[0.07] px-4 text-white/45 focus-within:ring-1 focus-within:ring-white/20">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Search by name or network</span>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or network"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
          </label>
        </div>

        <div className="max-h-[50dvh] overflow-y-auto px-3 pb-5 pt-1">
          {filteredAssets.length > 0
            ? filteredAssets.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => onSelect(asset)}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition-colors hover:bg-white/[0.06]"
              >
                <AssetIcon asset={asset} size="large" />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{asset.symbol}</span>
                  <span className="block text-sm text-white/45">{asset.chain}</span>
                </span>
                {selected.id === asset.id && (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-lime-light text-sm font-bold text-black">
                    ✓
                  </span>
                )}
              </button>
            ))
            : <p className="py-10 text-center text-sm text-white/40">No currencies found</p>}
        </div>
      </div>
    </div>
  );
}

function AssetIcon({ asset, size }: { asset: SwapAsset; size: "small" | "large" }) {
  const dimensions = size === "large" ? "h-11 w-11" : "h-8 w-8";
  const iconSize = size === "large" ? 36 : 28;
  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] ${dimensions}`}
    >
      <Image src={asset.icon} alt="" width={iconSize} height={iconSize} />
      <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center overflow-hidden rounded-full border border-[#0c0d0c] bg-[#0c0d0c] text-[8px] font-bold text-lime-light">
        {asset.networkIcon
          ? <Image src={asset.networkIcon} alt="" width={13} height={13} />
          : null}
      </span>
    </span>
  );
}

function getAvailableTargets(source: SwapAsset): SwapAsset[] {
  return ASSETS.filter((asset) => isValidPair(source, asset));
}

function isValidPair(source: SwapAsset, target: SwapAsset): boolean {
  if (source.id === target.id) return false;
  if (source.kind === "stablecoin" && target.kind === "stablecoin") return false;
  if (source.kind === "stablecoin" && target.chain === "Lightning") return false;
  if (source.kind !== target.kind) return true;

  if (source.chain === "Arkade") return target.chain === "Lightning";
  return target.chain === "Arkade";
}

function matchesCategory(asset: SwapAsset, category: Category): boolean {
  switch (category) {
    case "all":
      return true;
    case "bitcoin":
      return asset.kind === "bitcoin";
    case "usdc":
      return asset.symbol === "USDC";
    case "usdt":
      return asset.symbol === "USDT" || asset.symbol === "USDT0";
    case "ethereum":
      return asset.chain === "Ethereum";
    case "arbitrum":
      return asset.chain === "Arbitrum";
    case "polygon":
      return asset.chain === "Polygon";
    case "base":
      return asset.chain === "Base";
    case "optimism":
      return asset.chain === "Optimism";
    case "other":
      return ![
        "Bitcoin",
        "Lightning",
        "Arkade",
        "Ethereum",
        "Arbitrum",
        "Polygon",
        "Base",
        "Optimism",
      ].includes(asset.chain);
  }
}

function normalizeAmount(value: string, decimals: number): string {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  const [whole = "", ...fractionParts] = normalized.split(".");
  if (fractionParts.length === 0) return whole;
  return `${whole || "0"}.${fractionParts.join("").slice(0, decimals)}`;
}

function decimalToBaseUnits(value: string, decimals: number): string | null {
  if (!DECIMAL_AMOUNT_PATTERN.test(value)) return null;
  const [whole = "0", fraction = ""] = value.split(".");
  const paddedFraction = `${fraction}${"0".repeat(decimals)}`.slice(0, decimals);
  const combined = `${whole}${paddedFraction}`.replace(/^0+(?=\d)/, "");
  return combined || "0";
}

function baseUnitsToDecimal(value: string, decimals: number): string {
  const digits = value.replace(/^0+(?=\d)/, "") || "0";
  if (decimals === 0) return digits;

  const padded = digits.padStart(decimals + 1, "0");
  const whole = padded.slice(0, -decimals);
  const fraction = padded.slice(-decimals).replace(/0+$/, "");
  return fraction ? `${whole}.${fraction}` : whole;
}

function formatRate(value: string): string {
  const rate = Number(value);
  if (!Number.isFinite(rate)) return value;
  return (rate >= 1 ? LARGE_RATE_FORMATTER : SMALL_RATE_FORMATTER).format(rate);
}

function isQuoteResponse(value: unknown): value is QuoteResponse {
  if (typeof value !== "object" || value === null) return false;
  return "exchange_rate" in value
    && typeof value.exchange_rate === "string"
    && "net_source_amount" in value
    && typeof value.net_source_amount === "string"
    && "net_target_amount" in value
    && typeof value.net_target_amount === "string";
}
