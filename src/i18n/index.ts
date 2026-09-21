import "server-only";
import type { Locale } from "./config";
import { en } from "./dictionaries/en";

export type { Dictionary } from "./dictionaries/en";

const dictionaries = { en };

export const getDictionary = (locale: Locale) => dictionaries[locale];

/** Replaces `{key}` tokens, e.g. fill("Email {email}", { email: "a@b.c" }). */
export const fill = (text: string, values: Record<string, string>) =>
  text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
