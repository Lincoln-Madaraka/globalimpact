import type { Metadata } from "next";
import { localeMeta, locales, otherLocale, type Locale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { site } from "@/config/site";

/**
 * Per-page metadata: title, description, canonical URL, hreflang alternates,
 * Open Graph and Twitter cards. The preview image itself comes from each
 * route's `opengraph-image.tsx`.
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
      alternateLocale: [localeMeta[otherLocale(locale)].ogLocale],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
