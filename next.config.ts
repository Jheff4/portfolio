import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Tool/brand icons in /public are SVGs. next/image blocks SVG by default;
    // allow it but sandbox with a strict CSP so the SVGs can't execute scripts.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Default is [75]; the Echo detail image explicitly requests quality=100.
    qualities: [75, 100],
  },
  // The blog moved under /writing (articles + docs in one place). Permanent
  // redirects keep old shared links and search results working.
  async redirects() {
    return [
      { source: "/blog", destination: "/writing", permanent: true },
      { source: "/blog/:path*", destination: "/writing/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
