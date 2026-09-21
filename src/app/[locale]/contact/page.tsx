import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OfficeCard } from "@/components/cards";
import { ContactForm } from "@/components/ContactForm";
import { Icon, SocialIcon, type SocialName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container, SectionHeading } from "@/components/ui";
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

  return (
    <>
      <JsonLd data={webPageSchema({ type: "ContactPage", locale, path: "/contact", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        photo="contact"
        photoAlt={dict.photos.contact}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.contact, href: path("/contact") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.pathways.eyebrow} title={t.pathways.title} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.pathways.items.map((item) => (
              <li key={item.audience}>
                <Link
                  href={`?topic=${item.topic}#message`}
                  className="reveal group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-blue/10"
                >
                  <h3 className="text-lg font-extrabold text-ink">{item.audience}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-red-700">
                    {item.cta}
                    <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="message" className="scroll-mt-24 bg-mist py-24 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div className="space-y-5">
            <div className="rounded-[2rem] bg-navy p-8 text-white">
              <h2 className="font-display text-2xl font-bold">{t.details.title}</h2>
              <dl className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                    <Icon name="mail" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-sm text-white/60">{t.details.emailLabel}</dt>
                    <dd>
                      <a href={`mailto:${site.email}`} className="break-all text-lg font-bold hover:underline">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                    <Icon name="clock" className="size-5" />
                  </span>
                  <div>
                    <dt className="text-sm text-white/60">{t.details.responseLabel}</dt>
                    <dd className="font-semibold">{t.details.responseValue}</dd>
                  </div>
                </div>
              </dl>
              {socials.length > 0 && (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-sm text-white/60">{t.details.socialLabel}</p>
                  <ul className="mt-3 flex gap-3">
                    {socials.map(([name, url]) => (
                      <li key={name}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                        >
                          <SocialIcon name={name} className="size-4.5" />
                          <span className="sr-only">{name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <OfficeCard label={dict.offices.hq.label} place={officePlace(hq)} text={[hq.street, hq.phone].filter(Boolean).join(" · ") || dict.offices.hq.text} />
            <OfficeCard
              label={dict.offices.africa.label}
              place={officePlace(africa)}
              text={[africa.street, africa.phone].filter(Boolean).join(" · ") || dict.offices.africa.text}
            />
          </div>
          <ContactForm
            labels={{
              ...t.form,
              mailto: fill(t.form.mailto, { email: site.email }),
              error: fill(t.form.error, { email: site.email }),
            }}
            email={site.email}
            endpoint={site.formEndpoint}
          />
        </Container>
      </section>
    </>
  );
}
