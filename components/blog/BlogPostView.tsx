import type { ReactNode } from "react";
import Link from "next/link";
import { TableOfContents } from "./TableOfContents";
import { ReaderControls } from "./ReaderControls";
import { PostDiscussion } from "./PostDiscussion";
import type { TocEntry } from "@/lib/rehype-toc";
import { blogPostStyles as s } from "@/lib/styles";
import { tagColor } from "@/lib/tag-colors";

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

// isReaderMode comes from the route: /writing/[slug] renders the normal view,
// /writing/[slug]/read the reader view. Both are prerendered at build time.
export function BlogPostView({ post, toc, children, isReaderMode }: ViewProps) {
  if (isReaderMode) {
    // No back link, no tags — just the title, the content, the TOC (on the
    // left here), and the floating controls to get back out / change the
    // font. (AppShell is what actually removes the sidebar/footer chrome;
    // this is the in-page half of the same feature.)
    return (
      <div className={`${s.readerContainer} blog-post`}>
        {/* Hides the site sidebar/footer (tagged in AppShell) only while this
            view is mounted — server-rendered, so no flash of chrome. */}
        <style>{`[data-app-chrome]{display:none!important}[data-app-column]{border-left:0!important}`}</style>
        <div className={s.readerControlsBar}>
          <ReaderControls slug={post.slug} isReaderMode />
        </div>
        <div className={s.readerRow}>
          <aside className={s.readerSidebar}>
            <div className={s.readerSidebarSticky}>
              <TableOfContents items={toc} />
            </div>
          </aside>
          <div className={s.readerInner}>
            <h1 className={s.postTitle}>{post.title}</h1>
            <div className={s.metaRow}>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
            <article className={`${s.article} blog-article`}>{children}</article>
            <PostDiscussion title={post.title} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${s.pageContainer} blog-post`}>
      <div className={s.innerContainer}>
        <div className={s.topRow}>
          <Link href="/writing" className={s.backButton}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={s.backIcon}>
              <path d="M19 12H5m0 0l7 7m-7-7l7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Writing
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
                <span key={tag} className={`${s.tag} ${tagColor(tag)}`}>{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div className={s.gridContainer}>
          <div className="min-w-0">
              <article className={`${s.article} blog-article`}>{children}</article>
              <PostDiscussion title={post.title} />
            </div>
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
