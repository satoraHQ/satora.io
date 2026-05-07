"use client";

import ThemeToggle from "@/components/layout/ThemeToggle";
import {
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaXTwitter,
  GoArrowUpRight,
  HiMenu,
  HiOutlineChevronDown,
  HiX,
  SiNostr,
} from "@/components/ui/icons";
import { Navbar as NavbarComponent, NavbarLeft, NavbarRight } from "@/components/ui/navbar";
import SatoraLogo from "@/components/ui/SatoraLogo";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Docs", href: "https://docs.satora.io", external: true },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "mailto:support@satora.io", external: true },
];

interface CommunityLink {
  label: string;
  href: string;
  Icon: (props: { className?: string }) => React.ReactElement;
}

const COMMUNITY_LINKS: CommunityLink[] = [
  { label: "X", href: "https://x.com/satora_io", Icon: FaXTwitter },
  { label: "Telegram", href: "https://t.me/lendasatcommunity", Icon: FaTelegram },
  { label: "GitHub", href: "https://github.com/satora", Icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/company/satora", Icon: FaLinkedin },
  // TODO: replace with the actual Satora/Lendasat npub on njump.me
  { label: "Nostr", href: "https://nostr.com", Icon: SiNostr },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [mobileCommunityOpen, setMobileCommunityOpen] = useState(false);
  const communityRef = useRef<HTMLDivElement | null>(null);

  // Close desktop dropdown on outside click or ESC
  useEffect(() => {
    if (!communityOpen) return;
    const onClick = (e: MouseEvent) => {
      if (communityRef.current && !communityRef.current.contains(e.target as Node)) {
        setCommunityOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCommunityOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [communityOpen]);

  return (
    <>
      <header className={cn("fixed top-2 left-0 right-0 z-50 px-4")}>
        <div className="relative mx-auto max-w-3xl">
          <NavbarComponent>
            <NavbarLeft>
              <Link href="/" className="flex items-center">
                <SatoraLogo className="text-lg" />
              </Link>
            </NavbarLeft>

            <NavbarRight>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) =>
                  link.external
                    ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg"
                      >
                        {link.label}
                      </a>
                    )
                    : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="px-3 py-1.5 text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg"
                      >
                        {link.label}
                      </Link>
                    )
                )}

                {/* Community dropdown */}
                <div
                  ref={communityRef}
                  className="relative"
                  onMouseEnter={() => setCommunityOpen(true)}
                  onMouseLeave={() => setCommunityOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setCommunityOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={communityOpen}
                    className="flex items-center gap-1 px-3 py-1.5 text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg"
                  >
                    Community
                    <HiOutlineChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${communityOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {communityOpen && (
                    <div className="absolute right-0 top-full pt-2">
                      <div
                        role="menu"
                        className="w-48 rounded-2xl bg-white/95 dark:bg-[#0a0a0a]/95 border border-gray-200/60 dark:border-white/[0.08] backdrop-blur-xl shadow-lg overflow-hidden p-1.5"
                      >
                        {COMMUNITY_LINKS.map(({ label, href, Icon }) => (
                          <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            role="menuitem"
                            onClick={() => setCommunityOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </nav>

              <div className="hidden md:flex items-center gap-2">
                <ThemeToggle />
                <a
                  className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-lime-light text-black text-[13px] font-medium hover:brightness-95 dark:hover:brightness-110 active:scale-95 transition-all duration-150"
                  href="https://app.satora.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open App
                  <GoArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                type="button"
              >
                {mobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
              </button>
            </NavbarRight>
          </NavbarComponent>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-[#0a0a0a]/95 border border-gray-200/50 dark:border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden shadow-lg">
              <div className="p-3 space-y-1">
                {NAV_LINKS.map((link) =>
                  link.external
                    ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    )
                    : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )
                )}

                {/* Mobile Community section — expandable */}
                <button
                  type="button"
                  onClick={() => setMobileCommunityOpen((v) => !v)}
                  aria-expanded={mobileCommunityOpen}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                >
                  Community
                  <HiOutlineChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      mobileCommunityOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileCommunityOpen && (
                  <div className="pl-3 space-y-0.5">
                    {COMMUNITY_LINKS.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {label}
                      </a>
                    ))}
                  </div>
                )}

                <div className="pt-2 mt-2 border-t border-gray-100 dark:border-white/5 flex items-center justify-between px-4 py-2">
                  <ThemeToggle />
                  <a
                    className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-lime-light text-black text-sm font-medium hover:brightness-95 dark:hover:brightness-110 active:scale-95 transition-all duration-150"
                    href="https://app.satora.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Open App
                    <GoArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
