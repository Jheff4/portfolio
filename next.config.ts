import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Tool/brand icons in /public are SVGs. next/image blocks SVG by default;
    // allow it but sandbox with a strict CSP so the SVGs can't execute scripts.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
