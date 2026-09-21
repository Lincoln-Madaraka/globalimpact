import { Icon, type IconName } from "./Icon";

/** Numbered process steps: a row on desktop, a vertical timeline on mobile. */
export function Steps({
  steps,
  icons,
  deliverableLabel,
  tone = "dark",
}: {
  steps: { title: string; text: string; deliverable?: string }[];
  icons: IconName[];
  deliverableLabel?: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <ol className={`relative grid gap-10 md:grid-cols-2 lg:gap-8 ${steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      <span
        aria-hidden="true"
        className={`absolute left-7 top-7 hidden h-px w-[calc(100%-3.5rem)] lg:block ${
          light ? "bg-white/20" : "bg-gradient-to-r from-brand-blue via-brand-green to-brand-red opacity-30"
        }`}
      />
      {steps.map((step, i) => (
        <li key={step.title} className="reveal relative flex gap-5 lg:flex-col">
          <span
            className={`relative grid size-14 shrink-0 place-items-center rounded-full ring-8 ${
              light ? "bg-white text-brand-blue ring-white/10" : "bg-brand-blue text-white ring-brand-blue-50"
            }`}
          >
            <Icon name={icons[i % icons.length]} className="size-6" />
            <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-brand-green text-[0.7rem] font-extrabold text-white">
              {i + 1}
            </span>
          </span>
          <div>
            <h3 className={`text-lg font-extrabold ${light ? "text-white" : "text-ink"}`}>{step.title}</h3>
            <p className={`mt-2.5 leading-relaxed ${light ? "text-white/75" : "text-ink-soft"}`}>{step.text}</p>
            {step.deliverable && (
              <p
                className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
                  light ? "bg-white/10 text-white/90" : "bg-brand-green-50 text-brand-green-700"
                }`}
              >
                <span className="block text-xs font-bold uppercase tracking-wider opacity-80">{deliverableLabel}</span>
                <span className="font-semibold">{step.deliverable}</span>
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
