"use client";

import { Project } from "@/lib/portfolio";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section ref={ref} className="relative min-h-[110vh] overflow-hidden border-t border-white/10 light:border-black/10">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src={project.hero}
          alt={`${project.title} hero photograph`}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/85" />
      <div className="relative z-10 mx-auto flex min-h-[110vh] max-w-[1800px] flex-col justify-end px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-end">
          <div className="text-xs uppercase tracking-wideTesla text-white/65">0{index + 1} / Featured Project</div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/70">{project.eyebrow}</p>
            <h2 className="mt-3 text-[clamp(2.6rem,8vw,7rem)] font-semibold leading-none text-white">{project.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/76 md:text-lg">{project.summary}</p>
            <Link
              href={`/projects/${project.slug}`}
              data-cursor="view"
              className="mt-8 inline-flex rounded-full border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-wideTesla text-white transition hover:bg-white hover:text-black"
            >
              Open Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
