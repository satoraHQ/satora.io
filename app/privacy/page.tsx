import LegalDocument from "@/components/legal/LegalDocument";
import { legalDocuments } from "@/content/legal-documents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Lendasat",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalDocument title="Privacy Policy" source={legalDocuments.privacy} />;
}
