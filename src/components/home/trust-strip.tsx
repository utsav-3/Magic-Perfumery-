import { sharedVariants } from "@/lib/catalog";
import { formatSizes } from "@/lib/format";
import type { Fragrance } from "@/types/fragrance";

/** The range at a glance, then the promises from the client's own poster. */
export function TrustStrip({ fragrances }: { fragrances: readonly Fragrance[] }) {
  const shared = sharedVariants(fragrances);
  const items = [
    {
      title: `${fragrances.length} perfumes`,
      body: shared ? formatSizes(shared) : "Long-lasting, strong projection.",
    },
    { title: "High projection", body: "Noticed across the room." },
    { title: "Long-lasting", body: "Made to wear from morning to night." },
    { title: "Order on WhatsApp", body: "Send your bag, we reply to confirm." },
  ];
  return (
    <section aria-label="Why Magic Perfumery" className="bg-lilac">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
        {items.map((it) => (
          <li key={it.title} className="border-orchid/40 border-l-2 pl-4">
            <p className="font-display text-base font-semibold">{it.title}</p>
            <p className="text-haze mt-1 text-sm">{it.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
