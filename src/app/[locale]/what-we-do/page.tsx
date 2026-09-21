import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PhotoCircle } from "@/components/PhotoCircle";
import { Container, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { areaIcons } from "@/config/icons";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/what-we-do">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { whatWeDo } = getDictionary(locale);
  return pageMetadata({ locale, path: "/what-we-do", title: whatWeDo.metaTitle, description: whatWeDo.metaDescription });
}

export default async function WhatWeDoPage({ params }: PageProps<"/[locale]/what-we-do">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.whatWeDo;
  const path = (p: string) => localePath(locale, p);
  const c = dict.common;

  return (
    <>
      <JsonLd data={webPageSchema({ type: "CollectionPage", locale, path: "/what-we-do", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        photo="strategy"
        photoAlt={dict.photos.strategy}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.whatWeDo, href: path("/what-we-do") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.intro.eyebrow} title={t.intro.title} lead={t.intro.text} />
          <nav aria-label={t.jump} className="reveal mt-10">
            <ul className="flex flex-wrap gap-2">
              {dict.areas.map((area) => (
                <li key={area.id}>
                  <a
                    href={`#${area.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-brand-blue hover:text-white"
                  >
                    <Icon name={areaIcons[area.id]} className="size-4" />
                    {area.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <div className="space-y-6 pb-8">
        {dict.areas.map((area, i) => (
          <section key={area.id} id={area.id} className={`scroll-mt-24 py-16 sm:py-20 ${i % 2 === 0 ? "bg-mist" : "bg-white"}`}>
            <Container className="grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <div className={`reveal ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <PhotoCircle photos={[area.image]} alts={[dict.photos[area.image]]} tone="light" className="mx-auto w-full max-w-[15rem] sm:max-w-xs" />
              </div>
              <div>
                <p className="flex items-center gap-3 text-sm font-bold text-brand-blue">
                  <span className="grid size-10 place-items-center rounded-full bg-brand-blue text-white">
                    <Icon name={areaIcons[area.id]} className="size-5" />
                  </span>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="reveal mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{area.title}</h2>
                <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="reveal sm:col-span-2">
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">{c.whatItIs}</dt>
                    <dd className="mt-2 text-lg leading-relaxed text-ink">{area.what}</dd>
                  </div>
                  <div className="reveal">
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">{c.whoItServes}</dt>
                    <dd className="mt-2 leading-relaxed text-ink-soft">{area.who}</dd>
                  </div>
                  <div className="reveal">
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">{c.whatGiaDoes}</dt>
                    <dd className="mt-2">
                      <ul className="space-y-2">
                        {area.does.map((item) => (
                          <li key={item} className="flex gap-2.5 text-ink">
                            <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-green" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="reveal rounded-3xl border-l-4 border-brand-red bg-white p-6 shadow-sm sm:col-span-2">
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red-700">{c.outcome}</dt>
                    <dd className="mt-2 font-display text-xl font-bold leading-snug text-ink">{area.outcome}</dd>
                  </div>
                </dl>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <CtaBanner
        eyebrow={dict.ctaBand.eyebrow}
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[
          { label: dict.cta.partner, href: `${path("/contact")}?topic=partnership` },
          { label: dict.cta.invest, href: `${path("/contact")}?topic=investment` },
        ]}
        photo="earth"
        photoAlt={dict.photos.earth}
      />
    </>
  );
}
