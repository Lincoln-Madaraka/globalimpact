import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardGrid, DetailCard, PortraitCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Steps } from "@/components/Steps";
import { Container, Section, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { advisors, expertAdvisors, founder, team } from "@/config/people";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { about } = getDictionary(locale);
  return pageMetadata({ locale, path: "/about", title: about.metaTitle, description: about.metaDescription });
}


const groupHeading = "border-t border-line pt-4 font-display text-xl font-semibold text-ink";

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.about;
  const path = (p: string) => localePath(locale, p);
  const close = dict.common.close;

  return (
    <>
      <JsonLd data={webPageSchema({ type: "AboutPage", locale, path: "/about", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        title={t.hero.title}
        lead={t.hero.lead}
        photo="kogi-elders"
        photoAlt={dict.photos["kogi-elders"]}
        photoPosition="100% 50%"
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.about, href: path("/about") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      />

      {/* Who we are, vision and mission */}
      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionHeading title={t.story.title} />
            <div className="reveal mt-10 space-y-5 text-lead text-ink-soft lg:mt-12">
              {t.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-10 self-start lg:col-span-5 lg:col-start-8 lg:pt-2">
            {[t.vision, t.mission].map((item) => (
              <div key={item.title} className="reveal">
                <p className="text-small font-semibold text-muted">{item.title}</p>
                <p className="mt-4 border-l-2 border-navy-900 pl-6 font-display text-[1.5rem] font-semibold leading-snug text-ink lg:text-[1.75rem]">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Philosophy */}
      <Section tone="ivory">
        <Container>
          <SectionHeading title={t.philosophy.title} lead={t.philosophy.lead} />
          <CardGrid className="mt-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {t.philosophy.items.map((item) => (
              <DetailCard
                key={item.title}
                title={item.title}
                teaser={item.text}
                body={<p className="text-lead">{item.text}</p>}
                tone="ivory"
                moreLabel={dict.common.readMore}
                closeLabel={close}
              />
            ))}
          </CardGrid>
        </Container>
      </Section>

      {/* How GIA works */}
      <Section tone="white">
        <Container>
          <SectionHeading title={t.how.title} lead={t.how.lead} />
          <div className="mt-10 lg:mt-12">
            <Steps steps={dict.flow.steps} />
          </div>
        </Container>
      </Section>

      {/* Why it matters */}
      <Section tone="navy">
        <Container>
          <SectionHeading title={t.why.title} tone="light" />
          <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-3 lg:gap-8">
            {t.why.items.map((item) => (
              <div key={item.title} className="reveal border-t border-white/20 pt-6">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-white/72">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* People */}
      <Section tone="ivory" id="people">
        <Container>
          <SectionHeading title={t.people.title} />

          <div className="mt-10 lg:mt-12">
            <h3 className={groupHeading}>{dict.common.founder}</h3>
            <div className="mt-8">
              <PortraitCard person={founder} featured moreLabel={dict.common.readMore} closeLabel={close} />
            </div>
          </div>

          <div className="mt-16">
            <h3 className={groupHeading}>{dict.common.team}</h3>
            <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {team.map((person) => (
                <PortraitCard key={person.name} person={person} moreLabel={dict.common.readMore} closeLabel={close} />
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className={groupHeading}>{dict.common.advisors}</h3>
            <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
              {advisors.map((person) => (
                <PortraitCard key={person.name} person={person} moreLabel={dict.common.readMore} closeLabel={close} />
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className={groupHeading}>{dict.common.expertAdvisors}</h3>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {expertAdvisors.map((person) => (
                <PortraitCard key={person.name} person={person} size="sm" mono moreLabel={dict.common.readMore} closeLabel={close} />
              ))}
            </div>
          </div>

          <div className="reveal mt-16">
            <h3 className={groupHeading}>{t.people.council.title}</h3>
            <p className="mt-4 max-w-2xl text-lead text-ink-soft">{t.people.council.text}</p>
          </div>
        </Container>
      </Section>

      {/* Implementation partner */}
      <Section tone="white">
        <Container>
          <div className="max-w-3xl">
            <h2 className="reveal font-display text-h2 text-ink">{t.foundation.title}</h2>
            <p className="reveal mt-6 text-lead text-ink-soft">{t.foundation.text}</p>
          </div>
        </Container>
      </Section>

      <CtaBanner
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[
          { label: dict.cta.conversation, href: path("/contact") },
          { label: dict.cta.join, href: `${path("/contact")}?topic=membership` },
        ]}
      />
    </>
  );
}
