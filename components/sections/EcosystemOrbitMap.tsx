import NetworkArbitrumOne from "@web3icons/react/icons/networks/NetworkArbitrumOne";
import NetworkAvalanche from "@web3icons/react/icons/networks/NetworkAvalanche";
import NetworkBase from "@web3icons/react/icons/networks/NetworkBase";
import NetworkEthereum from "@web3icons/react/icons/networks/NetworkEthereum";
import NetworkOptimism from "@web3icons/react/icons/networks/NetworkOptimism";
import NetworkPolygon from "@web3icons/react/icons/networks/NetworkPolygon";
import NetworkUnichain from "@web3icons/react/icons/networks/NetworkUnichain";
import Image from "next/image";
import type { ComponentType, CSSProperties } from "react";

type NetworkIconComponent = ComponentType<{
  className?: string;
  size?: number | string;
  variant?: "mono" | "branded" | "background";
}>;

interface EvmNetwork {
  name: string;
  Icon: NetworkIconComponent;
}

const EVM_NETWORKS: EvmNetwork[] = [
  { name: "Ethereum", Icon: NetworkEthereum },
  { name: "Polygon", Icon: NetworkPolygon },
  { name: "Arbitrum", Icon: NetworkArbitrumOne },
  { name: "Base", Icon: NetworkBase },
  { name: "Unichain", Icon: NetworkUnichain },
  { name: "Optimism", Icon: NetworkOptimism },
  { name: "Avalanche", Icon: NetworkAvalanche },
];

const BITCOIN_RAILS = [
  { name: "On-chain", icon: "/assets/chains/bitcoin.svg" },
  { name: "Lightning", icon: "/assets/chains/lightning.svg" },
  { name: "Arkade", icon: "/assets/chains/arkade.svg" },
];

export default function EcosystemOrbitMap() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-light/[0.05] blur-[90px] sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px] lg:blur-[110px]" />

      <div className="relative left-1/2 grid w-[560px] -translate-x-1/2 grid-cols-[220px_120px_220px] items-center sm:w-[760px] sm:grid-cols-[300px_160px_300px] lg:left-auto lg:mx-auto lg:w-full lg:max-w-[1080px] lg:translate-x-0 lg:grid-cols-[minmax(0,1fr)_170px_minmax(0,1fr)]">
        <BitcoinSystem />
        <AtomicSwapBridge />
        <StablecoinSystem />
      </div>
    </div>
  );
}

function BitcoinSystem() {
  return (
    <div className="text-center">
      <p className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40 sm:block">
        Bitcoin ecosystem
      </p>
      <div className="relative mx-auto h-[220px] w-[220px] sm:mt-5 sm:h-[290px] sm:w-[290px] lg:h-[360px] lg:w-[360px]">
        <OrbitShell className="h-[82%] w-[82%] animate-[spin_34s_linear_infinite] motion-reduce:animate-none">
          {BITCOIN_RAILS.map((rail, index) => (
            <OrbitPosition key={rail.name} index={index} count={BITCOIN_RAILS.length}>
              <div className="animate-[spin_34s_linear_infinite] [animation-direction:reverse] motion-reduce:animate-none">
                <div className="relative grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-[#11130f] shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                  <Image src={rail.icon} alt="" width={28} height={28} className="h-5 w-5 sm:h-7 sm:w-7" />
                  <span className="absolute left-1/2 top-[calc(100%+0.35rem)] -translate-x-1/2 whitespace-nowrap text-[8px] font-medium text-white/55 sm:text-[10px]">
                    {rail.name}
                  </span>
                </div>
              </div>
            </OrbitPosition>
          ))}
        </OrbitShell>

        <div className="absolute left-1/2 top-1/2 grid h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#11130f] shadow-[0_0_60px_rgba(247,147,26,0.12)] sm:h-20 sm:w-20 lg:h-24 lg:w-24">
          <Image
            src="/assets/chains/bitcoin.svg"
            alt="Bitcoin"
            width={50}
            height={50}
            className="h-10 w-10 lg:h-[50px] lg:w-[50px]"
          />
        </div>
      </div>
    </div>
  );
}

