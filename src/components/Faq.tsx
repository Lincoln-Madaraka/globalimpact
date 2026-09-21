import { Icon } from "./Icon";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left text-lg font-bold text-ink transition-colors hover:bg-mist sm:px-8">
            {item.q}
            <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full bg-brand-blue-50 text-brand-blue transition-transform duration-300">
              <Icon name="plus" className="size-5" />
            </span>
          </summary>
          <p className="px-6 pb-6 leading-relaxed text-ink-soft sm:px-8">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
