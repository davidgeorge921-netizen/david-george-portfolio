import { Reveal } from "@/components/reveal";
import Image from "next/image";

type PortraitTile = { src: string; alt: string };

// A section of vertical (portrait) tiles whose aspect matches the photo,
// styled to match the "Best Works" featured tiles above it.
export function PortraitStrip({
  id,
  eyebrow,
  title,
  images,
  aspect = "4/5",
  tone = "ink"
}: {
  id?: string;
  eyebrow: string;
  title: string;
  images: PortraitTile[];
  aspect?: "4/5" | "2/3";
  tone?: "ink" | "bone";
}) {
  const dark = tone === "ink";

  return (
    <section
      id={id}
      className={`px-5 py-20 md:px-10 md:py-24 ${
        dark ? "bg-ink text-bone light:bg-white light:text-ink" : "bg-bone text-ink light:bg-white"
      }`}
    >
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-10">
          <p
            className={`text-[11px] font-semibold uppercase tracking-wideTesla ${
              dark ? "text-white/45 light:text-black/45" : "text-black/45"
            }`}
          >
            {eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-semibold leading-none md:text-7xl">{title}</h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {images.map((image, index) => (
            <Reveal key={image.src} delay={index * 0.05}>
              <figure className="group">
                <div
                  className={`relative ${
                    aspect === "2/3" ? "aspect-[2/3]" : "aspect-[4/5]"
                  } overflow-hidden bg-black`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition duration-700 ease-expo group-hover:scale-105"
                  />
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
