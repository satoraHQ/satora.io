import type { Metadata } from "next";
import { Dancing_Script, Poppins, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

import CookieConsent from "@/components/CookieConsent";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-signature",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://satora.io"),
  title: {
    default: "Satora - Make Bitcoin Move",
    template: "%s | Satora",
  },
  description: "Bitcoin loans without counterparty risk. Borrow against your Bitcoin using the Lightning Network.",
  keywords:
    "Bitcoin loans, BTC lending, crypto-backed loans, Bitcoin collateral, Lightning Network, DeFi lending, cryptocurrency loans, borrow against Bitcoin, Bitcoin liquidity",
  openGraph: {
    title: "Satora - Make Bitcoin Move",
    description: "Bitcoin loans without counterparty risk",
    url: "https://satora.io",
    siteName: "Satora",
    images: [
      {
        url: "https://satora.io/favicon/dot.svg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satora - Make Bitcoin Move",
    description: "Bitcoin loans without counterparty risk",
    images: ["https://satora.io/favicon/dot.svg"],
    creator: "@satora",
    site: "@satora",
  },
  icons: {
    icon: "/favicon/dot.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${spaceGrotesk.variable} ${dancingScript.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
