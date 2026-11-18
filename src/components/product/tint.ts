import type { Label } from "@/types/fragrance";

/** Panel colour behind a bottle: the page paper, tinted with the label's colour. */
export function labelTint(label: Label, amount = 20) {
  return `color-mix(in oklab, ${label.to} ${amount}%, var(--color-paper))`;
}
