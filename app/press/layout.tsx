import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Press Kit | Bitcoin Lending Platform",
  description:
    "Official media resources, brand assets, and company information for Satora. Download logos, brand colors, and boilerplate text for press coverage.",
  openGraph: {
    title: "Press Kit | Satora - Bitcoin Lending Platform",
    description: "Official media resources, brand assets, and company information for Satora.",
    url: "https://satora.io/press",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Kit | Satora - Bitcoin Lending Platform",
    description: "Official media resources, brand assets, and company information for Satora.",
  },
};

export default function PressLayout({ children }: { children: ReactNode }) {
  return children;
}
