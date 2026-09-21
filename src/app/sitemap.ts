import type { MetadataRoute } from "next";
import { getDictionary } from "@/i18n";
import { locales } from "@/i18n/config";
import { localePath, pagePaths } from "@/config/routes";
import { absoluteUrl } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.flatMap((locale) => {
    const articles = getDictionary(locale).insights.articles;
    const pages = pagePaths.map((path) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }));
    const posts = articles.map((article) => ({
      url: absoluteUrl(localePath(locale, `/insights/${article.slug}`)),
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));
    return [...pages, ...posts];
  });
}
