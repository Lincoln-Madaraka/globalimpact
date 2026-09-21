import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `npm run build` writes plain HTML/CSS/JS to /out.
  output: "export",
  // /en/about/ -> /en/about/index.html, which every static host serves correctly.
  trailingSlash: true,
  // Photos are pre-optimized by `npm run images`.
  images: { unoptimized: true },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
