import LegalDocument, { legalMdxComponents } from "@/components/legal/LegalDocument";
import { legalSource } from "@/config/legal-source";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Lendasat",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  const Content = legalSource.getPage(["cookies"])!.data.body;

  return (
    <LegalDocument title="Cookie Policy">
      <Content components={legalMdxComponents} />
    </LegalDocument>
  );
}
