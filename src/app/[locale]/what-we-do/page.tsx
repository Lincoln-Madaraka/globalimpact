import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CheckList, Container, Section, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/what-we-do">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { whatWeDo } = getDictionary(locale);
  return pageMetadata({ locale, path: "/what-we-do", title: whatWeDo.metaTitle, description: whatWeDo.metaDescription });
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function WhatWeDoPage({ params }: PageProps<"/[locale]/what-we-do">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.whatWeDo;
  const c = dict.common;
  const path = (p: string) => localePath(locale, p);

  return (
    <>
      <JsonLd data={webPageSchema({ type: "CollectionPage", locale, path: "/what-we-do", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        title={t.hero.title}
        lead={t.hero.lead}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.whatWeDo, href: path("/what-we-do") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      {/* Intro and index of the eight areas */}
      <Section tone="white">
        <Container>
          <SectionHeading title={t.intro.title} lead={t.intro.text} />
          <nav aria-label={t.jump} className="reveal">
            <ul className="mt-10 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
              {dict.areas.map((area, i) => (
                <li key={area.id} className="bg-white">
                  <a
                    href={`#${area.id}`}
                    className={`group flex h-full items-baseline gap-4 py-4 pr-4 ${i % 2 ? "sm:pl-4" : ""} ${i % 4 ? "lg:pl-4" : ""}`}
                  >
                    <span aria-hidden="true" className="text-index tabular-nums text-muted">
                      {pad(i + 1)}
                    </span>
                    <span className="u-link font-medium text-ink group-hover:[background-size:100%_1px]">{area.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      {/* The eight areas, one row each */}
      <Section tone="white" divider>
        <Container>
          {dict.areas.map((area, i) => (
            <article
              key={area.id}
              id={area.id}
              className="grid gap-8 border-t border-line py-12 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-8 lg:py-14"
            >
              <div className="lg:col-span-5">
                <p aria-hidden="true" className="font-display text-[2.75rem] font-light leading-none text-muted">
                  {pad(i + 1)}
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,1.4rem+1vw,2.5rem)] font-semibold leading-tight text-ink">{area.title}</h2>
                <p className="mt-5 text-lead text-ink-soft">{area.what}</p>
              </div>
              <dl className="reveal grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
                <div>
                  <dt className="text-small font-semibold text-ink">{c.whoItServes}</dt>
                  <dd className="mt-2 text-ink-soft">{area.who}</dd>
                </div>
                <div>
                  <dt className="text-small font-semibold text-ink">{c.whatGiaDoes}</dt>
                  <dd className="mt-3">
                    <CheckList items={area.does} />
                  </dd>
                </div>
                <div className="border-l-2 border-navy-900 pl-5 sm:col-span-2">
                  <dt className="text-small font-semibold text-ink">{c.outcome}</dt>
                  <dd className="mt-2 font-display text-xl font-semibold leading-snug text-ink lg:text-2xl">{area.outcome}</dd>
                </div>
              </dl>
            </article>
          ))}
        </Container>
      </Section>

      <CtaBanner
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[
          { label: dict.cta.partner, href: `${path("/contact")}?topic=partnership` },
          { label: dict.cta.invest, href: `${path("/contact")}?topic=investment` },
        ]}
      />
    </>
  );
}
