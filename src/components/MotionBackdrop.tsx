import type { CSSProperties } from "react";
import type { Accent } from "@/config/pillars";

const palettes: Record<Accent, [string, string, string]> = {
  blue: ["#0038a5", "#018577", "#1b5fd9"],
  green: ["#018577", "#0038a5", "#12a894"],
  red: ["#b3182b", "#0038a5", "#eb2839"],
  mixed: ["#0038a5", "#018577", "#12a894"],
};

/** Animated brand-coloured background: drifting orbs, a dot grid and glowing red sparks. */
export function MotionBackdrop({ accent = "blue" }: { accent?: Accent }) {
  const [a, b, c] = palettes[accent];
  return (
    <div className="motion-backdrop" aria-hidden="true" style={{ "--orb-a": a, "--orb-b": b, "--orb-c": c } as CSSProperties}>
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="dots" />
      <span className="spark" style={{ top: "24%", left: "6%" }} />
      <span className="spark" style={{ bottom: "16%", left: "46%", width: 6, height: 6, animationDelay: "-4s" }} />
      <span className="spark" style={{ top: "14%", right: "8%", width: 7, height: 7, animationDelay: "-2s" }} />
    </div>
  );
}
