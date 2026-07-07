import type { Metadata } from "next";
import { HeadshotCarousel } from "@/components/headshot-carousel";
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
      <div className="mx-auto grid max-w-[1800px] gap-10 lg:grid-cols-[1.5fr_0.6fr] lg:items-stretch">
        {/* Left: BTS video */}
        <Reveal className="flex flex-col">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45">
            BTS of Recent Work
          </p>
          <VideoEmbed
            poster="/images/non-auto-video-poster.jpg"
            embedUrl="https://www.youtube.com/embed/j00PxoZ9w0U?autoplay=1&rel=0&modestbranding=1"
            title="BTS of Recent Work"
          />
        </Reveal>

        {/* Right: CEO / Business Portraits — vertical tab carousel */}
        <Reveal delay={0.08} className="flex flex-col">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45">
            CEO / Business Portraits
          </p>
          <HeadshotCarousel
            images={headshots}
            className="aspect-[4/5] w-full lg:aspect-auto lg:min-h-0 lg:flex-1"
          />
        </Reveal>
      </div>
    </section>
  );
}
