import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import { MotionBackdrop } from "@/components/MotionBackdrop";
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
        <main className="relative isolate grid min-h-screen place-items-center overflow-hidden px-6 py-20 text-center text-white">
          <MotionBackdrop />
          <div>
            <span className="mx-auto grid size-20 place-items-center rounded-full bg-white shadow-xl">
              <Image src="/brand/logo-mark.webp" alt={site.name} width={60} height={60} />
            </span>
            <p className="mt-10 font-display text-8xl font-bold tracking-tight sm:text-9xl">
              4<span className="text-brand-red">0</span>4
            </p>
            <h1 className="mt-6 font-display text-2xl font-bold sm:text-3xl">This path doesn&apos;t lead anywhere, yet.</h1>
            <p className="mt-3 text-lg text-white/75">The page you are looking for could not be found.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={home} className="rounded-full bg-brand-red-700 px-6 py-3.5 font-bold hover:bg-brand-red-800">
                Back to home
              </a>
              <a href={localePath(defaultLocale, "/contact")} className="rounded-full border border-white/35 px-6 py-3.5 font-bold hover:bg-white/10">
                Start a conversation
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
