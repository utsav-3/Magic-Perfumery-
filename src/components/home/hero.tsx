import Link from "next/link";
import { HeroAdd } from "@/components/home/hero-add";
import { HeroBottle } from "@/components/home/hero-3d/hero-bottle";
import { LotusMark } from "@/components/brand/lotus-mark";
import { Bottle } from "@/components/product/bottle";
import type { Fragrance } from "@/types/fragrance";

const rise = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * Signature moment: the lotus draws itself petal by petal behind the
 * bestseller. The drawn bottle paints first; the 3D one fades in over it.
 */
export function Hero({ featured }: { featured: Fragrance; fragrances: readonly Fragrance[] }) {
  const variant = featured.variants[0];
  return (
    <section className="hero-sky on-dark text-paper relative isolate overflow-hidden">
      <LotusMark
        animated
        strokeWidth={0.9}
        className="lotus-glow text-saffron pointer-events-none absolute top-[4%] -right-[22%] -z-10 w-[110vw] max-w-none opacity-20 sm:top-[-6%] sm:-right-[6%] sm:w-[62vw] sm:opacity-40 md:opacity-60 lg:w-[46rem]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-x-10 gap-y-4 px-4 pt-6 pb-8 sm:px-6 sm:pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-14">
        <div className="hero-rise order-first flex justify-center lg:order-last" style={rise(200)}>
          <HeroBottle fragrance={featured}>
            <Bottle
              id={`hero-${featured.slug}`}
              name={featured.name}
              label={featured.label}
              className="h-[min(18rem,34svh)] w-auto drop-shadow-[0_18px_24px_rgb(10_5_25/0.45)] lg:h-[min(70vh,34rem)]"
            />
          </HeroBottle>
        </div>

        <div>
          <p className="eyebrow text-saffron hero-rise" style={rise(0)}>
            Magic Perfumery
          </p>
          <h1
            className="hero-rise mt-3 max-w-3xl text-[clamp(2.1rem,6.5vw,4.75rem)] leading-[1.04] font-semibold sm:mt-5"
            style={rise(120)}
          >
            Perfume that stays with you.
          </h1>

          <div className="hero-rise mt-5 sm:mt-8" style={rise(260)}>
            <p className="eyebrow text-saffron">Our bestseller</p>
            <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">{featured.name}</h2>
            <p className="text-paper/85 mt-1 max-w-md text-base sm:text-lg">{featured.tagline}</p>
          </div>

          <div className="hero-rise mt-6 flex flex-wrap gap-3" style={rise(400)}>
            {variant && <HeroAdd slug={featured.slug} name={featured.name} variant={variant} />}
            <Link href="/fragrances" className="btn-ghost">
              Shop all perfumes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
