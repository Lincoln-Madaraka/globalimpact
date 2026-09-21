import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] ${
        tone === "light" ? "text-white/85" : "text-brand-blue"
      }`}
    >
      <span className="size-2 shrink-0 rounded-full bg-brand-red" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`reveal max-w-3xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-lg leading-relaxed ${tone === "light" ? "text-white/80" : "text-ink-soft"}`}>{lead}</p>
      )}
    </div>
  );
}

const buttonStyles = {
  primary: "bg-brand-red-700 text-white shadow-lg shadow-brand-red/25 hover:bg-brand-red-800",
  blue: "bg-brand-blue text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-blue-700",
  white: "bg-white text-brand-blue shadow-lg shadow-black/10 hover:bg-brand-blue-50",
  outlineLight: "border border-white/35 text-white hover:border-white hover:bg-white/10",
  outlineDark: "border border-brand-blue/25 text-brand-blue hover:border-brand-blue hover:bg-brand-blue-50",
};

export type ButtonVariant = keyof typeof buttonStyles;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = "arrowRight",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md";
  icon?: IconName | null;
  className?: string;
}) {
  const sizing = size === "sm" ? "px-5 py-2.5 text-sm" : "px-6 py-3.5 text-[0.95rem]";
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 ${sizing} ${buttonStyles[variant]} ${className}`;
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} className="size-4.5 transition-transform group-hover:translate-x-0.5" />}
    </>
  );
  return href.startsWith("/") ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 font-bold text-brand-blue underline-offset-4 hover:underline ${className}`}
    >
      {children}
      <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function CheckList({ items, tone = "dark", className = "" }: { items: string[]; tone?: "dark" | "light"; className?: string }) {
  return (
    <ul className={`space-y-3.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
              tone === "light" ? "bg-white/15 text-white" : "bg-brand-green-50 text-brand-green"
            }`}
          >
            <Icon name="check" className="size-3.5" />
          </span>
          <span className={tone === "light" ? "text-white/90" : "text-ink"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function IconBadge({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${className}`}>
      <Icon name={name} className="size-6" />
    </span>
  );
}
