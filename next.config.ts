import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `npm run build` writes plain HTML/CSS/JS to /out.
  output: "export",
  // /en/about/ -> /en/about/index.html, which every static host serves correctly.
  trailingSlash: true,
  // Photos are pre-optimised by `npm run images`; the loader picks the 640px copy for small screens.
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
