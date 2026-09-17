"use client";

import { useEffect, useRef, useState } from "react";
import type { TocEntry } from "@/lib/rehype-toc";

// Rough visual width for a heading's collapsed "bar" — proportional to its
// text length so longer headings read as longer bars, clamped to a sane range.
function barWidth(text: string, depth: number) {
  const px = Math.min(48, Math.max(16, text.length * 1.4));
  return depth === 3 ? px * 0.75 : px;
}

// How far below the viewport's top edge a heading counts as "reached".
// Headings have scroll-mt-24 (96px), so a TOC click lands them at ~96px —
// but sub-pixel rounding can leave one at 96.4px, which a threshold of
// exactly 96 would reject, leaving the previous item highlighted. The
// extra slack makes a clicked heading reliably count as active.
const ACTIVE_LINE_PX = 128;

export function TableOfContents({ items }: { items: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const clickLockRef = useRef(false);

  // A clicked section is highlighted directly instead of inferred from scroll
  // position. Near the end of a post the page can't scroll far enough for that
  // heading to reach the active line, so the scrollspy alone would pick a
  // neighbour. The lock releases once scrolling settles (or after 1s).
  const onItemClick = (id: string) => {
    setActiveId(id);
    clickLockRef.current = true;
    let timer = window.setTimeout(release, 1000);
    function release() {
      clickLockRef.current = false;
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onSettle);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
    }
    function onSettle() {
      window.clearTimeout(timer);
      timer = window.setTimeout(release, 150);
    }
    window.addEventListener("scroll", onSettle, { passive: true });
    // Any manual scroll by the reader hands control back to the scrollspy.
    window.addEventListener("wheel", release, { passive: true, once: true });
    window.addEventListener("touchstart", release, { passive: true, once: true });
  };

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const lastId = elements[elements.length - 1]?.id ?? null;

    // An IntersectionObserver only fires as a heading crosses a fixed band,
    // which misses fast scrolls that jump straight past a short section —
    // the active highlight would just get stuck on whatever fired last.
    // Recomputing "the last heading whose top has passed the active line"
    // directly off actual positions on every scroll event is what a
    // scrollspy needs to be correct at any scroll speed. rAF-throttled so
    // it runs at most once per frame, not once per scroll event.
    const updateActive = () => {
      // At the very bottom of the page, the last heading's own top can
      // never reach the active line if there isn't enough room left to
      // scroll it there (nothing below it to keep scrolling through) — so
      // without this, the second-to-last heading could stay stuck "active"
      // forever once you've clearly scrolled past its section.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && lastId) {
        setActiveId(lastId);
        return;
      }

      let current: string | null = elements[0]?.id ?? null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= ACTIVE_LINE_PX) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      // While a TOC click is still scrolling, the clicked item stays active.
      if (clickLockRef.current) return;
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="group/toc text-[13px]">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500 opacity-0 transition-opacity duration-200 group-hover/toc:opacity-100">
        On this page
      </p>
      {/* One list, one <a> per item — the bar and the label are the exact
          same clickable element, not two separately-spaced lists that only
          look aligned. That's what caused clicking to feel offset: the bars
          used a tight fixed gap while the labels used a taller, wrap-aware
          gap, so past the first item the two were never actually at the
          same position — you'd hover the visible label but the real hit
          target (the bar list, underneath) had already drifted above it.
          Collapsed state stays compact via max-h + overflow-hidden on the
          link itself (clipping the label, not removing it), independent of
          how long the heading text is; hover lifts that cap to reveal it. */}
      <ul className="space-y-1.5">
        {items.map(({ id, text, depth }) => {
          const isActive = activeId === id;
          return (
            <li key={id} style={{ paddingLeft: depth === 3 ? "1rem" : 0 }}>
              <a
                href={`#${id}`}
                aria-label={text}
                onClick={() => onItemClick(id)}
                className={`relative block max-h-3 overflow-hidden leading-snug transition-[max-height] duration-200 group-hover/toc:max-h-24 ${
                  isActive ? "text-amber-400" : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center transition-opacity duration-200 group-hover/toc:opacity-0"
                >
                  {isActive && <span className="mr-1.5 h-2.5 w-px shrink-0 bg-amber-400" />}
                  <span
                    className={`h-px ${isActive ? "bg-zinc-200" : "bg-zinc-600"}`}
                    style={{ width: barWidth(text, depth) }}
                  />
                </span>
                <span className="opacity-0 transition-opacity duration-200 group-hover/toc:opacity-100">
                  {text}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
