import Link from "next/link";
import type { PhotoName } from "@/config/photos";
import { initials, type Person } from "@/config/people";
import { Icon, type IconName } from "./Icon";
import { Photo } from "./Photo";

/** One of the eight areas of work, linking to its section on the What we do page. */
export function AreaCard({ href, icon, title, text, index }: { href: string; icon: IconName; title: string; text: string; index: number }) {
  const tones = ["bg-brand-blue", "bg-brand-green", "bg-navy"];
  return (
    <Link
      href={href}
      className="reveal group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-blue/10"
    >
      <span className="flex items-center justify-between">
        <span className={`grid size-12 place-items-center rounded-full text-white ${tones[index % tones.length]}`}>
          <Icon name={icon} className="size-6" />
        </span>
        <span className="text-sm font-bold text-ink-soft/50">{String(index + 1).padStart(2, "0")}</span>
      </span>
      <h3 className="mt-5 text-lg font-extrabold leading-snug text-ink">{title}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{text}</p>
      <Icon name="arrowRight" className="mt-5 size-5 text-brand-blue transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** Icon, title and text: used for principles, themes and reasons. */
export function FeatureCard({
  icon,
  title,
  text,
  tone = "white",
}: {
  icon: IconName;
  title: string;
  text: string;
  tone?: "white" | "sand" | "dark";
}) {
  const styles = {
    white: { card: "border border-line bg-white", badge: "bg-brand-blue-50 text-brand-blue", title: "text-ink", text: "text-ink-soft" },
    sand: { card: "bg-white/70", badge: "bg-brand-green-50 text-brand-green", title: "text-ink", text: "text-ink-soft" },
    dark: { card: "bg-white/[0.07] ring-1 ring-white/10", badge: "bg-white/10 text-white", title: "text-white", text: "text-white/70" },
  }[tone];
  return (
    <div className={`reveal rounded-3xl p-6 ${styles.card}`}>
      <span className={`grid size-12 place-items-center rounded-2xl ${styles.badge}`}>
        <Icon name={icon} className="size-6" />
      </span>
      <h3 className={`mt-5 text-lg font-extrabold ${styles.title}`}>{title}</h3>
      <p className={`mt-2 leading-relaxed ${styles.text}`}>{text}</p>
    </div>
  );
}

export function PersonCard({ person, featured = false }: { person: Person; featured?: boolean }) {
  return (
    <div className={`reveal flex gap-5 rounded-3xl border border-line bg-white p-6 ${featured ? "sm:p-8" : "items-center"}`}>
      <span
        className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-green font-extrabold text-white ${
          featured ? "size-20 text-2xl" : "size-14 text-lg"
        }`}
        aria-hidden="true"
      >
        {initials(person.name)}
      </span>
      <div>
        <h3 className={`font-extrabold text-ink ${featured ? "text-xl" : "text-lg"}`}>{person.name}</h3>
        <p className="mt-0.5 text-sm font-semibold text-brand-green-700">{person.role}</p>
        {person.bio && <p className="mt-3 leading-relaxed text-ink-soft">{person.bio}</p>}
      </div>
    </div>
  );
}

export function OfficeCard({ label, place, text, tone = "light" }: { label: string; place: string; text: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={`reveal rounded-3xl p-7 ${dark ? "bg-white/[0.07] ring-1 ring-white/10" : "border border-line bg-white"}`}>
      <span className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-brand-red-50 text-brand-red-700">
          <Icon name="mapPin" className="size-5" />
        </span>
        <span>
          <span className={`block text-xs font-bold uppercase tracking-[0.16em] ${dark ? "text-white/60" : "text-ink-soft"}`}>{label}</span>
          <span className={`block font-display text-2xl font-bold ${dark ? "text-white" : "text-ink"}`}>{place}</span>
        </span>
      </span>
      <p className={`mt-4 leading-relaxed ${dark ? "text-white/75" : "text-ink-soft"}`}>{text}</p>
    </div>
  );
}

/** Compact project teaser linking to the full story on the Impact page. */
export function ProjectCard({
  href,
  image,
  imageAlt,
  title,
  place,
  text,
  status,
}: {
  href: string;
  image: PhotoName;
  imageAlt: string;
  title: string;
  place: string;
  text: string;
  status: string;
}) {
  return (
    <Link href={href} className="reveal group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-blue/10">
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <Photo name={image} alt={imageAlt} sizes="(min-width: 1024px) 30vw, 90vw" className="transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink backdrop-blur">{status}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-brand-green-700">
          <Icon name="mapPin" className="size-4" />
          {place}
        </p>
        <h3 className="mt-3 text-lg font-extrabold leading-snug text-ink">{title}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{text}</p>
        <Icon name="arrowRight" className="mt-5 size-5 text-brand-blue transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function ArticleCard({
  href,
  image,
  imageAlt,
  topic,
  title,
  excerpt,
  meta,
}: {
  href: string;
  image: PhotoName;
  imageAlt: string;
  topic: string;
  title: string;
  excerpt: string;
  meta: string;
}) {
  return (
    <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-blue/10">
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <Photo name={image} alt={imageAlt} sizes="(min-width: 1024px) 30vw, 90vw" className="transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-bold text-brand-blue">{topic}</span>
        <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-ink">{title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{excerpt}</p>
        <p className="mt-5 text-sm text-ink-soft">{meta}</p>
      </div>
    </Link>
  );
}
