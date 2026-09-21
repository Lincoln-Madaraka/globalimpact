import { localeParams, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const generateStaticParams = localeParams;

export const alt = "Global Impact Alliance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return renderOgImage(locale, "path-of-action");
}
