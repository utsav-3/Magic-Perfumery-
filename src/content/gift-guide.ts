/** Hand-picked gift suggestions. Draft picks, to confirm with the client. */
export interface GiftPick {
  title: string;
  reason: string;
  slug: string;
}

export const giftPicks: readonly GiftPick[] = [
  {
    title: "For him",
    reason: "Smooth and safe to give: works at the office and at a wedding.",
    slug: "z-classics",
  },
  {
    title: "For her",
    reason: "A classic floral that feels like an occasion.",
    slug: "no-5",
  },
  {
    title: "For anyone with a sweet tooth",
    reason: "Caramel and vanilla that everyone asks about.",
    slug: "molten-caramel",
  },
];
