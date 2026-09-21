import Link from "next/link";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { pillarStyle, type PillarSlug } from "@/config/pillars";
import { localePath } from "@/config/routes";
import { Icon, type IconName } from "./Icon";

export const pillarIcon: Record<PillarSlug, IconName> = {
  environmental: "leaf",
  ethical: "scale",
  philanthropic: "heartHandshake",
  economic: "trendingUp",
};

export function PillarCard({
  slug,
  locale,
  dict,
  index,
}: {
  slug: PillarSlug;
  locale: Locale;
  dict: Dictionary;
  index: number;
}) {
  const style = pillarStyle[slug];
  const pillar = dict.pillars[slug];
  return (
    <Link
      href={localePath(locale, `/what-we-do/${slug}`)}
      className="reveal group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-blue/10"
    >
      <span className={`absolute inset-x-0 top-0 h-1.5 ${style.bg}`} aria-hidden="true" />
      <span
        aria-hidden="true"
        className={`absolute -right-10 -top-10 size-32 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-125 ${style.soft}`}
      />
      <span className="relative flex items-center justify-between">
        <span className={`grid size-14 place-items-center rounded-full text-white shadow-lg ${style.bg}`}>
          <Icon name={pillarIcon[slug]} className="size-7" />
        </span>
        <span className="text-sm font-bold text-ink-soft/60">0{index + 1}</span>
      </span>
      <h3 className="relative mt-6 text-xl font-extrabold tracking-tight text-ink">{pillar.name}</h3>
      <p className="relative mt-3 flex-1 leading-relaxed text-ink-soft">{pillar.summary}</p>
      <span className={`relative mt-6 inline-flex items-center gap-1.5 text-sm font-bold ${style.text}`}>
        {dict.common.learnMore}
        <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
