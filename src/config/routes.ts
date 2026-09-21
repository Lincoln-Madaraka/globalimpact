import type { Locale } from "@/i18n/config";
import { pillarSlugs } from "./pillars";

/** Every page path, without the locale prefix. Used for the sitemap. */
export const pagePaths = [
  "",
  "/about",
  "/what-we-do",
  ...pillarSlugs.map((slug) => `/what-we-do/${slug}`),
  "/impact",
  "/get-involved",
  "/contact",
];

/** Builds a locale-prefixed path with the trailing slash the static export expects. */
export const localePath = (locale: Locale, path = "") => `/${locale}${path}/`;
