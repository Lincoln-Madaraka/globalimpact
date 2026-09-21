import type { Locale } from "@/i18n/config";

/** Every page path, without the locale prefix. Used for the sitemap. Insight articles are added there too. */
export const pagePaths = [
  "",
  "/about",
  "/what-we-do",
  "/path-of-wisdom",
  "/path-of-action",
  "/africa",
  "/impact",
  "/partners",
  "/insights",
  "/contact",
];

/** Builds a locale-prefixed path with the trailing slash the static export expects. */
export const localePath = (locale: Locale, path = "") => `/${locale}${path}/`;
