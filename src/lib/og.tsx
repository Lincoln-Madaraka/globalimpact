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
function content(locale: string, page: string): { title: string; photo: PhotoName } {
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  const article = page.startsWith("insights/") && dict.insights.articles.find((a) => `insights/${a.slug}` === page);
  if (article) return { title: article.title, photo: article.image };

  const pages: Record<string, { title: string; photo: PhotoName }> = {
    about: { title: dict.about.hero.title, photo: "kogi-elders" },
    "what-we-do": { title: dict.whatWeDo.hero.title, photo: "strategy" },
    "path-of-wisdom": { title: dict.wisdom.hero.title, photo: "bonfire" },
    "path-of-action": { title: dict.action.hero.title, photo: "woven-hands" },
    africa: { title: dict.africa.hero.title, photo: "earth" },
    impact: { title: dict.impact.hero.title, photo: "rita" },
    partners: { title: dict.partners.hero.title, photo: "hands" },
    insights: { title: dict.insights.hero.title, photo: "boardroom" },
    contact: { title: dict.contact.hero.title, photo: "salon" },
  };
  return pages[page] ?? { title: `${dict.home.hero.title} ${dict.home.hero.titleAccent}`, photo: "earth" };
}

export async function renderOgImage(locale: string, page: string) {
  const { title, photo } = content(locale, page);
  const [logo, image, medium, mediumExt, bold, boldExt, display, displayExt] = await Promise.all([
    read("src/assets/og/logo.png"),
    read(`src/assets/og/${photo}.jpg`),
    font("plus-jakarta-sans", "latin", 500),
    font("plus-jakarta-sans", "latin-ext", 500),
    font("plus-jakarta-sans", "latin", 700),
    font("plus-jakarta-sans", "latin-ext", 700),
    font("montserrat", "latin", 600),
    font("montserrat", "latin-ext", 600),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0a1a3a",
          color: "white",
          fontFamily: "Jakarta",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 660,
            height: "100%",
            padding: "60px 56px 56px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 72,
                height: 72,
                borderRadius: 999,
                background: "white",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img src={dataUri(logo, "image/png")} width={56} height={56} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Global Impact</div>
              <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: 6, color: "rgba(255,255,255,0.75)" }}>ALLIANCE</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Montserrat",
              fontSize: title.length > 48 ? 44 : title.length > 30 ? 52 : 60,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -1.2,
            }}
          >
            {title}
          </div>

          <div style={{ display: "flex", fontSize: 22, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{new URL(site.url).host}</div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src={dataUri(image, "image/jpeg")}
          width={440}
          height={630}
          style={{ position: "absolute", right: 0, top: 0, width: 440, height: 630, objectFit: "cover" }}
        />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: medium, weight: 500, style: "normal" },
        { name: "Jakarta", data: mediumExt, weight: 500, style: "normal" },
        { name: "Jakarta", data: bold, weight: 700, style: "normal" },
        { name: "Jakarta", data: boldExt, weight: 700, style: "normal" },
        { name: "Montserrat", data: display, weight: 600, style: "normal" },
        { name: "Montserrat", data: displayExt, weight: 600, style: "normal" },
      ],
    },
  );
}
