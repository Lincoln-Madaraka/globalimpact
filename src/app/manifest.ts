import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: "Global Impact Alliance connects wisdom with action: Indigenous knowledge, leadership, capital and systemic change.",
    start_url: "/en/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a1a3a",
    icons: [{ src: "/brand/logo-512.png", sizes: "512x512", type: "image/png" }],
  };
}
