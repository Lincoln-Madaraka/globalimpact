import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { isPillarSlug, pillarStyle } from "@/config/pillars";
import type { PhotoName } from "@/config/photos";
import { site } from "@/config/site";

// Shared renderer for every route's `opengraph-image.tsx`: the branded preview
// shown when a page link is shared on social media, chat apps and search results.

export const ogSize = { width: 1200, height: 630 };

const read = (path: string) => readFile(join(process.cwd(), path));
const font = (subset: string, weight: number) =>
  read(`node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-${subset}-${weight}-normal.woff`);
const dataUri = (buffer: Buffer, type: string) => `data:${type};base64,${buffer.toString("base64")}`;

/** `page` is a pillar slug or one of: home, about, what-we-do, impact, get-involved, contact. */
function content(locale: string, page: string): { eyebrow: string; title: string; photo: PhotoName } {
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  if (isPillarSlug(page)) {
    return { eyebrow: dict.nav.whatWeDo, title: dict.pillars[page].name, photo: pillarStyle[page].photo };
  }
  switch (page) {
    case "about":
      return { eyebrow: dict.about.hero.eyebrow, title: dict.about.hero.title, photo: "boardroom" };
    case "what-we-do":
      return { eyebrow: dict.whatWeDo.hero.eyebrow, title: dict.whatWeDo.hero.title, photo: "strategy" };
    case "impact":
      return { eyebrow: dict.impact.hero.eyebrow, title: dict.impact.hero.title, photo: "community" };
    case "get-involved":
      return { eyebrow: dict.getInvolved.hero.eyebrow, title: dict.getInvolved.hero.title, photo: "partnership" };
    case "contact":
      return { eyebrow: dict.contact.hero.eyebrow, title: dict.contact.hero.title, photo: "contact" };
    default:
      return {
        eyebrow: dict.home.hero.eyebrow,
        title: `${dict.home.hero.title} ${dict.home.hero.titleAccent}`,
        photo: "handshake",
      };
  }
}

export async function renderOgImage(locale: string, page: string) {
  const { eyebrow, title, photo } = content(locale, page);
  const [logo, image, medium, mediumExt, bold, boldExt] = await Promise.all([
    read("src/assets/og/logo.png"),
    read(`src/assets/og/${photo}.jpg`),
    font("latin", 500),
    font("latin-ext", 500),
    font("latin", 800),
    font("latin-ext", 800),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#061640",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, #0b3cad 0%, rgba(6,22,64,0) 55%), radial-gradient(circle at 100% 100%, #018577 0%, rgba(6,22,64,0) 55%)",
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
              <div style={{ width: 14, height: 14, borderRadius: 999, background: "#eb2839" }} />
              {eyebrow}
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: title.length > 48 ? 50 : title.length > 30 ? 58 : 66,
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: -1.5,
              }}
            >
              {title}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, fontWeight: 500, color: "rgba(255,255,255,0.78)" }}>
            <div style={{ width: 40, height: 4, borderRadius: 4, background: "#018577" }} />
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
          <div
            style={{
              position: "absolute",
              top: 56,
              right: 56,
              width: 28,
              height: 28,
              borderRadius: 999,
              background: "#eb2839",
              boxShadow: "0 0 30px 8px rgba(235,40,57,0.45)",
            }}
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
      ],
    },
  );
}
