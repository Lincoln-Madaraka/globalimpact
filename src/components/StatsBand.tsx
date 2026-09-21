import type { Dictionary } from "@/i18n";
import { pillarSlugs, sdgCount } from "@/config/pillars";

/** Key figures describing how Global Impact Alliance works. */
export function StatsBand({ dict, className = "" }: { dict: Dictionary; className?: string }) {
  const stats = [
    { value: String(pillarSlugs.length), label: dict.stats.pillars, color: "text-brand-blue" },
    { value: String(sdgCount), label: dict.stats.sdgs, color: "text-brand-green" },
    { value: "2", label: dict.stats.continents, color: "text-brand-red-700" },
    { value: "360°", label: dict.stats.lifecycle, color: "text-brand-blue" },
  ];
  return (
    <dl
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-xl shadow-brand-blue/10 lg:grid-cols-4 ${className}`}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-2 bg-white p-6 sm:p-8">
          <dt className="text-sm leading-snug text-ink-soft">{stat.label}</dt>
          <dd className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${stat.color}`}>{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
