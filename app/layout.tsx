import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

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
  metadataBase: new URL("https://www.etinosa.dev"),
  title: {
    default: "Etinosa's Portfolio",
    // Pages can set their own title: "Projects | Etinosa"
    template: "%s | Etinosa",
  },
  description:
    "Frontend engineer building interfaces where mistakes cost money — wallets, exchanges, and AI products.",
  openGraph: {
    title: "Etinosa Ogbevoen — Frontend & Design Engineer",
    description:
      "Frontend engineer building interfaces where mistakes cost money — wallets, exchanges, and AI products.",
    type: "website",
    // og:image is auto-injected from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Etinosa Ogbevoen — Frontend & Design Engineer",
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
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        {/* AppShell decides whether to render the normal sidebar+footer chrome
            or, for a blog post in reader mode (?reader=1), just the content. */}
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
