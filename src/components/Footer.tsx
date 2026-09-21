import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { pillarSlugs } from "@/config/pillars";
import { localePath } from "@/config/routes";
import { site } from "@/config/site";
import { Icon, SocialIcon, type SocialName } from "./Icon";
import { Container } from "./ui";

export function Footer({ locale, dict, nav }: { locale: Locale; dict: Dictionary; nav: { href: string; label: string }[] }) {
  const socials = Object.entries(site.socials).filter(([, url]) => url) as [SocialName, string][];
  const heading = "text-sm font-bold uppercase tracking-[0.16em] text-white/60";
  const link = "text-white/85 transition-colors hover:text-white";

  return (
    <footer className="relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="absolute -right-40 -top-40 -z-10 size-[30rem] rounded-full bg-brand-blue/40 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-48 -left-32 -z-10 size-[26rem] rounded-full bg-brand-green/25 blur-3xl" />

      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.3fr] lg:py-20">
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

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className={heading}>
            {dict.footer.explore}
          </h2>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-pillars">
          <h2 id="footer-pillars" className={heading}>
            {dict.footer.pillars}
          </h2>
          <ul className="mt-5 space-y-3">
            {pillarSlugs.map((slug) => (
              <li key={slug}>
                <Link href={localePath(locale, `/what-we-do/${slug}`)} className={link}>
                  {dict.pillars[slug].name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>{dict.footer.contact}</h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a href={`mailto:${site.email}`} className={`flex items-start gap-3 break-all ${link}`}>
                <Icon name="mail" className="mt-0.5 size-5 shrink-0 text-brand-red" />
                {site.email}
              </a>
            </li>
            {site.phone && (
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={`flex items-start gap-3 ${link}`}>
                  <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-brand-red" />
                  {site.phone}
                </a>
              </li>
            )}
            <li className="flex items-start gap-3 text-white/85">
              <Icon name="mapPin" className="mt-0.5 size-5 shrink-0 text-brand-red" />
              <span>
                {[site.address.street, site.address.district, `${site.address.city}, ${site.address.country}`]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
          <p className="inline-flex items-center gap-2">
            {dict.footer.madeIn}
            <span className="size-2 rounded-full bg-brand-red" aria-hidden="true" />
          </p>
        </Container>
      </div>
    </footer>
  );
}
