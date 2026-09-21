import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import { buttonClass } from "@/components/ui";
import { defaultLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { site } from "@/config/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-jakarta" });
const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  const home = localePath(defaultLocale);
  return (
    <html lang="en" className={`${jakarta.variable} ${montserrat.variable}`}>
      <body>
        <main className="on-dark grid min-h-screen place-items-center bg-night px-6 py-20 text-center text-white">
          <div>
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-white">
              <Image unoptimized src="/brand/logo-mark.webp" alt={site.name} width={48} height={48} />
            </span>
            <p className="mt-10 font-display text-[8rem] font-light leading-none text-white/60">404</p>
            <h1 className="mt-6 font-display text-h2 text-white">This path doesn&apos;t lead anywhere, yet.</h1>
            <p className="mt-3 text-lead text-white/72">The page you are looking for could not be found.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={home} className={buttonClass("white")}>
                Back to home
              </a>
              <a href={localePath(defaultLocale, "/contact")} className={buttonClass("outlineLight")}>
                Start a conversation
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
