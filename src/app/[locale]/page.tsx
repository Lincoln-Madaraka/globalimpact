import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AfricaLinesMap } from "@/components/AfricaLinesMap";
import { AreaCard, CardGrid, DetailCard, PortraitCard, ProjectCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { Figure } from "@/components/Figure";
import { SpinningEarth } from "@/components/SpinningEarth";
import { Steps } from "@/components/Steps";
import { ButtonLink, CheckList, Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { advisors, founder } from "@/config/people";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "", title: dict.meta.homeTitle, description: dict.meta.description, absoluteTitle: true });
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.home;
  const path = (p: string) => localePath(locale, p);

  const paths = [
    { path: t.framework.wisdom, href: path("/path-of-wisdom") },
    { path: t.framework.action, href: path("/path-of-action") },
  ];

  const pathBlock = ({ path: p, href }: (typeof paths)[number]) => (
    <div key={p.label} className="reveal flex flex-col border-t-2 border-navy-900 pt-8">
      <h3 className="font-display text-[2rem] font-semibold leading-tight text-ink">{p.label}</h3>
      <p className="mt-2 text-lead text-ink-soft">{p.tagline}</p>
      <CheckList items={p.points} className="mt-6" />
      <TextLink href={href} className="mt-auto self-start pt-8">
        {dict.common.learnMore}
      </TextLink>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section className="on-dark bg-dusk relative isolate overflow-hidden text-white">
        <Container className="pointer-events-none relative z-10 pt-32 lg:flex lg:min-h-[clamp(42rem,100svh,58rem)] lg:items-center lg:pb-16 lg:pt-24">
          <div className="pointer-events-auto max-w-[36rem] lg:max-w-[30rem] xl:max-w-[38rem]">
            <h1 className="max-w-[12ch] font-display text-display text-white">
              {t.hero.title} <span className="block font-light">{t.hero.titleAccent}</span>
            </h1>
            <p className="mt-8 max-w-[34rem] text-lead text-white/72">{t.hero.lead}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={path("/contact")} variant="white" className="w-full sm:w-auto">
                {dict.cta.conversation}
              </ButtonLink>
              <ButtonLink href={path("/what-we-do")} variant="outlineLight" icon={null} className="w-full sm:w-auto">
                {dict.cta.explore}
              </ButtonLink>
            </div>
          </div>
        </Container>
        <div className="relative mt-12 h-[86vw] max-h-[36rem] lg:static lg:m-0 lg:h-auto lg:max-h-none">
          <SpinningEarth
            label={dict.common.pauseEarth}
            controlClassName="absolute bottom-5 right-5 z-20"
            className="absolute left-[10vw] top-0 aspect-square w-[122vw] max-w-[46rem] md:left-[30vw] lg:left-auto lg:right-0 lg:top-[calc(50%+2.5rem)] lg:w-[min(56vw,90svh)] lg:max-w-none lg:-translate-y-1/2 lg:translate-x-[30%] xl:w-[min(62vw,96svh,56rem)] xl:translate-x-[24%]"
          />
        </div>
      </section>

      {/* At a glance */}
      <Container>
        <dl className="grid grid-cols-2 gap-px border-b border-line bg-line lg:grid-cols-4">
          {t.glance.map((item) => (
            <div
              key={item.label}
              className="flex flex-col-reverse justify-end gap-2 bg-white px-4 py-7 max-lg:odd:pl-0 sm:px-6 lg:py-12 lg:first:pl-0"
            >
              <dt className="text-[0.9375rem] text-ink-soft">{item.label}</dt>
              <dd className="whitespace-nowrap font-display text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[clamp(1.75rem,1.4rem+1vw,2.25rem)]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* The challenge */}
      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <SectionHeading title={t.challenge.title} />
            <p className="reveal mt-6 text-lead text-ink-soft">{t.challenge.text}</p>
            <p className="reveal mt-10 border-l-2 border-navy-900 pl-6 font-display text-statement text-ink">{t.challenge.closing}</p>
          </div>
          <ol className="reveal border-b border-line lg:col-span-5 lg:self-center">
            {t.challenge.points.map((point, i) => (
              <li key={point.title} className="grid grid-cols-[3rem_1fr] border-t border-line py-6">
                <span className="pt-0.5 text-index tabular-nums text-muted">{pad(i + 1)}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{point.title}</h3>
                  <p className="mt-2 text-ink-soft">{point.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* What GIA does differently */}
      <Section tone="ivory">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
            <SectionHeading title={t.different.title} lead={t.different.lead} className="lg:col-span-5" />
            <div className="reveal grid gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:col-span-7">
              {t.different.items.map((item) => (
                <div key={item.title} className="border-t border-line pt-6">
                  <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-ink-soft">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <h3 className="mt-14 font-display text-xl font-semibold text-ink lg:mt-20">{dict.flow.title}</h3>
          <div className="mt-8">
            <Steps steps={dict.flow.steps} />
          </div>
        </Container>
      </Section>

      {/* Two paths */}
      <Section tone="white">
        <Container>
          <SectionHeading title={t.framework.title} lead={t.framework.lead} />
          <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[1fr_20rem_1fr] lg:gap-12">
            {pathBlock(paths[0])}
            <Figure
              name="womens-circle"
              alt={dict.photos["womens-circle"]}
              ratio="4/5"
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 24rem, 90vw"
              className="order-first w-full max-w-sm lg:order-none lg:max-w-none"
            />
            {pathBlock(paths[1])}
          </div>
        </Container>
      </Section>

      {/* Eight areas of work */}
      <Section tone="ivory">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading title={t.areas.title} lead={t.areas.lead} />
            <TextLink href={path("/what-we-do")} className="shrink-0">
              {dict.nav.whatWeDo}
            </TextLink>
          </div>
          <CardGrid className="mt-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {dict.areas.map((area, i) => (
              <AreaCard
                key={area.id}
                index={i}
                area={area}
                href={`${path("/what-we-do")}#${area.id}`}
                labels={{
                  more: dict.common.readMore,
                  close: dict.common.close,
                  whatItIs: dict.common.whatItIs,
                  whoItServes: dict.common.whoItServes,
                  whatGiaDoes: dict.common.whatGiaDoes,
                  outcome: dict.common.outcome,
                  link: dict.common.seeInWhatWeDo,
                }}
              />
            ))}
          </CardGrid>
        </Container>
      </Section>

      {/* Global reach */}
      <Section tone="white">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <SectionHeading title={t.reach.title} />
            <p className="reveal mt-6 text-lead text-ink-soft">{t.reach.text}</p>
            <ul className="reveal mt-10 grid grid-cols-2 gap-px border-y border-line bg-line">
              {t.reach.places.map((place) => (
                <li key={place} className="bg-white py-4 pr-4 font-medium text-ink even:pl-4">
                  {place}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Figure
              name="desk-globe"
              alt={dict.photos["desk-globe"]}
              ratio="4/5"
              sizes="(min-width: 640px) 32rem, 90vw"
              className="reveal max-w-lg lg:ml-auto"
            />
          </div>
        </Container>
      </Section>

      {/* Africa */}
      <Section tone="ivory">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <AfricaLinesMap label={t.africa.mapLabel} className="mx-auto max-w-lg" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading title={t.africa.title} />
            <p className="reveal mt-6 text-lead text-ink-soft">{t.africa.text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={path("/africa")}>{t.africa.link}</ButtonLink>
              <ButtonLink href={`${path("/contact")}?topic=africa`} variant="outlineDark">
                {dict.cta.collaborate}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Strategic partnerships */}
      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <SectionHeading title={t.partnerships.title} />
            <p className="reveal mt-6 text-lead text-ink-soft">{t.partnerships.text}</p>
            <div className="reveal mt-10 border-t border-line pt-6">
              <p className="text-small text-muted">{t.partnerships.foundation.label}</p>
              <p className="mt-2 font-display text-2xl font-semibold text-ink">{t.partnerships.foundation.name}</p>
              <p className="mt-3 text-ink-soft">{t.partnerships.foundation.text}</p>
            </div>
            <TextLink href={path("/partners")} className="mt-8">
              {t.partnerships.link}
            </TextLink>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="font-display text-xl font-semibold text-ink">{t.partnerships.circlesTitle}</h3>
            <CardGrid className="mt-6 sm:grid-cols-2">
              {dict.partners.circles.items.map((circle) => (
                <DetailCard
                  key={circle.title}
                  title={circle.title}
                  teaser={circle.role}
                  tone="white"
                  moreLabel={dict.common.readMore}
                  closeLabel={dict.common.close}
                  body={
                    <dl className="space-y-5">
                      <div>
                        <dt className="text-small font-semibold text-ink">{dict.partners.circles.whoLabel}</dt>
                        <dd className="mt-1.5">{circle.who}</dd>
                      </div>
                      <div>
                        <dt className="text-small font-semibold text-ink">{dict.partners.circles.roleLabel}</dt>
                        <dd className="mt-1.5">{circle.role}</dd>
                      </div>
                    </dl>
                  }
                />
              ))}
            </CardGrid>
            <div className="mt-8">
              <ButtonLink href={`${path("/contact")}?topic=membership`}>{dict.cta.join}</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stories of impact */}
      <Section tone="ivory">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading title={t.stories.title} lead={t.stories.lead} />
            <TextLink href={path("/impact")} className="shrink-0">
              {t.stories.link}
            </TextLink>
          </div>
          <div className="reveal mt-10 grid gap-10 md:grid-cols-3 lg:mt-12">
            {dict.impact.projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                href={`${path("/impact")}#${project.id}`}
                labels={dict.common}
                linkLabel={dict.common.seeFullStory}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Leadership */}
      <Section tone="white">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading title={t.leadership.title} lead={t.leadership.lead} />
            <TextLink href={`${path("/about")}#people`} className="shrink-0">
              {t.leadership.link}
            </TextLink>
          </div>
          <div className="reveal mt-10 lg:mt-12">
            <PortraitCard person={founder} featured moreLabel={dict.common.readMore} closeLabel={dict.common.close} />
          </div>
          <div className="reveal mt-12 grid gap-8 sm:grid-cols-3">
            {advisors.map((person) => (
              <PortraitCard
                key={person.name}
                person={person}
                compactOnPhone
                moreLabel={dict.common.readMore}
                closeLabel={dict.common.close}
              />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner
        title={t.cta.title}
        text={t.cta.text}
        actions={[
          { label: dict.cta.partner, href: `${path("/contact")}?topic=partnership` },
          { label: dict.cta.join, href: `${path("/contact")}?topic=membership` },
          { label: dict.cta.invest, href: `${path("/contact")}?topic=investment` },
        ]}
      />
    </>
  );
}
