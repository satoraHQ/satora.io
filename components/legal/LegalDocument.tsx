import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const legacyLegalLinks: Record<string, string> = {
  "/faq/legal/lendasat/privacy": "/privacy",
  "/faq/legal/lendasat/terms": "/terms",
  "/faq/legal/lendasat/cookies": "/cookies",
  "/faq/legal/lendasat/impressum": "/imprint",
};

interface LegalDocumentProps {
  children: ReactNode;
  title: string;
}

function LegalLink({ href = "", ...props }: ComponentProps<"a">) {
  const destination = legacyLegalLinks[href] ?? href;

  if (destination.startsWith("http")) {
    return <a {...props} href={destination} target="_blank" rel="noopener noreferrer" />;
  }

  return <Link {...props} href={destination} />;
}

export const legalMdxComponents = {
  a: LegalLink,
};

export default function LegalDocument({ children, title }: LegalDocumentProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-black">
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-24 sm:px-8">
          <header className="mb-10 border-b border-gray-100 pb-8 dark:border-white/[0.06]">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-lime dark:text-lime-light">
              Lendasat Inc.
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-white md:text-4xl">
              {title}
            </h1>
          </header>

          <article className="legal-content prose prose-gray max-w-none dark:prose-invert
            prose-headings:tracking-tight prose-headings:text-gray-950 dark:prose-headings:text-white
            prose-h2:mt-12 prose-h2:text-xl prose-h2:font-semibold
            prose-h3:mt-9 prose-h3:text-lg prose-h3:font-semibold
            prose-h4:mt-8 prose-h4:text-base prose-h4:font-semibold
            prose-h5:mt-8 prose-h5:text-base prose-h5:font-semibold
            prose-p:text-[15px] prose-p:leading-7 prose-p:text-gray-600 dark:prose-p:text-gray-300
            prose-li:text-[15px] prose-li:leading-7 prose-li:text-gray-600 dark:prose-li:text-gray-300
            prose-a:text-lime prose-a:no-underline hover:prose-a:underline dark:prose-a:text-lime-light
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-code:rounded-md prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[13px] dark:prose-code:bg-white/[0.08]
            prose-hr:border-gray-100 dark:prose-hr:border-white/[0.08]">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
