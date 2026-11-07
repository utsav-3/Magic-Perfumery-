import type { Metadata } from "next";
import { CollectionBrowser } from "@/components/product/collection-browser";
import { getAllFragrances } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "The collection",
  description: "Eight perfumes and attars, each named for a corner of Bombay.",
};

export default async function FragrancesPage() {
  const fragrances = await getAllFragrances();

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
      <header className="hero-rise max-w-2xl space-y-4">
        <p className="eyebrow text-haze">The collection</p>
        <h1 className="text-6xl sm:text-7xl">One city, eight perfumes</h1>
        <p className="text-haze text-lg">
          Each one is named for a corner of Bombay. Filter by scent family to find your way in.
        </p>
      </header>
      <CollectionBrowser fragrances={fragrances} />
    </div>
  );
}
