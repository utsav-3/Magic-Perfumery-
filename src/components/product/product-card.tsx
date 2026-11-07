import Link from "next/link";
import { Bottle } from "@/components/product/bottle";
import { startingPrice } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { Fragrance } from "@/types/fragrance";

export function ProductCard({ fragrance }: { fragrance: Fragrance }) {
  return (
    <Link href={`/fragrances/${fragrance.slug}`} className="group block">
      <div
        className="relative grid aspect-[4/5] place-items-center overflow-hidden"
        style={{
          background: `color-mix(in oklab, ${fragrance.liquid} 22%, var(--color-plaster))`,
        }}
      >
        <span className="eyebrow text-haze absolute top-4 left-4 text-[0.65rem]">
          {fragrance.concentration}
        </span>
        <Bottle
          id={`card-${fragrance.slug}`}
          liquid={fragrance.liquid}
          attar={fragrance.concentration === "Attar"}
          className="ease-deco h-[68%] transition-transform duration-700 group-hover:-translate-y-2"
        />
        {/* Glint that sweeps across the glass on hover. */}
        <span
          aria-hidden
          className="ease-deco pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -translate-x-full -skew-x-12 bg-linear-to-r from-transparent via-white/45 to-transparent transition-transform duration-1000 group-hover:translate-x-[600%]"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-2xl group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
          {fragrance.name}
        </h3>
        <span className="text-haze shrink-0 text-sm">
          from {formatPrice(startingPrice(fragrance))}
        </span>
      </div>
      <p className="text-haze mt-1 text-sm">{fragrance.tagline}</p>
    </Link>
  );
}
