import { ImageResponse } from "next/og";

// Route segment config — this file is the site's Open Graph image, served at
// /opengraph-image and auto-wired into <meta property="og:image"> by Next.
export const alt = "Etinosa Ogbevoen — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pull Geist Mono (the site font) as raw font data for the image renderer.
// Wrapped so a fetch hiccup falls back to the default font instead of failing.
async function loadGeistMono(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Geist+Mono:wght@${weight}`,
      )
    ).text();
    const url = css.match(/src:\s*url\((https:\/\/[^)]+)\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([
    loadGeistMono(400),
    loadGeistMono(700),
  ]);

  const fonts = [
    regular && { name: "Geist Mono", data: regular, weight: 400 as const, style: "normal" as const },
    bold && { name: "Geist Mono", data: bold, weight: 700 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[];

  const pill = (text: string) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        borderRadius: 999,
        border: "1px solid #27272a",
        backgroundColor: "#18181b",
        color: "#d4d4d8",
        fontSize: 24,
      }}
    >
      {text}
    </div>
  );

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
        {/* Top — mark + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              borderRadius: 18,
              backgroundColor: "#1c1917",
              border: "1px solid #3f3f46",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            EO
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>Etinosa Ogbevoen</div>
            <div style={{ fontSize: 22, color: "#FFB800" }}>Frontend Engineer</div>
          </div>
        </div>

        {/* Middle — headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-2px",
            }}
          >
            Interfaces where mistakes cost money.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: 940,
            }}
          >
            Frontend engineer building wallets, exchanges, and AI products at
            scale.
          </div>
        </div>

        {/* Bottom — stats + handle */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {pill("1.47M+ users")}
          {pill("50M+ transactions")}
          {pill("5+ years")}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              color: "#FFB800",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            @_Etinosa_
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
