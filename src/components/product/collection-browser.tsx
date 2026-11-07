"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/product/product-grid";
import { familiesOf } from "@/lib/catalog";
import type { Fragrance, FragranceFamily } from "@/types/fragrance";

export function CollectionBrowser({ fragrances }: { fragrances: readonly Fragrance[] }) {
  const [family, setFamily] = useState<FragranceFamily | "all">("all");
  const families = familiesOf(fragrances);
  const shown = family === "all" ? fragrances : fragrances.filter((f) => f.family === family);
  const options = [
    { value: "all" as const, label: "All", count: fragrances.length },
    ...families.map((f) => ({
      value: f,
      label: f,
      count: fragrances.filter((x) => x.family === f).length,
    })),
  ];

  return (
    <div className="space-y-10">
      <div role="group" aria-label="Filter by scent family" className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={family === o.value}
            onClick={() => setFamily(o.value)}
            className="aria-pressed:bg-dusk aria-pressed:text-plaster ring-dusk/20 hover:ring-dusk px-4 py-2 text-sm capitalize ring-1 transition-colors"
          >
            {o.label} <span className="opacity-50">{o.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} perfumes
      </p>
      <ProductGrid fragrances={shown} />
    </div>
  );
}
