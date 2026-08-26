import LegalDocument from "@/components/legal/LegalDocument";
import { legalDocuments } from "@/content/legal-documents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Lendasat Terms of Service",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalDocument title="Terms of Service" source={legalDocuments.terms} />;
}
