import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/config/routes";
import { officePlace, site } from "@/config/site";
import { Icon, SocialIcon, type SocialName } from "./Icon";
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
  const heading = "text-sm font-bold uppercase tracking-[0.16em] text-white/60";
  const link = "text-white/85 transition-colors hover:text-white";
  const offices = [
    { label: dict.offices.hq.label, office: site.offices.hq },
    { label: dict.offices.africa.label, office: site.offices.africa },
  ];

  const linkList = (id: string, title: string, links: NavLink[]) => (
    <nav aria-labelledby={id}>
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
    <footer className="relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="absolute -right-40 -top-40 -z-10 size-[30rem] rounded-full bg-brand-blue/40 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-48 -left-32 -z-10 size-[26rem] rounded-full bg-brand-green/25 blur-3xl" />

      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:py-20">
        <div className="max-w-sm">
          <Link href={localePath(locale)} className="inline-flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full bg-white">
              <Image src="/brand/logo-mark.webp" alt="" width={38} height={38} />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-extrabold tracking-tight">Global Impact</span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.32em] text-white/75">Alliance</span>
            </span>
          </Link>
          <p className="mt-6 leading-relaxed text-white/70">{dict.footer.tagline}</p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <SocialIcon name={name} className="size-4.5" />
                    <span className="sr-only">{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {linkList("footer-explore", dict.footer.explore, explore)}
        {linkList("footer-work", dict.footer.work, work)}

        <div>
          <h2 className={heading}>{dict.footer.offices}</h2>
          <ul className="mt-5 space-y-5">
            {offices.map(({ label, office }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon name="mapPin" className="mt-0.5 size-5 shrink-0 text-brand-red" />
                <span>
                  <span className="block text-sm text-white/60">{label}</span>
                  <span className="block text-white/90">{[office.street, officePlace(office)].filter(Boolean).join(", ")}</span>
                </span>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className={`flex items-start gap-3 break-all ${link}`}>
                <Icon name="mail" className="mt-0.5 size-5 shrink-0 text-brand-red" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
          <p className="font-display font-semibold">{dict.footer.closing}</p>
        </Container>
      </div>
    </footer>
  );
}
