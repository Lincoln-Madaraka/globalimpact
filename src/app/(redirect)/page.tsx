import type { Metadata } from "next";
import { localePath } from "@/config/routes";
import { site } from "@/config/site";

// A static site cannot redirect on the server, so "/" picks the visitor's
// language in the browser (Turkish browsers get /tr/, everyone else /en/).

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  robots: { index: false, follow: true },
  alternates: {
    canonical: localePath("en"),
    languages: { en: localePath("en"), tr: localePath("tr"), "x-default": localePath("en") },
  },
};

const script = `(function(){var l=(navigator.languages&&navigator.languages[0])||navigator.language||"";location.replace(l.toLowerCase().indexOf("tr")===0?"${localePath("tr")}":"${localePath("en")}");})();`;

export default function RootRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <meta httpEquiv="refresh" content={`0; url=${localePath("en")}`} />
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
        <p>
          {site.name} ·{" "}
          <a href={localePath("en")} style={{ color: "#fff" }}>
            English
          </a>{" "}
          ·{" "}
          <a href={localePath("tr")} style={{ color: "#fff" }}>
            Türkçe
          </a>
        </p>
      </main>
    </>
  );
}
