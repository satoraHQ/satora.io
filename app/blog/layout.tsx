import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog | Bitcoin Lending Insights & Updates",
  description:
    "News, updates, and insights from the Satora team. Learn about Bitcoin-backed lending, DeFi strategies, and platform updates.",
  openGraph: {
    title: "Blog | Bitcoin Lending Insights & Updates | Satora",
    description:
      "News, updates, and insights from the Satora team. Learn about Bitcoin-backed lending, DeFi strategies, and platform updates.",
    url: "https://satora.io/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Bitcoin Lending Insights & Updates | Satora",
    description:
      "News, updates, and insights from the Satora team. Learn about Bitcoin-backed lending, DeFi strategies, and platform updates.",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
