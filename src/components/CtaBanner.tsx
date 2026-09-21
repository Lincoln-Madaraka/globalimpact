import type { PhotoName } from "@/config/photos";
import { site } from "@/config/site";
import type { IconName } from "./Icon";
import { MotionBackdrop } from "./MotionBackdrop";
import { PhotoCircle } from "./PhotoCircle";
import { ButtonLink, Container, Eyebrow, type ButtonVariant } from "./ui";

export type CtaAction = { label: string; href: string; variant?: ButtonVariant; icon?: IconName };

/** Closing call to collaborate, shown at the bottom of most pages. */
export function CtaBanner({
  eyebrow,
  title,
  text,
  actions,
  photo = "earth",
  photoAlt,
}: {
  eyebrow: string;
  title: string;
  text: string;
  actions: CtaAction[];
  photo?: PhotoName;
  photoAlt: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="reveal relative isolate overflow-hidden rounded-[2.5rem] px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-16">
          <MotionBackdrop accent="mixed" />
          <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1]">{title}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{text}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                {actions.map((action, i) => (
                  <ButtonLink key={action.label} href={action.href} variant={action.variant ?? (i === 0 ? "primary" : "outlineLight")} icon={action.icon}>
                    {action.label}
                  </ButtonLink>
                ))}
              </div>
              <p className="mt-6 text-sm text-white/65">
                <a href={`mailto:${site.email}`} className="hover:text-white hover:underline">
                  {site.email}
                </a>
              </p>
            </div>
            <PhotoCircle photos={[photo]} alts={[photoAlt]} className="mx-auto hidden w-full max-w-xs lg:block" />
          </div>
        </div>
      </Container>
    </section>
  );
}
