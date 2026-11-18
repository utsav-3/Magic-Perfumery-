import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/product/add-to-cart";
import { Bottle } from "@/components/product/bottle";
import { NotePyramid } from "@/components/product/note-pyramid";
import { ProductGrid } from "@/components/product/product-grid";
import { labelTint } from "@/components/product/tint";
import { Reveal } from "@/components/ui/reveal";
import { getAllFragrances, getFragranceBySlug, getRelatedFragrances } from "@/lib/catalog";
import { audienceLabels, occasionLabels } from "@/types/fragrance";

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
  const related = await getRelatedFragrances(slug, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <nav aria-label="Breadcrumb" className="eyebrow text-haze mb-8 text-[0.65rem]">
        <Link href="/fragrances" className="hover:text-ink">
          All perfumes
        </Link>
        <span aria-hidden> / </span>
        <span aria-current="page">{fragrance.name}</span>
      </nav>

      <article className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <div
          className="grid aspect-[4/5] place-items-center self-start md:sticky md:top-24"
          style={{ background: labelTint(fragrance.label, 24) }}
        >
          <Bottle
            id={`pdp-${fragrance.slug}`}
            name={fragrance.name}
            label={fragrance.label}
            className="hero-rise h-[78%]"
          />
        </div>

        <div className="space-y-10">
          <header className="hero-rise space-y-4" style={{ "--d": "120ms" } as React.CSSProperties}>
            <p className="eyebrow text-haze">
              {audienceLabels[fragrance.audience]} · {fragrance.family}
            </p>
            <h1 className="text-5xl leading-none font-semibold sm:text-6xl">{fragrance.name}</h1>
            <p className="text-xl">{fragrance.tagline}</p>
          </header>
          <p className="leading-relaxed">{fragrance.description}</p>
          <AddToCart slug={fragrance.slug} name={fragrance.name} variants={fragrance.variants} />
          <NotePyramid notes={fragrance.notes} />
          <ul className="text-haze flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>High projection</li>
            <li>Long-lasting</li>
            <li>
              Good for: {fragrance.occasions.map((o) => occasionLabels[o].toLowerCase()).join(", ")}
            </li>
          </ul>
        </div>
      </article>

      <section aria-labelledby="related-heading" className="mt-28">
        <Reveal>
          <h2 id="related-heading" className="mb-10 text-4xl">
            You might also like
          </h2>
          <ProductGrid fragrances={related} />
        </Reveal>
      </section>
    </div>
  );
}
