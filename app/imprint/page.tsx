import LegalDocument, { legalMdxComponents } from "@/components/legal/LegalDocument";
import { legalSource } from "@/config/legal-source";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Company information for Lendasat",
  alternates: { canonical: "/imprint" },
};

export default function ImprintPage() {
  const Content = legalSource.getPage(["impressum"])!.data.body;

  return (
    <LegalDocument title="Imprint">
      <Content components={legalMdxComponents} />
    </LegalDocument>
  );
}
