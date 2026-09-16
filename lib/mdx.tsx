import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { rehypeExtractToc, type TocEntry } from "./rehype-toc";
import { remarkMermaid } from "./remark-mermaid";
import { MdxImage } from "@/components/blog/MdxImage";
import { Pre } from "@/components/blog/CodeBlock";
import { Mermaid } from "@/components/blog/Mermaid";

const prettyCodeOptions = {
  theme: "github-dark",
  keepBackground: false,
  defaultLang: "text",
};

// rehype-pretty-code marks the <code> it produces with data-language; that's
// how this tells "inline `code`" apart from a highlighted block's <code>,
// which already carries its own theme colors and shouldn't get the inline
// pill styling on top.
function Code(props: ComponentPropsWithoutRef<"code"> & { "data-language"?: string }) {
  if (props["data-language"]) {
    return <code {...props} />;
  }
  return (
    <code
      {...props}
      className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[0.85em] text-amber-300"
    />
  );
}

function AnchorOrLink({
  className,
  href,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  // rehype-autolink-headings tags its injected "#" links with this class so
  // they can be styled distinctly from ordinary body-text links.
  if (className?.includes("heading-anchor")) {
    return (
      <a
        href={href}
        className="ml-2 text-zinc-600 no-underline opacity-0 transition-opacity group-hover:opacity-100 hover:text-amber-400"
        {...props}
      />
    );
  }
  const linkClass =
    "text-amber-400 underline decoration-amber-400/30 underline-offset-4 hover:decoration-amber-400";
  const isInternal = href?.startsWith("/") || href?.startsWith("#");
  return isInternal ? (
    <Link href={href ?? "#"} className={linkClass} {...props} />
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} {...props} />
  );
}

// Typography lives entirely here, as plain element overrides — no
// @tailwindcss/typography `prose` classes, so every tag is styled to match
// the rest of the site (Geist Mono, zinc/amber palette) instead of a generic
// reset.
function mdxComponents(): MDXComponents {
  return {
    h2: (props) => (
      <h2
        {...props}
        className="group mt-14 scroll-mt-24 break-words text-2xl font-bold text-zinc-100"
      />
    ),
    h3: (props) => (
      <h3
        {...props}
        className="group mt-10 scroll-mt-24 break-words text-xl font-bold text-zinc-100"
      />
    ),
    p: (props) => (
      <p {...props} className="mt-6 break-words text-[1.05rem] leading-8 text-zinc-300" />
    ),
    a: AnchorOrLink,
    ul: (props) => (
      <ul {...props} className="mt-6 list-disc space-y-3 pl-6 text-[1.05rem] leading-8 text-zinc-300" />
    ),
    ol: (props) => (
      <ol {...props} className="mt-6 list-decimal space-y-3 pl-6 text-[1.05rem] leading-8 text-zinc-300" />
    ),
    li: (props) => <li {...props} className="break-words pl-1" />,
    blockquote: (props) => (
      <blockquote
        {...props}
        className="mt-6 break-words border-l-2 border-amber-500/40 pl-5 italic text-zinc-400"
      />
    ),
    hr: (props) => <hr {...props} className="my-12 border-zinc-800" />,
    strong: (props) => <strong {...props} className="font-semibold text-zinc-100" />,
    code: Code,
    pre: Pre,
    img: MdxImage,
    Mermaid,
    table: (props) => (
      <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-800">
        <table {...props} className="w-full border-collapse text-sm" />
      </div>
    ),
    thead: (props) => (
      <thead {...props} className="border-b border-zinc-700 bg-zinc-900/60 text-left text-zinc-300" />
    ),
    th: (props) => <th {...props} className="px-4 py-3 font-semibold" />,
    td: (props) => <td {...props} className="border-b border-zinc-800 px-4 py-3 text-zinc-400" />,
  };
}

export async function compilePost(content: string) {
  const toc: TocEntry[] = [];

  const { content: rendered } = await compileMDX({
    source: content,
    components: mdxComponents(),
    options: {
      mdxOptions: {
        // remarkMermaid must run before rehypePrettyCode: it rewrites
        // ```mermaid fences into a <Mermaid> element so Shiki never sees
        // "mermaid" as a language it doesn't have a grammar for.
        remarkPlugins: [remarkGfm, remarkMermaid],
        // Order matters: slug assigns ids first, then the TOC is extracted
        // from the clean heading text before autolink-headings appends its
        // "#" anchor into the heading (which would otherwise leak into the
        // TOC's text).
        rehypePlugins: [
          rehypeSlug,
          [rehypeExtractToc, toc],
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: { className: ["heading-anchor"], ariaLabel: "Link to this section" },
              content: [{ type: "text", value: " #" }],
            },
          ],
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });

  return { content: rendered, toc };
}
