import Link from "next/link";
import { GiftGuide } from "@/components/home/gift-guide";
import { Hero } from "@/components/home/hero";
import { Occasions } from "@/components/home/occasions";
import { OrderingSection } from "@/components/home/ordering-section";
import { RealBottles } from "@/components/home/real-bottles";
import { ShopFor } from "@/components/home/shop-for";
import { TrustStrip } from "@/components/home/trust-strip";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/ui/reveal";
import { getAllFragrances, getGiftPicks } from "@/lib/catalog";

export default async function HomePage() {
  const [fragrances, giftPicks] = await Promise.all([getAllFragrances(), getGiftPicks()]);

  return (
    <>
      <Hero fragrances={fragrances} />
      <TrustStrip fragrances={fragrances} />
      <ShopFor fragrances={fragrances} />

      <section aria-labelledby="collection-heading" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="eyebrow text-orchid">The range</p>
              <h2 id="collection-heading" className="text-4xl sm:text-5xl">
                All {fragrances.length} perfumes
              </h2>
            </div>
            <Link href="/fragrances" className="eyebrow underline underline-offset-8">
              Filter the range
            </Link>
          </Reveal>
          <Reveal>
            <ProductGrid fragrances={fragrances} />
          </Reveal>
        </div>
      </section>

      <Occasions fragrances={fragrances} />
      <GiftGuide picks={giftPicks} fragrances={fragrances} />
      <RealBottles />
      <OrderingSection />
    </>
  );
}
