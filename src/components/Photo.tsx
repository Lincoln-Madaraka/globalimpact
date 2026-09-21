import Image from "next/image";
import { photoSrc, type PhotoName } from "@/config/photos";

/** A photo that fills its (relatively positioned) parent. Pass `name` for a site photo or `src` for any other image. */
export function Photo({
  name,
  src,
  alt,
  className = "",
  preload = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  position,
}: {
  name?: PhotoName;
  src?: string;
  alt: string;
  className?: string;
  preload?: boolean;
  sizes?: string;
  position?: string;
}) {
  return (
    <Image
      src={src ?? photoSrc(name!)}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      unoptimized={Boolean(src)}
      className={`object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
