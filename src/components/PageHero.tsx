import Link from "next/link";
import type { ReactNode } from "react";
import type { PhotoName } from "@/config/photos";
import { breadcrumbSchema } from "@/lib/structured-data";
import { Icon } from "./Icon";
import { JsonLd } from "./JsonLd";
import { MotionBackdrop } from "./MotionBackdrop";
import { PhotoCircle } from "./PhotoCircle";
import { Container, Eyebrow } from "./ui";

export type Crumb = { name: string; href: string };

/** Inner-page hero: motion background, breadcrumbs (with BreadcrumbList JSON-LD), title and a circular photo. */
export function PageHero({
  eyebrow,
  title,
  lead,
  photo,
  photoAlt,
  crumbs,
  crumbsLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  photo: PhotoName;
  photoAlt: string;
  crumbs: Crumb[];
  crumbsLabel: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <MotionBackdrop />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Container className="grid items-center gap-12 pb-20 pt-32 md:grid-cols-[1.25fr_1fr] md:pb-24 md:pt-40 lg:gap-20">
        <div>
          <nav aria-label={crumbsLabel}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              {crumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && <Icon name="arrowRight" className="size-3.5 text-white/40" />}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-white">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-white hover:underline">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-8">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{lead}</p>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        <PhotoCircle photos={[photo]} alts={[photoAlt]} preload className="mx-auto w-full max-w-[18rem] sm:max-w-sm md:max-w-md" />
      </Container>
    </section>
  );
}
