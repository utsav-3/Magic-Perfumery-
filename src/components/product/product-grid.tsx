import { ProductCard } from "@/components/product/product-card";
import type { Fragrance } from "@/types/fragrance";

export function ProductGrid({ fragrances }: { fragrances: readonly Fragrance[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
      {fragrances.map((f) => (
        <li key={f.slug}>
          <ProductCard fragrance={f} />
        </li>
      ))}
    </ul>
  );
}
