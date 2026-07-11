// Home page is a Server Component — no "use client" needed here.
// The interactive Cover component is a leaf-level client component,
// so its JS cost is isolated. The rest of this page ships as static HTML.

import type { CSSProperties } from "react";
import Link from "next/link";
import { Cover } from "@/components/ui/cover";
import { Spotlight } from "@/components/ui/spotlight";
import { homePageStyles as s } from "@/lib/styles";

export default function HomePage() {
  // Inline style object for the video — prevents accidental interaction.
  // typed as CSSProperties to avoid TS errors on vendor-prefixed keys.
  const videoStyles: CSSProperties = {
    WebkitUserSelect: "none",
    userSelect: "none",
    pointerEvents: "none",
  };

  return (
    <div className={s.container}>
      {/*
        Spotlight: pure SVG + CSS animation (animate-spotlight from globals.css).
        No JS required — it runs entirely in CSS after the initial HTML paint.
        Position is fixed via the spotlightStyles position class.
      */}
      {/*
        fill="green" matches the live site — the entire page has a green ambient glow.
        The spotlight is a large blurred SVG ellipse; changing fill to green
        shifts the whole hero from neutral to the distinctive green-tinted look.
      */}
      <Spotlight
        className="-top-40 -z-10 left-0 md:-top-20 md:left-60"
        fill="green"
      />

      {/*
        Background grid: built entirely with CSS background-image gradients.
        No JS, no canvas, no SVG — just two overlapping 1px lines per 40px cell.
        pointer-events-none and -z-20 ensure it never blocks interaction.
      */}
      <div
        className={`${s.backgroundGrid.wrapper} ${s.backgroundGrid.pattern}`}
        aria-hidden
      />

      {/* Gradient fade at top and bottom to blend grid into background */}
      <div className={s.gradientOverlay} aria-hidden />

      <div className={s.heroSection}>
        {/* ── Headline ──────────────────────────────────────────── */}
        {/*
          font-mono forces Geist Mono — matching the screenshot exactly.
          The dark box around "Etinosa" is bg-neutral-900 on the Cover component.
          Cover is "use client" but it's a leaf — only its small bundle ships.
        */}
        <h1 className={s.h1}>
          Hey, I&apos;m <Cover className="font-mono text-white">Etinosa</Cover>
        </h1>

        {/*
          h2 sits on its own line with the Cover box around the last word.
          The green cursor/pointer triangle in the screenshot is the
          animated beam SVG inside Cover on hover.
        */}
        <h2 className={s.h2}>
          Frontend{" "}
          <span className={s.spanWithMargin}>
            <Cover className="font-mono text-white">Engineer</Cover>
          </span>
        </h2>

        {/* ── Callout card ──────────────────────────────────────── */}
        {/*
          Semi-transparent pill card with backdrop-blur.
          bg-white/5 + border-white/20 gives the frosted glass look from the screenshot.
          hover states are pure CSS transitions — no JS.
        */}
        <div className={`${s.calloutCard.wrapper} mb-8`}>
          <div className={s.calloutCard.innerContainer}>
            <div className={s.calloutCard.textContainer}>
              <svg
                className={s.calloutCard.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden
              >
                <path d="M3 16l9-9 9 9" strokeWidth="1.2" />
              </svg>
              <span className={s.calloutCard.text}>Connect with me on X</span>
            </div>
            <a
              href="https://x.com/_Etinosa_"
              target="_blank"
              rel="noopener noreferrer"
              className={s.calloutCard.button}
            >
              Follow
            </a>
          </div>
        </div>

        {/* ── Bio paragraph ─────────────────────────────────────── */}
        <p className={s.paragraph}>
          I craft fast, accessible, and visually sharp interfaces — frontend
          engineer with a sharp eye for detail and a bias for shipping. I care
          deeply about performance, animation quality, and the gap between a
          good UI and a great one.
        </p>

        {/* ── Featured video card ───────────────────────────────── */}
        {/*
          Decision: <video> not next/image for the .webm file.
          next/image only handles raster images. For video, use a plain <video>
          tag with autoPlay + muted + loop + playsInline.
          - autoPlay: starts immediately (portfolio context, not an article)
          - muted: required by browsers to allow autoPlay without user gesture
          - playsInline: prevents iOS from going full-screen automatically
          - preload="metadata": fetches just the first frame + duration on load,
            not the whole file — important for page weight
        */}
        <article className={s.article.wrapper}>
          <div className={s.article.videoContainer}>
            <video
              className={s.article.video}
              style={videoStyles}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/homevideo.webm" type="video/webm" />
            </video>
          </div>
          <div className={s.article.content}>
            <div className={s.article.header}>
              <svg
                className={s.article.headerIcon}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>FEATURED WORK</span>
            </div>
            <h3 className={s.article.title}>
              My 2025: shipping, signal, and a few uncomfortable rules
            </h3>
            <p className={s.article.description}>
              A candid review of 2025 into 2026. The video above showcases some
              of the key projects and moments from my journey.
            </p>
            <div className={s.article.linkContainer}>
              <Link href="/projects" className={s.article.link}>
                See My Projects
                <svg
                  className={s.article.linkIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
