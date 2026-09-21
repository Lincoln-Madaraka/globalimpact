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
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

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
    `inline-flex items-center gap-1 px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
      active ? "text-white" : "text-white/78 hover:text-white"
    }`;

  const brand = (
    <Link href={homeHref} className="flex items-center gap-3" onClick={closeAll}>
      <span className="grid size-10 place-items-center rounded-full bg-white">
        <Image unoptimized src="/brand/logo-mark.webp" alt="" width={30} height={30} preload />
      </span>
      <span className="leading-none text-white">
        <span className="block text-[1.0625rem] font-bold tracking-tight">Global Impact</span>
        <span className="mt-1 block text-[0.65625rem] font-semibold uppercase tracking-[0.32em] text-white/75">Alliance</span>
      </span>
    </Link>
  );

  return (
    <header className="on-dark fixed inset-x-0 top-0 z-50 text-white">
      {/* The glass lives on its own layer: a backdrop-filter on <header> would clip the fixed mobile menu. */}
      <div aria-hidden="true" className="header-glass absolute inset-0 -z-10 border-b border-white/8" />
      <Container className="flex h-18 items-center justify-between gap-4 lg:h-20">
        {brand}

        <nav ref={navRef} aria-label={labels.primary} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {items.map((item) =>
              isGroup(item) ? (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={dropdown === item.label}
                    onClick={() => setDropdown(dropdown === item.label ? null : item.label)}
                    className={topLink(groupActive(item.children))}
                  >
                    <span className="u-link" aria-current={groupActive(item.children) ? "page" : undefined}>
                      {item.label}
                    </span>
                    <Icon name="chevronDown" className={`size-4 transition-transform ${dropdown === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {dropdown === item.label && (
                    <div className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3">
                      <ul className="border border-line bg-white p-2 shadow-[0_24px_60px_-24px_rgb(6_13_31/0.45)]">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              aria-current={isActive(child.href) ? "page" : undefined}
                              className={`block border-l-2 px-4 py-3.5 transition-colors hover:bg-ivory ${
                                isActive(child.href) ? "border-navy-900" : "border-transparent"
                              }`}
                            >
                              <span className="block font-display text-[0.9375rem] font-semibold text-ink">{child.label}</span>
                              {child.description && <span className="mt-0.5 block text-sm text-ink-soft">{child.description}</span>}
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
                    <span className="u-link" aria-current={isActive(item.href) ? "page" : undefined}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink href={ctaHref} variant="white" size="sm" icon={null}>
              {labels.cta}
            </ButtonLink>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center text-white hover:text-white/80 xl:hidden"
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
          className="on-dark fixed inset-0 z-50 flex flex-col overflow-y-auto bg-navy-950 text-white xl:hidden"
        >
          <Container className="flex h-18 shrink-0 items-center justify-between">
            {brand}
            <button ref={closeButton} type="button" onClick={() => setMenuOpen(false)} className="grid size-11 place-items-center text-white">
              <Icon name="close" />
              <span className="sr-only">{labels.closeMenu}</span>
            </button>
          </Container>
          <Container className="flex flex-1 flex-col justify-between gap-10 pb-10 pt-6">
            <nav aria-label={labels.primary}>
              <ul>
                {items.map((item) =>
                  isGroup(item) ? (
                    <li key={item.label} className="border-b border-white/12 py-4">
                      <p className="text-sm font-semibold text-white/60">{item.label}</p>
                      <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              aria-current={isActive(child.href) ? "page" : undefined}
                              className={`block py-2 font-display text-xl font-semibold ${isActive(child.href) ? "text-white" : "text-white/78"}`}
                            >
                              {child.label}
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
                        className={`flex items-center justify-between border-b border-white/12 py-4 font-display text-[1.625rem] font-semibold ${
                          isActive(item.href) ? "text-white" : "text-white/78"
                        }`}
                      >
                        {item.label}
                        <Icon name="arrowRight" className="size-5 text-white/40" />
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <ButtonLink href={ctaHref} variant="white" className="w-full sm:w-auto" onClick={closeAll}>
              {labels.cta}
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
