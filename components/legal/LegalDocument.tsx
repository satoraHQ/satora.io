import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";
import type { ReactNode } from "react";

const legacyLegalLinks: Record<string, string> = {
  "/faq/legal/lendasat/privacy": "/privacy",
  "/faq/legal/lendasat/terms": "/terms",
  "/faq/legal/lendasat/cookies": "/cookies",
  "/faq/legal/lendasat/impressum": "/imprint",
};

interface LegalDocumentProps {
  source: string;
  title: string;
}

interface MarkdownBlock {
  content?: string;
  items?: string[];
  level?: number;
  type: "heading" | "paragraph" | "list" | "rule";
}

function parseMarkdown(source: string): MarkdownBlock[] {
  const content = source.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
  const lines = content.split("\n");
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", content: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length > 0) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };

  for (const line of lines) {
    const heading = line.match(/^(#{2,6})\s+(.+)$/);
    const listItem = line.match(/^[-*]\s+(.+)$/);

    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: heading[1].length,
        content: heading[2],
      });
    } else if (listItem) {
      flushParagraph();
      list.push(listItem[1]);
    } else if (line.trim() === "---") {
      flushParagraph();
      flushList();
      blocks.push({ type: "rule" });
    } else if (line.trim() === "") {
      flushParagraph();
      flushList();
    } else {
      flushList();
      paragraph.push(line.trim());
    }
  }

  flushParagraph();
  flushList();
  return blocks;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const token = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|_[^_]+_)/;
  const parts: ReactNode[] = [];
  let remaining = text;
  let index = 0;

  while (remaining.length > 0) {
    const match = remaining.match(token);

    if (!match || match.index === undefined) {
      parts.push(remaining);
      break;
    }

    if (match.index > 0) parts.push(remaining.slice(0, match.index));

    const value = match[0];
    const key = `${keyPrefix}-${index}`;

    if (value.startsWith("[")) {
      const link = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const destination = legacyLegalLinks[link[2]] ?? link[2];
        const isExternal = destination.startsWith("http");
        parts.push(
          isExternal
            ? (
              <a key={key} href={destination} target="_blank" rel="noopener noreferrer">
                {link[1]}
              </a>
            )
            : <Link key={key} href={destination}>{link[1]}</Link>,
        );
      }
    } else if (value.startsWith("**")) {
      parts.push(<strong key={key}>{renderInline(value.slice(2, -2), key)}</strong>);
    } else if (value.startsWith("`")) {
      parts.push(<code key={key}>{value.slice(1, -1)}</code>);
    } else {
      parts.push(<em key={key}>{renderInline(value.slice(1, -1), key)}</em>);
    }

    remaining = remaining.slice(match.index + value.length);
    index += 1;
  }

  return parts;
}

function LegalMarkdown({ source }: { source: string }) {
  const blocks = parseMarkdown(source);

  return blocks.map((block, index) => {
    const key = `legal-block-${index}`;

    if (block.type === "heading") {
      const content = renderInline(block.content ?? "", key);
      if (block.level === 2) return <h2 key={key}>{content}</h2>;
      if (block.level === 3) return <h3 key={key}>{content}</h3>;
      return <h4 key={key}>{content}</h4>;
    }

    if (block.type === "list") {
      return (
        <ul key={key}>
          {block.items?.map((item, itemIndex) => (
            <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>
          ))}
        </ul>
      );
    }

    if (block.type === "rule") return <hr key={key} />;
    return <p key={key}>{renderInline(block.content ?? "", key)}</p>;
  });
}

export default function LegalDocument({ source, title }: LegalDocumentProps) {
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
            <LegalMarkdown source={source} />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
