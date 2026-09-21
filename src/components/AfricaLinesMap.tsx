import type { CSSProperties } from "react";
import { geoContains } from "d3-geo";
import { africaOutline, africaProjection } from "@/lib/africa-geo";

const WIDTH = 560;
const HEIGHT = 620;
const STROKE = 9;
const RING_STEP = 15;
const COLORS = ["#C2412D", "#E8942F", "#3F6B35"];
// Swirl centres spread across the continent (longitude, latitude).
const CENTRES: [number, number][] = [
  [-6, 31], [7, 23], [24, 25], [-6, 12], [12, 12], [21, 6], [38, 9], [17, -4], [32, -9], [22, -24], [30, -28], [47, -19],
];

/** Deterministic PRNG, so every build produces the same drawing. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Stroke = { d: string; color: string; length: number };

// The drawing is deterministic but takes about two seconds of point-in-polygon tests, so it is
// computed once per server process instead of on every render (every request in `next dev`).
let cachedStrokes: Stroke[] | undefined;

function drawStrokes(): Stroke[] {
  const { projection } = africaProjection(WIDTH, HEIGHT);
  const random = mulberry32(20260921);
  const centres = CENTRES.map((c) => projection(c)!);
  const inAfrica = (x: number, y: number) => {
    const lonLat = projection.invert?.([x, y]);
    return lonLat ? geoContains(africaOutline, lonLat) : false;
  };
  const ownedBy = (x: number, y: number, index: number) => {
    const own = Math.hypot(x - centres[index][0], y - centres[index][1]);
    return centres.every((c, j) => j === index || own + STROKE * 0.9 < Math.hypot(x - c[0], y - c[1]));
  };

  const strokes: Stroke[] = [];
  centres.forEach(([cx, cy], index) => {
    for (let r = 6 + random() * 6; r < 150; r += RING_STEP) {
      let angle = random() * Math.PI * 2;
      const end = angle + Math.PI * 2;
      while (angle < end) {
        const sweep = Math.min(end - angle, (50 + random() * 110) * (Math.PI / 180));
        // Sample the arc; keep the runs that stay inside Africa and inside this centre's region.
        const steps = Math.max(2, Math.ceil((r * sweep) / 3));
        let run: [number, number][] = [];
        const flush = () => {
          if (run.length > 1) {
            const [a, b] = [run[0], run[run.length - 1]];
            const span = ((run.length - 1) / steps) * sweep;
            if (r * span > STROKE * 3) {
              strokes.push({
                d: `M${a[0].toFixed(1)} ${a[1].toFixed(1)}A${r.toFixed(1)} ${r.toFixed(1)} 0 ${span > Math.PI ? 1 : 0} 1 ${b[0].toFixed(1)} ${b[1].toFixed(1)}`,
                color: COLORS[Math.floor(random() * COLORS.length)],
                length: Math.ceil(r * span),
              });
            }
          }
          run = [];
        };
        for (let s = 0; s <= steps; s++) {
          const t = angle + (sweep * s) / steps;
          const x = cx + r * Math.cos(t);
          const y = cy + r * Math.sin(t);
          const inset = STROKE / 2;
          if (ownedBy(x, y, index) && inAfrica(x, y) && inAfrica(x + inset * Math.cos(t), y + inset * Math.sin(t))) run.push([x, y]);
          else flush();
        }
        flush();
        angle += sweep + (14 + random() * 26) * (Math.PI / 180);
      }
    }
  });
  return strokes;
}

/**
 * Africa drawn as swirls of rounded red, amber and green strokes (build-time SVG).
 * Each stroke is an arc around one of the centres, kept inside the continent and inside its own
 * centre's region, so strokes never cross. They draw in as the map scrolls into view.
 */
export function AfricaLinesMap({ label, className = "" }: { label: string; className?: string }) {
  const strokes = (cachedStrokes ??= drawStrokes());
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={label} className={`draw-in h-auto w-full ${className}`}>
      <g fill="none" strokeWidth={STROKE} strokeLinecap="round">
        {strokes.map((s, i) => (
          <path key={i} d={s.d} stroke={s.color} style={{ "--len": s.length } as CSSProperties} />
        ))}
      </g>
    </svg>
  );
}
