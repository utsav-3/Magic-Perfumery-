import { siteConfig } from "@/config/site";

const priceFormatter = new Intl.NumberFormat(siteConfig.locale, {
  style: "currency",
  currency: siteConfig.currency,
  maximumFractionDigits: 0,
});

/** Format minor units (paise) as a localized currency string, e.g. ₹4,800. */
export function formatPrice(minor: number): string {
  return priceFormatter.format(minor / 100);
}

/** "₹599 for 50 ml or ₹1,199 for 100 ml" */
export function formatSizes(variants: readonly { sizeMl: number; priceMinor: number }[]) {
  const parts = variants.map((v) => `${formatPrice(v.priceMinor)} for ${v.sizeMl} ml`);
  return parts.length > 1
    ? `${parts.slice(0, -1).join(", ")} or ${parts.at(-1)}`
    : (parts[0] ?? "");
}
