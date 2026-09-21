import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureCard, OfficeCard, PersonCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import type { IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { MotionBackdrop } from "@/components/MotionBackdrop";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { PhotoCircle } from "@/components/PhotoCircle";
import { Steps } from "@/components/Steps";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { flowIcons } from "@/config/icons";
import { advisors, founder, team } from "@/config/people";
import { localePath } from "@/config/routes";
import { officePlace, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { about } = getDictionary(locale);
  return pageMetadata({ locale, path: "/about", title: about.metaTitle, description: about.metaDescription });
}

const principleIcons: IconName[] = ["network", "book", "clock", "target", "leaf", "users"];

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.about;
  const path = (p: string) => localePath(locale, p);

  return (
    <>
      <JsonLd data={webPageSchema({ type: "AboutPage", locale, path: "/about", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        photo="partnership"
        photoAlt={dict.photos.partnership}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.about, href: path("/about") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      {/* Who we are, vision & mission */}
      <section className="py-24 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={t.story.eyebrow} title={t.story.title} />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
              {t.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="reveal">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="grid gap-5 self-center">
            {[
              { item: t.vision, style: "bg-brand-blue text-white" },
              { item: t.mission, style: "bg-brand-green text-white" },
            ].map(({ item, style }) => (
              <div key={item.title} className={`reveal rounded-[2rem] p-8 ${style}`}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">{item.title}</p>
                <p className="mt-4 font-display text-2xl font-bold leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="bg-sand py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.philosophy.eyebrow} title={t.philosophy.title} lead={t.philosophy.lead} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.philosophy.items.map((item, i) => (
              <FeatureCard key={item.title} icon={principleIcons[i]} title={item.title} text={item.text} tone="sand" />
            ))}
          </div>
        </Container>
      </section>

      {/* How GIA works */}
      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} lead={t.how.lead} />
          <div className="mt-16">
            <Steps steps={dict.flow.steps} icons={flowIcons} />
          </div>
        </Container>
      </section>

      {/* Why it matters */}
      <section className="relative isolate overflow-hidden py-24 text-white sm:py-28">
        <MotionBackdrop />
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} tone="light" />
            <PhotoCircle photos={["earth"]} alts={[dict.photos.earth]} className="mx-auto mt-14 hidden w-full max-w-xs lg:block" />
          </div>
          <div className="space-y-5">
            {t.why.items.map((item) => (
              <div key={item.title} className="reveal rounded-3xl bg-white/[0.07] p-8 ring-1 ring-white/10">
                <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Offices */}
      <section className="py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="reveal relative mx-auto w-full max-w-md">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-navy">
              <Photo name="earth" alt={dict.photos.earth} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={t.offices.eyebrow} title={t.offices.title} />
            <div className="mt-10 grid gap-5">
              <OfficeCard label={dict.offices.hq.label} place={officePlace(site.offices.hq)} text={t.offices.hq} />
              <OfficeCard label={dict.offices.africa.label} place={officePlace(site.offices.africa)} text={t.offices.africa} />
            </div>
          </div>
        </Container>
      </section>

      {/* People */}
      <section id="people" className="scroll-mt-24 bg-mist py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.people.eyebrow} title={t.people.title} />
          <h3 className="reveal mt-14 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{dict.common.founder}</h3>
          <div className="mt-5 max-w-3xl">
            <PersonCard person={founder} featured />
          </div>
          <h3 className="reveal mt-14 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{dict.common.team}</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
          <h3 className="reveal mt-14 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{dict.common.advisors}</h3>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {advisors.map((person) => (
              <PersonCard key={person.name} person={person} featured />
            ))}
          </div>
          <div className="reveal mt-14 grid items-center gap-8 rounded-[2rem] bg-navy p-8 text-white sm:grid-cols-[auto_1fr] sm:p-10">
            <PhotoCircle photos={["boardroom"]} alts={[dict.photos.boardroom]} className="mx-auto w-40" />
            <div>
              <h3 className="font-display text-2xl font-bold">{t.people.council.title}</h3>
              <p className="mt-3 leading-relaxed text-white/80">{t.people.council.text}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Implementation partner */}
      <section className="py-24 sm:py-28">
        <Container className="max-w-4xl text-center">
          <Eyebrow>{t.foundation.eyebrow}</Eyebrow>
          <h2 className="reveal mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t.foundation.title}</h2>
          <p className="reveal mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">{t.foundation.text}</p>
        </Container>
      </section>

      <CtaBanner
        eyebrow={dict.ctaBand.eyebrow}
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[
          { label: dict.cta.conversation, href: path("/contact") },
          { label: dict.cta.join, href: `${path("/contact")}?topic=membership` },
        ]}
        photo="handshake"
        photoAlt={dict.photos.handshake}
      />
    </>
  );
}
