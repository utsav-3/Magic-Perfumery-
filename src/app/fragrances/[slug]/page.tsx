import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/product/add-to-cart";
import { Bottle } from "@/components/product/bottle";
import { NotePyramid } from "@/components/product/note-pyramid";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/ui/reveal";
import { getAllFragrances, getFragranceBySlug, getRelatedFragrances } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

// Pre-render every product page at build time; unknown slugs 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const fragrances = await getAllFragrances();
  return fragrances.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fragrance = await getFragranceBySlug((await params).slug);
  if (!fragrance) return {};
  return { title: fragrance.name, description: fragrance.tagline };
}

export default async function FragrancePage({ params }: Props) {
  const { slug } = await params;
  const fragrance = await getFragranceBySlug(slug);
  if (!fragrance) notFound();
  const related = await getRelatedFragrances(slug, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <nav aria-label="Breadcrumb" className="eyebrow text-haze mb-8 text-[0.65rem]">
        <Link href="/fragrances" className="hover:text-ink">
          The collection
        </Link>
        <span aria-hidden> / </span>
        <span aria-current="page">{fragrance.name}</span>
      </nav>

      <article className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <div
          className="grid aspect-[4/5] place-items-center self-start md:sticky md:top-24"
          style={{
            background: `color-mix(in oklab, ${fragrance.liquid} 24%, var(--color-plaster))`,
          }}
        >
          <Bottle
            id={`pdp-${fragrance.slug}`}
            liquid={fragrance.liquid}
            attar={fragrance.concentration === "Attar"}
            className="hero-rise h-[72%]"
          />
        </div>

        <div className="space-y-10">
          <header className="hero-rise space-y-4" style={{ "--d": "120ms" } as React.CSSProperties}>
            <p className="eyebrow text-haze">
              {fragrance.family} · {fragrance.concentration}
            </p>
            <h1 className="text-6xl leading-none sm:text-7xl">{fragrance.name}</h1>
            <p className="font-display text-2xl">{fragrance.tagline}</p>
          </header>
          <p className="leading-relaxed">{fragrance.description}</p>
          <AddToCart slug={fragrance.slug} name={fragrance.name} variants={fragrance.variants} />
          <NotePyramid notes={fragrance.notes} />
          <p className="text-haze text-sm">Named for {fragrance.place}.</p>
        </div>
      </article>

      <section aria-labelledby="related-heading" className="mt-28">
        <Reveal>
          <h2 id="related-heading" className="mb-10 text-4xl">
            More from the collection
          </h2>
          <ProductGrid fragrances={related} />
        </Reveal>
      </section>
    </div>
  );
}
