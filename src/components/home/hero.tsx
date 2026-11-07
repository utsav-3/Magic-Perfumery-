import Link from "next/link";
import { NecklaceScene } from "@/components/home/necklace-scene";

const rise = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="on-dark bg-dusk text-plaster relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden">
      <NecklaceScene className="absolute inset-0 -z-10 h-full w-full" />
      <div className="mx-auto w-full max-w-6xl px-4 pt-[11vh] pb-[42vh] sm:px-6">
        <p className="eyebrow text-sodium hero-rise" style={rise(0)}>
          Perfume house · Bombay
        </p>
        <h1
          className="hero-rise mt-6 max-w-4xl text-[clamp(3.25rem,9vw,8rem)] leading-[0.92] tracking-tight"
          style={rise(120)}
        >
          Bombay, as the lights come on.
        </h1>
        <p
          className="hero-rise text-plaster/80 mt-8 max-w-xl text-base sm:text-lg"
          style={rise(260)}
        >
          Eight perfumes made from the city&rsquo;s own materials: mogra from the Dadar flower
          market, oud from the attar lanes of Bhendi Bazaar, the smell of the first monsoon rain.
        </p>
        <div className="hero-rise mt-10 flex flex-wrap gap-4" style={rise(400)}>
          <Link href="/fragrances" className="btn-light">
            Shop the collection
          </Link>
          <Link href="/#origins" className="btn-ghost">
            Where the notes come from
          </Link>
        </div>
      </div>
    </section>
  );
}
