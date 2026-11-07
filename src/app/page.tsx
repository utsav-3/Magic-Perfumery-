import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { OrderingSection } from "@/components/home/ordering-section";
import { OriginsSection } from "@/components/home/origins-section";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/ui/reveal";
import { getAllFragrances } from "@/lib/catalog";

export default async function HomePage() {
  const fragrances = await getAllFragrances();

  return (
    <>
      <Hero />

      <section aria-labelledby="collection-heading" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-4">
              <p className="eyebrow text-haze">The collection</p>
              <h2 id="collection-heading" className="text-5xl sm:text-6xl">
                One city, eight perfumes
              </h2>
            </div>
            <Link href="/fragrances" className="eyebrow underline underline-offset-8">
              Filter by scent family
            </Link>
          </Reveal>
          <Reveal>
            <ProductGrid fragrances={fragrances} />
          </Reveal>
        </div>
      </section>

      <OriginsSection />
      <OrderingSection />
    </>
  );
}
