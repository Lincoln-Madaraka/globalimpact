import type { PhotoName } from "@/config/photos";
import { site } from "@/config/site";
import { MotionBackdrop } from "./MotionBackdrop";
import { PhotoCircle } from "./PhotoCircle";
import { ButtonLink, Container, Eyebrow } from "./ui";

/** Closing call-to-action shown at the bottom of most pages. */
export function CtaBanner({
  eyebrow,
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  photo = "handshake",
  photoAlt,
}: {
  eyebrow: string;
  title: string;
  text: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  photo?: PhotoName;
  photoAlt: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="reveal relative isolate overflow-hidden rounded-[2.5rem] px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-16">
          <MotionBackdrop accent="mixed" />
          <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1]">{title}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{text}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
                <ButtonLink href={`mailto:${site.email}`} variant="outlineLight" icon="mail">
                  {secondaryLabel}
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm text-white/65">{site.email}</p>
            </div>
            <PhotoCircle photos={[photo]} alts={[photoAlt]} className="mx-auto hidden w-full max-w-xs lg:block" />
          </div>
        </div>
      </Container>
    </section>
  );
}
