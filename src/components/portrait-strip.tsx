import { Reveal } from "@/components/reveal";
import { OpenProjectButton } from "@/components/open-project-button";
import Image from "next/image";
import Link from "next/link";

type PortraitTile = { src: string; alt: string };

// A section of vertical (portrait) tiles whose aspect matches the photo,
// styled to match the "Best Works" featured tiles above it. When `href` is
// set, the section links to that page (header CTA + clickable tiles).
export function PortraitStrip({
  id,
  eyebrow,
  title,
  images,
  aspect = "4/5",
  tone = "ink",
  href,
  cta = "Open Project"
}: {
  id?: string;
  eyebrow: string;
  title: string;
  images: PortraitTile[];
  aspect?: "4/5" | "2/3";
  tone?: "ink" | "bone";
  href?: string;
  cta?: string;
}) {
  const dark = tone === "ink";
  const aspectClass = aspect === "2/3" ? "aspect-[2/3]" : "aspect-[4/5]";

  return (
    <section
      id={id}
      className={`px-5 py-20 md:px-10 md:py-24 ${
        dark ? "bg-ink text-bone light:bg-white light:text-ink" : "bg-bone text-ink light:bg-white"
      }`}
    >
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className={`text-[11px] font-semibold uppercase tracking-wideTesla ${
                  dark ? "text-white/45 light:text-black/45" : "text-black/45"
                }`}
              >
                {eyebrow}
              </p>
              <h2 className="mt-3 text-4xl font-semibold leading-none md:text-7xl">{title}</h2>
            </div>
            {href && <OpenProjectButton href={href} label={cta} dark={dark} />}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {images.map((image, index) => {
            const media = (
              <div className={`relative ${aspectClass} overflow-hidden bg-black`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-700 ease-expo group-hover:scale-105"
                />
              </div>
            );
            return (
              <Reveal key={image.src} delay={index * 0.05}>
                {href ? (
                  <Link href={href} data-cursor="view" className="group block">
                    {media}
                  </Link>
                ) : (
                  <figure className="group">{media}</figure>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
