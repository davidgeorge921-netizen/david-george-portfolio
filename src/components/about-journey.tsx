"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Media =
  | { src: string; alt: string }
  | { placeholder: true; path: string; note: string };

type Chapter = {
  index: string;
  side: "left" | "right";
  heading: string;
  copy: string;
  media: Media;
  maxW: string;
  aspect: string;
};

const chapters: Chapter[] = [
  {
    index: "01",
    side: "left",
    heading: "Where it all started",
    copy: "My father handed me a camera at sixteen. I shot every day after that — mostly to see what the light was doing.",
    media: {
      src: "/images/about/beginnings.jpg",
      alt: "David as a boy practising at the keyboard by a sunlit window"
    },
    maxW: "22rem",
    aspect: "4 / 5"
  },
  {
    index: "02",
    side: "right",
    heading: "Learning through experience",
    copy: "Weddings, editorials, film sets. I learned on real jobs — the kind where you solve it while the clock keeps running.",
    media: {
      src: "/images/about/learning.jpg",
      alt: "David checking a frame beside the cinema camera on a film set"
    },
    maxW: "24rem",
    aspect: "4 / 5"
  },
  {
    index: "03",
    side: "left",
    heading: "Working with brands",
    copy: "In Oman I shot campaigns for 3DMax Media — Aston Martin, Ferrari, Haval. Launches, motorsport, deadlines.",
    media: {
      src: "/images/aston-martin/IMG_3268.jpg",
      alt: "Aston Martin on a pre-launch campaign drive through the mountains"
    },
    maxW: "32rem",
    aspect: "16 / 10"
  },
  {
    index: "04",
    side: "right",
    heading: "My approach",
    copy: "I keep a set calm. When the person feels at ease, the honest frames tend to show up on their own.",
    media: {
      src: "/images/about/approach.jpg",
      alt: "David photographing guests from the crowd at a live event"
    },
    maxW: "28rem",
    aspect: "3 / 2"
  },
  {
    index: "05",
    side: "left",
    heading: "Today",
    copy: "Now I'm after movement — a car mid-corner, someone mid-thought. The frames I keep are the honest ones.",
    media: {
      src: "/images/cars/IMG_7531.jpg",
      alt: "SUV cutting through desert sand, dust trailing in motion"
    },
    maxW: "32rem",
    aspect: "3 / 2"
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
      {/* SECTION 1 — ABOUT DAVID */}
      <section className="px-5 pt-28 pb-16 md:px-10 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-[1100px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="text-[13px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45"
          >
            About
          </motion.p>
          <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.08, ease }}
            >
              <h1 className="text-balance text-[clamp(3.75rem,9.5vw,8rem)] font-semibold leading-[0.92]">
                About David
              </h1>
              <p className="mt-8 max-w-lg text-xl leading-9 text-white/70 light:text-black/70">
                I photograph cars and the people around them — most of the job is noticing what everyone else walks past.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 1.03 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.12, ease }}
              className="group relative aspect-[4/5] w-full overflow-hidden bg-black"
            >
              <Image
                src="/images/about/portrait.jpg"
                alt="David George holding a camera in formal black tie"
                fill
                priority
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover transition duration-700 ease-expo group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/45" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTIONS 2–6 — the flowing line */}
      <div ref={lineRef} className="px-5 md:px-10">
        <div className="mx-auto grid max-w-[1100px] grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-y-28 md:grid-cols-[minmax(0,1fr)_6rem_minmax(0,1fr)] md:gap-y-48">
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
          <h2 className="text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-[0.95]">Still curious?</h2>
          <p className="mt-6 text-xl leading-9 text-white/68 light:text-black/68">
            Let&apos;s make something together.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/#work"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wideTesla text-black transition hover:bg-white/85 light:bg-black light:text-white light:hover:bg-black/85"
            >
              View Portfolio
            </Link>
            <Link
              href="/#inquire"
              className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-wideTesla transition hover:bg-white hover:text-black light:border-black/25 light:hover:bg-black light:hover:text-white"
            >
              Start a Project
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function ChapterMedia({ chapter }: { chapter: Chapter }) {
  const style = { aspectRatio: chapter.aspect, maxWidth: chapter.maxW } as const;

  if ("placeholder" in chapter.media) {
    return (
      <div
        style={style}
        className="relative w-full overflow-hidden border border-dashed border-current/30"
      >
        <div className="absolute inset-0 grid place-items-center p-5 text-center">
          <div className="max-w-[16rem]">
            <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-current/45">
              Add photo
            </p>
            <p className="mt-2 text-xs leading-5 text-current/55">{chapter.media.note}</p>
            <p className="mt-3 break-all text-[10px] uppercase tracking-wideTesla text-current/35">
              {chapter.media.path}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { src, alt } = chapter.media;
  return (
    <div style={style} className="group relative w-full overflow-hidden bg-black">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 32rem, 100vw"
        className="object-cover transition duration-700 ease-expo group-hover:scale-105"
      />
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
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="absolute left-1/2 top-1/2 h-px w-6 origin-left bg-current/30 md:hidden"
        />
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

      {/* Chapter content — grows off the branch, image fades in after the text */}
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
        <div className={`flex w-full max-w-md flex-col ${isLeft ? "md:ml-auto md:items-end" : "md:mr-auto md:items-start"}`}>
          <span className="text-[13px] font-semibold uppercase tracking-wideTesla text-white/35 light:text-black/35">
            Branch {chapter.index}
          </span>
          <h3 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{chapter.heading}</h3>
          <p className="mt-4 text-base leading-8 text-white/62 light:text-black/62 md:text-lg">{chapter.copy}</p>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 1.03 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
            className={`mt-7 w-full ${isLeft ? "md:flex md:justify-end" : ""}`}
          >
            <ChapterMedia chapter={chapter} />
          </motion.div>
        </div>
      </motion.article>
    </>
  );
}
