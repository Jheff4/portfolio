import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { compilePost } from "@/lib/mdx";
import { BlogPostView } from "@/components/blog/BlogPostView";

const SITE_URL = "https://www.etinosa.dev";

// Shared by /writing/[slug] and /writing/[slug]/read. Reader mode is its own
// static route rather than a ?reader=1 query: reading searchParams made every
// post render on demand (compiling MDX per request), which made opening a post
// and toggling reader mode noticeably slow. Two prerendered pages are instant.
export async function PostPage({ slug, isReaderMode }: { slug: string; isReaderMode: boolean }) {

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
