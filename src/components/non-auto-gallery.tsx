"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Hero, type HeroSlide } from "@/components/hero";
import { VideoEmbed } from "@/components/video-embed";

type Frame = {
  src: string;
  w: number;
  h: number;
  alt: string;
  title: string;
};

type Block =
  | { kind: "row"; cols: 2 | 3; aspect: string; frames: Frame[] }
  | { kind: "full"; frame: Frame }
  | { kind: "feature"; frame: Frame };

type Section = {
  id: string;
  label: string;
  title: string;
  blurb: string;
  blocks: Block[];
};

const base = "/images/non-auto";

// Same marquee as the automotive homepage — only the photographs change.
const HERO_SLIDES: HeroSlide[] = [
  { src: `${base}/editorial-tartan-gaze.jpg`, alt: "Fashion editorial portrait — model wrapped in tartan, direct gaze" },
  { src: `${base}/editorial-tartan-side.jpg`, alt: "Editorial portrait of a model draped in tartan, turned to the side in low light" },
  { src: `${base}/editorial-tartan-motion.jpg`, alt: "Editorial beauty portrait — freckles lit by warm gel against bokeh" },
  { src: `${base}/editorial-tartan-bloom.jpg`, alt: "Editorial portrait of a model in tartan holding green blooms under coloured light" }
];

