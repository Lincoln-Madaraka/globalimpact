import type { Metadata } from "next";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { site } from "@/config/site";
import { ogImageUrl, ogSize } from "./og";

/**
 * Per-page metadata: title, description, canonical URL, hreflang alternates,
 * Open Graph and Twitter cards with the page's generated preview image.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = localePath(locale, path);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const image = { url: ogImageUrl(locale, path), ...ogSize, alt: fullTitle };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
        "x-default": localePath("en", path),
      },
    },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: localeMeta[locale].ogLocale,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
