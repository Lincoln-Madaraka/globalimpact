import { africaCountries, africaProjection, countryInfo } from "@/lib/africa-geo";

const WIDTH = 600;
const HEIGHT = 660;

/**
 * Map of Africa with every country filled with its flag, rendered at build time as inline SVG.
 * Kenya, GIA's African hub, gets a heavier outline and a caption.
 */
export function AfricaFlagMap({ label, caption, className = "" }: { label: string; caption: string; className?: string }) {
  const { path } = africaProjection(WIDTH, HEIGHT);
  const countries = africaCountries.map((country, i) => {
    const info = countryInfo(country);
    const [[x0, y0], [x1, y1]] = path.bounds(country);
    return { d: path(country) ?? "", info, id: `flag-${i}`, box: { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } };
  });
  const kenya = countries.find((c) => c.info?.code === "ke");

  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={label} className="flag-map h-auto w-full">
        <defs>
          {countries
            .filter((c) => c.info?.code)
            .map((c) => (
              <pattern key={c.id} id={c.id} patternUnits="userSpaceOnUse" x={c.box.x} y={c.box.y} width={c.box.w} height={c.box.h}>
                {/* Pattern content is positioned relative to the tile's own top-left corner. */}
                <image href={`/flags/${c.info!.code}.svg`} width={c.box.w} height={c.box.h} preserveAspectRatio="xMidYMid slice" />
              </pattern>
            ))}
        </defs>
        <g stroke="#ffffff" strokeWidth={0.8} strokeLinejoin="round">
          {countries.map((c) => (
            <path key={c.id} d={c.d} fill={c.info?.code ? `url(#${c.id})` : "#e9e6df"}>
              <title>{c.info?.name}</title>
            </path>
          ))}
        </g>
        {kenya && <path d={kenya.d} fill="none" stroke="#0a1a3a" strokeWidth={2.5} strokeLinejoin="round" pointerEvents="none" />}
      </svg>
      <figcaption className="mt-4 text-small font-medium text-muted">{caption}</figcaption>
    </figure>
  );
}
