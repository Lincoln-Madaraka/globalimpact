import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container, TextLink } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { formatDate } from "@/lib/format";
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
        eyebrow={article.topic}
        title={article.title}
        lead={article.excerpt}
        photo={article.image}
        photoAlt={dict.photos[article.image]}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.insights, href: path("/insights") },
          { name: article.title, href: path(`/insights/${slug}`) },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      >
        <p className="inline-flex items-center gap-2 text-sm text-white/75">
          <Icon name="calendar" className="size-4" />
          <time dateTime={article.date}>{formatDate(locale, article.date)}</time> · {article.minutes} {dict.common.minRead}
        </p>
      </PageHero>

      <article className="py-20 sm:py-24">
        <Container className="max-w-3xl">
          <div className="space-y-6 text-lg leading-[1.8] text-ink">
            {article.body.map((block, i) =>
              block.type === "h2" ? (
                <h2 key={i} className="!mt-12 font-display text-3xl font-bold tracking-tight text-ink">
                  {block.text}
                </h2>
              ) : block.type === "quote" ? (
                <blockquote key={i} className="!my-12 border-l-4 border-brand-red pl-6 font-display text-2xl font-bold leading-snug text-brand-blue sm:text-3xl">
                  {block.text}
                </blockquote>
              ) : (
                <p key={i}>{block.text}</p>
              ),
            )}
          </div>
          <p className="mt-12 border-t border-line pt-8 text-ink-soft">{dict.meta.siteName}</p>
          <TextLink href={path("/insights")} className="mt-4">
            {dict.common.backToInsights}
          </TextLink>
        </Container>
      </article>

      {others.length > 0 && (
        <section className="bg-mist py-20 sm:py-24">
          <Container>
            <h2 className="font-display text-3xl font-bold text-ink">{dict.common.readMore}</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <ArticleCard
                    href={path(`/insights/${other.slug}`)}
                    image={other.image}
                    imageAlt={dict.photos[other.image]}
                    topic={other.topic}
                    title={other.title}
                    excerpt={other.excerpt}
                    meta={`${formatDate(locale, other.date)} · ${other.minutes} ${dict.common.minRead}`}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CtaBanner
        eyebrow={dict.ctaBand.eyebrow}
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[{ label: dict.cta.conversation, href: path("/contact") }]}
        photoAlt={dict.photos.earth}
      />
    </>
  );
}
