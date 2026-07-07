import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { VideoEmbed } from "@/components/video-embed";

export const metadata: Metadata = {
  title: "Non-Auto Portfolio"
};

const headshots = [
  {
    src: "/images/people-production/ceo-headshot-bald.jpeg",
    alt: "CEO business portrait against a brick wall",
    label: "CEO Portrait"
  },
  {
    src: "/images/people-production/ceo-headshot-white-sweater.jpg",
    alt: "Business portrait with clean studio lighting",
    label: "Business Portrait"
  },
  {
    src: "/images/people-production/ceo-portrait-02.jpg",
    alt: "Business-casual portrait in an office environment",
    label: "Business Portrait"
  },
  {
    src: "/images/people-production/ceo-portrait-03.jpg",
    alt: "Executive headshot photographed at night",
    label: "Executive Headshot"
  },
  {
    src: "/images/people-production/ceo-portrait-01.jpg",
    alt: "Editorial portrait with tartan styling",
    label: "Editorial Portrait"
  }
];

export default function NonAutoPortfolio() {
  return (
    <>
      <section className="bg-ink px-5 pb-24 pt-28 text-bone light:bg-bone light:text-ink md:px-10 md:pb-32 md:pt-32">
        <div className="mx-auto grid max-w-[1800px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45">
              Non-Auto Portfolio / Behind The Scenes
            </p>
            <h2 className="mt-4 max-w-xl text-2xl font-semibold leading-tight md:text-4xl">
              People, production, and portrait work beyond the vehicle.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 light:text-black/62">
              Behind-the-scenes coverage, subject direction, lighting, and social-ready delivery — the human side of the work.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <VideoEmbed
              poster="/images/non-auto-video-poster.jpg"
              embedUrl="https://www.youtube.com/embed/j00PxoZ9w0U?autoplay=1&rel=0&modestbranding=1"
              title="Behind the scenes — David George"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-bone px-5 py-24 text-ink light:bg-white md:px-10 md:py-32">
        <div className="mx-auto max-w-[1800px]">
          <Reveal className="mb-12 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-black/50">CEO / Business Portraits</p>
              <h2 className="mt-3 max-w-4xl text-4xl font-semibold leading-none md:text-7xl">Executive presence, lit with restraint.</h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-black/62">
              Business portraits built around trust, clean light, direct subject communication, consistent skin tone, and polished delivery for digital presentation.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {headshots.map((item, index) => (
              <Reveal key={item.src} delay={index * 0.04}>
                <figure className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-black">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      quality={95}
                      className="object-cover transition duration-700 ease-expo group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-center justify-between border-t border-black/10 pt-3 text-[11px] uppercase tracking-wideTesla text-black/50">
                    <span>{item.label}</span>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
