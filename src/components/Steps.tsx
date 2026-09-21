/** Numbered steps on hairline rules: a row on desktop, a column on mobile. */
export function Steps({
  steps,
  deliverableLabel,
  tone = "dark",
}: {
  steps: { title: string; text: string; deliverable?: string }[];
  deliverableLabel?: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <ol className={`reveal grid gap-7 md:grid-cols-2 md:gap-10 lg:gap-8 ${steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {steps.map((step, i) => (
        <li key={step.title} className={`border-t pt-5 ${light ? "border-white/20" : "border-line"}`}>
          <span className={`text-index tabular-nums ${light ? "text-white/60" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className={`mt-2 font-display text-lg font-semibold lg:mt-6 ${light ? "text-white" : "text-ink"}`}>{step.title}</h3>
          <p className={`mt-3 text-[0.9375rem] leading-relaxed ${light ? "text-white/72" : "text-ink-soft"}`}>{step.text}</p>
          {step.deliverable && (
            <p className={`mt-5 border-l-2 pl-4 text-sm ${light ? "border-white text-white/85" : "border-navy-900 text-ink"}`}>
              <span className="block font-semibold">{deliverableLabel}</span>
              {step.deliverable}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