const SECTIONS: Section[] = [
  {
    id: "editorial",
    label: "01 — Editorial",
    title: "Fashion Editorial",
    blurb: "A studio story in tartan and shadow.",
    blocks: [
      {
        kind: "row",
        cols: 2,
        aspect: "2 / 3",
        frames: [
          { src: `${base}/editorial-tartan-gaze.jpg`, w: 2559, h: 3840, alt: "Fashion editorial portrait — model wrapped in tartan against deep shadow, direct gaze", title: "Tartan — Gaze" },
          { src: `${base}/editorial-tartan-side.jpg`, w: 2559, h: 3840, alt: "Editorial portrait of a model draped in tartan, turned to the side in low light", title: "Tartan — Turn" }
        ]
      },
      {
        kind: "row",
        cols: 2,
        aspect: "2 / 3",
        frames: [
          { src: `${base}/editorial-tartan-motion.jpg`, w: 2559, h: 3840, alt: "Editorial beauty portrait of a model in satin, freckles lit by warm gel against bokeh", title: "Beauty — Colour" },
          { src: `${base}/editorial-tartan-bloom.jpg`, w: 2559, h: 3840, alt: "Editorial portrait of a model in tartan holding green blooms under coloured light", title: "Tartan — Bloom" }
        ]
      }
    ]
  },
  {
    id: "portraits",
    label: "02 — Portraits",
    title: "CEO / Executive Portraits",
    blurb: "Founders, executives and the people behind the brand.",
    blocks: [
      {
        kind: "row",
        cols: 2,
        aspect: "4 / 5",
        frames: [
          { src: `${base}/exec-portrait-brick.jpg`, w: 2880, h: 3840, alt: "Executive portrait of a bald man in a navy blazer against an exposed brick wall", title: "Executive — Brick" },
          { src: `${base}/exec-portrait-white-knit.jpg`, w: 3072, h: 3840, alt: "Executive portrait of a smiling woman in a white knit top, arms crossed, on a dark backdrop", title: "Executive — Studio" }
        ]
      },
      {
        kind: "full",
        frame: { src: `${base}/exec-architect-bw.jpg`, w: 3840, h: 2560, alt: "Black and white portrait of a smiling woman with long dark hair against a dark backdrop", title: "Architect" }
      },
      {
        kind: "row",
        cols: 3,
        aspect: "4 / 5",
        frames: [
          { src: `${base}/exec-portrait-violet.jpg`, w: 3072, h: 3840, alt: "Tech founder headshot in a cream sweater against a violet backdrop", title: "Founder — Violet" },
          { src: `${base}/exec-portrait-charcoal-grey.jpg`, w: 3072, h: 3840, alt: "Studio portrait of a smiling woman with dark wavy hair in a black top against a light grey backdrop", title: "Studio — Grey" },
          { src: `${base}/exec-portrait-cream.jpg`, w: 3072, h: 3840, alt: "Executive headshot of a woman in a cream turtleneck against a warm tan backdrop", title: "Executive — Warm" }
        ]
      }
    ]
  },
  {
    id: "creative",
    label: "03 — Studio",
    title: "Creative Portraits",
    blurb: "Character studies, shaped by light.",
    blocks: [
      {
        kind: "feature",
        frame: { src: `${base}/creative-mono-nocturne.jpg`, w: 2458, h: 3840, alt: "Black and white nocturnal portrait of a man in a suit beneath architectural columns", title: "Nocturne" }
      },
      {
        kind: "row",
        cols: 2,
        aspect: "4 / 5",
        frames: [
          { src: `${base}/creative-mono-executive.jpg`, w: 3071, h: 3840, alt: "Dramatic black and white portrait of a bald bearded man in a three-piece suit", title: "Character — Mono" },
          { src: `${base}/creative-mono-joy.jpg`, w: 2742, h: 3840, alt: "Black and white portrait of a woman laughing, glancing off camera", title: "Joy — Mono" }
        ]
      },
      {
        kind: "row",
        cols: 2,
        aspect: "4 / 5",
        frames: [
          { src: `${base}/creative-mono-poise.jpg`, w: 3072, h: 3840, alt: "Black and white studio portrait of a woman with arms crossed, soft smile", title: "Poise — Mono" },
          { src: `${base}/creative-draped.jpg`, w: 3072, h: 3840, alt: "Portrait of a woman in a draped black blazer against a grey backdrop", title: "Draped" }
        ]
      }
    ]
  },
  {
    id: "food",
    label: "04 — Food & Drink",
    title: "Food & Beverage",
    blurb: "Hospitality work for hotels and restaurants.",
    blocks: [
      {
        kind: "row",
        cols: 3,
        aspect: "4 / 5",
        frames: [
          { src: `${base}/fb-espresso-martini.jpg`, w: 2393, h: 3840, alt: "Espresso martini styled in low, dramatic light", title: "Espresso Martini" },
          { src: `${base}/fb-sushi.jpg`, w: 2560, h: 3840, alt: "Salmon nori rolls lifted with chopsticks on a dark set", title: "Nori Rolls" },
          { src: `${base}/fb-dumplings.jpg`, w: 3072, h: 3840, alt: "Steamed bao dumplings in a bamboo basket, overhead", title: "Steamed Bao" }
        ]
      },
      {
        kind: "full",
        frame: { src: `${base}/fb-croissant.jpg`, w: 3840, h: 2560, alt: "Butter croissants beside a flat-white, one sliced to reveal a laminated crumb", title: "Croissants" }
      },
      {
        kind: "row",
        cols: 3,
        aspect: "4 / 5",
        frames: [
          { src: `${base}/fb-cheesecake.jpg`, w: 3072, h: 3840, alt: "Baked cheesecake slice with berry coulis and coffee", title: "Baked Cheesecake" },
          { src: `${base}/fb-biryani.jpg`, w: 2560, h: 3840, alt: "Mutton biryani in a clay pot with accompaniments on banana leaf", title: "Biryani" },
          { src: `${base}/fb-grapefruit-spritz.jpg`, w: 2560, h: 3840, alt: "Grapefruit spritz cocktails garnished with thyme and citrus", title: "Grapefruit Spritz" }
        ]
      }
    ]
  },
  {
    id: "lifestyle",
    label: "05 — Celebrations",
    title: "Lifestyle & Celebration",
    blurb: "Weddings and the moments around them.",
    blocks: [
      {
        kind: "full",
        frame: { src: `${base}/life-sparkler-exit.jpg`, w: 3840, h: 2560, alt: "Night-time wedding sparkler exit, couple running through a tunnel of guests", title: "Sparkler Exit" }
      },
      {
        kind: "feature",
        frame: { src: `${base}/life-field-couple.jpg`, w: 2560, h: 3840, alt: "Bride and groom laughing together in a golden mountain meadow", title: "Golden Field" }
      },
      {
        kind: "full",
        frame: { src: `${base}/life-celebration.jpg`, w: 3840, h: 2560, alt: "Wedding party crowded together laughing on a garden bench", title: "Celebration" }
      }
    ]
  }
];

// Flatten every frame in exact render order for lightbox navigation.
function framesOf(block: Block): Frame[] {
  if (block.kind === "row") return block.frames;
  return [block.frame];
}
const FLAT: Frame[] = SECTIONS.flatMap((s) => s.blocks.flatMap(framesOf));
const INDEX = new Map(FLAT.map((f, i) => [f.src, i]));

export function NonAutoGallery() {
  const [active, setActive] = useState<number | null>(null);
  const openAt = useCallback((src: string) => {
    const i = INDEX.get(src);
    if (i !== undefined) setActive(i);
  }, []);

  return (
    <>
      {/* HERO — same marquee as the automotive homepage */}
      <Hero slides={HERO_SLIDES} />

      {SECTIONS.map((section) => (
        <div key={section.id}>
          <section
            id={section.id}
            className="border-t border-white/[0.06] px-5 py-16 md:px-10 md:py-24"
          >
            <div className="mx-auto max-w-[1600px]">
              <SectionHeader label={section.label} title={section.title} blurb={section.blurb} />
              <div className="space-y-3 md:space-y-4">
                {section.blocks.map((block, i) => (
                  <BlockView key={i} block={block} openAt={openAt} />
                ))}
              </div>
            </div>
          </section>

          {section.id === "creative" ? <BehindTheLens /> : null}
        </div>
      ))}

      {/* CLOSING */}
      <section className="border-t border-white/[0.06] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
          <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/40">Commissions</p>
          <p className="max-w-3xl text-2xl font-light leading-snug text-bone md:text-4xl">
            Available for commercial, editorial and brand commissions across EMEA.
          </p>
          <a
            href="/#about"
            className="group inline-flex w-fit items-center gap-3 text-sm font-semibold uppercase tracking-wideTesla text-white/70 transition hover:text-bone"
          >
            Start a conversation
            <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>

      <Lightbox frames={FLAT} active={active} setActive={setActive} />
    </>
  );
}

