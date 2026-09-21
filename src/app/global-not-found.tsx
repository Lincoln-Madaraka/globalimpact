import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import { MotionBackdrop } from "@/components/MotionBackdrop";
import { localePath } from "@/config/routes";
import { site } from "@/config/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: `404 | ${site.name}`,
  robots: { index: false },
};

// The URL did not match any page, so the language is unknown: show both.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <main className="relative isolate grid min-h-screen place-items-center overflow-hidden px-6 py-20 text-center text-white">
          <MotionBackdrop />
          <div>
            <span className="mx-auto grid size-20 place-items-center rounded-full bg-white shadow-xl">
              <Image src="/brand/logo-mark.webp" alt={site.name} width={60} height={60} />
            </span>
            <p className="mt-10 text-8xl font-extrabold tracking-tight sm:text-9xl">
              4<span className="text-brand-red">0</span>4
            </p>
            <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">This page could not be found.</h1>
            <p lang="tr" className="mt-2 text-lg text-white/75">
              Aradığınız sayfa bulunamadı.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={localePath("en")} className="rounded-full bg-brand-red-700 px-6 py-3.5 font-bold hover:bg-brand-red-800">
                Back to home
              </a>
              <a
                href={localePath("tr")}
                lang="tr"
                className="rounded-full border border-white/35 px-6 py-3.5 font-bold hover:bg-white/10"
              >
                Ana sayfaya dön
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
