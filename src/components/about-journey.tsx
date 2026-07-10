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
    lead: "My father gave me a Nikon D5100 when I was young. I didn't understand it at the time, but that little camera quietly decided the rest of my life. I carried it everywhere and photographed anything that would sit still long enough.",
    src: "/images/about/beginnings.jpg",
    alt: "David as a boy practising at the keyboard by a sunlit window",
    maxW: "22rem",
    aspect: "4 / 5"
  },
  {
    side: "right",
    heading: "Learning through experience",
    lead: "I learned by showing up. Church events, families, weddings, live music. Whatever needed a camera, I was there. Over time that grew into commercial work, and I started to understand what it really takes to make a photograph someone keeps.",
    src: "/images/about/learning.jpg",
    alt: "David checking a frame beside the cinema camera on a film set",
    maxW: "24rem",
    aspect: "4 / 5"
  },
  {
    side: "left",
    heading: "Working with brands",
    lead: "That path led me onto real productions, into agencies, and across a few different countries. Cars, campaigns, brands. The stakes got higher and the days got longer, and I loved every part of it.",
    src: "/images/aston-martin/IMG_3268.jpg",
    alt: "Aston Martin on a pre-launch campaign drive through the mountains",
    maxW: "32rem",
    aspect: "16 / 10"
  },
  {
    side: "right",
    heading: "A moment that changed everything",
    lead: "In 2020 I was in a serious car accident on a national highway in India. The car rolled several times. For a few seconds I genuinely believed that was the end of my life. Then everything stopped, and I was still there. All four of us walked away.",
    more: [
      "I don't share this for drama. It quietly rearranged how I see things. Every ordinary day started to feel like something I had been given rather than something I was owed. My faith in Jesus became the centre of my life after that.",
      "Mostly, it changed the way I see people. Photography stopped being about making pretty images and became a way to honour someone. A relationship, a celebration, the small moments that usually pass by without anyone noticing."
    ],
    src: "/images/about/accident.jpg",
    alt: "The car after the accident, resting quietly at the roadside",
    maxW: "28rem",
    aspect: "4 / 3"
  },
  {
    side: "left",
    heading: "My approach",
    lead: "Almost nobody feels comfortable in front of a camera, and that is completely normal. My real job is not pressing the shutter. It is making the room feel easy enough that you forget I am there. That is usually when the honest photographs show up.",
    src: "/images/about/approach.jpg",
    alt: "David photographing guests from within the crowd at a live event",
    maxW: "28rem",
    aspect: "3 / 2"
  },
  {
    side: "right",
    heading: "Today",
    lead: "These days I photograph a bit of everything, from automotive campaigns and commercial work to portraits and celebrations. The assignments change, but the reason never does. People matter. Every photograph deserves care. Every client deserves my best.",
    more: ["Thank you for taking the time to learn a little about my story. I'd be honoured to help tell yours."],
    src: "/images/cars/IMG_7531.jpg",
    alt: "SUV cutting through desert sand, dust trailing in motion",
    maxW: "32rem",
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
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover transition duration-700 ease-expo group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/45" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The flowing line */}
      <div ref={lineRef} className="px-5 md:px-10">
        <div className="mx-auto grid max-w-[1100px] grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-y-28 md:grid-cols-[minmax(0,1fr)_6rem_minmax(0,1fr)] md:gap-y-48">
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
          className={`absolute top-1/2 hidden h-px w-9 bg-current/30 md:block ${
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
        <div className={`flex w-full max-w-md flex-col ${isLeft ? "md:ml-auto md:items-end" : "md:mr-auto md:items-start"}`}>
          <h2 className="text-3xl font-semibold leading-tight md:text-[2.5rem]">{chapter.heading}</h2>
          <p className={`mt-5 ${bodyClass}`}>{chapter.lead}</p>
          {chapter.more && (
            <ReadMore>
              {chapter.more.map((para, i) => (
                <p key={i} className={`mt-4 ${bodyClass}`}>
                  {para}
                </p>
              ))}
            </ReadMore>
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
                sizes="(min-width: 768px) 32rem, 100vw"
                className="object-cover transition duration-700 ease-expo group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </motion.article>
    </>
  );
}
