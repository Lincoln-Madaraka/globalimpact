/** Softly drifting, blurred brand-blue colour fields over a faint dot grid. */
export function MotionBackdrop() {
  return (
    <div className="motion-backdrop" aria-hidden="true">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="dots" />
    </div>
  );
}
