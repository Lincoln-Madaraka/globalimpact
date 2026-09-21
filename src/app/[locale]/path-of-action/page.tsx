import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureCard, ProjectCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import type { IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { MotionBackdrop } from "@/components/MotionBackdrop";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Steps } from "@/components/Steps";
import { Container, SectionHeading, TextLink } from "@/components/ui";
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

const themeIcons: IconName[] = ["mapPin", "handshake", "trendingUp", "rocket", "users", "barChart"];
const mechanismIcons: IconName[] = ["home", "sprout", "search", "network", "target"];
const cycleIcons: IconName[] = ["search", "compass", "handshake", "rocket", "barChart"];

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
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        photo="consultation"
        photoAlt={dict.photos.consultation}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.pathOfAction, href: path("/path-of-action") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading title={t.intro.title} lead={t.intro.text} />
          <h3 className="reveal mt-16 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{t.themes.eyebrow}</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.themes.items.map((item, i) => (
              <FeatureCard key={item.title} icon={themeIcons[i]} title={item.title} text={item.text} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={t.mechanisms.eyebrow} title={t.mechanisms.title} />
            <div className="reveal relative mt-10 hidden aspect-[3/4] max-w-sm overflow-hidden rounded-[2.5rem] shadow-2xl shadow-brand-blue/15 lg:block">
              <Photo name="compliance" alt={dict.photos.compliance} />
            </div>
          </div>
          <div className="grid gap-5">
            {t.mechanisms.items.map((item, i) => (
              <FeatureCard key={item.title} icon={mechanismIcons[i]} title={item.title} text={item.text} tone="sand" />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden py-24 text-white sm:py-28">
        <MotionBackdrop />
        <Container>
          <SectionHeading eyebrow={t.cycle.eyebrow} title={t.cycle.title} tone="light" />
          <div className="mt-16">
            <Steps steps={t.cycle.steps} icons={cycleIcons} tone="light" />
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={dict.home.stories.eyebrow} title={dict.home.stories.title} />
            <TextLink href={path("/impact")} className="shrink-0">
              {dict.home.stories.link}
            </TextLink>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {dict.impact.projects.map((project) => (
              <ProjectCard
                key={project.id}
                href={`${path("/impact")}#${project.id}`}
                image={project.image}
                imageAlt={dict.photos[project.image]}
                title={project.title}
                place={project.place}
                text={project.approach}
                status={project.status}
              />
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow={dict.cta.invest}
        title={t.invest.title}
        text={t.invest.text}
        actions={[
          { label: dict.cta.invest, href: `${path("/contact")}?topic=investment` },
          { label: dict.cta.partner, href: `${path("/contact")}?topic=partnership` },
        ]}
        photo="handshake"
        photoAlt={dict.photos.handshake}
      />
    </>
  );
}