function SectionHeader({ label, title, blurb }: { label: string; title: string; blurb: string }) {
  return (
    <motion.div
      className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wideTesla text-white/40">{label}</p>
        <h2 className="text-3xl font-light tracking-tight text-bone md:text-5xl">{title}</h2>
      </div>
      <p className="max-w-md text-sm leading-relaxed text-white/50 md:text-right">{blurb}</p>
    </motion.div>
  );
}

function BlockView({ block, openAt }: { block: Block; openAt: (src: string) => void }) {
  if (block.kind === "full") {
    return (
      <Reveal>
        <Tile frame={block.frame} openAt={openAt} sizes="(min-width: 1600px) 1600px, 100vw" />
      </Reveal>
    );
  }
  if (block.kind === "feature") {
    return (
      <Reveal>
        <div className="mx-auto max-w-[440px] md:max-w-[520px]">
          <Tile frame={block.frame} openAt={openAt} sizes="(min-width: 768px) 520px, 100vw" />
        </div>
      </Reveal>
    );
  }
  const cols = block.cols;
  const grid = cols === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3";
  const sizes =
    cols === 2 ? "(min-width: 768px) 50vw, 50vw" : "(min-width: 640px) 33vw, 100vw";
  return (
    <Reveal>
      <div className={`grid gap-3 md:gap-4 ${grid}`}>
        {block.frames.map((frame) => (
          <Tile key={frame.src} frame={frame} openAt={openAt} sizes={sizes} aspect={block.aspect} />
        ))}
      </div>
    </Reveal>
  );
}

function Tile({
  frame,
  openAt,
  sizes,
  aspect
}: {
  frame: Frame;
  openAt: (src: string) => void;
  sizes: string;
  aspect?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => openAt(frame.src)}
      aria-label={`Open ${frame.title}`}
      className="group relative block w-full overflow-hidden bg-white/[0.03] text-left"
      style={{ aspectRatio: aspect ?? `${frame.w} / ${frame.h}` }}
    >
      <Image
        src={frame.src}
        alt={frame.alt}
        fill
        sizes={sizes}
        loading="lazy"
        className="object-cover transition-transform duration-[900ms] ease-expo group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-4 opacity-0 transition duration-500 group-hover:opacity-100">
        <span className="text-[10px] font-semibold uppercase tracking-wideTesla text-white/80 drop-shadow">
          {frame.title}
        </span>
      </div>
    </button>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function BehindTheLens() {
  return (
    <section
      id="behind-the-lens"
      className="border-t border-white/[0.06] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          label="Behind the Lens"
          title="On Set"
          blurb="How the work comes together."
        />
        <Reveal>
          <VideoEmbed
            poster="/images/non-auto-video-poster.jpg"
            embedUrl="https://www.youtube.com/embed/j00PxoZ9w0U?autoplay=1&rel=0&modestbranding=1"
            title="Behind the scenes of recent work"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Lightbox({
  frames,
  active,
  setActive
}: {
  frames: Frame[];
  active: number | null;
  setActive: (v: number | null) => void;
}) {
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive(active === null ? null : (active + dir + frames.length) % frames.length);
    },
    [active, frames.length, setActive]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, go, setActive]);

  const frame = active === null ? null : frames[active];

  return (
    <AnimatePresence>
      {frame ? (
        <motion.div
          className="fixed inset-0 z-[95] bg-ink/98 text-white backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button
            type="button"
            aria-label="Close viewer"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20 md:right-6 md:top-6"
          >
            <X size={18} />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20 md:left-6"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20 md:right-6"
          >
            <ChevronRight size={18} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={frame.src}
              className="absolute inset-0 flex items-center justify-center p-4 md:p-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <div
                className="relative max-h-full w-full"
                style={{ aspectRatio: `${frame.w} / ${frame.h}`, maxWidth: `min(92vw, ${(frame.w / frame.h) * 84}vh)` }}
              >
                <Image src={frame.src} alt={frame.alt} fill sizes="92vw" className="object-contain" />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-5 md:px-8 md:pb-7">
            <span className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/70">
              {frame.title}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/40">
              {String(active! + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
