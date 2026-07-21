import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import Footer from "@/components/Footer";

// display: "swap" prevents invisible text while the font loads —
// the browser renders fallback text first, then swaps when Geist is ready.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata is a Server Component export — Next.js injects these into <head>
// at build time (static) or per-request (dynamic). No client JS needed.
export const metadata: Metadata = {
  title: {
    default: "Etinosa's Portfolio",
    // Pages can set their own title: "Projects | Etinosa"
    template: "%s | Etinosa",
  },
  description:
    "Frontend engineer building interfaces where mistakes cost money — wallets, exchanges, and AI products.",
  openGraph: {
    title: "Etinosa Ogbevoen — Frontend Engineer",
    description:
      "Frontend engineer building interfaces where mistakes cost money — wallets, exchanges, and AI products.",
    type: "website",
    // og:image is auto-injected from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Etinosa Ogbevoen — Frontend Engineer",
    description:
      "Frontend engineer building interfaces where mistakes cost money — wallets, exchanges, and AI products.",
    // twitter:image falls back to the og:image above
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables are applied at the <html> level so every child can
    // inherit them via CSS var(--font-geist-sans).
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {/*
        The Sidebar will live here once we build it (Step 3).
        It's a Server Component wrapper around a "use client" inner nav —
        that pattern keeps the shell static and only hydrates the interactive bits.
      */}
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        {/* The whole layout — sidebar + content — is one centered, capped block,
            so on ultra-wide/zoomed-out screens it sits centered rather than pinned left. */}
        <div className="mx-auto flex w-full max-w-[1660px]">
          <Sidebar />
          {/* border-l is the sidebar divider — on the content column so it's
              content-height (stops at the footer) rather than viewport-height */}
          <div className="flex min-w-0 flex-1 flex-col md:border-l md:border-zinc-800">
            {/* Grows with content so the footer follows it, not pinned a screen away */}
            <main>{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
