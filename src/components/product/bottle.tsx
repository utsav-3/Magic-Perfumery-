import { LotusPaths } from "@/components/brand/lotus-mark";
import type { Label } from "@/types/fragrance";

/**
 * Magic Perfumery's spray bottle, drawn from the client's photo: a frosted
 * cylinder, white pump under a clear cap, and a printed wrap-around label.
 * `id` must be unique per page (it namespaces the SVG gradients).
 */
export function Bottle({
  id,
  name,
  label,
  className = "",
}: {
  id: string;
  name: string;
  label: Label;
  className?: string;
}) {
  const bg = `${id}-label`;
  const glass = `${id}-glass`;
  const lines = splitName(name);

  return (
    <svg viewBox="0 0 60 200" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={label.from} />
          <stop offset="1" stopColor={label.to} />
        </linearGradient>
        {/* Frosted plastic: brighter in the middle, darker at the edges. */}
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9d3e2" />
          <stop offset="0.35" stopColor="#fbfafc" />
          <stop offset="1" stopColor="#cfc8da" />
        </linearGradient>
      </defs>

      <ellipse cx="30" cy="196" rx="26" ry="3" fill="#1e1530" opacity="0.14" />

      {/* Body */}
      <rect x="6" y="60" width="48" height="134" rx="7" fill={`url(#${glass})`} />

      {/* Label */}
      <rect x="6" y="84" width="48" height="92" fill={`url(#${bg})`} />
      <g
        transform="translate(30 104) scale(0.15)"
        fill="none"
        stroke={label.mark}
        strokeWidth="6"
        strokeLinejoin="round"
      >
        <LotusPaths />
      </g>
      <text
        x="30"
        y="92.5"
        textAnchor="middle"
        fontSize="3.1"
        letterSpacing="0.3"
        fill={label.ink}
        opacity="0.8"
        fontFamily="var(--font-heading), serif"
      >
        MAGIC PERFUMERY
      </text>
      <text
        textAnchor="middle"
        fontSize="6"
        letterSpacing="0.4"
        fill={label.ink}
        fontFamily="var(--font-heading), serif"
        fontWeight="700"
      >
        {lines.map((line, i) => (
          <tspan key={line} x="30" y={130 + i * 7.5 - (lines.length - 1) * 3.75}>
            {line}
          </tspan>
        ))}
      </text>
      <rect x="10" y="160" width="40" height="0.6" fill={label.ink} opacity="0.35" />

      {/* Pump collar and actuator */}
      <rect x="14" y="40" width="32" height="24" rx="3" fill="#ffffff" />
      <rect x="14" y="58" width="32" height="2" fill="#e4dfea" />
      <rect x="21" y="16" width="18" height="26" rx="3" fill="#ffffff" />
      <rect x="21" y="16" width="18" height="3" rx="1.5" fill="#ece8f1" />

      {/* Clear overcap */}
      <rect
        x="8"
        y="6"
        width="44"
        height="58"
        rx="6"
        fill="#ffffff"
        fillOpacity="0.28"
        stroke="#ffffff"
        strokeOpacity="0.8"
      />

      {/* Highlights */}
      <rect x="11" y="66" width="3.5" height="122" rx="1.75" fill="#ffffff" opacity="0.55" />
      <rect x="12" y="10" width="2.5" height="50" rx="1.25" fill="#ffffff" opacity="0.7" />
      <rect
        x="6"
        y="60"
        width="48"
        height="134"
        rx="7"
        fill="none"
        stroke="#1e1530"
        strokeOpacity="0.12"
      />
    </svg>
  );
}

/** Up to two lines of roughly 8 characters, split on spaces. */
function splitName(name: string): string[] {
  const upper = name.toUpperCase();
  if (upper.length <= 8 || !upper.includes(" ")) return [upper];
  const words = upper.split(" ");
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) [best, bestDiff] = [i, diff];
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}
