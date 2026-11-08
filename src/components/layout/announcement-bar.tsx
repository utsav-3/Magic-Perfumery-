import { getAllFragrances, sharedVariants } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

/** Thin bar above the header with the offer that matters most: one price for everything. */
export async function AnnouncementBar() {
  const shared = sharedVariants(await getAllFragrances());
  return (
    <div className="bg-night-deep text-paper/85 px-4 py-2 text-center text-[0.7rem] tracking-[0.14em] uppercase sm:text-xs">
      {shared ? (
        <>
          Every perfume{" "}
          {shared.map((v, i) => (
            <span key={v.sizeMl}>
              {i > 0 && <span aria-hidden> · </span>}
              <span className="text-saffron">
                {v.sizeMl} ml {formatPrice(v.priceMinor)}
              </span>
            </span>
          ))}
          <span className="hidden sm:inline"> · Order on WhatsApp</span>
        </>
      ) : (
        "Long-lasting perfume · Order on WhatsApp"
      )}
    </div>
  );
}
