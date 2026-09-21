import type { Locale } from "@/i18n/config";

export const formatDate = (locale: Locale, isoDate: string) =>
  new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(isoDate));
