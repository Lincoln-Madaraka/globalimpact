import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { site } from "@/config/site";

// A static site cannot redirect on the server, so "/" forwards to the default
// language in the browser. On hosts that support it, add a server-side
// 301 from "/" to "/en/" as well (see README).

const home = localePath(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  robots: { index: false, follow: true },
  alternates: { canonical: home },
};

export default function RootRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(home)});` }} />
      <meta httpEquiv="refresh" content={`0; url=${home}`} />
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
        <p>
          <a href={home} style={{ color: "#fff" }}>
            {site.name}
          </a>
        </p>
      </main>
    </>
  );
}
