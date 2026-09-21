// next/image loader for the static export. Site photos (public/images/<name>.webp) have a
// 640px copy (<name>-640.webp) made by `npm run images`; small screens get that one.
// Other images (portraits, the Earth poster, logos) are passed with `unoptimized`.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  return width <= 640 && /^\/images\/[a-z-]+\.webp$/.test(src) ? src.replace(/\.webp$/, "-640.webp") : src;
}
