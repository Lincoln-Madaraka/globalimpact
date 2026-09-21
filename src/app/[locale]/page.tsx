import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaCard, FeatureCard, PersonCard, ProjectCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { Icon, type IconName } from "@/components/Icon";
import { MotionBackdrop } from "@/components/MotionBackdrop";
import { PhotoCircle } from "@/components/PhotoCircle";
import { Steps } from "@/components/Steps";
import { ButtonLink, CheckList, Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { areaIcons, flowIcons } from "@/config/icons";
import { advisors, founder } from "@/config/people";
import { localePath } from "@/config/routes";
import { officePlace, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "", title: dict.meta.homeTitle, description: dict.meta.description, absoluteTitle: true });
}

const differentIcons: IconName[] = ["book", "compass", "sprout", "target"];
const circleIcons: IconName[] = ["tree", "sparkles", "sprout", "handshake"];

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.home;
  const path = (p: string) => localePath(locale, p);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden text-white">
        <MotionBackdrop />
        <Container className="grid min-h-[100svh] items-center gap-14 pb-36 pt-32 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-40 lg:pt-36">
          <div>
            <Eyebrow tone="light">{t.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-[2.9rem] font-bold leading-[1.02] tracking-tight sm:text-7xl xl:text-8xl">
              {t.hero.title}{" "}
              <span className="bg-gradient-to-r from-white to-[#a9c6ff] bg-clip-text text-transparent">
                {t.hero.titleAccent}
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">{t.hero.lead}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={path("/contact")}>{dict.cta.conversation}</ButtonLink>
              <ButtonLink href={path("/what-we-do")} variant="outlineLight">
                {dict.cta.explore}
              </ButtonLink>
            </div>
          </div>
          <PhotoCircle photos={["earth"]} alts={[dict.photos.earth]} preload className="mx-auto w-full max-w-[19rem] sm:max-w-md lg:max-w-lg" />
        </Container>
      </section>

      {/* At a glance */}
      <Container className="relative z-10 -mt-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-xl shadow-brand-blue/10 lg:grid-cols-4">
          {t.glance.map((item) => (
            <div key={item.label} className="flex flex-col-reverse gap-1.5 bg-white p-6 sm:p-8">
              <dt className="text-sm leading-snug text-ink-soft">{item.label}</dt>
              <dd className="font-display text-2xl font-bold text-brand-blue sm:text-3xl">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* The challenge */}
      <section className="py-24 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={t.challenge.eyebrow} title={t.challenge.title} />
            <p className="reveal mt-6 text-lg leading-relaxed text-ink-soft">{t.challenge.text}</p>
            <p className="reveal mt-8 border-l-4 border-brand-red pl-5 font-display text-2xl font-bold leading-snug text-ink">
              {t.challenge.closing}
            </p>
          </div>
          <ul className="space-y-4 self-center">
            {t.challenge.points.map((point, i) => (
              <li key={point.title} className="reveal flex gap-5 rounded-3xl bg-sand p-6">
                <span className="font-display text-4xl font-bold text-brand-red-700/80">0{i + 1}</span>
                <span>
                  <span className="block text-lg font-extrabold text-ink">{point.title}</span>
                  <span className="mt-1 block leading-relaxed text-ink-soft">{point.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What GIA does differently */}
      <section className="relative isolate overflow-hidden py-24 text-white sm:py-28">
        <MotionBackdrop />
        <Container>
          <SectionHeading eyebrow={t.different.eyebrow} title={t.different.title} lead={t.different.lead} tone="light" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.different.items.map((item, i) => (
              <FeatureCard key={item.title} icon={differentIcons[i]} title={item.title} text={item.text} tone="dark" />
            ))}
          </div>
          <h3 className="mt-20 text-xs font-bold uppercase tracking-[0.18em] text-white/70">{dict.flow.title}</h3>
          <div className="mt-8">
            <Steps steps={dict.flow.steps} icons={flowIcons} tone="light" />
          </div>
        </Container>
      </section>

      {/* Wisdom + Action */}
      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.framework.eyebrow} title={t.framework.title} lead={t.framework.lead} align="center" />
          <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
            {[
              { path: t.framework.wisdom, href: path("/path-of-wisdom"), accent: "bg-brand-blue" },
              { path: t.framework.action, href: path("/path-of-action"), accent: "bg-brand-green" },
            ].map(({ path: p, href, accent }, i) => (
              <div key={p.label} className={`reveal rounded-[2rem] border border-line bg-white p-8 shadow-sm ${i === 1 ? "lg:order-3" : ""}`}>
                <span className={`inline-block h-1.5 w-14 rounded-full ${accent}`} aria-hidden="true" />
                <h3 className="mt-6 font-display text-3xl font-bold text-ink">{p.label}</h3>
                <p className="mt-2 text-lg font-semibold text-brand-green-700">{p.tagline}</p>
                <CheckList items={p.points} className="mt-6" />
                <TextLink href={href} className="mt-8">
                  {dict.common.learnMore}
                </TextLink>
              </div>
            ))}
            <PhotoCircle photos={["strategy"]} alts={[dict.photos.strategy]} tone="light" className="order-first mx-auto w-full max-w-[16rem] sm:max-w-xs lg:order-2 lg:w-72" />
          </div>
        </Container>
      </section>

      {/* Areas of impact */}
      <section className="bg-mist py-24 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.areas.eyebrow} title={t.areas.title} lead={t.areas.lead} />
            <TextLink href={path("/what-we-do")} className="shrink-0">
              {dict.nav.whatWeDo}
            </TextLink>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.areas.map((area, i) => (
              <AreaCard
                key={area.id}
                href={`${path("/what-we-do")}#${area.id}`}
                icon={areaIcons[area.id]}
                title={area.title}
                text={area.short}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Global reach */}
      <section className="py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow={t.reach.eyebrow} title={t.reach.title} />
            <p className="reveal mt-6 text-lg leading-relaxed text-ink-soft">{t.reach.text}</p>
            <ul className="reveal mt-8 flex flex-wrap gap-2">
              {t.reach.places.map((place, i) => (
                <li
                  key={place}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                    i < 2 ? "bg-brand-blue text-white" : "bg-brand-green-50 text-brand-green-700"
                  }`}
                >
                  <Icon name="mapPin" className="size-4" />
                  {place}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">{dict.offices.hq.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-ink">{officePlace(site.offices.hq)}</p>
              <p className="mt-3 leading-relaxed text-ink-soft">{dict.offices.hq.text}</p>
            </div>
            <div className="rounded-3xl bg-navy p-7 text-white sm:translate-y-10">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{dict.offices.africa.label}</p>
              <p className="mt-2 font-display text-3xl font-bold">{officePlace(site.offices.africa)}</p>
              <p className="mt-3 leading-relaxed text-white/75">{dict.offices.africa.text}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Africa */}
      <section className="relative isolate overflow-hidden bg-sand py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <PhotoCircle photos={["earth"]} alts={[dict.photos.earth]} tone="light" className="reveal mx-auto w-full max-w-md" />
          <div>
            <Eyebrow>{t.africa.eyebrow}</Eyebrow>
            <h2 className="reveal mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {t.africa.title}
            </h2>
            <p className="reveal mt-6 text-lg leading-relaxed text-ink-soft">{t.africa.text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={path("/africa")} variant="blue">
                {t.africa.link}
              </ButtonLink>
              <ButtonLink href={`${path("/contact")}?topic=africa`} variant="outlineDark">
                {dict.cta.collaborate}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Strategic partnerships */}
      <section className="py-24 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={t.partnerships.eyebrow} title={t.partnerships.title} />
            <p className="reveal mt-6 text-lg leading-relaxed text-ink-soft">{t.partnerships.text}</p>
            <div className="reveal mt-8 rounded-3xl bg-brand-green-50 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green-700">{t.partnerships.foundation.label}</p>
              <p className="mt-2 font-display text-2xl font-bold text-ink">{t.partnerships.foundation.name}</p>
              <p className="mt-2 leading-relaxed text-ink-soft">{t.partnerships.foundation.text}</p>
            </div>
            <TextLink href={path("/partners")} className="mt-8">
              {t.partnerships.link}
            </TextLink>
          </div>
          <div>
            <h3 className="reveal text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{t.partnerships.circlesTitle}</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {dict.partners.circles.items.map((circle, i) => (
                <FeatureCard key={circle.title} icon={circleIcons[i]} title={circle.title} text={circle.role} />
              ))}
            </div>
            <div className="mt-8">
              <ButtonLink href={`${path("/contact")}?topic=membership`} variant="blue">
                {dict.cta.join}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Stories */}
      <section className="bg-mist py-24 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.stories.eyebrow} title={t.stories.title} lead={t.stories.lead} />
            <TextLink href={path("/impact")} className="shrink-0">
              {t.stories.link}
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
                text={project.challenge}
                status={project.status}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-24 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.leadership.eyebrow} title={t.leadership.title} lead={t.leadership.lead} />
            <TextLink href={`${path("/about")}#people`} className="shrink-0">
              {t.leadership.link}
            </TextLink>
          </div>
          <div className="mt-14 grid items-start gap-5 lg:grid-cols-2">
            <PersonCard person={founder} featured />
            <div className="grid gap-5">
              {advisors.map((person) => (
                <PersonCard key={person.name} person={person} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow={dict.ctaBand.eyebrow}
        title={t.cta.title}
        text={t.cta.text}
        actions={[
          { label: dict.cta.partner, href: `${path("/contact")}?topic=partnership` },
          { label: dict.cta.join, href: `${path("/contact")}?topic=membership` },
          { label: dict.cta.invest, href: `${path("/contact")}?topic=investment` },
        ]}
        photo="handshake"
        photoAlt={dict.photos.handshake}
      />
    </>
  );
}
