import { getDictionary } from "@/i18n";
import { locales } from "@/i18n/config";
import { renderOgImage } from "@/lib/og";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.flatMap((locale) => getDictionary(locale).insights.articles.map((article) => ({ locale, slug: article.slug })));
}

export const alt = "Global Impact Alliance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  return renderOgImage(locale, `insights/${slug}`);
}
