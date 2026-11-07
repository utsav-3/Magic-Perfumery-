/**
 * The signature: Marine Drive at dusk. The bay road hangs across the frame like
 * the "Queen's Necklace", and its sodium lamps switch on one by one, left to
 * right, with reflections shimmering in the water. Pure SVG + CSS (see
 * globals.css) — computed on the server, zero client JavaScript.
 */
const W = 1440;
const H = 640;
const P0 = { x: -40, y: 420 };
const P1 = { x: 640, y: 585 };
const P2 = { x: 1480, y: 450 };
const LIGHTS = 44;

function point(t: number) {
  const u = 1 - t;
  return {
    x: u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x,
    y: u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y,
  };
}

/** y of the road at a given x (bisection; x(t) is monotonic). */
function roadY(x: number) {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (point(mid).x < x) lo = mid;
    else hi = mid;
  }
  return point((lo + hi) / 2).y;
}

/** Deterministic PRNG so server output is stable between builds. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface Building {
  x: number;
  w: number;
  top: number;
  base: number;
  setback: number;
  spire: boolean;
  windows: { x: number; y: number }[];
}

function buildSkyline(): Building[] {
  const rand = seeded(11);
  const out: Building[] = [];
  let x = -30;
  while (x < W + 30) {
    const w = 22 + rand() * 44;
    const base = roadY(x + w / 2) + 4;
    // Taller towers toward Nariman Point (left), Deco blocks along the curve.
    const towerBias = x < 380 ? 1.5 : 1;
    const h = (34 + rand() * 78) * towerBias;
    const top = base - h;
    const windows: { x: number; y: number }[] = [];
    for (let wy = top + 8; wy < base - 10; wy += 9) {
      for (let wx = x + 5; wx < x + w - 6; wx += 8) {
        if (rand() < 0.09) windows.push({ x: wx, y: wy });
      }
    }
    out.push({
      x,
      w,
      top,
      base,
      setback: rand() < 0.5 ? 8 + rand() * 14 : 0,
      spire: rand() < 0.12,
      windows,
    });
    x += w + (rand() < 0.2 ? 6 : 0);
  }
  return out;
}

const skyline = buildSkyline();
const lamps = Array.from({ length: LIGHTS }, (_, i) => point((i + 0.5) / LIGHTS));
const road = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`;

export function NecklaceScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#171933" />
          <stop offset="0.42" stopColor="#2a2950" />
          <stop offset="0.62" stopColor="#56405f" />
          <stop offset="0.74" stopColor="#8b5c68" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e2042" />
          <stop offset="1" stopColor="#0e0f22" />
        </linearGradient>
        <radialGradient id="lampGlow">
          <stop offset="0" stopColor="#f2a93b" stopOpacity="0.85" />
          <stop offset="0.35" stopColor="#f2a93b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f2a93b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="reflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2a93b" stopOpacity="0.38" />
          <stop offset="0.5" stopColor="#f2a93b" stopOpacity="0.14" />
          <stop offset="1" stopColor="#f2a93b" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill="url(#sky)" />

      <g fill="#1b1c3a">
        {skyline.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.top} width={b.w} height={b.base - b.top} />
            {b.setback > 0 && (
              <rect
                x={b.x + b.w * 0.2}
                y={b.top - b.setback}
                width={b.w * 0.6}
                height={b.setback + 1}
              />
            )}
            {b.spire && (
              <rect x={b.x + b.w / 2 - 1} y={b.top - b.setback - 18} width={2} height={20} />
            )}
          </g>
        ))}
      </g>
      <g fill="#f2a93b" opacity="0.45">
        {skyline.flatMap((b, i) =>
          b.windows.map((w, j) => (
            <rect key={`${i}-${j}`} x={w.x} y={w.y} width={2.5} height={3.5} />
          )),
        )}
      </g>

      <path d={`${road} L ${W + 40} ${H} L -40 ${H} Z`} fill="url(#water)" />
      <path d={road} fill="none" stroke="#eceeea" strokeOpacity="0.18" strokeWidth="1.2" />

      {lamps.map((p, i) => (
        <rect
          key={`r${i}`}
          className="necklace-reflection"
          style={{ "--i": i } as React.CSSProperties}
          x={p.x - 3.5}
          y={p.y + 8}
          width={7}
          rx={3.5}
          height={30 + ((i * 37) % 5) * 8}
          fill="url(#reflect)"
        />
      ))}
      {lamps.map((p, i) => (
        <g key={`l${i}`} className="necklace-light" style={{ "--i": i } as React.CSSProperties}>
          <circle cx={p.x} cy={p.y - 6} r={13} fill="url(#lampGlow)" />
          <circle cx={p.x} cy={p.y - 6} r={2.4} fill="#ffdca6" />
        </g>
      ))}
    </svg>
  );
}