function StablecoinSystem() {
  return (
    <div className="text-center">
      <p className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40 sm:block">
        Stablecoin ecosystem
      </p>
      <div className="relative mx-auto h-[220px] w-[220px] sm:mt-5 sm:h-[290px] sm:w-[290px] lg:h-[360px] lg:w-[360px]">
        <OrbitShell className="h-[82%] w-[82%] animate-[spin_64s_linear_infinite] motion-reduce:animate-none">
          {EVM_NETWORKS.map((network, index) => (
            <OrbitPosition key={network.name} index={index} count={EVM_NETWORKS.length}>
              <NetworkParticle
                network={network}
                animation="animate-[spin_64s_linear_infinite] [animation-direction:reverse]"
              />
            </OrbitPosition>
          ))}
        </OrbitShell>

        <div className="absolute left-1/2 top-1/2 flex h-[72px] w-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#11130f] shadow-[0_0_70px_rgba(194,232,33,0.1)] sm:h-20 sm:w-24 lg:h-24 lg:w-28">
          <Image
            src="/assets/chains/usdc.svg"
            alt="USDC"
            width={52}
            height={52}
            className="relative z-10 h-10 w-10 translate-x-2 lg:h-[52px] lg:w-[52px]"
          />
          <Image
            src="/assets/chains/usdt.svg"
            alt="USDT"
            width={52}
            height={52}
            className="relative h-10 w-10 -translate-x-2 lg:h-[52px] lg:w-[52px]"
          />
        </div>
      </div>
    </div>
  );
}

function AtomicSwapBridge() {
  return (
    <div className="relative grid place-items-center">
      <span className="absolute -left-5 -right-5 top-1/2 h-px bg-gradient-to-r from-white/10 via-lime-light/60 to-white/10" />
      <div className="relative z-10 grid h-20 w-20 place-items-center rounded-full bg-lime-light text-center text-black shadow-[0_0_60px_rgba(194,232,33,0.15)] sm:h-28 sm:w-28 lg:h-32 lg:w-32">
        <div>
          <p className="text-base font-bold tracking-[-0.03em] sm:text-xl">Satora</p>
          <p className="mt-0.5 text-[7px] font-semibold uppercase tracking-[0.12em] text-black/55 sm:mt-1 sm:text-[10px] sm:tracking-[0.14em]">
            Atomic swap
          </p>
        </div>
      </div>
    </div>
  );
}

function OrbitShell({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}>
      <div className="relative h-full w-full rounded-full border border-dashed border-white/[0.11]">{children}</div>
    </div>
  );
}

function OrbitPosition({ children, index, count }: { children: React.ReactNode; index: number; count: number }) {
  const angle = -90 + (index * 360) / count;
  const radians = (angle * Math.PI) / 180;
  const style = {
    left: `${50 + Math.cos(radians) * 50}%`,
    top: `${50 + Math.sin(radians) * 50}%`,
  } satisfies CSSProperties;

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={style}>
      {children}
    </div>
  );
}

function NetworkParticle({ network, animation }: { network: EvmNetwork; animation: string }) {
  const Icon = network.Icon;
  return (
    <div
      className={`relative ${animation} motion-reduce:animate-none`}
      title={network.name}
      aria-label={network.name}
    >
      <span className="grid h-7 w-7 place-items-center overflow-hidden rounded-full border border-white/15 bg-[#11130f] shadow-[0_6px_20px_rgba(0,0,0,0.35)] sm:h-9 sm:w-9 lg:h-11 lg:w-11">
        <Icon size="72%" variant="branded" />
      </span>
      <span className="absolute left-1/2 top-[calc(100%+0.25rem)] -translate-x-1/2 whitespace-nowrap text-[7px] font-medium text-white/45 sm:top-[calc(100%+0.35rem)] sm:text-[9px] lg:text-[10px]">
        {network.name}
      </span>
    </div>
  );
}
