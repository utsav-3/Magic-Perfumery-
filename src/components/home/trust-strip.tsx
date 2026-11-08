import { sharedVariants } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { Fragrance } from "@/types/fragrance";

/** The four promises, straight from the client's own poster. */
export function TrustStrip({ fragrances }: { fragrances: readonly Fragrance[] }) {
  const shared = sharedVariants(fragrances);
  const cheapest = shared?.[0];
  const items = [
    { title: "High projection", body: "Noticed across the room." },
    { title: "Long-lasting", body: "Made to wear from morning to night." },
    cheapest
      ? {
          title: "One price",
          body: `${formatPrice(cheapest.priceMinor)} for ${cheapest.sizeMl} ml, every scent.`,
        }
      : { title: "Honest prices", body: "No inflated MRP." },
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
