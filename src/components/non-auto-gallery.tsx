"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const HERO: Frame = {
  src: `${base}/editorial-tartan-gaze.jpg`,
  w: 2559,
  h: 3840,
  alt: "Fashion editorial portrait — model wrapped in tartan against deep shadow, direct gaze",
  title: "Tartan — Editorial Study"
};

const SECTIONS: Section[] = [
  {
    id: "executive",
    label: "01 — Portraiture",
    title: "Executive & Brand Portraits",
    blurb:
      "Considered, confident portraits for founders, teams and brands — lit with intention, styled with restraint, shot in-studio and on location.",
    blocks: [
      {
        kind: "row",
        cols: 2,
        aspect: "4 / 5",
        frames: [
          { src: `${base}/exec-portrait-dynamic.jpg`, w: 3072, h: 3840, alt: "Studio portrait of a woman in a cream knit, playful finger-frame gesture against teal backdrop", title: "Personality — Studio" },
          { src: `${base}/exec-portrait-cream.jpg`, w: 3072, h: 3840, alt: "Executive headshot of a woman in a cream turtleneck against a warm tan backdrop", title: "Executive — Warm Key" }
        ]
      },
      {
        kind: "row",
        cols: 3,
        aspect: "4 / 5",
        frames: [
          { src: `${base}/exec-portrait-violet.jpg`, w: 3072, h: 3840, alt: "Tech founder headshot in a cream sweater against a violet backdrop", title: "Founder — Violet" },
          { src: `${base}/exec-portrait-blue-blazer.jpg`, w: 3840, h: 3840, alt: "Corporate portrait of a smiling woman in a pale blue blazer, arms crossed", title: "Corporate — Soft Grey" },
          { src: `${base}/exec-portrait-smile.jpg`, w: 3072, h: 3840, alt: "Bright headshot of a woman in a pink striped sweater on a white backdrop", title: "Team — High Key" }
        ]
      },
      {
        kind: "full",
        frame: { src: `${base}/exec-environmental-office.jpg`, w: 3840, h: 2706, alt: "Environmental brand portrait in a modern office with a moss hexagon wall", title: "On Location — Office" }
      },
      {
        kind: "row",
        cols: 2,
        aspect: "4 / 5",
        frames: [
          { src: `${base}/exec-portrait-brick.jpg`, w: 2880, h: 3840, alt: "Executive portrait of a bald man in a navy blazer against an exposed brick wall", title: "Executive — Brick" },
          { src: `${base}/exec-portrait-navy-suit.jpg`, w: 3071, h: 3840, alt: "Formal portrait of a young man in a navy suit on a grey backdrop", title: "Formal — Navy" }
        ]
      },
      {
        kind: "row",
        cols: 3,
        aspect: "4 / 5",
        frames: [
          { src: `${base}/exec-portrait-charcoal-suit.jpg`, w: 3071, h: 3840, alt: "Portrait of a man in a charcoal suit adjusting his lapel on a grey backdrop", title: "Formal — Charcoal" },
          { src: `${base}/exec-portrait-hoodie.jpg`, w: 3071, h: 3840, alt: "Relaxed brand headshot of a woman in a navy hoodie laughing on a white backdrop", title: "Brand — Relaxed" },
          { src: `${base}/exec-environmental-studio.jpg`, w: 2971, h: 3840, alt: "Environmental portrait of a man in a corduroy shirt against a moss hexagon wall", title: "On Location — Studio" }
        ]
      }
    ]
  },
  {
    id: "editorial",
    label: "02 — Editorial",
    title: "Fashion Editorial",
    blurb:
      "A studio story told in tartan and shadow — mood, texture and stillness, built frame by frame.",
    blocks: [
      {
        kind: "row",
        cols: 2,
        aspect: "2 / 3",
        frames: [
          { src: `${base}/editorial-tartan-side.jpg`, w: 2559, h: 3840, alt: "Editorial portrait of a model draped in tartan, turned to the side in low light", title: "Tartan — Turn" },
          { src: `${base}/editorial-tartan-bloom.jpg`, w: 2559, h: 3840, alt: "Editorial portrait of a model in tartan holding green blooms under coloured light", title: "Tartan — Bloom" }
        ]
      },
      {
        kind: "row",
        cols: 2,
        aspect: "2 / 3",
        frames: [
          { src: `${base}/editorial-tartan-bloom-mono.jpg`, w: 2559, h: 3840, alt: "Monochrome editorial portrait of a model in tartan holding blooms", title: "Tartan — Bloom, Mono" },
          { src: `${base}/editorial-tartan-motion.jpg`, w: 2559, h: 3840, alt: "Editorial beauty portrait of a model in satin, freckles lit by warm gel against bokeh", title: "Editorial — Colour" }
        ]
      }
    ]
  },
  {
    id: "creative",
    label: "03 — Portraiture",
    title: "Creative Portraits",
    blurb: "Monochrome character studies where light does the talking.",
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
    label: "04 — Commercial",
    title: "Food & Beverage",
    blurb: "Menu and hospitality photography for hotels and restaurants — appetite, crafted.",
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
      },
      {
        kind: "full",
        frame: { src: `${base}/fb-caramel.jpg`, w: 3840, h: 3071, alt: "Caramel bread pudding with a sugar tuile and cream", title: "Caramel Pudding" }
      }
    ]
  },
  {
    id: "lifestyle",
    label: "05 — Commercial",
    title: "Lifestyle & Celebration",
    blurb: "Weddings, launches and the unscripted moments in between.",
    blocks: [
      {
        kind: "full",
        frame: { src: `${base}/life-sparkler-exit.jpg`, w: 3840, h: 2560, alt: "Night-time wedding sparkler exit, couple running through a tunnel of guests", title: "Sparkler Exit" }
      },
      {
        kind: "row",
        cols: 2,
        aspect: "3 / 2",
        frames: [
          { src: `${base}/life-mother-child.jpg`, w: 3840, h: 2560, alt: "Mother lifting her daughter in a sunlit summer meadow", title: "Meadow — Family" },
          { src: `${base}/life-startup-team.jpg`, w: 3840, h: 2559, alt: "Startup team laughing around a laptop in a bright studio", title: "Team — Candid" }
        ]
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
const FLAT: Frame[] = [HERO, ...SECTIONS.flatMap((s) => s.blocks.flatMap(framesOf))];
const INDEX = new Map(FLAT.map((f, i) => [f.src, i]));

export function NonAutoGallery() {
  const [active, setActive] = useState<number | null>(null);
  const openAt = useCallback((src: string) => {
    const i = INDEX.get(src);
    if (i !== undefined) setActive(i);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <button
          type="button"
          onClick={() => openAt(HERO.src)}
          className="group relative block h-[82vh] min-h-[560px] w-full overflow-hidden md:h-[94vh]"
          aria-label={`Open ${HERO.title}`}
        >
          <Image
            src={HERO.src}
            alt={HERO.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_28%] transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-12 md:px-10 md:pb-16">
            <div className="mx-auto max-w-[1600px]">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-wideTesla text-white/55">
                Selected Work — Beyond Automotive
              </p>
              <h1 className="max-w-4xl text-4xl font-light leading-[1.02] tracking-tight text-bone md:text-7xl">
                Portraiture, Editorial <span className="text-white/45">&amp;</span> Commercial
              </h1>
            </div>
          </div>
        </button>
      </section>

      {/* STANDFIRST */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/40">
            David George — Commercial &amp; Editorial Photographer
          </p>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-white/70 md:text-2xl">
            A parallel body of work spanning executive portraiture, fashion editorial, hospitality and
            celebration. The same obsession with light, composition and character that defines the automotive
            frames — carried across studio and location shoots throughout Europe.
          </p>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
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

            {section.id === "creative" ? (
              <BehindTheLens />
            ) : null}
          </div>
        </section>
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
    <motion.div
      className="mt-16 border-t border-white/[0.06] pt-16 md:mt-24 md:pt-24"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wideTesla text-white/40">
        Behind the Lens
      </p>
      <h2 className="mb-10 max-w-2xl text-3xl font-light tracking-tight text-bone md:text-5xl">
        A look at how the work comes together
      </h2>
      <VideoEmbed
        poster="/images/non-auto-video-poster.jpg"
        embedUrl="https://www.youtube.com/embed/j00PxoZ9w0U?autoplay=1&rel=0&modestbranding=1"
        title="Behind the scenes of recent work"
      />
    </motion.div>
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
