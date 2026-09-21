import type { IconName } from "./Icon";
import { ButtonLink, Container, type ButtonVariant } from "./ui";

export type CtaAction = { label: string; href: string; variant?: ButtonVariant; icon?: IconName };

/** Closing call to collaborate: statement on the left, actions on the right. */
export function CtaBanner({
  title,
  text,
  actions,
  tone = "ivory",
}: {
  title: string;
  text: string;
  actions: CtaAction[];
  tone?: "ivory" | "white";
}) {
  return (
    <section className={`border-t border-line py-16 sm:py-20 lg:py-24 ${tone === "ivory" ? "bg-ivory" : "bg-white"}`}>
      <Container className="reveal grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          <h2 className="max-w-[20ch] font-display text-h2 text-ink">{title}</h2>
          <p className="mt-5 max-w-[40rem] text-lead text-ink-soft">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-4 lg:col-start-9 lg:flex-col">
          {actions.map((action, i) => (
            <ButtonLink
              key={action.label}
              href={action.href}
              variant={action.variant ?? (i === 0 ? "primary" : "outlineDark")}
              icon={action.icon}
              className="w-full sm:w-auto lg:w-full"
            >
              {action.label}
            </ButtonLink>
          ))}
        </div>
      </Container>
    </section>
  );
}
