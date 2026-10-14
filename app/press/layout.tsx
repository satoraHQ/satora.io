import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Press Kit & Media Resources",
  description:
    "Official media resources, brand assets, and company information for Satora. Download logos, brand colors, and boilerplate text for press coverage.",
  alternates: { canonical: "https://satora.io/press" },
  openGraph: {
    title: "Press Kit & Media Resources | Satora",
    description: "Official media resources, brand assets, and company information for Satora.",
    url: "https://satora.io/press",
    type: "website",
  },
  twitter: {
    creator: "@satora_io",
    site: "@satora_io",
    card: "summary_large_image",
    title: "Press Kit & Media Resources | Satora",
    description: "Official media resources, brand assets, and company information for Satora.",
  },
};

export default function PressLayout({ children }: { children: ReactNode }) {
  return children;
}
