/**
 * Magic Perfumery's lotus, redrawn as line art from the client's logo:
 * eight outer petals with eight smaller petals between them.
 * Replace with the client's vector file when they send it.
 */

const petal = (length: number, width: number) =>
  `M0 0 C${width} ${-length * 0.35} ${width * 0.6} ${-length * 0.8} 0 ${-length} ` +
  `C${-width * 0.6} ${-length * 0.8} ${-width} ${-length * 0.35} 0 0Z`;

const OUTER = petal(46, 17);
const INNER = petal(31, 11);
const angles = Array.from({ length: 8 }, (_, i) => i * 45);

export interface LotusGeometry {
  petals: { d: string; rotate: number }[];
  centerRadius: number;
}

/** The lotus as plain data (centred on 0,0, radius about 46), for SVG strings and textures. */
export function lotusPathData(): LotusGeometry {
  return {
    petals: [
      ...angles.map((a) => ({ d: OUTER, rotate: a })),
      ...angles.map((a) => ({ d: INNER, rotate: a + 22.5 })),
    ],
    centerRadius: 5,
  };
}

/** The lotus as SVG children, centred on 0,0 with a radius of about 46. */
export function LotusPaths({ animated = false }: { animated?: boolean }) {
  // `pathLength` lets the CSS draw every petal with the same dash values.
  const draw = (i: number) =>
    animated
      ? {
          pathLength: 1,
          className: "lotus-petal",
          style: { "--i": i } as React.CSSProperties,
        }
      : {};
  const { petals, centerRadius } = lotusPathData();
  return (
    <>
      {petals.map((p, i) => (
        <path key={i} d={p.d} transform={`rotate(${p.rotate})`} {...draw(i)} />
      ))}
      <circle r={centerRadius} {...draw(petals.length)} />
    </>
  );
}

export function LotusMark({
  className = "",
  strokeWidth = 3,
  animated = false,
}: {
  className?: string;
  strokeWidth?: number;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <LotusPaths animated={animated} />
    </svg>
  );
}
