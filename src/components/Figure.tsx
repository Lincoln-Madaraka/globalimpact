import type { PhotoName } from "@/config/photos";
import { Photo } from "./Photo";

const ratios = {
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

/** A rectangular photo frame. `zoom` scales the photo slightly when a parent `.group` is hovered. */
export function Figure({
  name,
  src,
  alt,
  ratio = "4/5",
  position,
  sizes,
  preload,
  zoom = false,
  className = "",
}: {
  name?: PhotoName;
  src?: string;
  alt: string;
  ratio?: keyof typeof ratios;
  position?: string;
  sizes?: string;
  preload?: boolean;
  zoom?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-stone ${ratios[ratio]} ${className}`}>
      <Photo
        name={name}
        src={src}
        alt={alt}
        sizes={sizes}
        preload={preload}
        position={position}
        className={zoom ? "motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-quiet motion-safe:group-hover:scale-[1.03]" : ""}
      />
    </div>
  );
}
