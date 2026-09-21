"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { ButtonLink, Container } from "./ui";

export type NavLink = { href: string; label: string; description?: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

type Labels = { cta: string; openMenu: string; closeMenu: string; primary: string };

const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);
const isGroup = (item: NavItem): item is { label: string; children: NavLink[] } => "children" in item;

export function Header({
  homeHref,
  items,
  ctaHref,
  labels,
}: {
  homeHref: string;
  items: NavItem[];
  ctaHref: string;
  labels: Labels;
}) {
  const pathname = withSlash(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!dropdown) return;
    const onPointer = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setDropdown(null);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setDropdown(null);
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [dropdown]);

  const isActive = (href: string) => (href === homeHref ? pathname === href : pathname.startsWith(href));
  const groupActive = (children: NavLink[]) => children.some((child) => isActive(child.href));
  const closeAll = () => {
    setMenuOpen(false);
    setDropdown(null);
  };

  const topLink = (active: boolean) =>
    `inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
      active ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/10 hover:text-white"
    }`;

  const brand = () => (
    <Link href={homeHref} className="flex items-center gap-3" onClick={closeAll}>
      <span className="grid size-11 place-items-center rounded-full bg-white shadow-md shadow-black/10">
        <Image src="/brand/logo-mark.webp" alt="" width={34} height={34} preload />
      </span>
      <span className="leading-none text-white">
        <span className="block text-[1.05rem] font-extrabold tracking-tight">Global Impact</span>
        <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.32em] opacity-80">Alliance</span>
      </span>
    </Link>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-brand-blue/75 shadow-[0_8px_30px_rgb(6_22_64/0.25)] backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        {brand()}

        <nav ref={navRef} aria-label={labels.primary} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {items.map((item) =>
              isGroup(item) ? (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={dropdown === item.label}
                    onClick={() => setDropdown(dropdown === item.label ? null : item.label)}
                    className={topLink(groupActive(item.children))}
                  >
                    {item.label}
                    <Icon
                      name="chevronDown"
                      className={`size-4 transition-transform ${dropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {dropdown === item.label && (
                    <div className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3">
                      <ul className="rounded-3xl border border-line bg-white p-3 shadow-2xl shadow-brand-blue/15">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              aria-current={isActive(child.href) ? "page" : undefined}
                              className="group block rounded-2xl px-4 py-3 transition-colors hover:bg-mist"
                            >
                              <span>
                                <span className={`block font-bold ${isActive(child.href) ? "text-brand-blue" : "text-ink group-hover:text-brand-blue"}`}>
                                  {child.label}
                                </span>
                                {child.description && <span className="mt-0.5 block text-sm text-ink-soft">{child.description}</span>}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={topLink(isActive(item.href))}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink href={ctaHref} size="sm" icon={null}>
              {labels.cta}
            </ButtonLink>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-full text-white hover:bg-white/10 xl:hidden"
          >
            <Icon name="menu" />
            <span className="sr-only">{labels.openMenu}</span>
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={labels.primary}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-navy text-white xl:hidden"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-blue/50 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-[#1f5fe0]/40 blur-3xl" />
          <Container className="relative flex h-20 shrink-0 items-center justify-between">
            {brand()}
            <button
              ref={closeButton}
              type="button"
              onClick={() => setMenuOpen(false)}
              className="grid size-11 place-items-center rounded-full text-white hover:bg-white/10"
            >
              <Icon name="close" />
              <span className="sr-only">{labels.closeMenu}</span>
            </button>
          </Container>
          <Container className="relative flex flex-1 flex-col justify-between gap-10 pb-10 pt-4">
            <nav aria-label={labels.primary}>
              <ul>
                {items.map((item) =>
                  isGroup(item) ? (
                    <li key={item.label} className="border-b border-white/10 py-3">
                      <p className="py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/55">{item.label}</p>
                      <ul className="grid gap-1 sm:grid-cols-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              aria-current={isActive(child.href) ? "page" : undefined}
                              className="flex items-center gap-3 py-2 text-lg font-bold"
                            >
                              <span className={isActive(child.href) ? "text-white" : "text-white/75"}>{child.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="flex items-center justify-between border-b border-white/10 py-4 text-2xl font-bold"
                      >
                        <span className={isActive(item.href) ? "text-white" : "text-white/80"}>{item.label}</span>
                        <Icon name="arrowRight" className="size-5 text-white/50" />
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <ButtonLink href={ctaHref} className="w-full sm:w-auto" onClick={closeAll}>
              {labels.cta}
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
