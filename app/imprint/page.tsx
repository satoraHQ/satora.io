import LegalDocument from "@/components/legal/LegalDocument";
import { legalDocuments } from "@/content/legal-documents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Company information for Lendasat",
  alternates: { canonical: "/imprint" },
};

export default function ImprintPage() {
  return <LegalDocument title="Imprint" source={legalDocuments.imprint} />;
}
