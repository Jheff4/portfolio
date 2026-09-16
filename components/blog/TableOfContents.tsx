"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/rehype-toc";

export function TableOfContents({ items }: { items: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // A heading is "active" once it crosses a line near the top of the
        // viewport — the same idea as scrollspy, done with IntersectionObserver
        // instead of a scroll listener so it doesn't run on every scroll tick.
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        On this page
      </p>
      <ul className="space-y-2 border-l border-zinc-800">
        {items.map(({ id, text, depth }) => (
          <li key={id} style={{ paddingLeft: depth === 3 ? "1.75rem" : "1rem" }}>
            <a
              href={`#${id}`}
              className={`-ml-px block border-l-2 py-0.5 pl-3 transition-colors ${
                activeId === id
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
