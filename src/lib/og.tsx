import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import type { PhotoName } from "@/config/photos";
import { site } from "@/config/site";

// Branded link-preview images (Open Graph / Twitter), one per page, rendered at build
// time by src/app/og/[image]/route.tsx and saved as real .png files under /og/.

export const ogSize = { width: 1200, height: 630 };

const staticPages = ["home", "about", "what-we-do", "path-of-wisdom", "path-of-action", "africa", "impact", "partners", "insights", "contact"];

/** Every preview image to generate: one per page and insight article, per language. */
export const ogImages = () =>
  locales.flatMap((locale) =>
    [...staticPages, ...getDictionary(locale).insights.articles.map((a) => `insights/${a.slug}`)].map((page) => ({
      locale,
      page,
      file: `${locale}-${page.replace(/\//g, "-")}.png`,
    })),
  );

/** Public URL of a page's preview image. `path` is the page path without the locale, e.g. "/about". */
export const ogImageUrl = (locale: string, path: string) => `/og/${locale}-${(path.slice(1) || "home").replace(/\//g, "-")}.png`;

const read = (path: string) => readFile(join(process.cwd(), path));
const font = (family: string, subset: string, weight: number) =>
  read(`node_modules/@fontsource/${family}/files/${family}-${subset}-${weight}-normal.woff`);
const dataUri = (buffer: Buffer, type: string) => `data:${type};base64,${buffer.toString("base64")}`;

/** `page` is a page key (home, about, what-we-do, …) or `insights/<slug>` for an article. */
function content(locale: string, page: string): { eyebrow: string; title: string; photo: PhotoName } {
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  const article = page.startsWith("insights/") && dict.insights.articles.find((a) => `insights/${a.slug}` === page);
  if (article) return { eyebrow: `${dict.nav.insights} · ${article.topic}`, title: article.title, photo: article.image };

  const pages: Record<string, { eyebrow: string; title: string; photo: PhotoName }> = {
    about: { eyebrow: dict.about.hero.eyebrow, title: dict.about.hero.title, photo: "partnership" },
    "what-we-do": { eyebrow: dict.whatWeDo.hero.eyebrow, title: dict.whatWeDo.hero.title, photo: "strategy" },
    "path-of-wisdom": { eyebrow: dict.wisdom.hero.eyebrow, title: dict.wisdom.hero.title, photo: "boardroom" },
    "path-of-action": { eyebrow: dict.action.hero.eyebrow, title: dict.action.hero.title, photo: "consultation" },
    africa: { eyebrow: dict.africa.hero.eyebrow, title: dict.africa.hero.title, photo: "earth" },
    impact: { eyebrow: dict.impact.hero.eyebrow, title: dict.impact.hero.title, photo: "earth" },
    partners: { eyebrow: dict.partners.hero.eyebrow, title: dict.partners.hero.title, photo: "handshake" },
    insights: { eyebrow: dict.insights.hero.eyebrow, title: dict.insights.hero.title, photo: "community" },
    contact: { eyebrow: dict.contact.hero.eyebrow, title: dict.contact.hero.title, photo: "contact" },
  };
  return (
    pages[page] ?? {
      eyebrow: dict.home.hero.eyebrow,
      title: `${dict.home.hero.title} ${dict.home.hero.titleAccent}`,
      photo: "earth",
    }
  );
}

export async function renderOgImage(locale: string, page: string) {
  const { eyebrow, title, photo } = content(locale, page);
  const [logo, image, medium, mediumExt, bold, boldExt, display, displayExt] = await Promise.all([
    read("src/assets/og/logo.png"),
    read(`src/assets/og/${photo}.jpg`),
    font("plus-jakarta-sans", "latin", 500),
    font("plus-jakarta-sans", "latin-ext", 500),
    font("plus-jakarta-sans", "latin", 800),
    font("plus-jakarta-sans", "latin-ext", 800),
    font("montserrat", "latin", 800),
    font("montserrat", "latin-ext", 800),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0038a5",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, #0b3cad 0%, rgba(6,22,64,0) 55%), radial-gradient(circle at 100% 100%, #0a2a7a 0%, rgba(6,22,64,0) 55%)",
          color: "white",
          fontFamily: "Jakarta",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 690,
            padding: "60px 0 56px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 78,
                height: 78,
                borderRadius: 999,
                background: "white",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img src={dataUri(logo, "image/png")} width={62} height={62} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>Global Impact</div>
              <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: 7, color: "rgba(255,255,255,0.8)" }}>ALLIANCE</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, fontWeight: 500, color: "rgba(255,255,255,0.82)" }}>
              {eyebrow}
            </div>
            <div
              style={{
                marginTop: 18,
                fontFamily: "Montserrat",
                fontSize: title.length > 48 ? 48 : title.length > 30 ? 56 : 64,
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: -1.5,
              }}
            >
              {title}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, fontWeight: 500, color: "rgba(255,255,255,0.78)" }}>
            <div style={{ width: 40, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.6)" }} />
            {new URL(site.url).host}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 58,
            top: 75,
            width: 480,
            height: 480,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img
            src={dataUri(image, "image/jpeg")}
            width={420}
            height={420}
            style={{ borderRadius: 999, objectFit: "cover", border: "8px solid rgba(255,255,255,0.14)" }}
          />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: medium, weight: 500, style: "normal" },
        { name: "Jakarta", data: mediumExt, weight: 500, style: "normal" },
        { name: "Jakarta", data: bold, weight: 800, style: "normal" },
        { name: "Jakarta", data: boldExt, weight: 800, style: "normal" },
        { name: "Montserrat", data: display, weight: 800, style: "normal" },
        { name: "Montserrat", data: displayExt, weight: 800, style: "normal" },
      ],
    },
  );
}
