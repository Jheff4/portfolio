import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { compilePost } from "@/lib/mdx";
import { BlogPostView } from "@/components/blog/BlogPostView";

interface Props {
  params: Promise<{ slug: string }>;
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

// No searchParams here — reader mode is handled entirely inside
// BlogPostView (a client component), so this page stays a plain static
// Server Component and every post is prerendered at build time.
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content, toc } = await compilePost(post.content);

  return (
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
    >
      {content}
    </BlogPostView>
  );
}
