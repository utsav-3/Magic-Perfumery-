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
