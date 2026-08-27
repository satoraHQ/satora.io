import LegalDocument, { legalMdxComponents } from "@/components/legal/LegalDocument";
import { legalSource } from "@/config/legal-source";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Lendasat Terms of Service",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const Content = legalSource.getPage(["terms"])!.data.body;

  return (
    <LegalDocument title="Terms of Service">
      <Content components={legalMdxComponents} />
    </LegalDocument>
  );
}
