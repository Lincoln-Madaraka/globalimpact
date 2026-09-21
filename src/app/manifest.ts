import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: "Corporate social responsibility from İstanbul: environmental, ethical, philanthropic and economic impact.",
    start_url: "/en/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0038a5",
    icons: [{ src: "/brand/logo-512.png", sizes: "512x512", type: "image/png" }],
  };
}
