import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "./frontmatter";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string; // ISO date string, e.g. "2026-09-10"
  tags?: string[];
  draft?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

// ~200 wpm is the usual estimate for technical writing.
function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function readPostFile(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter<PostFrontmatter>(raw);

  if (!data.title || !data.date) {
    throw new Error(`Post "${slug}" is missing required frontmatter (title, date).`);
  }

  return {
    slug,
    ...data,
    readingTime: estimateReadingTime(content),
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

// Draft posts are excluded outside development, so a post-in-progress in the
// repo never accidentally goes live before it's ready.
function isVisible(post: PostMeta): boolean {
  return !post.draft || process.env.NODE_ENV === "development";
}

function toMeta(post: Post): PostMeta {
  const { slug, title, description, date, tags, draft, readingTime } = post;
  return { slug, title, description, date, tags, draft, readingTime };
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => readPostFile(slug))
    .filter(isVisible)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(toMeta);
}

export function getPostBySlug(slug: string): Post | null {
  if (!getAllSlugs().includes(slug)) return null;
  const post = readPostFile(slug);
  return isVisible(post) ? post : null;
}
