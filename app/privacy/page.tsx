import LegalDocument, { legalMdxComponents } from "@/components/legal/LegalDocument";
import { legalSource } from "@/config/legal-source";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Lendasat",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const Content = legalSource.getPage(["privacy"])!.data.body;

  return (
    <LegalDocument title="Privacy Policy">
      <Content components={legalMdxComponents} />
    </LegalDocument>
  );
}
