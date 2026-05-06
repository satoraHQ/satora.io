import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { blogSource } from "@/config/blog-source";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

const getPage = cache((slug: string) => blogSource.getPage([slug]));

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.body;
  const { title, subtitle, date, author, tags, excerpt, titleImage } = page.data;

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: subtitle || excerpt || "",
    image: "https://satora.io/favicon/dot.svg",
    datePublished: new Date(date).toISOString(),
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: "Satora",
      logo: {
        "@type": "ImageObject",
        url: "https://satora.io/favicon/dot.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://satora.io/blog/${params.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-20 pb-16">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white mb-10 transition-colors"
          >
            <span>&larr;</span> Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-lime/10 dark:bg-lime-light/10 text-lime dark:text-lime-light uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight mb-3">
              {title}
            </h1>

            {subtitle && (
              <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                {subtitle}
              </p>
            )}

            <div className="text-[12px] text-gray-400 dark:text-gray-500">
              {author} &middot; {new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>

            {titleImage && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mt-6 border border-gray-100 dark:border-white/[0.06]">
                <Image
                  src={titleImage}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* MDX Content */}
          <article className="prose prose-gray dark:prose-invert max-w-none
            prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:no-underline prose-headings:tracking-tight
            prose-h1:text-xl prose-h1:font-semibold prose-h1:mb-4 prose-h1:mt-10
            prose-h2:text-lg prose-h2:font-semibold prose-h2:mb-3 prose-h2:mt-8
            prose-h3:text-base prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-6
            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-[15px]
            prose-a:text-lime dark:prose-a:text-lime-light prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1.5 prose-ul:my-4
            prose-ol:list-decimal prose-ol:pl-5 prose-ol:space-y-1.5 prose-ol:my-4
            prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-li:text-[15px]
            prose-table:w-full prose-table:border-collapse prose-table:rounded-xl prose-table:overflow-hidden
            prose-th:bg-gray-50 dark:prose-th:bg-white/[0.03] prose-th:border prose-th:border-gray-100 dark:prose-th:border-white/[0.06] prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-medium prose-th:text-gray-900 dark:prose-th:text-white prose-th:text-sm
            prose-td:border prose-td:border-gray-100 dark:prose-td:border-white/[0.06] prose-td:px-4 prose-td:py-2 prose-td:text-sm
            prose-code:bg-gray-50 dark:prose-code:bg-white/[0.04] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[13px]
            prose-img:rounded-2xl prose-img:border prose-img:border-gray-100 dark:prose-img:border-white/[0.06]">
            <MDX components={defaultMdxComponents} />
          </article>

          {/* Footer — prev/next navigation */}
          <footer className="mt-16 pt-6 border-t border-gray-100 dark:border-white/[0.06]">
            {(() => {
              const allPosts = blogSource
                .getPages()
                .sort(
                  (a, b) =>
                    new Date(b.data.date).getTime()
                    - new Date(a.data.date).getTime(),
                );
              const currentIndex = allPosts.findIndex(
                (p) => p.slugs[0] === params.slug,
              );
              const prevPost = currentIndex < allPosts.length - 1
                ? allPosts[currentIndex + 1]
                : null;
              const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
              return (
                <div className="flex items-center justify-between">
                  {prevPost
                    ? (
                      <Link
                        href={prevPost.url}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <span>&larr;</span> {prevPost.data.title}
                      </Link>
                    )
                    : <span />}
                  {nextPost
                    ? (
                      <Link
                        href={nextPost.url}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors text-right"
                      >
                        {nextPost.data.title} <span>&rarr;</span>
                      </Link>
                    )
                    : <span />}
                </div>
              );
            })()}
          </footer>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return blogSource.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = getPage(params.slug);
  if (!page) notFound();

  const { title, subtitle, excerpt, titleImage, author } = page.data;
  const description = subtitle || excerpt;
  const ogImage = titleImage || "https://satora.io/favicon/dot.svg";

  return {
    title,
    description,
    authors: [{ name: author }],
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
