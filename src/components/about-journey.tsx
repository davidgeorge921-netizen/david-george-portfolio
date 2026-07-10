"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Chapter = {
  index: string;
  side: "left" | "right";
  heading: string;
  copy: string;
  image: string;
  alt: string;
};

const chapters: Chapter[] = [
  {
    index: "01",
    side: "left",
    heading: "Where it started",
    copy: "My father bought me a DSLR at sixteen. I shot every day after that, mostly to see what the light was doing.",
    image: "/images/people-production/fashion-plaid-full.jpeg",
    alt: "Early editorial portrait with controlled lighting"
  },
  {
    index: "02",
    side: "right",
    heading: "Finding a style",
    copy: "Weddings and editorials taught me speed. Cars taught me restraint — how to hold a surface, a reflection, a line.",
    image: "/images/aston-martin/IMG_3266.jpg",
    alt: "Aston Martin rolling through a canyon in hard light"
  },
  {
    index: "03",
    side: "left",
    heading: "Working with brands",
    copy: "In Oman I shot full-time for 3DMax Media — Aston Martin, Ferrari, Haval — alongside agencies and production crews. Launches, motorsport, the usual pressure.",
    image: "/images/cars/65929DFF-C1D4-4C1F-932B-0BEF615B0F91.jpg",
    alt: "Black Ferrari beside a reflecting pool"
  },
  {
    index: "04",
    side: "right",
    heading: "On a shoot",
    copy: "I keep it calm. If the person or the car feels at ease, the light and the framing tend to follow.",
    image: "/images/people-production/ceo-portrait-01.jpg",
    alt: "Business portrait shot with soft, controlled light"
  },
  {
    index: "05",
    side: "left",
    heading: "Now",
    copy: "These days I'm drawn to movement — a car mid-corner, someone mid-thought. The frames I keep are the honest ones.",
    image: "/images/cars/IMG_7553.jpg",
    alt: "SUV posed on a desert dune at sunset"
  }
];

const ease = [0.16, 1, 0.3, 1] as const;

export function AboutJourney() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.8", "end 0.35"]
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-ink text-bone light:bg-bone light:text-ink">
      {/* INTRO */}
      <section className="px-5 pt-28 pb-16 md:px-10 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-[1100px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45"
          >
            About
          </motion.p>
          <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.08, ease }}
            >
              <h1 className="text-balance text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.92]">
                About David
              </h1>
              <p className="mt-8 max-w-md text-lg leading-8 text-white/70 light:text-black/70">
                I photograph cars and the people around them — most of the job is noticing what everyone else walks past.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 1.03 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.12, ease }}
              className="group relative aspect-[4/5] overflow-hidden bg-black md:justify-self-end"
            >
              <Image
                src="/images/david-george-portrait.jpg"
                alt="David George holding a camera in formal black tie"
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover transition duration-700 ease-expo group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/45" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* JOURNEY — the flowing line */}
      <div ref={lineRef} className="px-5 md:px-10">
        <div className="mx-auto grid max-w-[1100px] grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-y-24 md:grid-cols-[minmax(0,1fr)_6rem_minmax(0,1fr)] md:gap-y-40">
          {/* Continuous spine drawn on scroll (spans every chapter row + the terminus) */}
          <div
            className="relative col-start-1 self-stretch md:col-start-2"
            style={{ gridRow: `1 / ${chapters.length + 2}` }}
            aria-hidden="true"
          >
            <svg
              className="mask-fade absolute inset-0 h-full w-full text-white/40 light:text-black/35"
              viewBox="0 0 40 1200"
              preserveAspectRatio="none"
              fill="none"
            >
              <motion.path
                d="M20 0 C 24 120, 16 250, 20 380 C 24 510, 16 650, 20 780 C 24 910, 16 1040, 20 1170 L20 1200"
                stroke="currentColor"
                strokeWidth={1.4}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {chapters.map((chapter, i) => (
            <Branch key={chapter.index} chapter={chapter} row={i + 1} />
          ))}

          {/* Terminus — the line resolves to a point */}
          <div
            className="relative col-start-1 flex justify-center md:col-start-2"
            style={{ gridRow: chapters.length + 1 }}
            aria-hidden="true"
          >
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease }}
              className="block h-1.5 w-1.5 rounded-full bg-current"
            />
          </div>
        </div>
      </div>

      {/* ENDING */}
      <section className="px-5 pb-32 pt-16 text-center md:px-10 md:pb-40 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95]">Still curious?</h2>
          <p className="mt-6 text-lg leading-8 text-white/68 light:text-black/68">
            Let&apos;s make something together.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/#work"
              className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wideTesla text-black transition hover:bg-white/85 light:bg-black light:text-white light:hover:bg-black/85"
            >
              View Portfolio
            </Link>
            <Link
              href="/#inquire"
              className="rounded-full border border-white/25 px-6 py-3 text-xs font-semibold uppercase tracking-wideTesla transition hover:bg-white hover:text-black light:border-black/25 light:hover:bg-black light:hover:text-white"
            >
              Start a Project
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function Branch({ chapter, row }: { chapter: Chapter; row: number }) {
  const isLeft = chapter.side === "left";

  return (
    <>
      {/* Node on the spine + branch connector */}
      <div
        className="relative col-start-1 self-center md:col-start-2"
        style={{ gridRow: row }}
        aria-hidden="true"
      >
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto block h-2 w-2 rounded-full bg-current"
        />
        {/* mobile connector — always reaches right toward the content */}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="absolute left-1/2 top-1/2 h-px w-6 origin-left bg-current/30 md:hidden"
        />
        {/* desktop connector — reaches toward the branch side */}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className={`absolute top-1/2 hidden h-px w-9 bg-current/30 md:block ${
            isLeft ? "right-1/2 origin-right" : "left-1/2 origin-left"
          }`}
        />
      </div>

      {/* Chapter content — grows off the branch */}
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease }}
        style={{ gridRow: row }}
        className={`col-start-2 self-center ${
          isLeft
            ? "md:col-start-1 md:justify-self-end md:text-right"
            : "md:col-start-3 md:justify-self-start md:text-left"
        }`}
      >
        <div className={`flex w-full max-w-sm flex-col ${isLeft ? "md:ml-auto md:items-end" : "md:mr-auto md:items-start"}`}>
          <span className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/35 light:text-black/35">
            Branch {chapter.index}
          </span>
          <h3 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">{chapter.heading}</h3>
          <p className="mt-3 text-sm leading-7 text-white/62 light:text-black/62">{chapter.copy}</p>
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.12, ease }}
            className="group relative mt-6 aspect-[4/3] w-full max-w-[20rem] overflow-hidden bg-black"
          >
            <Image
              src={chapter.image}
              alt={chapter.alt}
              fill
              sizes="(min-width: 768px) 20rem, 100vw"
              className="object-cover transition duration-700 ease-expo group-hover:scale-105"
            />
          </motion.div>
        </div>
      </motion.article>
    </>
  );
}
