import { ogImages, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ogImages().map(({ file }) => ({ image: file }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const entry = ogImages().find(({ file }) => file === image);
  if (!entry) return new Response("Not found", { status: 404 });
  return renderOgImage(entry.locale, entry.page);
}
