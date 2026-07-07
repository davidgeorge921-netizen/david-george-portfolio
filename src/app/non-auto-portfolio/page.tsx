import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { VideoEmbed } from "@/components/video-embed";

export const metadata: Metadata = {
  title: "Non-Auto Portfolio"
};

const headshots = [
  { src: "/images/people-production/ceo-headshot-bald.jpeg", alt: "CEO business portrait against a brick wall" },
  { src: "/images/people-production/ceo-headshot-white-sweater.jpg", alt: "Business portrait with clean studio lighting" },
  { src: "/images/people-production/ceo-portrait-02.jpg", alt: "Business-casual portrait in an office" },
  { src: "/images/people-production/ceo-portrait-03.jpg", alt: "Executive headshot photographed at night" },
  { src: "/images/people-production/ceo-portrait-01.jpg", alt: "Editorial portrait with tartan styling" }
];

export default function NonAutoPortfolio() {
  return (
    <section className="min-h-screen bg-ink px-5 pb-24 pt-28 text-bone light:bg-bone light:text-ink md:px-10 md:pt-32">
      <div className="mx-auto grid max-w-[1800px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        {/* Left: CEO / Business Portraits — vertical tab */}
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45">
            CEO / Business Portraits
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:max-h-[78vh] lg:overflow-y-auto lg:pr-2">
            {headshots.map((item) => (
              <div key={item.src} className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  quality={95}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right: BTS video */}
        <Reveal delay={0.08} className="lg:sticky lg:top-28">
          <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45">
            BTS of Recent Work
          </p>
          <div className="mt-4">
            <VideoEmbed
              poster="/images/non-auto-video-poster.jpg"
              embedUrl="https://www.youtube.com/embed/j00PxoZ9w0U?autoplay=1&rel=0&modestbranding=1"
              title="BTS of Recent Work"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
