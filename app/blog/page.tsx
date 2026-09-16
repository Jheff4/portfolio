import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { blogListStyles as s } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on frontend engineering, performance, and the systems behind the products I build.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className={s.pageContainer}>
      <div className={s.innerContainer}>
        <div className={s.header}>
          <h1 className={s.pageTitle}>Blog</h1>
          <p className={s.pageSubtitle}>
            Notes on frontend engineering, performance, and the systems behind the products I build.
          </p>
          <a href="/blog/rss.xml" className={`${s.rssLink} mt-4`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={s.rssIcon}>
              <path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16" strokeLinecap="round" />
              <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            RSS feed
          </a>
        </div>

        {posts.length === 0 ? (
          <div className={s.emptyState}>Nothing published yet — check back soon.</div>
        ) : (
          <div className={s.postList}>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={s.postCard}>
                <div className={s.postMetaRow}>
                  <time className={s.postDate} dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime}</span>
                  {post.tags?.map((tag) => (
                    <span key={tag} className={s.postTag}>{tag}</span>
                  ))}
                </div>
                <h2 className={s.postTitle}>{post.title}</h2>
                <p className={s.postDescription}>{post.description}</p>
                <span className={s.postReadMore}>
                  Read post
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={s.postReadMoreIcon}>
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
