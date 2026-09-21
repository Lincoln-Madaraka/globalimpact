import type { Metadata, Viewport } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header, type NavItem, type NavLink } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n";
import { isLocale, localeMeta, locales } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { site } from "@/config/site";
import { organizationSchema } from "@/lib/structured-data";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-jakarta", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], variable: "--font-montserrat", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0038a5",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.homeTitle, template: `%s | ${site.name}` },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: { siteName: site.name, locale: localeMeta[locale].ogLocale, type: "website" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { nav } = dict;
  const link = (path: string, label: string, description?: string): NavLink => ({ href: localePath(locale, path), label, description });

  const work = [
    link("/what-we-do", nav.whatWeDo, nav.descriptions.whatWeDo),
    link("/path-of-wisdom", nav.pathOfWisdom, nav.descriptions.pathOfWisdom),
    link("/path-of-action", nav.pathOfAction, nav.descriptions.pathOfAction),
    link("/impact", nav.impact, nav.descriptions.impact),
  ];
  const items: NavItem[] = [
    link("/about", nav.about),
    { label: nav.ourWork, children: work },
    link("/africa", nav.africa),
    link("/partners", nav.partners),
    link("/insights", nav.insights),
  ];
  const explore = [
    link("", nav.home),
    link("/about", nav.about),
    link("/africa", nav.africa),
    link("/partners", nav.partners),
    link("/insights", nav.insights),
    link("/contact", nav.contact),
  ];

  return (
    <html lang={locale} className={`${jakarta.variable} ${montserrat.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-white px-5 py-3 font-bold text-brand-blue shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {nav.skip}
        </a>
        <Header
          homeHref={localePath(locale)}
          items={items}
          ctaHref={localePath(locale, "/contact")}
          labels={{ cta: nav.cta, openMenu: nav.openMenu, closeMenu: nav.closeMenu, primary: nav.primary }}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} explore={explore} work={work} />
        <JsonLd data={organizationSchema(dict)} />
      </body>
    </html>
  );
}
