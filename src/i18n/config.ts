// To add a language: add its code here, create src/i18n/dictionaries/<code>/ with the
// same shape as `en`, and register it in src/i18n/index.ts. Routes are already /<locale>/…
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeMeta: Record<Locale, { label: string; ogLocale: string }> = {
  en: { label: "English", ogLocale: "en_US" },
};
