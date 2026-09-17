import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/projects-data";
import { blogListStyles as s } from "@/lib/styles";
import { tagColor } from "@/lib/tag-colors";

const DESCRIPTION =
  "Articles on frontend and design engineering: performance, accessibility, security, interaction and the small details that decide whether a product feels right. Alongside them, the engineering handbooks I write as I build the systems they describe.";

// The latest article gets a "New" badge while it's under 30 days old. /writing
// is statically generated, so "now" is build time: the badge clears on the
// first deploy after the window passes.
const NEW_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

function isRecent(iso: string) {
  return Date.now() - new Date(iso).getTime() < NEW_WINDOW_MS;
}

export const metadata: Metadata = {
  title: "Writing",
  description: DESCRIPTION,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Docs sites live in projects-data (they're also shown as projects), so this
// section stays in sync with them instead of keeping a second list.
const docs = projects.filter((p) => p.tags.includes("Documentation"));

export default function WritingPage() {
  const posts = getAllPosts();
  const latest = posts[0];
  const newSlug = latest && isRecent(latest.date) ? latest.slug : null;

  return (
    <div className={s.pageContainer}>
      <div className={s.innerContainer}>
        <div className={s.header}>
          <h1 className={s.pageTitle}>Writing</h1>
          <p className={s.pageSubtitle}>{DESCRIPTION}</p>
          <nav className={s.sectionNav} aria-label="Writing sections">
            <a href="#articles" className={s.sectionNavLink}>Articles</a>
            <a href="#docs" className={s.sectionNavLink}>Docs</a>
          </nav>
        </div>

        <section id="articles" className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Articles</h2>
            <a href="/writing/rss.xml" className={s.rssLink}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={s.rssIcon}>
                <path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16" strokeLinecap="round" />
                <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              RSS
            </a>
          </div>

          {posts.length === 0 ? (
            <div className={s.emptyState}>Nothing published yet. Check back soon.</div>
          ) : (
            <div className={s.postList}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/writing/${post.slug}`} className={s.postCard}>
                  <div className={s.postMetaRow}>
                    {post.slug === newSlug && (
                      <span className={s.newBadge}>
                        <span className={s.newBadgePing}>
                          <span className={s.newBadgePingRing} />
                          <span className={s.newBadgePingDot} />
                        </span>
                        New
                      </span>
                    )}
                    <time className={s.postDate} dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime}</span>
                    {post.tags?.map((tag) => (
                      <span key={tag} className={`${s.postTag} ${tagColor(tag)}`}>{tag}</span>
                    ))}
                  </div>
                  <h3 className={s.postTitle}>{post.title}</h3>
                  <p className={s.postDescription}>{post.description}</p>
                  <span className={s.postReadMore}>
                    Read article
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={s.postReadMoreIcon}>
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section id="docs" className={`${s.section} ${s.sectionSpacer}`}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Docs</h2>
            <span className={s.sectionCount}>{docs.length} handbooks</span>
          </div>
          <p className={s.sectionIntro}>
            Engineering handbooks written alongside the systems they describe: decision records, post-mortems and guides.
          </p>

          <div className={s.docsGrid}>
            {docs.map((doc) => (
              <article key={doc.slug} className={s.docCard}>
                <h3 className={s.docTitle}>{doc.title}</h3>
                <p className={s.docDescription}>{doc.description}</p>
                <div className={s.docTags}>
                  {doc.techStack.map((tech) => (
                    <span key={tech} className={s.docTag}>{tech}</span>
                  ))}
                </div>
                <div className={s.docLinks}>
                  {doc.links.visit && (
                    <a href={doc.links.visit} target="_blank" rel="noopener noreferrer" className={s.docPrimaryLink}>
                      Read the docs
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={s.docLinkIcon}>
                        <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                  <Link href={`/projects/${doc.slug}`} className={s.docSecondaryLink}>
                    About this project
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
