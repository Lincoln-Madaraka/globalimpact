import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardGrid, DetailCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/partners">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { partners } = getDictionary(locale);
  return pageMetadata({ locale, path: "/partners", title: partners.metaTitle, description: partners.metaDescription });
}

export default async function PartnersPage({ params }: PageProps<"/[locale]/partners">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.partners;
  const path = (p: string) => localePath(locale, p);
  const labels = { moreLabel: dict.common.readMore, closeLabel: dict.common.close };

  return (
    <>
      <JsonLd data={webPageSchema({ locale, path: "/partners", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        title={t.hero.title}
        lead={t.hero.lead}
        photo="hands"
        photoAlt={dict.photos.hands}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.partners, href: path("/partners") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      >
        <ButtonLink href={`${path("/contact")}?topic=partnership`}>{dict.cta.partner}</ButtonLink>
      </PageHero>

      <Section tone="ivory">
        <Container>
          <SectionHeading title={t.why.title} />
          <div className="reveal mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {t.why.items.map((item) => (
              <div key={item.title} className="border-t border-line pt-6">
                <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading title={t.categories.title} />
          <CardGrid className="mt-10 grid-cols-2 lg:mt-12 lg:grid-cols-5">
            {t.categories.items.map((item) => (
              <DetailCard
                key={item.title}
                title={item.title}
                teaser={item.text}
                body={<p className="text-lead">{item.text}</p>}
                tone="white"
                {...labels}
              />
            ))}
          </CardGrid>
        </Container>
      </Section>

      <Section tone="ivory" id="join">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading title={t.circles.title} lead={t.circles.lead} />
            <div className="mt-10">
              <ButtonLink href={`${path("/contact")}?topic=membership`}>{dict.cta.join}</ButtonLink>
            </div>
          </div>
          <CardGrid className="sm:grid-cols-2 lg:col-span-7">
            {t.circles.items.map((circle, i) => (
              <DetailCard
                key={circle.title}
                index={i}
                title={circle.title}
                teaser={circle.role}
                tone="ivory"
                {...labels}
                body={
                  <dl className="space-y-6">
                    <div>
                      <dt className="text-small font-semibold text-ink">{t.circles.whoLabel}</dt>
                      <dd className="mt-1.5 text-lead text-ink-soft">{circle.who}</dd>
                    </div>
                    <div>
                      <dt className="text-small font-semibold text-ink">{t.circles.roleLabel}</dt>
                      <dd className="mt-1.5 text-lead text-ink">{circle.role}</dd>
                    </div>
                  </dl>
                }
              />
            ))}
          </CardGrid>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading title={t.current.title} />
          <div className="reveal mt-10 grid gap-px border-y border-line bg-line lg:mt-12 lg:grid-cols-3">
            <div className="bg-white py-6 sm:p-8">
              <h3 className="text-small font-medium text-muted">{t.current.strategic.label}</h3>
              <p className="mt-3 font-display text-2xl font-semibold leading-snug text-ink">{t.current.strategic.name}</p>
            </div>
            {[
              { label: t.current.projectLabel, names: t.current.project },
              { label: t.current.supportersLabel, names: t.current.supporters },
            ].map((group) => (
              <div key={group.label} className="bg-white py-6 sm:p-8">
                <h3 className="text-small font-medium text-muted">{group.label}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.names.map((name) => (
                    <li key={name} className="flex gap-2.5 font-medium text-ink">
                      <Icon name="check" className="mt-1.5 size-4 shrink-0 text-navy-900" />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[
          { label: dict.cta.partner, href: `${path("/contact")}?topic=partnership` },
          { label: dict.cta.join, href: `${path("/contact")}?topic=membership` },
        ]}
      />
    </>
  );
}
