// Home page is a Server Component — no "use client" needed here.
// The interactive Cover component is a leaf-level client component,
// so its JS cost is isolated. The rest of this page ships as static HTML.

import type { CSSProperties } from "react";
import Link from "next/link";
import { Cover } from "@/components/ui/cover";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { Spotlight } from "@/components/ui/spotlight";
import { homePageStyles as s } from "@/lib/styles";
import { cn } from "@/lib/utils";

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
      <Spotlight
        className="-top-40 -z-10 left-0 md:-top-20 md:left-60"
        fill="#0FFF50"
      />

      <div
        className={cn(s.backgroundGrid.wrapper, s.backgroundGrid.pattern)}
        aria-hidden
      />

      <div className={s.gradientOverlay} aria-hidden />

      <section className={s.heroSection}>
        <div className="relative">
          <h1 className={s.h1}>
            Hey, I&apos;m <Cover className="font-mono text-white">Etinosa</Cover>
          </h1>

          <h2 className={s.h2}>
            Frontend{" "}
            <span className={s.spanWithMargin}>
              <PointerHighlight>Engineer</PointerHighlight>
            </span>
          </h2>
        </div>

        <div className="mb-6">
          <div className={s.calloutCard.wrapper}>
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
        </div>

        {/* ── Bio paragraph ─────────────────────────────────────── */}
        <p className={s.paragraph}>
          I build interfaces where mistakes cost money — crypto wallets (one
          trusted by 80,000+ people), exchanges, and AI products. I sweat the
          details most people never notice: every stroke, every indent, a
          half-degree tilt that&apos;s off — the things I can&apos;t unsee. And
          under the polish, the part I care about most: keeping a product fast,
          correct, and resilient when the network fails underneath it.
        </p>

        <div className="mb-10">
          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
          >
            More about me
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

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
              The engineering behind the interface
            </h3>
            <p className={s.article.description}>
              From a Web3 exchange and wallets to production-grade fintech and AI
              systems — the products I&apos;ve built and the decisions behind
              them.
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
      </section>
    </div>
  );
}
