/**
 * Card lean in degrees for a pointer at (px, py) inside a w×h box.
 * Right edge → +ry, top edge → +rx, clamped to ±max.
 */
export function tiltFromPointer(
  px: number,
  py: number,
  w: number,
  h: number,
  max = 6,
): { rx: number; ry: number } {
  if (w <= 0 || h <= 0) return { rx: 0, ry: 0 };
  const clamp = (v: number) => Math.min(max, Math.max(-max, v));
  return {
    rx: clamp((0.5 - py / h) * 2 * max),
    ry: clamp((px / w - 0.5) * 2 * max),
  };
}
