/** Positions around 70px blush disc centered in the 216×174 badge wrap. */
const SPARKLE_MARKS: Array<{ cx: number; cy: number; size: number }> = [
  { cx: 72, cy: 42, size: 4.5 },
  { cx: 144, cy: 42, size: 4.5 },
  { cx: 72, cy: 132, size: 4.5 },
  { cx: 162, cy: 87, size: 4.5 },
];

function SparkleCross({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  return (
    <path
      d={`M${cx} ${cy - size}V${cy + size}M${cx - size} ${cy}H${cx + size}`}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  );
}

/** Hero check — blush halo, bold check, four cross sparkles (artboard 8). */
export function WaitlistCheckBadge() {
  return (
    <div className="waitlist-check-badge-wrap" aria-hidden>
      <svg className="waitlist-badge-sparkle-dots" viewBox="0 0 216 174" fill="none">
        {SPARKLE_MARKS.map((mark, i) => (
          <SparkleCross key={i} cx={mark.cx} cy={mark.cy} size={mark.size} />
        ))}
      </svg>
      <div className="waitlist-check-badge-halo">
        <svg viewBox="0 0 80 80" fill="none" className="waitlist-check-badge-disc">
          <circle cx="40" cy="40" r="40" fill="#EDD5C5" />
          <path
            d="M24 40.5L35.5 52L56 29.5"
            stroke="#1A1A1A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
