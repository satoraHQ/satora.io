import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AsSeenIn from "@/components/sections/AsSeenIn";
import RetailHero from "@/components/sections/RetailHero";
import RetailHome from "@/components/sections/RetailHome";
import StructuredData from "@/components/StructuredData";
import { websiteSchema } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swap Bitcoin and Stablecoins",
  description:
    "Swap Bitcoin and stablecoins without sending your funds to an exchange. Move from your wallet to your chosen destination with Satora.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Swap Bitcoin and Stablecoins | Satora",
    description: "Swap Bitcoin and stablecoins without sending your funds to an exchange.",
    url: "/",
  },
  twitter: {
    creator: "@satora_io",
    site: "@satora_io",
    title: "Swap Bitcoin and Stablecoins | Satora",
    description: "Swap Bitcoin and stablecoins without sending your funds to an exchange.",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData data={websiteSchema} />
      <Header />

      <main>
        <RetailHero />
        <AsSeenIn />
        <RetailHome />
      </main>
      <Footer />
    </>
  );
}
