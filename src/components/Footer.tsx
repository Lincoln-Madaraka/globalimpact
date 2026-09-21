import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { officePlace, site } from "@/config/site";
import { SocialIcon, type SocialName } from "./Icon";
import type { NavLink } from "./Header";
import { Container } from "./ui";

export function Footer({
  locale,
  dict,
  explore,
  work,
}: {
  locale: Locale;
  dict: Dictionary;
  explore: NavLink[];
  work: NavLink[];
}) {
  const socials = Object.entries(site.socials).filter(([, url]) => url) as [SocialName, string][];
  const heading = "font-display text-[0.9375rem] font-semibold text-white";
  const link = "u-link text-[0.9375rem] text-white/72 transition-colors hover:text-white";
  const offices = [
    { label: dict.offices.hq.label, office: site.offices.hq },
    { label: dict.offices.africa.label, office: site.offices.africa },
  ];

  const linkList = (id: string, title: string, links: NavLink[]) => (
    <nav aria-labelledby={id} className="lg:col-span-2">
      <h2 id={id} className={heading}>
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <footer className="on-dark bg-night text-white">
      <Container className="pt-20 lg:pt-24">
        <div className="flex flex-col gap-10 border-b border-white/12 pb-14 lg:flex-row lg:items-end lg:justify-between lg:pb-16">
          <p className="max-w-[16ch] font-display text-h2 text-white">{dict.footer.closing}</p>
          <Link href={localePath(locale)} className="inline-flex shrink-0 items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full bg-white">
              <Image src="/brand/logo-mark.webp" alt="" width={36} height={36} />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-bold tracking-tight">Global Impact</span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.32em] text-white/75">Alliance</span>
            </span>
          </Link>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="lg:col-span-4">
            <p className="max-w-sm leading-relaxed text-white/72">{dict.footer.tagline}</p>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-5">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-white/72 transition-colors hover:text-white">
                      <SocialIcon name={name} className="size-5" />
                      <span className="sr-only">{name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {linkList("footer-explore", dict.footer.explore, explore)}
          {linkList("footer-work", dict.footer.work, work)}
          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className={heading}>{dict.footer.offices}</h2>
            <ul className="mt-5 space-y-5">
              {offices.map(({ label, office }) => (
                <li key={label}>
                  <span className="block text-sm text-white/60">{label}</span>
                  <span className="mt-0.5 block text-white/85">{[office.street, officePlace(office)].filter(Boolean).join(", ")}</span>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className={`${link} break-all`}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/12">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
          <p>{offices.map(({ office }) => office.city || office.country).join(" · ")}</p>
        </Container>
      </div>
    </footer>
  );
}
