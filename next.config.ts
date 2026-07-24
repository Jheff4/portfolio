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
};

export default nextConfig;
