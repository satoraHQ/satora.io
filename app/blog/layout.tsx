import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Bitcoin Swaps, Stablecoins & Product Updates",
  description:
    "Bitcoin and stablecoin swap guides, Lightning and Arkade insights, product updates, and developer integrations from the Satora team.",
  openGraph: {
    title: "Bitcoin Swaps, Stablecoins & Product Updates | Satora",
    description:
      "Bitcoin and stablecoin swap guides, Lightning and Arkade insights, product updates, and developer integrations from the Satora team.",
    url: "https://satora.io/blog",
    type: "website",
  },
  twitter: {
    creator: "@satora_io",
    site: "@satora_io",
    card: "summary_large_image",
    title: "Bitcoin Swaps, Stablecoins & Product Updates | Satora",
    description:
      "Bitcoin and stablecoin swap guides, Lightning and Arkade insights, product updates, and developer integrations from the Satora team.",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
