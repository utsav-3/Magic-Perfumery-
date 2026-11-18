import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { filterFragrances } from "@/lib/catalog";
import { occasionLabels, type Fragrance, type Occasion } from "@/types/fragrance";

const blurbs: Record<Occasion, string> = {
  everyday: "Fresh, easy scents for work, college and hot afternoons.",
  evening: "Warmer, stronger scents for dinners, parties and nights out.",
  gifting: "Crowd-pleasers that are safe to give to almost anyone.",
};

export function Occasions({ fragrances }: { fragrances: readonly Fragrance[] }) {
  const occasions = Object.keys(occasionLabels) as Occasion[];
  return (
    <section aria-labelledby="occasion-heading" className="bg-lilac py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 space-y-3">
          <p className="eyebrow text-orchid">Shop by occasion</p>
          <h2 id="occasion-heading" className="text-4xl sm:text-5xl">
            When will you wear it?
          </h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-3">
          {occasions.map((o, i) => {
            const list = filterFragrances(fragrances, { occasion: o });
            return (
              <li key={o}>
                <Reveal delay={i * 100} className="h-full">
                  <Link
                    href={`/fragrances?occasion=${o}`}
                    className="group bg-paper hover:ring-orchid flex h-full flex-col gap-4 p-6 ring-1 ring-transparent transition-shadow"
                  >
                    <h3 className="text-2xl font-semibold">{occasionLabels[o]}</h3>
                    <p className="text-haze">{blurbs[o]}</p>
                    <p className="mt-auto text-sm">{list.map((f) => f.name).join(" · ")}</p>
                    <p className="eyebrow text-orchid">
                      Shop {occasionLabels[o].toLowerCase()}{" "}
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
