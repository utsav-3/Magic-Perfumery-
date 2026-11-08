import Link from "next/link";
import { LotusMark } from "@/components/brand/lotus-mark";
import { Bottle } from "@/components/product/bottle";
import { sharedVariants } from "@/lib/catalog";
import { formatSizes } from "@/lib/format";
import type { Fragrance } from "@/types/fragrance";

const rise = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * Signature moment: the lotus draws itself petal by petal, then the whole
 * range rises into a line beneath it, like the bottles in the client's photo.
 */
export function Hero({ fragrances }: { fragrances: readonly Fragrance[] }) {
  const shared = sharedVariants(fragrances);
  return (
    <section className="hero-sky on-dark text-paper relative isolate overflow-hidden">
      <LotusMark
        animated
        strokeWidth={0.9}
        className="lotus-glow text-saffron pointer-events-none absolute top-[4%] -right-[22%] -z-10 w-[110vw] max-w-none opacity-30 sm:top-[-6%] sm:-right-[6%] sm:w-[62vw] sm:opacity-60 md:opacity-90 lg:w-[46rem]"
      />

      <div className="mx-auto max-w-6xl px-4 pt-[9vh] sm:px-6 sm:pt-[12vh]">
        <p className="eyebrow text-saffron hero-rise" style={rise(0)}>
          Magic Perfumery
        </p>
        <h1
          className="hero-rise mt-5 max-w-3xl text-[clamp(2.6rem,7vw,5.75rem)] leading-[1.02] font-semibold"
          style={rise(120)}
        >
          Perfume that stays with you.
        </h1>
        <p className="hero-rise text-paper/85 mt-6 max-w-lg text-base sm:text-lg" style={rise(260)}>
          {fragrances.length} long-lasting perfumes with strong projection.
          {shared && <> Every one is {formatSizes(shared)}.</>}
        </p>
        <div className="hero-rise mt-9 flex flex-wrap gap-3" style={rise(400)}>
          <Link href="/fragrances" className="btn-light">
            Shop all perfumes
          </Link>
          <Link href="/#shop-for" className="btn-ghost">
            Find yours
          </Link>
        </div>
      </div>

      {/* The range, lined up like the tester photo. Decorative: the grid below lists them. */}
      <ul
        aria-hidden
        className="mx-auto mt-12 flex max-w-5xl items-end justify-center gap-[1.5vw] px-3 sm:mt-16 sm:gap-4"
      >
        {fragrances.map((f, i) => (
          <li
            key={f.slug}
            className="bottle-rise flex-1"
            style={{ "--i": i } as React.CSSProperties}
          >
            <Bottle
              id={`hero-${f.slug}`}
              name={f.name}
              label={f.label}
              className="mx-auto h-[clamp(5.5rem,24vw,16rem)] w-auto drop-shadow-[0_18px_24px_rgb(10_5_25/0.45)]"
            />
          </li>
        ))}
      </ul>
      <div className="from-night-deep/60 h-10 bg-linear-to-t to-transparent" />
    </section>
  );
}
