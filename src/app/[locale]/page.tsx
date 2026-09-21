import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { Icon, type IconName } from "@/components/Icon";
import { MotionBackdrop } from "@/components/MotionBackdrop";
import { Photo } from "@/components/Photo";
import { PhotoCircle } from "@/components/PhotoCircle";
import { PillarCard } from "@/components/PillarCard";
import { StatsBand } from "@/components/StatsBand";
import { Steps } from "@/components/Steps";
import { ButtonLink, CheckList, Container, Eyebrow, IconBadge, SectionHeading, TextLink } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { pillarSlugs } from "@/config/pillars";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "", title: dict.meta.homeTitle, description: dict.meta.description, absoluteTitle: true });
}

const whyIcons: IconName[] = ["fileText", "globe", "users", "shield"];

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.home;
  const heroPhotos = ["boardroom", "handshake", "strategy", "office", "consultation"] as const;

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <MotionBackdrop />
        <Container className="grid min-h-[100svh] items-center gap-14 pb-40 pt-32 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-44 lg:pt-36">
          <div>
            <Eyebrow tone="light">{t.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl">
              {t.hero.title}{" "}
              <span className="bg-gradient-to-r from-white via-[#9ae8dc] to-[#ff9aa3] bg-clip-text text-transparent">
                {t.hero.titleAccent}
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">{t.hero.lead}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={localePath(locale, "/contact")}>{t.hero.primary}</ButtonLink>
              <ButtonLink href={localePath(locale, "/what-we-do")} variant="outlineLight">
                {t.hero.secondary}
              </ButtonLink>
            </div>
          </div>
          <PhotoCircle
            photos={[...heroPhotos]}
            alts={heroPhotos.map((name) => dict.photos[name])}
            preload
            className="mx-auto w-full max-w-[18rem] sm:max-w-sm lg:max-w-md xl:max-w-lg"
          />
        </Container>
      </section>

      <Container className="relative z-10 -mt-24">
        <StatsBand dict={dict} />
      </Container>

      <section className="py-24 sm:py-28">
        <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative mx-auto w-full max-w-lg">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-mist">
              <Photo name="partnership" alt={dict.photos.partnership} />
            </div>
            <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-brand-blue/10 sm:-left-6">
              <span className="grid size-10 place-items-center rounded-full bg-brand-red-50 text-brand-red-700">
                <Icon name="mapPin" className="size-5" />
              </span>
              <span className="font-bold text-ink">İstanbul, Türkiye</span>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={t.intro.eyebrow} title={t.intro.title} />
            <p className="reveal mt-6 text-lg leading-relaxed text-ink-soft">{t.intro.text}</p>
            <CheckList items={t.intro.points} className="reveal mt-8" />
            <TextLink href={localePath(locale, "/about")} className="mt-10">
              {t.intro.link}
            </TextLink>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-mist py-24 sm:py-28">
        <div aria-hidden="true" className="absolute -left-40 top-20 size-96 rounded-full border-[40px] border-brand-blue/5" />
        <div aria-hidden="true" className="absolute -right-24 bottom-10 size-72 rounded-full border-[30px] border-brand-green/5" />
        <Container className="relative">
          <SectionHeading eyebrow={t.pillars.eyebrow} title={t.pillars.title} lead={t.pillars.lead} align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillarSlugs.map((slug, i) => (
              <PillarCard key={slug} slug={slug} locale={locale} dict={dict} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.approach.eyebrow} title={t.approach.title} lead={t.approach.lead} />
          <div className="mt-16">
            <Steps steps={dict.approach.steps.map(({ title, text }) => ({ title, text }))} />
          </div>
        </Container>
      </section>

      <section className="bg-mist py-24 sm:py-28">
        <Container className="grid items-center gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="reveal relative isolate mx-auto w-full max-w-md">
            <div aria-hidden="true" className="absolute -left-8 -top-8 -z-10 size-44 rounded-full bg-brand-green/15" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-brand-blue/20">
              <Photo name="consultation" alt={dict.photos.consultation} />
            </div>
            <span aria-hidden="true" className="absolute -right-4 -top-4 size-14 rounded-full bg-brand-red shadow-lg shadow-brand-red/40" />
          </div>
          <div>
            <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {t.why.items.map((item, i) => (
                <div key={item.title} className="reveal rounded-3xl bg-white p-6 shadow-sm">
                  <IconBadge name={whyIcons[i]} className="bg-brand-blue-50 text-brand-blue" />
                  <h3 className="mt-5 text-lg font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow={dict.cta.eyebrow}
        title={t.cta.title}
        text={t.cta.text}
        primaryLabel={t.cta.primary}
        primaryHref={localePath(locale, "/contact")}
        secondaryLabel={dict.common.emailUs}
        photoAlt={dict.photos.handshake}
      />
    </>
  );
}
