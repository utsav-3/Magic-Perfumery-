import Link from "next/link";
import { Bottle } from "@/components/product/bottle";
import { Tilt } from "@/components/product/tilt";
import { QuickAdd } from "@/components/product/quick-add";
import { labelTint } from "@/components/product/tint";
import { startingPrice } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { audienceLabels, type Fragrance } from "@/types/fragrance";

export function ProductCard({ fragrance }: { fragrance: Fragrance }) {
  const href = `/fragrances/${fragrance.slug}`;
  return (
    <article className="group relative transition-transform duration-150 active:scale-[0.99]">
      <Tilt>
        <div
          className="label-sweep relative grid aspect-[4/5] place-items-center overflow-hidden"
          style={{ background: labelTint(fragrance.label) }}
        >
          <span className="eyebrow text-haze absolute top-3 left-3 text-[0.6rem] sm:top-4 sm:left-4">
            {audienceLabels[fragrance.audience]}
          </span>
          <Link
            href={href}
            tabIndex={-1}
            aria-hidden
            className="scroll-rise absolute inset-0 grid place-items-center"
          >
            <Bottle
              id={`card-${fragrance.slug}`}
              name={fragrance.name}
              label={fragrance.label}
              className="ease-magic h-[74%] transition-transform duration-700 group-hover:-translate-y-3"
            />
          </Link>
          {/* Shimmer that sweeps across the bottle on hover. */}
          <span
            aria-hidden
            className="ease-magic pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -translate-x-full -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:translate-x-[600%]"
          />
          {/* Always visible on touch screens; slides up on hover or keyboard focus on desktop. */}
          <QuickAdd
            slug={fragrance.slug}
            name={fragrance.name}
            variants={fragrance.variants}
            className="ease-magic absolute inset-x-2 bottom-2 transition duration-500 lg:translate-y-3 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
          />
        </div>
      </Tilt>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-lg font-semibold tracking-wide sm:text-xl">
          <Link href={href} className="decoration-1 underline-offset-4 group-hover:underline">
            {fragrance.name}
          </Link>
        </h3>
        <span className="text-haze shrink-0 text-sm">
          from {formatPrice(startingPrice(fragrance))}
        </span>
      </div>
      <p className="text-haze mt-1 text-sm">{fragrance.tagline}</p>
    </article>
  );
}
