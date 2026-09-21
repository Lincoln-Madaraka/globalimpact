import Image from "next/image";
import { photoSrc, type PhotoName } from "@/config/photos";

export function Photo({
  name,
  alt,
  className = "",
  preload = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
}: {
  name: PhotoName;
  alt: string;
  className?: string;
  preload?: boolean;
  sizes?: string;
}) {
  return <Image src={photoSrc(name)} alt={alt} fill sizes={sizes} preload={preload} className={`object-cover ${className}`} />;
}
