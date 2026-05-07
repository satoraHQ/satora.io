"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Image from "next/image";

const PARTNERS_DATA = [
  {
    name: "Bringin.xyz",
    logo: "/assets/partners/bringin_logo.png",
    height: "h-6",
    url: "https://bringin.xyz",
  },
  {
    name: "10101",
    logo: "/assets/partners/10101_logo.png",
    height: "h-7",
    url: "https://10101.finance",
  },
  {
    name: "Ark Labs",
    logo: "/assets/partners/arklabs_logo.png",
    height: "h-7",
    url: "https://arklabs.to",
  },
  {
    name: "BlitzWallet",
    logo: "/assets/partners/blitzwallet_logo.png",
    height: "h-7",
    url: "https://blitz-wallet.com",
  },
  {
    name: "Freedomia",
    logo: "/assets/partners/freedomia_logo.png",
    height: "h-5",
    url: "https://freedomia.io",
  },
  {
    name: "Alby Hub",
    logo: "/assets/partners/alby_logo.svg",
    height: "h-4",
    url: "https://getalby.com",
  },
{
    name: "Lendasat",
    logo: "/assets/partners/lendasat_logo.svg",
    height: "h-6",
    url: "https://lendasat.com",
  },
];

function PartnerLogo({ partner }: { partner: (typeof PARTNERS_DATA)[number] }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 flex items-center justify-center opacity-40 hover:opacity-70 transition-opacity"
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        width={90}
        height={36}
        className={`${partner.height} w-auto object-contain ${
          partner.name === "10101"
            ? "grayscale contrast-200 dark:invert"
            : partner.name === "Freedomia"
            ? "grayscale rounded-md dark:invert"
            : "filter brightness-0 dark:invert"
        }`}
        style={{ maxWidth: "90px" }}
      />
    </a>
  );
}

export default function AsSeenIn() {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <div ref={ref} className="w-full bg-white dark:bg-black">
      <div
        className={`w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-6 transition-all duration-500 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center gap-8">
          {/* Left label */}
          <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider whitespace-nowrap flex-shrink-0">
            Partnered with
          </p>

          {/* Scrolling logos — pure CSS, GPU-accelerated */}
          <div className="relative flex-1 overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

            <div
              className="flex items-center gap-10 animate-marquee"
              style={{ width: "max-content", willChange: "transform" }}
            >
              {/* Render the set twice for seamless loop */}
              {[0, 1].map((setIndex) => (
                <div key={setIndex} className="flex items-center gap-10">
                  {PARTNERS_DATA.map((partner) => (
                    <PartnerLogo
                      key={`${setIndex}-${partner.name}`}
                      partner={partner}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}
      </style>
    </div>
  );
}
