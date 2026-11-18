/** Brand-level settings. Change brand copy here only. */
export const siteConfig = {
  name: "Magic Perfumery",
  description:
    "Long-lasting perfumes with strong projection, at one honest price. Order on WhatsApp.",
  locale: "en-IN",
  currency: "INR",
  nav: [
    { href: "/fragrances", label: "Shop all" },
    { href: "/fragrances?for=him", label: "For him" },
    { href: "/fragrances?for=her", label: "For her" },
    { href: "/#gifts", label: "Gifts" },
  ],
} as const;
