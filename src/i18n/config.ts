export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeMeta: Record<Locale, { label: string; short: string; ogLocale: string }> = {
  en: { label: "English", short: "EN", ogLocale: "en_US" },
  tr: { label: "Türkçe", short: "TR", ogLocale: "tr_TR" },
};

export const otherLocale = (locale: Locale): Locale => (locale === "en" ? "tr" : "en");
