import type { CSSProperties } from "react";

export type Accent = "blue" | "green" | "earth" | "mixed";

const palettes: Record<Accent, [string, string, string]> = {
  blue: ["#0038a5", "#018577", "#1b5fd9"],
  green: ["#018577", "#0038a5", "#12a894"],
  earth: ["#0f6e63", "#b3182b", "#d8872f"],
  mixed: ["#0038a5", "#018577", "#12a894"],
};

/** Animated brand-coloured background: softly drifting, blurred colour fields over a faint dot grid. */
export function MotionBackdrop({ accent = "blue" }: { accent?: Accent }) {
  const [a, b, c] = palettes[accent];
  return (
    <div className="motion-backdrop" aria-hidden="true" style={{ "--orb-a": a, "--orb-b": b, "--orb-c": c } as CSSProperties}>
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="dots" />
    </div>
  );
}
