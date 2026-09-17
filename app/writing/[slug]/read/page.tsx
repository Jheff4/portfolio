import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { PostPage } from "@/components/blog/PostPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}
export const dynamicParams = false;

// Same article as /writing/[slug], so it points search engines at that URL
// and stays out of the index itself.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function ReaderPage({ params }: Props) {
  const { slug } = await params;
  return <PostPage slug={slug} isReaderMode />;
}
