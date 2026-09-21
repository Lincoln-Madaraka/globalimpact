import type { PhotoName } from "./photos";

export const pillarSlugs = ["environmental", "ethical", "philanthropic", "economic"] as const;
export type PillarSlug = (typeof pillarSlugs)[number];

export const isPillarSlug = (value: string): value is PillarSlug =>
  (pillarSlugs as readonly string[]).includes(value);

export type Accent = "green" | "blue" | "red" | "mixed";

export const pillarStyle: Record<
  PillarSlug,
  { accent: Accent; photo: PhotoName; sdgs: number[]; text: string; bg: string; soft: string; border: string }
> = {
  environmental: {
    accent: "green",
    photo: "environmental",
    sdgs: [7, 12, 13, 15],
    text: "text-brand-green",
    bg: "bg-brand-green",
    soft: "bg-brand-green-50",
    border: "border-brand-green",
  },
  ethical: {
    accent: "blue",
    photo: "compliance",
    sdgs: [5, 8, 10, 16],
    text: "text-brand-blue",
    bg: "bg-brand-blue",
    soft: "bg-brand-blue-50",
    border: "border-brand-blue",
  },
  philanthropic: {
    accent: "red",
    photo: "community",
    sdgs: [1, 3, 4, 11],
    text: "text-brand-red-700",
    bg: "bg-brand-red",
    soft: "bg-brand-red-50",
    border: "border-brand-red",
  },
  economic: {
    accent: "mixed",
    photo: "handshake",
    sdgs: [9, 12, 17],
    text: "text-brand-blue",
    bg: "bg-gradient-to-br from-brand-blue to-brand-green",
    soft: "bg-brand-blue-50",
    border: "border-brand-green",
  },
};

/** Number of distinct UN SDGs covered by all pillars together. */
export const sdgCount = new Set(pillarSlugs.flatMap((slug) => pillarStyle[slug].sdgs)).size;
