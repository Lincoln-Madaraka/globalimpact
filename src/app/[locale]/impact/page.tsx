import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProjectCase } from "@/components/ProjectCase";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
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

const blockTitle = "font-display text-[clamp(1.75rem,1.4rem+1vw,2.5rem)] font-semibold leading-[1.12] tracking-tight text-ink";

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
        title={t.hero.title}
        lead={t.hero.lead}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.impact, href: path("/impact") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      <Section tone="white">
        <Container>
          <SectionHeading title={t.method.title} lead={t.method.text} />
        </Container>
      </Section>

      <Section tone="white" divider>
        <Container>
          {t.projects.map((project, i) => (
            <div key={project.id} className={i > 0 ? "mt-16 border-t border-line pt-16" : ""}>
              <ProjectCase project={project} labels={dict.common} imageAlt={project.image ? dict.photos[project.image] : undefined} />
            </div>
          ))}
        </Container>
      </Section>

      <Section tone="ivory">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="reveal border-t border-line pt-6">
            <h2 className={blockTitle}>{t.africaNext.title}</h2>
            <p className="mt-4 max-w-[36rem] text-lead text-ink-soft">{t.africaNext.text}</p>
            <ButtonLink href={path("/africa")} variant="outlineDark" className="mt-8">
              {t.africaNext.link}
            </ButtonLink>
          </div>
          <div className="reveal border-t border-line pt-6">
            <h2 className={blockTitle}>{t.measurement.title}</h2>
            <p className="mt-4 max-w-[36rem] text-lead text-ink-soft">{t.measurement.text}</p>
          </div>
        </Container>
      </Section>

      <CtaBanner
        tone="white"
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[
          { label: dict.cta.invest, href: `${path("/contact")}?topic=investment` },
          { label: dict.cta.partner, href: `${path("/contact")}?topic=partnership` },
        ]}
      />
    </>
  );
}
