import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { Icon, type IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/partners">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { partners } = getDictionary(locale);
  return pageMetadata({ locale, path: "/partners", title: partners.metaTitle, description: partners.metaDescription });
}

const whyIcons: IconName[] = ["globe", "search", "network", "clock"];
const categoryIcons: IconName[] = ["tree", "trendingUp", "heart", "building", "landmark", "flask", "heartHandshake", "graduation", "rocket", "globe"];
const circleStyles = ["bg-brand-green", "bg-brand-blue", "bg-brand-red-700", "bg-navy"];
const circleIcons: IconName[] = ["tree", "sparkles", "sprout", "handshake"];

export default async function PartnersPage({ params }: PageProps<"/[locale]/partners">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.partners;
  const path = (p: string) => localePath(locale, p);

  return (
    <>
      <JsonLd data={webPageSchema({ locale, path: "/partners", name: t.metaTitle, description: t.metaDescription })} />
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        photo="handshake"
        photoAlt={dict.photos.handshake}
        crumbs={[
          { name: dict.nav.home, href: path("") },
          { name: dict.nav.partners, href: path("/partners") },
        ]}
        crumbsLabel={dict.nav.breadcrumb}
      >
        <ButtonLink href={`${path("/contact")}?topic=partnership`}>{dict.cta.partner}</ButtonLink>
      </PageHero>

      <section className="py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="reveal relative mx-auto w-full max-w-md">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-mist">
              <Photo name="partnership" alt={dict.photos.partnership} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {t.why.items.map((item, i) => (
                <FeatureCard key={item.title} icon={whyIcons[i]} title={item.title} text={item.text} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.categories.eyebrow} title={t.categories.title} />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {t.categories.items.map((item, i) => (
              <li key={item.title} className="reveal rounded-3xl bg-white p-6">
                <Icon name={categoryIcons[i]} className="size-7 text-brand-blue" />
                <h3 className="mt-4 font-extrabold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="join" className="scroll-mt-24 py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.circles.eyebrow} title={t.circles.title} lead={t.circles.lead} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {t.circles.items.map((circle, i) => (
              <div key={circle.title} className="reveal flex flex-col rounded-[2rem] border border-line bg-white p-8">
                <span className={`grid size-14 place-items-center rounded-full text-white ${circleStyles[i]}`}>
                  <Icon name={circleIcons[i]} className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-bold text-ink">{circle.title}</h3>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">{t.circles.whoLabel}</dt>
                    <dd className="mt-1 leading-relaxed text-ink">{circle.who}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">{t.circles.roleLabel}</dt>
                    <dd className="mt-1 leading-relaxed text-ink">{circle.role}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href={`${path("/contact")}?topic=membership`} variant="blue">
              {dict.cta.join}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.current.eyebrow} title={t.current.title} />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <div className="reveal rounded-[2rem] bg-navy p-8 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">{t.current.strategic.label}</p>
              <p className="mt-3 font-display text-3xl font-bold">{t.current.strategic.name}</p>
            </div>
            {[
              { label: t.current.projectLabel, names: t.current.project },
              { label: t.current.supportersLabel, names: t.current.supporters },
            ].map((group) => (
              <div key={group.label} className="reveal rounded-[2rem] bg-white p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">{group.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.names.map((name) => (
                    <li key={name} className="flex items-center gap-2.5 font-bold text-ink">
                      <Icon name="check" className="size-4 shrink-0 text-brand-green" />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow={dict.ctaBand.eyebrow}
        title={dict.ctaBand.title}
        text={dict.ctaBand.text}
        actions={[
          { label: dict.cta.partner, href: `${path("/contact")}?topic=partnership` },
          { label: dict.cta.join, href: `${path("/contact")}?topic=membership` },
        ]}
        photo="partnership"
        photoAlt={dict.photos.partnership}
      />
    </>
  );
}
