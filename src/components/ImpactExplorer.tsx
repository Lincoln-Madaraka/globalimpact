"use client";

import { useState } from "react";
import { isPillarSlug, pillarSlugs, pillarStyle, type PillarSlug } from "@/config/pillars";

type Item = { pillar: string; title: string; text: string; track: string[] };

/** Programme examples with pillar filter chips. */
export function ImpactExplorer({
  items,
  pillarNames,
  labels,
}: {
  items: Item[];
  pillarNames: Record<PillarSlug, string>;
  labels: { all: string; filter: string; track: string };
}) {
  const [active, setActive] = useState<PillarSlug | "all">("all");
  const visible = items.filter((item) => active === "all" || item.pillar === active);
  const chip = (selected: boolean) =>
    `rounded-full px-4 py-2 text-sm font-bold transition-colors ${
      selected ? "bg-brand-blue text-white" : "bg-white text-ink ring-1 ring-line hover:ring-brand-blue"
    }`;

  return (
    <div>
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={active === "all"} onClick={() => setActive("all")} className={chip(active === "all")}>
          {labels.all}
        </button>
        {pillarSlugs.map((slug) => (
          <button key={slug} type="button" aria-pressed={active === slug} onClick={() => setActive(slug)} className={chip(active === slug)}>
            {pillarNames[slug]}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.map((item) => {
          const style = isPillarSlug(item.pillar) ? pillarStyle[item.pillar] : pillarStyle.economic;
          return (
            <li key={item.title} className="flex flex-col rounded-3xl border border-line bg-white p-7 shadow-sm">
              <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${style.soft} ${style.text}`}>
                <span className={`size-2 rounded-full ${style.bg}`} aria-hidden="true" />
                {isPillarSlug(item.pillar) ? pillarNames[item.pillar] : item.pillar}
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-ink">{item.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{item.text}</p>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">{labels.track}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.track.map((metric) => (
                    <li key={metric} className="rounded-full bg-mist px-3 py-1 text-sm text-ink">
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
