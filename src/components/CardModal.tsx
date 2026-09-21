"use client";

import { useId, useRef, type ReactNode } from "react";
import { Icon } from "./Icon";

/** Hover-zoom classes shared by every card that opens a modal. */
export const cardHover =
  "motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:ease-quiet motion-safe:hover:z-10 motion-safe:hover:scale-[1.02] hover:shadow-[0_24px_60px_-28px_rgb(6_13_31/0.35)]";

/**
 * A card that opens its details in a native <dialog>. Esc and a backdrop click close it,
 * and the browser returns focus to the card. The details are rendered in the HTML, so they stay crawlable.
 */
export function CardModal({
  card,
  title,
  children,
  closeLabel = "Close",
  className = "",
  wide = false,
}: {
  card: ReactNode;
  title: string;
  children: ReactNode;
  closeLabel?: string;
  className?: string;
  wide?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const open = () => {
    document.documentElement.style.overflow = "hidden";
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button type="button" aria-haspopup="dialog" onClick={open} className={`group block h-full w-full text-left ${cardHover} ${className}`}>
        {card}
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClose={() => (document.documentElement.style.overflow = "")}
        onClick={(event) => event.target === dialog.current && close()}
        className={`card-modal m-auto max-h-[88vh] ${wide ? "w-[min(92vw,60rem)]" : "w-[min(92vw,40rem)]"} overflow-y-auto bg-white p-0 text-ink shadow-[0_40px_120px_-40px_rgb(5_7_12/0.6)]`}
      >
        <div className="relative p-7 sm:p-10">
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 grid size-10 place-items-center text-ink-soft transition-colors hover:text-ink"
          >
            <Icon name="close" className="size-5" />
            <span className="sr-only">{closeLabel}</span>
          </button>
          <h2 id={titleId} className="pr-10 font-display text-h3 text-ink">
            {title}
          </h2>
          <div className="mt-6">{children}</div>
        </div>
      </dialog>
    </>
  );
}
