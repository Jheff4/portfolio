import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://www.etinosa.dev";

// Same content source as every other blog route (content/blog/*.mdx) and
// never varies per-request — no reason for this to be server-rendered on
// demand instead of prerendered once at build time like the rest of the blog.
export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Etinosa Ogbevoen — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes on frontend engineering, performance, and the systems behind the products I build.</description>
    <language>en-us</language>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
