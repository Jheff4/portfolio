import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { compilePost } from "@/lib/mdx";
import { BlogPostView } from "@/components/blog/BlogPostView";

const SITE_URL = "https://www.etinosa.dev";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ reader?: string }>;
}

// Static params + dynamicParams=false: only posts that exist in
// content/blog/ at build time are valid routes — anything else 404s
// instead of trying (and failing) to read a file that isn't there.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

// Reading searchParams here (instead of via a client-side useSearchParams +
// Suspense workaround, which is what this used to do to keep the route
// static) opts this route out of static generation — but that workaround
// was also what caused real, reliability-breaking duplication in dev mode
// (duplicate ids that made anchor-click navigation land in the wrong
// place). Correctness beats an SSG optimization for a feature people
// actually click through, so this trades the optimization back.
export default async function BlogPostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { reader } = await searchParams;
  const isReaderMode = reader === "1";

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content, toc } = await compilePost(post.content);

  // Structured data for search engines — this is what lets Google understand
  // "this is a blog article, published on this date, by this author" well
  // enough to show richer results, rather than treating it as generic text.
  // Server-rendered directly (not inside BlogPostView, which is a client
  // component) so it's present in the initial HTML crawlers see.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${SITE_URL}/writing/${post.slug}`,
    image: `${SITE_URL}/writing/${post.slug}/opengraph-image`,
    keywords: post.tags?.join(", "),
    author: {
      "@type": "Person",
      name: "Etinosa Ogbevoen",
      url: SITE_URL,
    },
  };

  return (
    <>
      {/* Static, server-generated JSON — not user input, so dangerouslySetInnerHTML is safe here. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostView
        post={{
          slug: post.slug,
          title: post.title,
          description: post.description,
          date: post.date,
          tags: post.tags,
          readingTime: post.readingTime,
        }}
        toc={toc}
        isReaderMode={isReaderMode}
      >
        {content}
      </BlogPostView>
    </>
  );
}
