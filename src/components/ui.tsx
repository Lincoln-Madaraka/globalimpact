import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

const sectionTones = {
  white: "bg-white",
  ivory: "bg-ivory",
  navy: "on-dark bg-navy-900 text-white",
};

/**
 * A page section. Backgrounds alternate white/ivory in a fixed order;
 * `divider` adds a hairline when two sections of the same colour meet.
 */
export function Section({
  tone = "white",
  divider = false,
  id,
  className = "",
  children,
}: {
  tone?: keyof typeof sectionTones;
  divider?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${sectionTones[tone]} ${divider ? "border-t border-line" : ""} ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  lead,
  tone = "dark",
  className = "",
}: {
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div className={`reveal max-w-3xl ${className}`}>
      <h2 className={`font-display text-h2 ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {lead && <p className={`mt-5 max-w-[40rem] text-lead ${light ? "text-white/72" : "text-ink-soft"}`}>{lead}</p>}
    </div>
  );
}

const buttonVariants = {
  primary: "bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950",
  outlineDark: "border border-ink text-ink hover:bg-ink hover:text-white",
  white: "bg-white text-navy-900 hover:bg-ivory",
  outlineLight: "border border-white/55 text-white hover:bg-white hover:text-navy-900",
};

export type ButtonVariant = keyof typeof buttonVariants;

export const buttonClass = (variant: ButtonVariant = "primary", size: "sm" | "md" = "md") =>
  `group inline-flex items-center justify-center gap-2.5 rounded-[2px] font-sans font-semibold tracking-[0.005em] transition-colors duration-200 ease-quiet ${
    size === "sm" ? "h-10 px-4.5 text-sm" : "h-12 px-6 text-[0.9375rem]"
  } ${buttonVariants[variant]}`;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = "arrowRight",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md";
  icon?: IconName | null;
  className?: string;
  onClick?: () => void;
}) {
  const classes = `${buttonClass(variant, size)} ${className}`;
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} className="size-4 transition-transform duration-200 group-hover:translate-x-[3px]" />}
    </>
  );
  return href.startsWith("/") ? (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  ) : (
    <a href={href} className={classes} onClick={onClick}>
      {content}
    </a>
  );
}

export function TextLink({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-semibold ${tone === "light" ? "text-white" : "text-ink"} ${className}`}
    >
      <span className="u-link">{children}</span>
      <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function CheckList({ items, tone = "dark", className = "" }: { items: string[]; tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon name="check" className={`mt-1 size-4 shrink-0 ${light ? "text-white/85" : "text-navy-900"}`} />
          <span className={light ? "text-white/85" : "text-ink"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Small muted line of metadata, e.g. "Ongoing · Jordão, Acre". */
export function Meta({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return <p className={`text-small font-medium ${tone === "light" ? "text-white/60" : "text-muted"} ${className}`}>{children}</p>;
}
