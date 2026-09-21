import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { InsightsBrowser, type InsightItem } from "@/components/InsightsBrowser";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/insights">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { insights } = getDictionary(locale);
  return pageMetadata({ locale, path: "/insights", title: insights.metaTitle, description: insights.metaDescription });
}

export default async function InsightsPage({ params }: PageProps<"/[locale]/insights">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.insights;
  const path = (p: string) => localePath(locale, p);
  const caseStudyTopic = t.topics[t.topics.length - 1];

  const items: InsightItem[] = [
    ...t.articles.map((article) => ({
      href: path(`/insights/${article.slug}`),
      topic: article.topic,
      title: article.title,
      excerpt: article.excerpt,
      meta: `${article.minutes}\u00a0${dict.common.minRead}`,
      cta: dict.common.readArticle,
    })),
    ...dict.impact.projects.map((project) => ({
      href: `${path("/impact")}#${project.id}`,
      topic: caseStudyTopic,
      title: project.title,
      excerpt: project.challenge,
      meta: project.place,
      cta: dict.common.readArticle,
    })),
  ];

  return (
    <>
      <JsonLd data={webPageSchema({ type: "CollectionPage", locale, path: "/insights", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        title={t.hero.title}
        lead={t.hero.lead}
        photo="boardroom"
        photoAlt={dict.photos.boardroom}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.insights, href: path("/insights") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      <Section tone="white">
        <Container>
          {/* Visually hidden so the cards' h3 headings follow an h2. */}
          <h2 className="sr-only">{t.latest}</h2>
          <InsightsBrowser items={items} topics={t.topics} labels={{ all: dict.common.allTopics, filter: dict.common.filterTopics, empty: t.empty }} />
        </Container>
      </Section>

      <CtaBanner
        title={t.contribute.title}
        text={t.contribute.text}
        actions={[{ label: t.contribute.cta, href: `${path("/contact")}?topic=research` }]}
      />
    </>
  );
}
