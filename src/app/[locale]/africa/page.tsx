import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AfricaFlagMap } from "@/components/AfricaFlagMap";
import { CardGrid, DetailCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/africa">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { africa } = getDictionary(locale);
  return pageMetadata({ locale, path: "/africa", title: africa.metaTitle, description: africa.metaDescription });
}

export default async function AfricaPage({ params }: PageProps<"/[locale]/africa">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.africa;
  const path = (p: string) => localePath(locale, p);
  const contactAfrica = `${path("/contact")}?topic=africa`;

  return (
    <>
      <JsonLd data={webPageSchema({ locale, path: "/africa", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        title={t.hero.title}
        lead={t.hero.lead}
        wideVisual
        visual={<AfricaFlagMap label={t.map.label} caption={t.map.caption} className="mx-auto w-full max-w-lg lg:max-w-none" />}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.africa, href: path("/africa") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      >
        <ButtonLink href={contactAfrica}>{dict.cta.collaborate}</ButtonLink>
      </PageHero>

      {/* Perspective */}
      <Section tone="white">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading title={t.perspective.title} />
          </div>
          <div className="space-y-5 text-lead text-ink-soft lg:col-span-6 lg:col-start-7">
            {t.perspective.paragraphs.map((paragraph) => (
              <p key={paragraph} className="reveal">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Kenya */}
      <Section tone="ivory">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionHeading title={t.hub.title} />
            <p className="reveal mt-6 text-lead text-ink-soft">{t.hub.text}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ul className="reveal">
              {t.hub.points.map((point) => (
                <li key={point} className="border-t border-line py-5 font-display text-lg font-semibold text-ink last:border-b">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Focus areas */}
      <Section tone="white">
        <Container>
          <SectionHeading title={t.themes.title} />
          <CardGrid className="mt-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {t.themes.items.map((item) => (
              <DetailCard
                key={item.title}
                title={item.title}
                teaser={item.text}
                body={<p className="text-lead">{item.text}</p>}
                tone="white"
                moreLabel={dict.common.readMore}
                closeLabel={dict.common.close}
              />
            ))}
          </CardGrid>
        </Container>
      </Section>

      {/* Principles */}
      <Section tone="navy">
        <Container>
          <SectionHeading title={t.principles.title} tone="light" />
          <div className="reveal mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {t.principles.items.map((item) => (
              <div key={item.title} className="border-t border-white/20 pt-6">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-white/72">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Initiatives */}
      <Section tone="white">
        <Container className="reveal grid gap-6 lg:grid-cols-12 lg:gap-8">
          <h2 className="font-display text-h2 text-ink lg:col-span-5">{t.initiatives.title}</h2>
          <p className="text-lead text-ink-soft lg:col-span-6 lg:col-start-7">{t.initiatives.text}</p>
        </Container>
      </Section>

      <CtaBanner
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[
          { label: dict.cta.collaborate, href: contactAfrica },
          { label: dict.cta.invest, href: `${path("/contact")}?topic=investment` },
        ]}
      />
    </>
  );
}
