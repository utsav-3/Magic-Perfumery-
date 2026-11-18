import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import lineup from "../../../public/images/tester-lineup.jpg";

/** The client's own photo: proof the bottles are real. */
export function RealBottles() {
  return (
    <section aria-labelledby="real-heading" className="bg-night on-dark text-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr]">
        <Reveal className="space-y-4">
          <p className="eyebrow text-saffron">On the shelf</p>
          <h2 id="real-heading" className="text-4xl sm:text-5xl">
            The real bottles
          </h2>
          <p className="text-paper/80">
            This is the whole range as 30 ml testers. Every perfume comes in a frosted spray bottle
            with its own printed label, in 50 ml and 100 ml.
          </p>
        </Reveal>
        <Reveal>
          <figure>
            <Image
              src={lineup}
              alt="Nine Magic Perfumery spray bottles in a row: Cold Water, The Boss, P. Sport, Black J, Z Classics, Molten Caramel, Soft Dove, Brut Musk and No. 5."
              placeholder="blur"
              sizes="(min-width: 1024px) 720px, 100vw"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
