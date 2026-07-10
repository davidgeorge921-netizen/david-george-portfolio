"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ReadMore } from "@/components/read-more";

type Chapter = {
  side: "left" | "right";
  heading: string;
  lead: string;
  tail?: string;
  more?: string[];
  src: string;
  alt: string;
  maxW: string;
  aspect: string;
};

const chapters: Chapter[] = [
  {
    side: "left",
    heading: "How photography began",
    lead: "My father gave me my first Nikon when I was young. I've been photographing everything since.",
    src: "/images/about/family.jpg",
    alt: "David as a young child with his family on the coast",
    maxW: "27rem",
    aspect: "3 / 4"
  },
  {
    side: "right",
    heading: "Learning through experience",
    lead: "I learned by showing up. Church events, weddings, live music, and slowly, commercial work.",
    src: "/images/about/learning.jpg",
    alt: "David checking a frame beside the cinema camera on a film set",
    maxW: "29rem",
    aspect: "4 / 5"
  },
  {
    side: "left",
    heading: "A moment that changed everything",
    lead: "In 2020 I survived a serious car accident on an Indian highway. The car rolled, and all four of us walked away.",
    more: [
      "It quietly changed how I see things. Every ordinary day started to feel like a gift, and my faith in Jesus became the centre of it.",
      "Mostly it changed how I see people. Photography became a way to honour someone, a relationship, a celebration, the small moments most of us miss."
    ],
    src: "/images/about/accident.jpg",
    alt: "The car after the accident, resting quietly at the roadside",
    maxW: "35rem",
    aspect: "4 / 3"
  },
  {
    side: "right",
    heading: "Working with brands",
    lead: "That grew into real productions and agencies, across a few different countries.",
    src: "/images/aston-martin/IMG_3268.jpg",
    alt: "Aston Martin on a pre-launch campaign drive through the mountains",
    maxW: "38rem",
    aspect: "16 / 10"
  },
  {
    side: "left",
    heading: "My approach",
    lead: "Most people feel awkward in front of a camera. My job is to make that feeling disappear.",
    src: "/images/about/approach.jpg",
    alt: "David photographing guests from within the crowd at a live event",
    maxW: "35rem",
    aspect: "3 / 2"
  },
  {
    side: "right",
    heading: "Today",
    lead: "These days I photograph everything, from car campaigns to portraits and celebrations.",
    tail: "Thank you for taking the time to learn a little about me. I'd be honoured to help tell your story.",
    src: "/images/cars/IMG_7531.jpg",
    alt: "SUV cutting through desert sand, dust trailing in motion",
    maxW: "38rem",
    aspect: "3 / 2"
  }
];

const ease = [0.16, 1, 0.3, 1] as const;
const bodyClass = "text-lg leading-8 text-white/72 light:text-black/72 md:text-xl md:leading-9";

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
      {/* About David */}
      <section className="px-5 pt-28 pb-16 md:px-10 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-[1240px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="text-[13px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45"
          >
            About
          </motion.p>
          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1fr] md:items-end md:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.08, ease }}
            >
              <h1 className="text-balance text-[clamp(3.75rem,9.5vw,8rem)] font-semibold leading-[0.92]">
                About David
              </h1>
              <p className="mt-8 max-w-lg text-xl leading-9 text-white/72 light:text-black/72 md:text-2xl md:leading-10">
                I&apos;m David, a photographer who cares more about the people in front of the camera than the gear behind it.
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
                sizes="(min-width: 768px) 46vw, 100vw"
                className="object-cover transition duration-700 ease-expo group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/45" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The flowing line */}
      <div ref={lineRef} className="px-5 md:px-10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-y-16 md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] md:gap-y-28">
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
            <Branch key={chapter.heading} chapter={chapter} row={i + 1} />
          ))}

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

      {/* Quiet closing CTA */}
      <section className="px-5 pb-32 pt-16 text-center md:px-10 md:pb-40 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3"
        >
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
        </motion.div>
      </section>
    </div>
  );
}

function Branch({ chapter, row }: { chapter: Chapter; row: number }) {
  const isLeft = chapter.side === "left";

  return (
    <>
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
          className={`absolute top-1/2 hidden h-px w-8 bg-current/30 md:block ${
            isLeft ? "right-1/2 origin-right" : "left-1/2 origin-left"
          }`}
        />
      </div>

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
        <div className={`flex w-full flex-col ${isLeft ? "md:ml-auto md:items-end" : "md:mr-auto md:items-start"}`}>
          <h2 className="max-w-xl text-3xl font-semibold leading-tight md:text-[2.5rem]">{chapter.heading}</h2>
          <p className={`mt-5 max-w-md ${bodyClass}`}>{chapter.lead}</p>
          {chapter.tail && <p className={`mt-4 max-w-md ${bodyClass}`}>{chapter.tail}</p>}
          {chapter.more && (
            <div className="max-w-md">
              <ReadMore>
                {chapter.more.map((para, i) => (
                  <p key={i} className={`mt-4 ${bodyClass}`}>
                    {para}
                  </p>
                ))}
              </ReadMore>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 1.03 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
            className={`mt-8 w-full ${isLeft ? "md:flex md:justify-end" : ""}`}
          >
            <div
              style={{ aspectRatio: chapter.aspect, maxWidth: chapter.maxW }}
              className="group relative w-full overflow-hidden bg-black"
            >
              <Image
                src={chapter.src}
                alt={chapter.alt}
                fill
                sizes="(min-width: 768px) 38rem, 100vw"
                className="object-cover transition duration-700 ease-expo group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </motion.article>
    </>
  );
}
