import { ImageResponse } from "next/og";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Same visual language as the site-wide app/opengraph-image.tsx (dark bg,
// amber accent, Geist Mono) but built around a post's own title/tags instead
// of the homepage headline.
async function loadGeistMono(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Geist+Mono:wght@${weight}`)
    ).text();
    const url = css.match(/src:\s*url\((https:\/\/[^)]+)\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const [regular, bold] = await Promise.all([loadGeistMono(400), loadGeistMono(700)]);
  const fonts = [
    regular && { name: "Geist Mono", data: regular, weight: 400 as const, style: "normal" as const },
    bold && { name: "Geist Mono", data: bold, weight: 700 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(1000px circle at 15% 0%, rgba(255,184,0,0.16), rgba(255,184,0,0) 45%)",
          color: "#fafafa",
          padding: 72,
          fontFamily: fonts.length ? "Geist Mono" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#1c1917",
              border: "1px solid #3f3f46",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            EO
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#a1a1aa" }}>etinosa.dev/blog</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: post && post.title.length > 40 ? 52 : 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              maxWidth: 1000,
            }}
          >
            {post?.title ?? "Post not found"}
          </div>
          {post && (
            <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa", maxWidth: 940 }}>
              {post.description}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {post?.tags?.slice(0, 3).map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid #27272a",
                backgroundColor: "#18181b",
                color: "#d4d4d8",
                fontSize: 20,
              }}
            >
              {tag}
            </div>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", color: "#FFB800", fontSize: 22, fontWeight: 700 }}>
            @_Etinosa_
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
