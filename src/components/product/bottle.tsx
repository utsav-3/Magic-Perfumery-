/**
 * Drawn Art Deco flacon, tinted with the perfume's colour. Stands in for
 * product photography; swap for next/image when shoots exist.
 * `id` must be unique per page (it namespaces the SVG gradient and clip).
 */
export function Bottle({
  id,
  liquid,
  attar = false,
  className = "",
}: {
  id: string;
  liquid: string;
  attar?: boolean;
  className?: string;
}) {
  const liq = `${id}-liq`;
  const clip = `${id}-clip`;
  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={liq} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={liquid} stopOpacity="0.7" />
          <stop offset="1" stopColor={liquid} />
        </linearGradient>
        <clipPath id={clip}>
          {attar ? (
            <circle cx="60" cy="138" r="46" />
          ) : (
            <path d="M24 70 L36 58 H84 L96 70 V178 Q96 188 86 188 H34 Q24 188 24 178 Z" />
          )}
        </clipPath>
      </defs>

      <ellipse cx="60" cy="194" rx="36" ry="4" fill="#1f2142" opacity="0.12" />

      {attar ? (
        <>
          <rect x="57" y="24" width="6" height="58" fill="#fff" opacity="0.5" />
          <polygon points="60,4 73,20 60,36 47,20" fill="#1f2142" />
          <polygon points="60,10 67,20 60,30 53,20" fill="none" stroke="#f2a93b" strokeWidth="1" />
          <rect x="54" y="80" width="12" height="16" fill="#fff" opacity="0.35" />
          <rect x="48" y="74" width="24" height="9" fill="#1f2142" />
          <rect x="48" y="80" width="24" height="1.5" fill="#f2a93b" />
          <circle cx="60" cy="138" r="46" fill="#fff" opacity="0.3" />
          <rect
            x="0"
            y="108"
            width="120"
            height="90"
            fill={`url(#${liq})`}
            clipPath={`url(#${clip})`}
          />
          <circle cx="60" cy="138" r="46" fill="none" stroke="#1f2142" strokeOpacity="0.25" />
          <ellipse
            cx="40"
            cy="124"
            rx="5"
            ry="18"
            fill="#fff"
            opacity="0.4"
            transform="rotate(20 40 124)"
          />
          <rect x="44" y="183" width="32" height="6" fill="#1f2142" />
          <circle cx="60" cy="146" r="14" fill="#eceeea" opacity="0.92" />
          <text
            x="60"
            y="149.5"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="1.5"
            fill="#1f2142"
            fontFamily="var(--font-heading), serif"
          >
            BP
          </text>
        </>
      ) : (
        <>
          <rect x="52" y="8" width="16" height="10" fill="#1f2142" />
          <rect x="46" y="16" width="28" height="16" fill="#1f2142" />
          <rect x="40" y="30" width="40" height="18" rx="1" fill="#1f2142" />
          <rect x="40" y="43" width="40" height="1.5" fill="#f2a93b" />
          <rect x="50" y="46" width="20" height="14" fill="#fff" opacity="0.35" />
          <path
            d="M24 70 L36 58 H84 L96 70 V178 Q96 188 86 188 H34 Q24 188 24 178 Z"
            fill="#fff"
            opacity="0.3"
          />
          <rect
            x="0"
            y="82"
            width="120"
            height="120"
            fill={`url(#${liq})`}
            clipPath={`url(#${clip})`}
          />
          <rect
            x="24"
            y="82"
            width="72"
            height="1.5"
            fill="#fff"
            opacity="0.4"
            clipPath={`url(#${clip})`}
          />
          <path
            d="M24 70 L36 58 H84 L96 70 V178 Q96 188 86 188 H34 Q24 188 24 178 Z"
            fill="none"
            stroke="#1f2142"
            strokeOpacity="0.25"
          />
          <rect x="30" y="74" width="5" height="102" rx="2.5" fill="#fff" opacity="0.4" />
          <rect x="40" y="116" width="40" height="42" fill="#eceeea" opacity="0.92" />
          <rect
            x="43"
            y="119"
            width="34"
            height="36"
            fill="none"
            stroke="#1f2142"
            strokeOpacity="0.45"
            strokeWidth="0.75"
          />
          <text
            x="60"
            y="141"
            textAnchor="middle"
            fontSize="11"
            letterSpacing="2"
            fill="#1f2142"
            fontFamily="var(--font-heading), serif"
          >
            BP
          </text>
        </>
      )}
    </svg>
  );
}
