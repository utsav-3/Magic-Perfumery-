/** Pure motion maths for the 3D hero bottle, kept apart so it is unit-tested. */

export type HeroMode = "3d" | "svg";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Bottle rotation in radians. `t` is seconds, `scroll01` is progress
 * through the hero, `pointer` is -1..1 from the screen centre.
 */
export function bottleRotation(
  t: number,
  scroll01: number,
  pointer: { x: number; y: number },
): { x: number; y: number } {
  const s = clamp(scroll01, 0, 1);
  const px = clamp(pointer.x, -1, 1);
  const py = clamp(pointer.y, -1, 1);
  return { x: py * 0.12, y: t * 0.35 + s * Math.PI + px * 0.25 };
}

/** Losing the WebGL context or hitting a render error always shows the drawn bottle. */
export function fallbackAfterContextLoss(_prev: HeroMode, _event: "lost" | "error"): "svg" {
  return "svg";
}
