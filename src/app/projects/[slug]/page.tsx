import { getProject, projects } from "@/lib/portfolio";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | David George`,
      description: project.summary,
      images: [project.hero]
    }
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="bg-ink text-bone light:bg-bone light:text-ink">
      <section className="relative min-h-screen overflow-hidden">
        <Image src={project.hero} alt={`${project.title} hero`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/90" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1800px] flex-col justify-end px-5 pb-20 md:px-10 md:pb-24">
          <Link href="/#work" className="mb-10 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wideTesla text-white/72">
            <ArrowLeft size={15} />
            Work
          </Link>
          <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/65">{project.eyebrow}</p>
          <h1 className="mt-3 text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[0.9] text-white">{project.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/76">{project.summary}</p>
        </div>
      </section>
      <section className="space-y-5 px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1800px] space-y-5">
          {project.images.map((image, imageIndex) => (
            <figure key={image.src} className={imageIndex % 3 === 1 ? "ml-auto max-w-5xl" : "max-w-[1800px]"}>
              <div className="relative aspect-[16/9] overflow-hidden bg-white/5">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={imageIndex % 3 === 1 ? "(min-width: 1024px) 70vw, 100vw" : "100vw"}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex justify-between gap-6 text-[11px] uppercase tracking-wideTesla text-white/45 light:text-black/45">
                <span>{image.caption}</span>
                <span>{String(imageIndex + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="border-t border-white/10 px-5 py-16 light:border-black/10 md:px-10">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wideTesla text-white/45 light:text-black/45">Next Project</p>
            <h2 className="mt-2 text-4xl font-semibold md:text-6xl">{next.title}</h2>
          </div>
          <Link
            href={`/projects/${next.slug}`}
            className="inline-flex w-fit items-center gap-3 rounded-full border border-white/25 px-6 py-3 text-xs font-semibold uppercase tracking-wideTesla transition hover:bg-white hover:text-black light:border-black/25 light:hover:bg-black light:hover:text-white"
          >
            Open
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </article>
  );
}
