/** Stylised diagram of İstanbul bridging Europe and Asia, with the wider regions we serve. */
export function BridgeMap({
  labels,
}: {
  labels: { europe: string; asia: string; istanbul: string; middleEast: string; africa: string; centralAsia: string };
}) {
  const satellites = [
    { x: 470, y: 70, label: labels.centralAsia, anchor: "end" as const, dy: -18 },
    { x: 400, y: 370, label: labels.middleEast, anchor: "middle" as const, dy: 30 },
    { x: 130, y: 372, label: labels.africa, anchor: "middle" as const, dy: 30 },
  ];
  return (
    <svg viewBox="0 0 520 430" className="h-auto w-full" role="img" aria-label={`${labels.istanbul}: ${labels.europe} · ${labels.asia}`}>
      <circle cx="185" cy="200" r="135" fill="#0038a5" fillOpacity="0.45" stroke="#ffffff" strokeOpacity="0.25" />
      <circle cx="335" cy="200" r="135" fill="#018577" fillOpacity="0.45" stroke="#ffffff" strokeOpacity="0.25" />
      {satellites.map((s) => (
        <g key={s.label}>
          <line x1="260" y1="200" x2={s.x} y2={s.y} stroke="#ffffff" strokeOpacity="0.45" strokeDasharray="4 6" />
          <circle cx={s.x} cy={s.y} r="7" fill="#ffffff" />
          <text x={s.x} y={s.y + s.dy} textAnchor={s.anchor} fill="#ffffff" fillOpacity="0.8" fontSize="15" fontWeight="600">
            {s.label}
          </text>
        </g>
      ))}
      <text x="115" y="206" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="800">
        {labels.europe}
      </text>
      <text x="405" y="206" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="800">
        {labels.asia}
      </text>
      <circle cx="260" cy="200" r="14" fill="#eb2839" className="pulse-ring" />
      <circle cx="260" cy="200" r="11" fill="#eb2839" stroke="#ffffff" strokeWidth="3" />
      <text x="260" y="244" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="800">
        {labels.istanbul}
      </text>
    </svg>
  );
}
