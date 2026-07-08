import { Project } from "@/lib/portfolio";
import { Reveal } from "@/components/reveal";
import { ProjectSummary } from "@/components/project-summary";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProjectTiles({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="bg-ink px-5 py-20 text-bone light:bg-white light:text-ink md:px-10 md:py-24">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-10">
          <h2 className="text-4xl font-semibold leading-none md:text-7xl">Best Works</h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <Link href={`/projects/${project.slug}`} data-cursor="view" className="group block">
                <figure className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={project.hero}
                    alt={`${project.title} hero photograph`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 ease-expo group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/70 md:from-black/10 md:via-black/30 md:to-black/85" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wideTesla text-white/70">
                      <span>0{index + 1} / Featured Project</span>
                      <span className="flex items-center gap-1 opacity-0 transition duration-300 group-hover:opacity-100">
                        Open Project <ArrowUpRight size={14} />
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/70">{project.eyebrow}</p>
                      <h3 className="mt-2 text-2xl font-semibold leading-tight text-white md:text-4xl">{project.title}</h3>
                      <ProjectSummary summary={project.summary} />
                    </div>
                  </div>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
