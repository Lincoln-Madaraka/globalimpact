"use client";

import { useState } from "react";
import type { PhotoName } from "@/config/photos";
import { ArticleCard } from "./cards";

export type InsightItem = {
  href: string;
  image: PhotoName;
  imageAlt: string;
  topic: string;
  title: string;
  excerpt: string;
  meta: string;
};

/** Insight cards with topic filter chips. */
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
  const chip = (selected: boolean) =>
    `rounded-full px-4 py-2 text-sm font-bold transition-colors ${
      selected ? "bg-brand-blue text-white" : "bg-white text-ink ring-1 ring-line hover:ring-brand-blue"
    }`;

  return (
    <div>
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={!active} onClick={() => setActive(null)} className={chip(!active)}>
          {labels.all}
        </button>
        {topics.map((topic) => (
          <button key={topic} type="button" aria-pressed={active === topic} onClick={() => setActive(topic)} className={chip(active === topic)}>
            {topic}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {visible.length > 0 ? (
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <li key={item.href}>
                <ArticleCard {...item} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 rounded-3xl border border-dashed border-line bg-white p-10 text-center text-ink-soft">{labels.empty}</p>
        )}
      </div>
    </div>
  );
}
