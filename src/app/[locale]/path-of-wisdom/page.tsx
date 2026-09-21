import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardGrid, DetailCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { Figure } from "@/components/Figure";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CheckList, Container, Section, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import type { PhotoName } from "@/config/photos";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/path-of-wisdom">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { wisdom } = getDictionary(locale);
  return pageMetadata({ locale, path: "/path-of-wisdom", title: wisdom.metaTitle, description: wisdom.metaDescription });
}

/** Photos shown in a programme's modal, by position in `wisdom.programmes.items` (1 Wisdom Retreats). */
const programmeImages: Partial<Record<number, PhotoName>> = { 1: "fire-circle" };

export default async function PathOfWisdomPage({ params }: PageProps<"/[locale]/path-of-wisdom">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.wisdom;
  const labels = { moreLabel: dict.common.readMore, closeLabel: dict.common.close };
  const path = (p: string) => localePath(locale, p);

  return (
    <>
      <JsonLd data={webPageSchema({ locale, path: "/path-of-wisdom", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        title={t.hero.title}
        lead={t.hero.lead}
        photo="bonfire"
        photoAlt={dict.photos.bonfire}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.pathOfWisdom, href: path("/path-of-wisdom") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      {/* Intro */}
      <Section tone="white">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionHeading title={t.intro.title} />
            <p className="reveal mt-6 text-lead text-ink-soft">{t.intro.text}</p>
          </div>
          <div className="reveal lg:col-span-5 lg:col-start-8">
            <Figure name="salon" ratio="4/3" alt={dict.photos.salon} sizes="(min-width: 1280px) 32rem, (min-width: 1024px) 40vw, 90vw" />
          </div>
        </Container>
      </Section>

      {/* Themes: the heading takes the first cell, so heading and seven cards fill two rows of four */}
      <Section tone="ivory">
        <Container>
          <CardGrid className="sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-ivory px-0 py-6 sm:p-7 lg:p-8 lg:[&_h2]:text-[clamp(2rem,1rem+1.5vw,2.5rem)]">
              <SectionHeading title={t.themes.title} />
            </div>
            {t.themes.items.map((item, i) => (
              <DetailCard
                key={item.title}
                index={i}
                title={item.title}
                teaser={item.text}
                body={<p className="text-lead">{item.text}</p>}
                tone="ivory"
                {...labels}
              />
            ))}
          </CardGrid>
        </Container>
      </Section>

      {/* Programmes */}
      <Section tone="white">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <SectionHeading title={t.programmes.title} />
          </div>
          <CardGrid className="sm:grid-cols-2 lg:col-span-8">
            {t.programmes.items.map((item, i) => {
              const image = programmeImages[i];
              return (
                <DetailCard
                  key={item.title}
                  title={item.title}
                  teaser={item.text}
                  body={<p className="text-lead">{item.text}</p>}
                  image={image}
                  imageAlt={image ? dict.photos[image] : undefined}
                  tone="white"
                  className={i === t.programmes.items.length - 1 ? "sm:col-span-2" : ""}
                  {...labels}
                />
              );
            })}
          </CardGrid>
        </Container>
      </Section>

      {/* Who it is for and what changes */}
      <Section tone="ivory">
        <Container className="grid gap-12 lg:grid-cols-2">
          {[t.audience, t.outcomes].map((block) => (
            <div key={block.title} className="reveal border-t border-line pt-6">
              <h2 className="font-display text-[clamp(1.75rem,1.4rem+1vw,2.5rem)] font-semibold leading-tight text-ink">{block.title}</h2>
              <CheckList items={block.items} className="mt-8" />
            </div>
          ))}
        </Container>
      </Section>

      <CtaBanner
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        tone="white"
        actions={[
          { label: t.next.link, href: path("/path-of-action") },
          { label: dict.cta.conversation, href: `${path("/contact")}?topic=wisdom` },
        ]}
      />
    </>
  );
}
