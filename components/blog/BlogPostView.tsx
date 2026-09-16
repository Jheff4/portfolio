"use client";

import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TableOfContents } from "./TableOfContents";
import { ReaderControls } from "./ReaderControls";
import type { TocEntry } from "@/lib/rehype-toc";
import { blogPostStyles as s } from "@/lib/styles";

interface PostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  readingTime: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

interface ViewProps {
  post: PostSummary;
  toc: TocEntry[];
  children: ReactNode; // the compiled MDX content, rendered server-side
  isReaderMode: boolean;
}

function PostView({ post, toc, children, isReaderMode }: ViewProps) {
  if (isReaderMode) {
    // No back link, no tags, no TOC — just the title, the content, and the
    // floating controls to get back out / change the font. (AppShell is what
    // actually removes the sidebar/footer chrome; this is the in-page half
    // of the same feature.)
    return (
      <div className={s.readerContainer}>
        <div className={s.readerControlsBar}>
          <ReaderControls slug={post.slug} isReaderMode />
        </div>
        <div className={s.readerInner}>
          <h1 className={s.postTitle}>{post.title}</h1>
          <div className={s.metaRow}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>
          <article className={`${s.article} blog-article`}>{children}</article>
        </div>
      </div>
    );
  }

  return (
    <div className={s.pageContainer}>
      <div className={s.innerContainer}>
        <div className={s.topRow}>
          <Link href="/blog" className={s.backButton}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={s.backIcon}>
              <path d="M19 12H5m0 0l7 7m-7-7l7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blog
          </Link>
          <ReaderControls slug={post.slug} isReaderMode={false} />
        </div>

        <header className={s.header}>
          <h1 className={s.postTitle}>{post.title}</h1>
          <p className={s.postDescription}>{post.description}</p>
          <div className={s.metaRow}>
            <time className={s.metaDate} dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className={s.tagsContainer}>
              {post.tags.map((tag) => (
                <span key={tag} className={s.tag}>{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div className={s.gridContainer}>
          <article className={`${s.article} blog-article`}>{children}</article>
          <aside className={s.sidebar}>
            <div className={s.sidebarSticky}>
              <TableOfContents items={toc} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ReaderAware(props: Omit<ViewProps, "isReaderMode">) {
  const searchParams = useSearchParams();
  return <PostView {...props} isReaderMode={searchParams.get("reader") === "1"} />;
}

// The page itself (app/blog/[slug]/page.tsx) stays a plain static Server
// Component — it never touches searchParams, so generateStaticParams still
// prerenders every post at build time. Only this one small client leaf reads
// the URL, and it's wrapped in its own Suspense boundary (fallback: normal
// view) so that dynamic requirement doesn't leak out and de-opt the whole
// route the way it would if the page component read searchParams directly.
export function BlogPostView(props: Omit<ViewProps, "isReaderMode">) {
  return (
    <Suspense fallback={<PostView {...props} isReaderMode={false} />}>
      <ReaderAware {...props} />
    </Suspense>
  );
}
