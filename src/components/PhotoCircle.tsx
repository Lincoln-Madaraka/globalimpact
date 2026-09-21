import type { PhotoName } from "@/config/photos";
import { Photo } from "./Photo";

type Slides = [PhotoName, PhotoName, PhotoName, PhotoName, PhotoName];

/**
 * A photo inside a circle (echoing the logo) with orbiting brand-coloured dots.
 * Pass five photos to get a crossfading Ken Burns slideshow (timed in globals.css).
 */
export function PhotoCircle({
  photos,
  alts,
  tone = "dark",
  preload = false,
  className = "",
}: {
  photos: [PhotoName] | Slides;
  alts: string[];
  tone?: "dark" | "light";
  preload?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <div className={`orbit -inset-[7%] ${tone === "light" ? "orbit-light" : ""}`} aria-hidden="true" />
      <div
        className={`orbit orbit-reverse -inset-[15%] hidden sm:block ${tone === "light" ? "orbit-light" : ""}`}
        aria-hidden="true"
      />
      <div
        className={`relative size-full overflow-hidden rounded-full shadow-2xl ${
          tone === "light" ? "shadow-brand-blue/20 ring-8 ring-white" : "shadow-black/40 ring-[10px] ring-white/10"
        }`}
      >
        {photos.length === 1 ? (
          <Photo name={photos[0]} alt={alts[0]} preload={preload} className="ken-burns" />
        ) : (
          photos.map((photo, i) => (
            <div key={photo} className="kb-slide" style={{ animationDelay: `${i * 5 - 25}s` }}>
              <Photo name={photo} alt={alts[i]} preload={preload && i === 0} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
