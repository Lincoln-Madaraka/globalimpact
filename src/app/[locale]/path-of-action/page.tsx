import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardGrid, DetailCard, ProjectCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Steps } from "@/components/Steps";
import { Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/path-of-action">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { action } = getDictionary(locale);
  return pageMetadata({ locale, path: "/path-of-action", title: action.metaTitle, description: action.metaDescription });
}

export default async function PathOfActionPage({ params }: PageProps<"/[locale]/path-of-action">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.action;
  const path = (p: string) => localePath(locale, p);

  return (
    <>
      <JsonLd data={webPageSchema({ locale, path: "/path-of-action", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        title={t.hero.title}
        lead={t.hero.lead}
        photo="woven-hands"
        photoAlt={dict.photos["woven-hands"]}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.pathOfAction, href: path("/path-of-action") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      {/* Intro and the six commitments */}
      <Section tone="white">
        <Container>
          <div className="reveal grid gap-6 lg:grid-cols-12 lg:gap-8">
            <h2 className="font-display text-h2 text-ink lg:col-span-5">{t.intro.title}</h2>
            <p className="text-lead text-ink-soft lg:col-span-6 lg:col-start-7">{t.intro.text}</p>
          </div>
          <h3 className="reveal mt-16 border-t border-line pt-4 font-display text-xl font-semibold text-ink">{t.themes.title}</h3>
          <CardGrid className="mt-8 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Mechanisms */}
      <Section tone="ivory">
        <Container>
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {/* The heading takes the first cell, so the mechanisms fill the grid beside it. */}
            <SectionHeading title={t.mechanisms.title} />
            {t.mechanisms.items.map((item) => (
              <div key={item.title} className="reveal border-t border-line pt-6">
                <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* The project cycle */}
      <Section tone="navy">
        <Container>
          <SectionHeading title={t.cycle.title} tone="light" />
          <div className="mt-10 lg:mt-12">
            <Steps steps={t.cycle.steps} tone="light" />
          </div>
        </Container>
      </Section>

      {/* Stories of impact */}
      <Section tone="white">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading title={dict.home.stories.title} />
            <TextLink href={path("/impact")} className="shrink-0">
              {dict.home.stories.link}
            </TextLink>
          </div>
          <div className="reveal mt-10 grid gap-10 md:grid-cols-3 lg:mt-12">
            {dict.impact.projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                href={`${path("/impact")}#${project.id}`}
                labels={dict.common}
                linkLabel={dict.common.seeFullStory}
              />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner
        title={t.invest.title}
        text={t.invest.text}
        actions={[
          { label: dict.cta.invest, href: `${path("/contact")}?topic=investment` },
          { label: dict.cta.partner, href: `${path("/contact")}?topic=partnership` },
        ]}
      />
    </>
  );
}
