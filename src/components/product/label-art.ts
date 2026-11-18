import { lotusPathData } from "@/components/brand/lotus-mark";
import type { Fragrance } from "@/types/fragrance";

/** Width ÷ height of the flat label artwork. */
export const LABEL_ASPECT = 2;

const W = 1024;
const H = W / LABEL_ASPECT;

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The bottle label unrolled flat, as an SVG string: used as the texture on
 * the 3D bottle. Same artwork as the drawn `Bottle`: gradient, brand line,
 * lotus and name. The front of the bottle is the horizontal centre.
 */
export function labelSvg(f: Fragrance): string {
  const { from, to, ink, mark } = f.label;
  const { petals, centerRadius } = lotusPathData();
  const lotus = petals.map((p) => `<path d="${p.d}" transform="rotate(${p.rotate})"/>`).join("");
  const name = escape(f.name.toUpperCase());

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`,
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>`,
    `</linearGradient></defs>`,
    `<rect width="${W}" height="${H}" fill="url(#g)"/>`,
    `<text x="${W / 2}" y="70" text-anchor="middle" font-family="Cinzel, serif" font-size="30" letter-spacing="6" fill="${ink}" opacity="0.8">MAGIC PERFUMERY</text>`,
    `<g transform="translate(${W / 2} 175) scale(0.95)" fill="none" stroke="${mark}" stroke-width="4" stroke-linejoin="round">${lotus}<circle r="${centerRadius}"/></g>`,
    `<text x="${W / 2}" y="340" text-anchor="middle" font-family="Cinzel, serif" font-weight="700" font-size="64" letter-spacing="4" fill="${ink}">${name}</text>`,
    `<rect x="${W / 2 - 150}" y="400" width="300" height="2" fill="${ink}" opacity="0.35"/>`,
    `</svg>`,
  ].join("");
}
