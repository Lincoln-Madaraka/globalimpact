import type { IconName } from "@/components/Icon";

/** Icons for the eight areas of work, keyed by area id (see dictionaries/en/areas.ts). */
export const areaIcons: Record<string, IconName> = {
  "leadership-and-wisdom": "compass",
  "indigenous-knowledge": "tree",
  "impact-investment": "trendingUp",
  "systemic-change": "network",
  "research-and-knowledge": "book",
  convening: "messages",
  "community-led-impact": "home",
  "africa-initiatives": "sunrise",
};

export const flowIcons: IconName[] = ["eye", "users", "trendingUp", "rocket", "sprout"];
