import { FaGithub, FaLinkedin, FaTelegram, FaXTwitter, SiNostr } from "@/components/ui/icons";
import SatoraLogo from "@/components/ui/SatoraLogo";
import Link from "next/link";

export default function Footer() {
  const linkClass = "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm";

  return (
    <footer className="w-full bg-white dark:bg-black border-t border-gray-100 dark:border-white/[0.04]">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Branding */}
          <div className="lg:col-span-2 space-y-6">
            <SatoraLogo className="text-3xl" />
            <div className="space-y-1.5 max-w-xs">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Make Bitcoin move.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                formerly known as Lendasat & Lendaswap
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 pointer-events-none">
              Product
            </p>
            <div className="space-y-2.5">
              <Link
                href="https://docs.satora.io"
                className={linkClass + " block"}
              >
                Documentation
              </Link>
              <Link href="/blog" className={linkClass + " block"}>
                Blog
              </Link>
              <a
                href="mailto:support@satora.io"
                className={linkClass + " block"}
              >
                Contact
              </a>
              <a
                href="https://status.lendasat.com/status/satora"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass + " flex items-center gap-2"}
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-lime-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-lime-500" />
                </span>
                Status
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 pointer-events-none">
              Legal
            </p>
            <div className="space-y-2.5">
              <Link
                href="https://docs.satora.io"
                className={linkClass + " block"}
              >
                Privacy Policy
              </Link>
              <Link
                href="https://docs.satora.io"
                className={linkClass + " block"}
              >
                Terms of Service
              </Link>
              <Link
                href="https://docs.satora.io"
                className={linkClass + " block"}
              >
                Impressum
              </Link>
              <Link
                href="https://docs.satora.io/design/media"
                className={linkClass + " block"}
              >
                Brand Assets
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 pointer-events-none">
              Community
            </p>
            <div className="space-y-2.5">
              <a
                href="https://x.com/lendasat"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass + " flex items-center gap-2"}
              >
                <FaXTwitter className="w-3.5 h-3.5" /> X
              </a>
              <a
                href="https://t.me/lendasatcommunity"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass + " flex items-center gap-2"}
              >
                <FaTelegram className="w-3.5 h-3.5" /> Telegram
              </a>
              <a
                href="https://github.com/satora"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass + " flex items-center gap-2"}
              >
                <FaGithub className="w-3.5 h-3.5" /> GitHub
              </a>
              <a
                href="https://linkedin.com/company/satora"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass + " flex items-center gap-2"}
              >
                <FaLinkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
              {/* TODO: replace with the actual Satora/Lendasat npub on njump.me */}
              <a
                href="https://nostr.com"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass + " flex items-center gap-2"}
              >
                <SiNostr className="w-3.5 h-3.5" /> Nostr
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-white/[0.04]">
          <p className="text-gray-400 dark:text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Satora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
