import Link from "next/link";
import type { ReactNode } from "react";
import type { PhotoName } from "@/config/photos";
import { breadcrumbSchema } from "@/lib/structured-data";
import { Figure } from "./Figure";
import { JsonLd } from "./JsonLd";
import { Container } from "./ui";

export type Crumb = { name: string; href: string };

/**
 * Inner-page hero: white, typographic, with breadcrumbs (and BreadcrumbList JSON-LD).
 * Optionally a photo (`photo`) or any other visual (`visual`, e.g. a map) on the right.
 * `variant="article"` centres the header on the 42rem reading column.
 */
export function PageHero({
  title,
  lead,
  photo,
  photoAlt = "",
  photoPosition,
  visual,
  crumbs,
  crumbsLabel,
  variant = "page",
  children,
}: {
  title: string;
  lead: string;
  photo?: PhotoName;
  photoAlt?: string;
  photoPosition?: string;
  visual?: ReactNode;
  crumbs: Crumb[];
  crumbsLabel: string;
  variant?: "page" | "article";
  children?: ReactNode;
}) {
  const article = variant === "article";
  const aside =
    !article && (visual ?? (photo && <Figure name={photo} alt={photoAlt} ratio="hero" position={photoPosition} preload sizes="(min-width: 1024px) 30vw, 100vw" />));
  return (
    <section className="bg-white pt-28 sm:pt-32 lg:pt-36">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Container>
        <div className={article ? "mx-auto max-w-[42rem]" : ""}>
          <nav aria-label={crumbsLabel}>
            <ol className="flex flex-wrap items-center gap-2 text-small font-medium text-muted">
              {crumbs.map((crumb, i) => (
                <li key={crumb.href} className={`flex items-center gap-2 ${i === crumbs.length - 1 && crumbs.length > 2 ? "max-sm:hidden" : ""}`}>
                  {i > 0 && (
                    <span aria-hidden="true" className="text-muted/60">
                      /
                    </span>
                  )}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="u-link hover:text-ink">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className={`grid gap-10 border-b border-line pb-14 pt-10 lg:gap-8 lg:pb-20 lg:pt-12 ${aside ? "lg:grid-cols-12 lg:items-center" : ""}`}>
            <div className={aside ? "lg:col-span-7" : article ? "" : "lg:max-w-[52rem]"}>
              <h1 className="max-w-[18ch] font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-h1">{title}</h1>
              <p className="mt-6 max-w-[36rem] text-lead text-ink-soft">{lead}</p>
              {children && <div className="mt-10 flex flex-wrap items-center gap-3">{children}</div>}
            </div>
            {aside && <div className="lg:col-span-4 lg:col-start-9">{aside}</div>}
          </div>
        </div>
      </Container>
    </section>
  );
}
