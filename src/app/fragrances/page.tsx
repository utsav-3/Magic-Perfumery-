import type { Metadata } from "next";
import { Suspense } from "react";
import { CollectionBrowser } from "@/components/product/collection-browser";
import { ProductGrid } from "@/components/product/product-grid";
import { getAllFragrances, sharedVariants } from "@/lib/catalog";
import { formatSizes } from "@/lib/format";

export const metadata: Metadata = {
  title: "Shop all perfumes",
  description: "Every perfume in the range, filtered by who it's for, occasion and scent.",
};

export default async function FragrancesPage() {
  const fragrances = await getAllFragrances();
  const shared = sharedVariants(fragrances);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
      <header className="hero-rise max-w-2xl space-y-4">
        <p className="eyebrow text-orchid">Shop all</p>
        <h1 className="text-5xl sm:text-6xl">All perfumes</h1>
        {shared && (
          <p className="text-haze text-lg">One price for every scent: {formatSizes(shared)}.</p>
        )}
      </header>
      {/* Filters read the URL, so the full grid is the pre-rendered fallback. */}
      <Suspense fallback={<ProductGrid fragrances={fragrances} />}>
        <CollectionBrowser fragrances={fragrances} />
      </Suspense>
    </div>
  );
}
