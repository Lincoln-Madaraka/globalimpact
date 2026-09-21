"use client";

import { useState } from "react";
import { ArticleCard } from "./cards";

export type InsightItem = { href: string; topic: string; title: string; excerpt: string; meta: string; cta: string };

/** Insight cards with topic tabs. */
export function InsightsBrowser({
  items,
  topics,
  labels,
}: {
  items: InsightItem[];
  topics: string[];
  labels: { all: string; filter: string; empty: string };
}) {
  const [active, setActive] = useState<string | null>(null);
  const visible = items.filter((item) => !active || item.topic === active);
  const usedTopics = topics.filter((topic) => items.some((item) => item.topic === topic));
  const tab = (selected: boolean) =>
    `-mb-px shrink-0 border-b-2 py-3 text-[0.9375rem] font-semibold transition-colors ${
      selected ? "border-navy-900 text-ink" : "border-transparent text-ink-soft hover:text-ink"
    }`;

  return (
    <div>
      <div
        role="group"
        aria-label={labels.filter}
        className="flex gap-6 overflow-x-auto border-b border-line max-sm:[mask-image:linear-gradient(to_right,#000_85%,transparent)]"
      >
        <button type="button" aria-pressed={!active} onClick={() => setActive(null)} className={tab(!active)}>
          {labels.all}
        </button>
        {usedTopics.map((topic) => (
          <button key={topic} type="button" aria-pressed={active === topic} onClick={() => setActive(topic)} className={tab(active === topic)}>
            {topic}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {visible.length > 0 ? (
          <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <li key={item.href}>
                <ArticleCard {...item} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 border border-line p-10 text-ink-soft">{labels.empty}</p>
        )}
      </div>
    </div>
  );
}
