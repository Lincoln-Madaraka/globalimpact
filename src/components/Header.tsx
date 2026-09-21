"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { otherLocale, type Locale } from "@/i18n/config";
import { Icon } from "./Icon";
import { ButtonLink, Container } from "./ui";

type NavItem = { href: string; label: string };

type Labels = {
  cta: string;
  openMenu: string;
  closeMenu: string;
  switchLanguage: string;
  switchLanguageLabel: string;
  primary: string;
};

const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

export function Header({
  locale,
  homeHref,
  items,
  ctaHref,
  labels,
}: {
  locale: Locale;
  homeHref: string;
  items: NavItem[];
  ctaHref: string;
  labels: Labels;
}) {
  const pathname = withSlash(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const other = otherLocale(locale);
  const switchHref = pathname.replace(/^\/(en|tr)(?=\/)/, `/${other}`);
  const isActive = (href: string) => (href === homeHref ? pathname === href : pathname.startsWith(href));

  const brand = (light: boolean) => (
    <Link href={homeHref} className="flex items-center gap-3" onClick={() => setOpen(false)}>
      <span className="grid size-11 place-items-center rounded-full bg-white shadow-md shadow-black/10">
        <Image src="/brand/logo-mark.webp" alt="" width={34} height={34} preload />
      </span>
      <span className={`leading-none ${light ? "text-white" : "text-ink"}`}>
        <span className="block text-[1.05rem] font-extrabold tracking-tight">Global Impact</span>
        <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.32em] opacity-80">Alliance</span>
      </span>
    </Link>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-white/90 shadow-[0_1px_0_rgb(11_27_63/0.08),0_8px_30px_rgb(11_27_63/0.06)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        {brand(!scrolled)}

        <nav aria-label={labels.primary} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                    scrolled
                      ? isActive(item.href)
                        ? "bg-brand-blue-50 text-brand-blue"
                        : "text-ink hover:text-brand-blue"
                      : isActive(item.href)
                        ? "bg-white/15 text-white"
                        : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            aria-label={labels.switchLanguageLabel}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              scrolled ? "border-line text-ink hover:border-brand-blue hover:text-brand-blue" : "border-white/30 text-white hover:bg-white/10"
            }`}
          >
            <Icon name="globe" className="size-4" />
            {other}
          </Link>
          <span className="hidden sm:block">
            <ButtonLink href={ctaHref} size="sm" icon={null}>
              {labels.cta}
            </ButtonLink>
          </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`grid size-11 place-items-center rounded-full lg:hidden ${scrolled ? "text-ink hover:bg-mist" : "text-white hover:bg-white/10"}`}
          >
            <Icon name="menu" />
            <span className="sr-only">{labels.openMenu}</span>
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={labels.primary}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-navy text-white lg:hidden"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-blue/50 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-brand-green/40 blur-3xl" />
          <Container className="relative flex h-20 items-center justify-between">
            {brand(true)}
            <button
              ref={closeButton}
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-11 place-items-center rounded-full text-white hover:bg-white/10"
            >
              <Icon name="close" />
              <span className="sr-only">{labels.closeMenu}</span>
            </button>
          </Container>
          <Container className="relative flex flex-1 flex-col justify-between gap-10 pb-10 pt-6">
            <nav aria-label={labels.primary}>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-center justify-between border-b border-white/10 py-4 text-2xl font-bold"
                    >
                      <span className="flex items-center gap-3">
                        {isActive(item.href) && <span className="size-2.5 rounded-full bg-brand-red" aria-hidden="true" />}
                        {item.label}
                      </span>
                      <Icon name="arrowRight" className="size-5 text-white/50" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={ctaHref} className="w-full sm:w-auto">
                {labels.cta}
              </ButtonLink>
              <Link
                href={switchHref}
                hrefLang={other}
                lang={other}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-bold hover:bg-white/10"
              >
                <Icon name="globe" className="size-5" />
                {labels.switchLanguage}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
