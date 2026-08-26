import LegalDocument from "@/components/legal/LegalDocument";
import { legalDocuments } from "@/content/legal-documents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Lendasat",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return <LegalDocument title="Cookie Policy" source={legalDocuments.cookies} />;
}
