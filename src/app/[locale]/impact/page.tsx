import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PhotoCircle } from "@/components/PhotoCircle";
import { ProjectCase } from "@/components/ProjectCase";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/impact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { impact } = getDictionary(locale);
  return pageMetadata({ locale, path: "/impact", title: impact.metaTitle, description: impact.metaDescription });
}

export default async function ImpactPage({ params }: PageProps<"/[locale]/impact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.impact;
  const path = (p: string) => localePath(locale, p);

  return (
    <>
      <JsonLd data={webPageSchema({ type: "CollectionPage", locale, path: "/impact", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        photo="earth"
        photoAlt={dict.photos.earth}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.impact, href: path("/impact") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t.method.eyebrow} title={t.method.title} lead={t.method.text} />
        </Container>
      </section>

      <div className="space-y-24 pb-24 sm:space-y-32">
        {t.projects.map((project, i) => (
          <Container key={project.id}>
            <ProjectCase project={project} labels={dict.common} imageAlt={dict.photos[project.image]} flip={i % 2 === 1} />
          </Container>
        ))}
      </div>

      <section className="bg-sand py-24 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="reveal rounded-[2rem] bg-white p-8 sm:p-10">
            <Eyebrow>{t.africaNext.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">{t.africaNext.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t.africaNext.text}</p>
            <div className="mt-8">
              <ButtonLink href={path("/africa")} variant="outlineDark">
                {t.africaNext.link}
              </ButtonLink>
            </div>
          </div>
          <div className="reveal grid items-center gap-8 rounded-[2rem] bg-navy p-8 text-white sm:grid-cols-[1fr_auto] sm:p-10">
            <div>
              <Eyebrow tone="light">{t.measurement.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-bold">{t.measurement.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">{t.measurement.text}</p>
            </div>
            <PhotoCircle photos={["strategy"]} alts={[dict.photos.strategy]} className="mx-auto w-36" />
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow={dict.ctaBand.eyebrow}
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[
          { label: dict.cta.invest, href: `${path("/contact")}?topic=investment` },
          { label: dict.cta.partner, href: `${path("/contact")}?topic=partnership` },
        ]}
        photo="partnership"
        photoAlt={dict.photos.partnership}
      />
    </>
  );
}
