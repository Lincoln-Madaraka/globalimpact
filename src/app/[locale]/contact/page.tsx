import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OfficeCard } from "@/components/cards";
import { ContactForm } from "@/components/ContactForm";
import { Icon, SocialIcon, type SocialName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui";
import { fill, getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { officePlace, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { contact } = getDictionary(locale);
  return pageMetadata({ locale, path: "/contact", title: contact.metaTitle, description: contact.metaDescription });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.contact;
  const path = (p: string) => localePath(locale, p);
  const socials = Object.entries(site.socials).filter(([, url]) => url) as [SocialName, string][];
  const { hq, africa } = site.offices;
  const officeText = (office: { street: string; phone: string }, fallback: string) =>
    [office.street, office.phone].filter(Boolean).join(" · ") || fallback;

  return (
    <>
      <JsonLd data={webPageSchema({ type: "ContactPage", locale, path: "/contact", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        title={t.hero.title}
        lead={t.hero.lead}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.contact, href: path("/contact") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      <Section tone="white">
        <Container>
          <SectionHeading title={t.pathways.title} />
          <ul className="reveal mt-10 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {t.pathways.items.map((item) => (
              <li key={item.audience}>
                <Link href={`?topic=${item.topic}#message`} className="group flex h-full flex-col bg-white px-0 py-7 transition-colors hover:bg-ivory sm:p-7">
                  <h3 className="font-display text-xl font-semibold text-ink">{item.audience}</h3>
                  <p className="mt-3 flex-1 text-ink-soft">{item.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                    {item.cta}
                    <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="ivory" id="message">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-4">
            <div className="border border-line bg-white p-6 sm:p-10">
              <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-ink">{t.details.title}</h2>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-small text-muted">{t.details.emailLabel}</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`} className="u-link break-all text-lg font-semibold text-ink">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-small text-muted">{t.details.responseLabel}</dt>
                  <dd className="mt-1 text-ink">{t.details.responseValue}</dd>
                </div>
                {socials.length > 0 && (
                  <div>
                    <dt className="text-small text-muted">{t.details.socialLabel}</dt>
                    <dd className="mt-2">
                      <ul className="flex gap-4">
                        {socials.map(([name, url]) => (
                          <li key={name}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex text-ink transition-colors hover:text-navy-800"
                            >
                              <SocialIcon name={name} className="size-5" />
                              <span className="sr-only">{name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <OfficeCard label={dict.offices.hq.label} place={officePlace(hq)} text={officeText(hq, dict.offices.hq.text)} />
            <OfficeCard label={dict.offices.africa.label} place={officePlace(africa)} text={officeText(africa, dict.offices.africa.text)} />
          </div>
          <div className="max-lg:order-first lg:col-span-8">
            <ContactForm
              labels={{
                ...t.form,
                mailto: fill(t.form.mailto, { email: site.email }),
                error: fill(t.form.error, { email: site.email }),
              }}
              email={site.email}
              endpoint={site.formEndpoint}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
