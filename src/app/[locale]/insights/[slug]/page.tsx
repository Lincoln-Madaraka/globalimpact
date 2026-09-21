import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getDictionary(locale).insights.articles.map((article) => ({ locale, slug: article.slug })));
}

const findArticle = (locale: string, slug: string) =>
  isLocale(locale) ? getDictionary(locale).insights.articles.find((article) => article.slug === slug) : undefined;

export async function generateMetadata({ params }: PageProps<"/[locale]/insights/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = findArticle(locale, slug);
  if (!article || !isLocale(locale)) return {};
  const metadata = pageMetadata({ locale, path: `/insights/${slug}`, title: article.title, description: article.excerpt });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: article.date } };
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/insights/[slug]">) {
  const { locale, slug } = await params;
  const article = findArticle(locale, slug);
  if (!article || !isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const path = (p: string) => localePath(locale, p);
  const others = dict.insights.articles.filter((other) => other.slug !== slug);

  return (
    <>
      <JsonLd
        data={articleSchema({ locale, path: `/insights/${slug}`, title: article.title, description: article.excerpt, date: article.date })}
      />
      <PageHero
        variant="article"
        title={article.title}
        lead={article.excerpt}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.insights, href: path("/insights") },
          { name: article.title, href: path(`/insights/${slug}`) },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      >
        <p className="text-small font-medium text-muted">
          {article.topic} · {article.minutes}{"\u00a0"}{dict.common.minRead}
        </p>
      </PageHero>

      <Section tone="white">
        <Container className="max-w-[42rem]">
          <article className="space-y-6 text-[1.125rem] leading-[1.8] text-ink">
            {article.body.map((block, i) =>
              block.type === "h2" ? (
                <h2 key={i} className="!mt-12 font-display text-[1.75rem] font-semibold text-ink">
                  {block.text}
                </h2>
              ) : block.type === "quote" ? (
                <blockquote key={i} className="!my-12 border-l-2 border-navy-900 pl-6 font-display text-statement text-ink">
                  {block.text}
                </blockquote>
              ) : (
                <p key={i}>{block.text}</p>
              ),
            )}
          </article>
          <p className="mt-12 border-t border-line pt-8 text-muted">{dict.meta.siteName}</p>
          <TextLink href={path("/insights")} className="mt-4">
            {dict.common.backToInsights}
          </TextLink>
        </Container>
      </Section>

      {others.length > 0 && (
        <Section tone="ivory">
          <Container>
            <SectionHeading title={dict.common.readMore} />
            <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-12">
              {others.map((other) => (
                <li key={other.slug}>
                  <ArticleCard
                    href={path(`/insights/${other.slug}`)}
                    topic={other.topic}
                    title={other.title}
                    excerpt={other.excerpt}
                    meta={`${other.minutes}\u00a0${dict.common.minRead}`}
                    cta={dict.common.readArticle}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <CtaBanner
        tone="white"
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[{ label: dict.cta.conversation, href: path("/contact") }]}
      />
    </>
  );
}
