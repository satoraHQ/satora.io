import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { blogSource } from "@/config/blog-source";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const posts = blogSource.getPages().sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Page header */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
            Blog
          </h1>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 max-w-lg">
            News, guides, and updates from the Satora team.
          </p>
        </div>

        {/* All Posts */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.url}
                href={post.url}
                className="group block rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.02] hover:border-lime-light dark:hover:border-lime-light hover:ring-[0.5px] hover:ring-lime-light transition-all duration-200"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] border-b border-gray-100 dark:border-white/[0.04] overflow-hidden">
                  {post.data.titleImage
                    ? (
                      <Image
                        src={post.data.titleImage}
                        alt={post.data.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )
                    : <div className="absolute inset-0 bg-gray-50 dark:bg-white/[0.02]" />}
                </div>
                {/* Content */}
                <div className="p-4">
                  <span className="text-[11px] text-gray-400 dark:text-gray-500">
                    {new Date(post.data.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mt-1.5 mb-1 line-clamp-2 transition-colors leading-snug">
                    {post.data.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {post.data.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
