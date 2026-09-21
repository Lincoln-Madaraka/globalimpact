import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import type { IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { ButtonLink, CheckList, Container, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/path-of-wisdom">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { wisdom } = getDictionary(locale);
  return pageMetadata({ locale, path: "/path-of-wisdom", title: wisdom.metaTitle, description: wisdom.metaDescription });
}

const themeIcons: IconName[] = ["compass", "book", "tree", "messages", "eye", "network", "leaf"];

export default async function PathOfWisdomPage({ params }: PageProps<"/[locale]/path-of-wisdom">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.wisdom;
  const path = (p: string) => localePath(locale, p);

  return (
    <>
      <JsonLd data={webPageSchema({ locale, path: "/path-of-wisdom", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        photo="boardroom"
        photoAlt={dict.photos.boardroom}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.pathOfWisdom, href: path("/path-of-wisdom") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      <section className="py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <SectionHeading title={t.intro.title} />
            <p className="reveal mt-6 text-lg leading-relaxed text-ink-soft">{t.intro.text}</p>
          </div>
          <div className="reveal relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-brand-blue/15">
              <Photo name="strategy" alt={dict.photos.strategy} />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.themes.eyebrow} title={t.themes.title} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.themes.items.map((item, i) => (
              <FeatureCard key={item.title} icon={themeIcons[i]} title={item.title} text={item.text} tone="sand" />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.programmes.eyebrow} title={t.programmes.title} />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.programmes.items.map((item) => (
              <li key={item.title} className="reveal flex flex-col rounded-3xl border border-line bg-white p-7 transition-shadow hover:shadow-xl hover:shadow-brand-blue/10">
                <span className="w-fit rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-bold text-brand-blue">{item.format}</span>
                <h3 className="mt-5 font-display text-2xl font-bold text-ink">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-mist py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          {[t.audience, t.outcomes].map((block) => (
            <div key={block.title} className="reveal rounded-[2rem] bg-white p-8 sm:p-10">
              <h2 className="font-display text-3xl font-bold text-ink">{block.title}</h2>
              <CheckList items={block.items} className="mt-8" />
            </div>
          ))}
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container className="max-w-3xl text-center">
          <h2 className="reveal font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t.next.title}</h2>
          <p className="reveal mt-6 text-lg leading-relaxed text-ink-soft">{t.next.text}</p>
          <div className="mt-9 flex justify-center">
            <ButtonLink href={path("/path-of-action")} variant="blue">
              {t.next.link}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow={dict.ctaBand.eyebrow}
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[
          { label: dict.cta.conversation, href: `${path("/contact")}?topic=wisdom` },
          { label: dict.cta.join, href: `${path("/contact")}?topic=membership` },
        ]}
        photo="partnership"
        photoAlt={dict.photos.partnership}
      />
    </>
  );
}
