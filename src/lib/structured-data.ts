// schema.org JSON-LD builders. See https://schema.org and Google's structured data guidelines.
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { founder } from "@/config/people";
import { localePath } from "@/config/routes";
import { absoluteUrl, site } from "@/config/site";

const orgId = `${site.url}/#organization`;

const postalAddress = (office: (typeof site.offices)[keyof typeof site.offices]) => ({
  "@type": "PostalAddress",
  ...(office.street && { streetAddress: office.street }),
  ...(office.city && { addressLocality: office.city }),
  ...(office.region && { addressRegion: office.region }),
  addressCountry: office.countryCode,
});

export function organizationSchema(dict: Dictionary) {
  const { hq, africa } = site.offices;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo-512.png"), width: 512, height: 512 },
        image: absoluteUrl("/brand/logo-512.png"),
        description: dict.meta.description,
        slogan: "Connecting wisdom with action",
        email: site.email,
        founder: { "@type": "Person", name: founder.name },
        address: postalAddress(hq),
        location: [
          { "@type": "Place", name: `${site.name}: ${dict.offices.hq.label}`, address: postalAddress(hq) },
          { "@type": "Place", name: `${site.name}: ${dict.offices.africa.label}`, address: postalAddress(africa) },
        ],
        areaServed: "Worldwide",
        knowsAbout: dict.areas.map((area) => area.title),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "partnerships",
          email: site.email,
          availableLanguage: ["English"],
        },
        sameAs: Object.values(site.socials).filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function webPageSchema({
  type = "WebPage",
  locale,
  path,
  name,
  description,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  locale: Locale;
  path: string;
  name: string;
  description: string;
}) {
  const url = absoluteUrl(localePath(locale, path));
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": url,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": orgId },
  };
}

export function articleSchema({
  locale,
  path,
  title,
  description,
  date,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  date: string;
}) {
  const url = absoluteUrl(localePath(locale, path));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    mainEntityOfPage: url,
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    inLanguage: locale,
    author: { "@id": orgId, "@type": "Organization", name: site.name },
    publisher: { "@id": orgId },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}
