// schema.org JSON-LD builders. See https://schema.org and Google's structured data guidelines.
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { pillarSlugs } from "@/config/pillars";
import { localePath } from "@/config/routes";
import { absoluteUrl, site } from "@/config/site";

const orgId = `${site.url}/#organization`;

export function organizationSchema(dict: Dictionary) {
  const { address, socials } = site;
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
        email: site.email,
        ...(site.phone && { telephone: site.phone }),
        address: {
          "@type": "PostalAddress",
          ...(address.street && { streetAddress: address.street }),
          ...(address.postalCode && { postalCode: address.postalCode }),
          addressLocality: address.city,
          addressCountry: address.countryCode,
        },
        areaServed: ["TR", "Europe", "Middle East", "Central Asia", "Africa"],
        knowsAbout: ["Corporate social responsibility", ...pillarSlugs.map((slug) => dict.pillars[slug].name)],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: site.email,
          availableLanguage: ["English", "Turkish"],
        },
        sameAs: Object.values(socials).filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ["en", "tr"],
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
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": absoluteUrl(localePath(locale, path)),
    url: absoluteUrl(localePath(locale, path)),
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": orgId },
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

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
