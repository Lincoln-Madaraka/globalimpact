import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import type { IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { MotionBackdrop } from "@/components/MotionBackdrop";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { ButtonLink, CheckList, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/africa">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { africa } = getDictionary(locale);
  return pageMetadata({ locale, path: "/africa", title: africa.metaTitle, description: africa.metaDescription });
}

const themeIcons: IconName[] = ["tree", "users", "leaf", "sprout", "compass", "trendingUp", "rocket", "network", "sunrise"];
const principleIcons: IconName[] = ["users", "clock", "book", "trendingUp"];

export default async function AfricaPage({ params }: PageProps<"/[locale]/africa">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.africa;
  const path = (p: string) => localePath(locale, p);

  return (
    <>
      <JsonLd data={webPageSchema({ locale, path: "/africa", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        photo="earth"
        photoAlt={dict.photos.earth}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.africa, href: path("/africa") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      >
        <ButtonLink href={`${path("/contact")}?topic=africa`}>{dict.cta.collaborate}</ButtonLink>
      </PageHero>

      <section className="py-24 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading eyebrow={t.perspective.eyebrow} title={t.perspective.title} />
          <div className="space-y-5 text-lg leading-relaxed text-ink-soft lg:pt-10">
            {t.perspective.paragraphs.map((paragraph) => (
              <p key={paragraph} className="reveal">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={t.hub.eyebrow} title={t.hub.title} />
            <p className="reveal mt-6 text-lg leading-relaxed text-ink-soft">{t.hub.text}</p>
            <CheckList items={t.hub.points} className="reveal mt-8" />
          </div>
          <div className="reveal relative mx-auto w-full max-w-md">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-navy shadow-2xl shadow-brand-blue/15">
              <Photo name="partnership" alt={dict.photos.partnership} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.themes.eyebrow} title={t.themes.title} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.themes.items.map((item, i) => (
              <FeatureCard key={item.title} icon={themeIcons[i]} title={item.title} text={item.text} />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden py-24 text-white sm:py-28">
        <MotionBackdrop />
        <Container>
          <SectionHeading eyebrow={t.principles.eyebrow} title={t.principles.title} tone="light" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.principles.items.map((item, i) => (
              <FeatureCard key={item.title} icon={principleIcons[i]} title={item.title} text={item.text} tone="dark" />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <div className="reveal grid items-center gap-10 rounded-[2.5rem] border border-line bg-white p-8 shadow-sm sm:p-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <Eyebrow>{t.initiatives.eyebrow}</Eyebrow>
              <span className="ml-3 inline-flex rounded-full bg-brand-green-50 px-3 py-1 align-middle text-xs font-bold text-brand-green-700">
                {t.initiatives.status}
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.initiatives.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{t.initiatives.text}</p>
              <div className="mt-8">
                <ButtonLink href={`${path("/contact")}?topic=africa`} variant="blue">
                  {dict.cta.collaborate}
                </ButtonLink>
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-full">
              <Photo name="community" alt={dict.photos.community} />
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow={dict.ctaBand.eyebrow}
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[
          { label: dict.cta.collaborate, href: `${path("/contact")}?topic=africa` },
          { label: dict.cta.invest, href: `${path("/contact")}?topic=investment` },
        ]}
        photo="boardroom"
        photoAlt={dict.photos.boardroom}
      />
    </>
  );
}
