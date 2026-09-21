"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { EarthHandle } from "./earth/createEarth";
import { Icon } from "./Icon";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (onChange: () => void) => {
  const query = matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * The home hero's spinning 3D Earth. The static HTML always contains the poster (frame 0);
 * three.js loads when the browser is idle and crossfades in. It is skipped entirely under
 * reduced motion, Save-Data, or without WebGL2, so the poster stays.
 */
export function SpinningEarth({
  label,
  className = "",
  controlClassName = "",
}: {
  label: string;
  className?: string;
  controlClassName?: string;
}) {
  // Server snapshot is `true`, so the prerendered HTML is always the poster only.
  const reduceMotion = useSyncExternalStore(subscribe, () => matchMedia(reducedMotionQuery).matches, () => true);
  const host = useRef<HTMLDivElement>(null);
  const handle = useRef<EarthHandle | null>(null);
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduceMotion || saveData || typeof WebGL2RenderingContext === "undefined" || !host.current) return;
    let cancelled = false;
    const start = () =>
      import("./earth/createEarth").then(({ createEarth }) => {
        if (cancelled || !host.current) return;
        handle.current = createEarth({
          host: host.current,
          onReady: () => !cancelled && setLive(true),
          onFail: () => {
            handle.current?.dispose();
            handle.current = null;
            if (!cancelled) setLive(false);
          },
        });
      });
    // Safari has no requestIdleCallback.
    const idleSupported = typeof window.requestIdleCallback === "function";
    const idle = idleSupported ? window.requestIdleCallback(start, { timeout: 2000 }) : window.setTimeout(start, 600);
    return () => {
      cancelled = true;
      if (idleSupported) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      handle.current?.dispose();
      handle.current = null;
    };
  }, [reduceMotion]);

  const toggle = () => {
    handle.current?.setPaused(!paused);
    setPaused(!paused);
  };

  return (
    <>
      <div aria-hidden="true" className={`select-none ${className}`}>
        <Image
          src="/images/earth-poster.webp"
          alt=""
          fill
          preload
          unoptimized
          sizes="(min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 122vw"
          className={`object-contain transition-opacity duration-700 ${live ? "opacity-0" : "opacity-100"}`}
        />
        <div ref={host} className="absolute inset-0" />
      </div>
      {live && (
        <button
          type="button"
          aria-pressed={paused}
          aria-label={label}
          onClick={toggle}
          className={`grid size-10 place-items-center text-white/60 transition-colors hover:text-white ${controlClassName}`}
        >
          <Icon name={paused ? "play" : "pause"} className="size-5" />
        </button>
      )}
    </>
  );
}
