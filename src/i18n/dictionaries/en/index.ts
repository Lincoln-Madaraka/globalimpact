// English copy, one file per page. Another language needs a folder with the same shape.
import { about } from "./about";
import { africa } from "./africa";
import { areas } from "./areas";
import { common, cta, ctaBand, flow, footer, meta, nav, offices, photos } from "./common";
import { contact } from "./contact";
import { home } from "./home";
import { impact } from "./impact";
import { insights } from "./insights";
import { partners } from "./partners";
import { action, whatWeDo, wisdom } from "./work";

export const en = {
  meta,
  nav,
  cta,
  common,
  photos,
  offices,
  flow,
  ctaBand,
  footer,
  areas,
  home,
  about,
  whatWeDo,
  wisdom,
  action,
  africa,
  impact,
  partners,
  insights,
  contact,
};

export type Dictionary = typeof en;
