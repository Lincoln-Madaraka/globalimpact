import type { Dictionary } from "@/i18n";
import { Icon } from "./Icon";
import { PhotoCircle } from "./PhotoCircle";

type Project = Dictionary["impact"]["projects"][number];

/** A full project story in GIA's format: Challenge → Approach → Partnership → Action → Impact. */
export function ProjectCase({ project, labels, imageAlt, flip = false }: { project: Project; labels: Dictionary["common"]; imageAlt: string; flip?: boolean }) {
  const steps = [
    { label: labels.challenge, body: project.challenge },
    { label: labels.approach, body: project.approach },
    { label: labels.partnership, body: project.partnership },
    { label: labels.action, body: project.action },
    { label: labels.impact, body: project.impact },
  ];
  return (
    <article
      id={project.id}
      className={`scroll-mt-28 grid gap-12 lg:gap-16 ${flip ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-[0.8fr_1.2fr]"}`}
    >
      <div className={`reveal lg:sticky lg:top-28 lg:self-start ${flip ? "lg:order-2" : ""}`}>
        <PhotoCircle photos={[project.image]} alts={[imageAlt]} tone="light" className="mx-auto w-full max-w-[16rem] sm:max-w-xs" />
        <div className="mt-10 text-center lg:text-left">
          <span className="inline-flex rounded-full bg-brand-green-50 px-3 py-1 text-xs font-bold text-brand-green-700">{project.status}</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink">{project.title}</h2>
          <p className="mt-3 inline-flex items-center gap-1.5 font-semibold text-ink-soft">
            <Icon name="mapPin" className="size-4 text-brand-red" />
            {project.place}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{project.focus}</p>
        </div>
      </div>
      <ol className="relative space-y-4 before:absolute before:bottom-8 before:left-[1.35rem] before:top-8 before:w-px before:bg-line">
        {steps.map((step, i) => (
          <li key={step.label} className="reveal relative flex gap-5">
            <span
              className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-full text-sm font-extrabold ${
                i === steps.length - 1 ? "bg-brand-green text-white" : "bg-white text-brand-blue ring-1 ring-line"
              }`}
            >
              {i + 1}
            </span>
            <div className="flex-1 rounded-3xl border border-line bg-white p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{step.label}</h3>
              {Array.isArray(step.body) ? (
                <ul className="mt-3 space-y-2">
                  {step.body.map((item) => (
                    <li key={item} className="flex gap-2.5 text-ink">
                      <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 leading-relaxed text-ink">{step.body}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
