"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { familiesOf, filterFragrances, type FragranceFilter } from "@/lib/catalog";
import {
  audienceLabels,
  occasionLabels,
  type Audience,
  type Fragrance,
  type Occasion,
} from "@/types/fragrance";

const pick = <T extends string>(value: string | null, allowed: readonly T[]) =>
  allowed.find((a) => a === value);

/**
 * Filters live in the URL (?for=her&occasion=gifting&family=floral), so the
 * home page tiles can link straight to a filtered view and links can be shared.
 */
export function CollectionBrowser({ fragrances }: { fragrances: readonly Fragrance[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const families = familiesOf(fragrances);

  const filter: FragranceFilter = {
    audience: pick(params.get("for"), Object.keys(audienceLabels) as Audience[]),
    occasion: pick(params.get("occasion"), Object.keys(occasionLabels) as Occasion[]),
    family: pick(params.get("family"), families),
  };
  const shown = filterFragrances(fragrances, filter);

  const set = (key: string, value?: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const groups = [
    {
      key: "for",
      label: "Shop for",
      value: filter.audience,
      options: Object.entries(audienceLabels).map(([value, label]) => ({ value, label })),
    },
    {
      key: "occasion",
      label: "Occasion",
      value: filter.occasion,
      options: Object.entries(occasionLabels).map(([value, label]) => ({ value, label })),
    },
    {
      key: "family",
      label: "Scent",
      value: filter.family,
      options: families.map((f) => ({ value: f, label: f })),
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        {groups.map((g) => (
          <div
            key={g.key}
            role="group"
            aria-label={`Filter by ${g.label.toLowerCase()}`}
            className="-mr-4 flex snap-x scrollbar-none flex-nowrap items-center gap-2 overflow-x-auto [mask-image:linear-gradient(to_right,#000_calc(100%-2rem),transparent)] py-1 pr-8 sm:mr-0 sm:flex-wrap sm:overflow-visible sm:[mask-image:none] sm:pr-0"
          >
            <span className="eyebrow text-haze w-24 shrink-0 snap-start text-[0.65rem]">
              {g.label}
            </span>
            {[{ value: undefined, label: "All" }, ...g.options].map((o) => (
              <button
                key={o.value ?? "all"}
                type="button"
                aria-pressed={g.value === o.value}
                onClick={() => set(g.key, o.value)}
                className="aria-pressed:bg-night aria-pressed:text-paper ring-night/20 hover:ring-night shrink-0 snap-start rounded-full px-4 py-1.5 text-sm capitalize ring-1 transition-colors"
              >
                {o.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <p className="text-haze text-sm" aria-live="polite">
        Showing {shown.length} of {fragrances.length} perfumes
      </p>

      {shown.length > 0 ? (
        <ProductGrid fragrances={shown} />
      ) : (
        <div className="border-night/15 space-y-4 border p-10 text-center">
          <p className="font-display text-xl">No perfume matches all of those filters.</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => router.replace(pathname, { scroll: false })}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
