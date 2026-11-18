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

/** Longest step the motion clock takes, so a returning tab doesn't jump ahead. */
const MAX_STEP_S = 0.1;

/**
 * The scene's own clock. R3F resets `clock.elapsedTime` whenever the frame
 * loop is paused and resumed (hero scrolled away, tab hidden), which would
 * replay the entrance; this keeps counting from where it left off.
 */
export function advanceClock(elapsed: number, delta: number): number {
  return elapsed + Math.min(Math.max(delta, 0), MAX_STEP_S);
}

/** Pointer position over the whole window, -1..1 from the centre (y up). */
export function pointerFromWindow(
  clientX: number,
  clientY: number,
  width: number,
  height: number,
): { x: number; y: number } {
  const x = width > 0 ? (clientX / width) * 2 - 1 : 0;
  const y = height > 0 ? 1 - (clientY / height) * 2 : 0;
  return { x: clamp(x, -1, 1) + 0, y: clamp(y, -1, 1) + 0 };
}
