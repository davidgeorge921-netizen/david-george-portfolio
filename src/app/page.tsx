import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { ProjectTiles } from "@/components/project-tiles";
import { Reveal } from "@/components/reveal";
import { AboutStory } from "@/components/about-story";
import { ReadMore } from "@/components/read-more";
import { VideoEmbed } from "@/components/video-embed";
import { ProcessSection, Pricing } from "@/components/experience-sections";
import { Inquiry } from "@/components/inquiry";
import { GuideDownload } from "@/components/guide-download";
import { featuredProjects, galleryImages } from "@/lib/portfolio";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectTiles projects={featuredProjects} />
      <section className="bg-ink px-5 py-24 text-bone light:bg-bone light:text-ink md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1800px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45">
              Campaign Film / Agency: Aleaf Studios for BMW India
            </p>
            <h2 className="mt-4 max-w-xl text-2xl font-semibold leading-tight md:text-4xl">
              Assistant Director of Photography
            </h2>
            <ReadMore>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 light:text-black/62">
                Supported the cinematography team during production of a commercial campaign for BMW India&apos;s electric vehicle lineup, assisting with the execution of a premium automotive brand film.
              </p>
              <ul className="mt-7 max-w-xl space-y-3 border-t border-white/10 pt-6 text-sm leading-7 text-white/66 light:border-black/10 light:text-black/66">
                <li className="border-b border-white/10 pb-3 light:border-black/10">
                  Assisted with camera setup, lighting, framing, and on-set production workflows.
                </li>
                <li className="border-b border-white/10 pb-3 light:border-black/10">
                  Worked closely with the Director of Photography and production crew to maintain visual consistency throughout the shoot.
                </li>
                <li>
                  Supported efficient production execution in a fast-paced commercial environment while adhering to established creative and brand standards.
                </li>
              </ul>
            </ReadMore>
          </Reveal>
          <Reveal delay={0.08}>
            <VideoEmbed
              poster="/images/bmw-film-poster.jpg"
              embedUrl="https://www.youtube.com/embed/hoot8A6EnFY?autoplay=1&start=1&rel=0&modestbranding=1"
              title="BMW India EV campaign film"
            />
          </Reveal>
        </div>
      </section>
      <Gallery images={galleryImages} />
      <AboutStory />
      <ProcessSection />
      <Pricing />
      <Inquiry />
      <GuideDownload />
    </>
  );
}
