import Link from "next/link";
import { Bottle } from "@/components/product/bottle";
import { Reveal } from "@/components/ui/reveal";
import { filterFragrances } from "@/lib/catalog";
import { audienceLabels, type Audience, type Fragrance } from "@/types/fragrance";

const tiles: Record<Audience, { blurb: string; panel: string }> = {
  him: { blurb: "Fresh, woody and warm.", panel: "linear-gradient(160deg, #2b2c9e, #2f72b0)" },
  her: { blurb: "Florals, soft and classic.", panel: "linear-gradient(160deg, #5e2a6e, #a84f7e)" },
  unisex: { blurb: "Made for anyone.", panel: "linear-gradient(160deg, #6e2a22, #a84a2a)" },
};

export function ShopFor({ fragrances }: { fragrances: readonly Fragrance[] }) {
  const audiences = Object.keys(audienceLabels) as Audience[];
  return (
    <section
      id="shop-for"
      aria-labelledby="shop-for-heading"
      className="scroll-mt-16 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 space-y-3">
          <p className="eyebrow text-orchid">Shop by who it&rsquo;s for</p>
          <h2 id="shop-for-heading" className="text-4xl sm:text-5xl">
            Find yours
          </h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-3">
          {audiences.map((a, i) => {
            // Unisex scents count under him and her too.
            const list = filterFragrances(fragrances, { audience: a });
            return (
              <li key={a}>
                <Reveal delay={i * 100}>
                  <Link
                    href={`/fragrances?for=${a}`}
                    className="group on-dark text-paper relative flex aspect-[5/4] flex-col justify-between overflow-hidden p-6 sm:aspect-[4/5]"
                    style={{ background: tiles[a].panel }}
                  >
                    <div className="relative">
                      <h3 className="text-3xl font-semibold">{audienceLabels[a]}</h3>
                      <p className="text-paper/85 mt-1 text-sm">{tiles[a].blurb}</p>
                    </div>
                    <div aria-hidden className="absolute right-3 -bottom-2 flex items-end">
                      {list.slice(0, 3).map((f, j) => (
                        <Bottle
                          key={f.slug}
                          id={`for-${a}-${f.slug}`}
                          name={f.name}
                          label={f.label}
                          className={`ease-magic h-32 transition-transform duration-700 group-hover:-translate-y-2 sm:h-40 ${j === 1 ? "mb-4" : ""}`}
                        />
                      ))}
                    </div>
                    <p className="eyebrow relative">
                      {list.length} {list.length === 1 ? "perfume" : "perfumes"}{" "}
                      <span
                        aria-hidden
                        className="inline-block transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </p>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
