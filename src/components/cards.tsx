import Link from "next/link";
import type { ReactNode } from "react";
import type { PhotoName } from "@/config/photos";
import { initials, type Person } from "@/config/people";
import type { Dictionary } from "@/i18n";
import { CardModal } from "./CardModal";
import { Figure } from "./Figure";
import { Icon } from "./Icon";
import { Meta, TextLink } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

const cellTones = {
  white: { cell: "bg-white", title: "text-ink", text: "text-ink-soft", index: "text-muted" },
  ivory: { cell: "bg-ivory hover:bg-white", title: "text-ink", text: "text-ink-soft", index: "text-muted" },
  dark: { cell: "bg-navy-900", title: "text-white", text: "text-white/72", index: "text-white/60" },
};

/** Parent for hairline card grids: the 1px gaps show the line colour between cells. */
export function CardGrid({ tone = "light", className = "", children }: { tone?: "light" | "dark"; className?: string; children: ReactNode }) {
  return (
    <div className={`reveal grid gap-px border-y ${tone === "dark" ? "border-white/14 bg-white/14" : "border-line bg-line"} ${className}`}>
      {children}
    </div>
  );
}

function MoreLabel({ label, tone }: { label: string; tone: keyof typeof cellTones }) {
  return (
    <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold sm:mt-8 ${tone === "dark" ? "text-white" : "text-ink"}`}>
      {label}
      <Icon name="plus" className="size-4 transition-transform duration-300 group-hover:rotate-90" />
    </span>
  );
}

/**
 * A card with a title (and optional teaser) that opens its full explanation in a modal.
 * Used for principles, themes, programmes, circles and partner categories.
 */
export function DetailCard({
  index,
  title,
  teaser,
  body,
  meta,
  image,
  imageAlt = "",
  tone = "white",
  moreLabel,
  closeLabel,
  className = "",
}: {
  index?: number;
  title: string;
  teaser?: string;
  body: ReactNode;
  meta?: string;
  image?: PhotoName;
  imageAlt?: string;
  tone?: keyof typeof cellTones;
  moreLabel: string;
  closeLabel: string;
  className?: string;
}) {
  const t = cellTones[tone];
  return (
    <CardModal
      title={title}
      closeLabel={closeLabel}
      wide={Boolean(image)}
      className={className}
      card={
        <div className={`flex h-full flex-col px-0 py-6 transition-colors sm:min-h-[14rem] sm:p-7 lg:p-8 ${t.cell}`}>
          {index !== undefined && <span className={`text-index tabular-nums ${t.index}`}>{pad(index + 1)}</span>}
          {meta && <Meta tone={tone === "dark" ? "light" : "dark"}>{meta}</Meta>}
          <h3 className={`font-display text-xl font-semibold leading-snug [text-wrap:pretty] ${t.title} ${index !== undefined || meta ? "mt-3 sm:mt-6" : ""}`}>{title}</h3>
          {teaser && <p className={`mt-3 flex-1 text-[0.9375rem] leading-relaxed ${t.text}`}>{teaser}</p>}
          <span className="flex-1" />
          <MoreLabel label={moreLabel} tone={tone} />
        </div>
      }
    >
      {image ? (
        <div className="grid gap-8 sm:grid-cols-[1fr_1.2fr]">
          <Figure name={image} alt={imageAlt} ratio="4/5" sizes="(min-width: 640px) 26rem, 90vw" />
          <div className="text-ink-soft">{body}</div>
        </div>
      ) : (
        <div className="text-ink-soft">{body}</div>
      )}
    </CardModal>
  );
}

/** One of the eight areas of work: summary on the card, full detail in the modal. */
export function AreaCard({
  index,
  area,
  href,
  labels,
}: {
  index: number;
  area: Dictionary["areas"][number];
  href: string;
  labels: { more: string; close: string; whatItIs: string; whoItServes: string; whatGiaDoes: string; outcome: string; link: string };
}) {
  return (
    <CardModal
      title={area.title}
      closeLabel={labels.close}
      wide
      card={
        <div className="flex h-full flex-col bg-ivory px-0 py-6 transition-colors group-hover:bg-white sm:min-h-[17rem] sm:p-7 lg:p-8">
          <span className="text-index tabular-nums text-muted">{pad(index + 1)}</span>
          <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink [text-wrap:pretty] sm:mt-10 lg:text-lg">{area.title}</h3>
          <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{area.short}</p>
          <MoreLabel label={labels.more} tone="ivory" />
        </div>
      }
    >
      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-small font-semibold text-ink">{labels.whatItIs}</dt>
          <dd className="mt-1.5 text-lead text-ink">{area.what}</dd>
        </div>
        <div>
          <dt className="text-small font-semibold text-ink">{labels.whoItServes}</dt>
          <dd className="mt-1.5 text-ink-soft">{area.who}</dd>
        </div>
        <div>
          <dt className="text-small font-semibold text-ink">{labels.whatGiaDoes}</dt>
          <dd className="mt-1.5">
            <ul className="space-y-2">
              {area.does.map((item) => (
                <li key={item} className="flex gap-2.5 text-ink">
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-navy-900" />
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className="border-l-2 border-navy-900 pl-5 sm:col-span-2">
          <dt className="text-small font-semibold text-ink">{labels.outcome}</dt>
          <dd className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink">{area.outcome}</dd>
        </div>
      </dl>
      <TextLink href={href} className="mt-8">
        {labels.link}
      </TextLink>
    </CardModal>
  );
}

/**
 * A person with a real portrait. With a bio, the card opens it in a modal ("Read more");
 * without one it is a plain card, so nothing opens an empty modal.
 */
export function PortraitCard({
  person,
  featured = false,
  size = "md",
  mono = false,
  compactOnPhone = false,
  moreLabel,
  closeLabel,
}: {
  person: Person;
  featured?: boolean;
  size?: "sm" | "md";
  /** On phones, show a small portrait beside the name instead of a full-width photo. */
  compactOnPhone?: boolean;
  /** Black-and-white portraits (turning to colour on hover), for rows of mixed photo styles. */
  mono?: boolean;
  moreLabel: string;
  closeLabel: string;
}) {
  // The featured card already shows the whole bio, so only the other cards open a modal.
  const interactive = Boolean(person.bio) && !featured;
  const tone = mono ? "grayscale transition-[filter] duration-500 group-hover:grayscale-0" : "";
  const portrait = person.photo ? (
    <Figure
      src={person.photo}
      alt={person.name}
      ratio="4/5"
      zoom={interactive}
      className={tone}
      sizes={featured ? "(min-width: 640px) 22rem, 90vw" : size === "sm" ? "(min-width: 1024px) 14vw, 45vw" : "(min-width: 1024px) 22vw, 45vw"}
    />
  ) : (
    <div className="grid aspect-[4/5] place-items-center bg-stone font-display text-4xl font-semibold text-muted">{initials(person.name)}</div>
  );
  const card = featured ? (
    <div className="grid h-full gap-8 sm:grid-cols-3 sm:items-center">
      {portrait}
      <div className="sm:col-span-2">
        <h3 className="font-display text-[1.75rem] font-semibold leading-tight text-ink">{person.name}</h3>
        <Meta className="mt-2">{person.role}</Meta>
        {person.bio && <p className="mt-5 max-w-[40rem] text-lead text-ink-soft">{person.bio}</p>}
      </div>
    </div>
  ) : (
    <div className={`group flex h-full flex-col ${compactOnPhone ? "max-sm:grid max-sm:grid-cols-[6.5rem_1fr] max-sm:items-center max-sm:gap-5" : ""}`}>
      {portrait}
      <div className="flex flex-1 flex-col">
        <h3
          className={`font-display font-semibold text-ink ${compactOnPhone ? "sm:mt-5" : "mt-5"} ${
            size === "sm" ? "text-base" : "text-[1.0625rem] sm:text-xl"
          }`}
        >
          {person.name}
        </h3>
        <Meta className="mt-1">{person.role}</Meta>
        {interactive && (
          <>
            <span className="flex-1" />
            <MoreLabel label={moreLabel} tone="white" />
          </>
        )}
      </div>
    </div>
  );
  if (!interactive) return card;
  return (
    <CardModal title={person.name} closeLabel={closeLabel} wide card={card}>
      <div className="grid gap-8 sm:grid-cols-[1fr_1.3fr]">
        {person.photo && <Figure src={person.photo} alt={person.name} ratio="4/5" sizes="(min-width: 640px) 24rem, 90vw" />}
        <div>
          <Meta>{person.role}</Meta>
          <p className="mt-4 text-lead text-ink-soft">{person.bio}</p>
        </div>
      </div>
    </CardModal>
  );
}

export function OfficeCard({ label, place, text, tone = "light" }: { label: string; place: string; text: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={`reveal border-t pt-6 ${dark ? "border-white/20" : "border-line"}`}>
      <p className={`text-small ${dark ? "text-white/60" : "text-muted"}`}>{label}</p>
      <p className={`mt-2 font-display text-[1.75rem] font-semibold leading-tight ${dark ? "text-white" : "text-ink"}`}>{place}</p>
      <p className={`mt-3 leading-relaxed ${dark ? "text-white/72" : "text-ink-soft"}`}>{text}</p>
    </div>
  );
}

type Project = Dictionary["impact"]["projects"][number];

/** The five parts of a project story, used in the Impact page and in project modals. */
export function ProjectStory({ project, labels }: { project: Project; labels: Dictionary["common"] }) {
  const steps = [
    { label: labels.challenge, body: project.challenge },
    { label: labels.approach, body: project.approach },
    { label: labels.partnership, body: project.partnership },
    { label: labels.action, body: project.action },
    { label: labels.impact, body: project.impact },
  ];
  return (
    <ol>
      {steps.map((step, i) => (
        <li
          key={step.label}
          className={`grid grid-cols-[2.5rem_1fr] gap-4 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6 ${i === steps.length - 1 ? "border-t-2 border-navy-900" : "border-t border-line"}`}
        >
          <span className="text-index tabular-nums text-muted">{pad(i + 1)}</span>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">{step.label}</h3>
            {Array.isArray(step.body) ? (
              <ul className="mt-3 space-y-2">
                {step.body.map((item) => (
                  <li key={item} className="flex gap-2.5 text-ink">
                    <Icon name="check" className="mt-1 size-4 shrink-0 text-navy-900" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Project teaser (typographic): place and title on the card, the full story in the modal. */
export function ProjectCard({
  project,
  href,
  labels,
  linkLabel,
}: {
  project: Project;
  href: string;
  labels: Dictionary["common"];
  linkLabel: string;
}) {
  return (
    <CardModal
      title={project.title}
      closeLabel={labels.close}
      wide
      card={
        <div className="flex h-full flex-col border-t-2 border-navy-900 pt-6">
          <Meta>
            {project.status} · {project.place}
          </Meta>
          <h3 className="mt-4 font-display text-[1.375rem] font-semibold leading-snug text-ink [text-wrap:pretty]">{project.title}</h3>
          <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{project.challenge}</p>
          <MoreLabel label={labels.readMore} tone="white" />
        </div>
      }
    >
      <Meta>
        {project.status} · {project.place}
      </Meta>
      <div className="mt-4">
        <ProjectStory project={project} labels={labels} />
      </div>
      <TextLink href={href} className="mt-6">
        {linkLabel}
      </TextLink>
    </CardModal>
  );
}

/** Typographic insight card that links to its article. */
export function ArticleCard({
  href,
  topic,
  title,
  excerpt,
  meta,
  cta,
}: {
  href: string;
  topic: string;
  title: string;
  excerpt: string;
  meta: string;
  cta: string;
}) {
  return (
    <Link href={href} className="group flex h-full flex-col border-t border-line pt-6">
      <Meta>
        {topic} · {meta}
      </Meta>
      <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-ink [text-wrap:pretty] lg:text-xl">
        <span className="u-link group-hover:[background-size:100%_1px]">{title}</span>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{excerpt}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
        {cta}
        <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
