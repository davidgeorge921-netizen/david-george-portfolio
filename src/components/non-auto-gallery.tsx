"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

type Shot = Frame & { cat: string };

const base = "/images/non-auto";

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
        kind: "full",
        frame: { src: `${base}/life-celebration.jpg`, w: 3840, h: 2560, alt: "Wedding party crowded together laughing on a garden bench", title: "Celebration" }
      }
    ]
  }
];

// Short tab labels per category.
const TAB: Record<string, string> = {
  editorial: "Editorial",
  portraits: "Portraits",
  creative: "Creative",
  food: "Food",
  lifestyle: "Lifestyle"
};

const CATEGORIES = [{ id: "all", label: "All" }, ...SECTIONS.map((s) => ({ id: s.id, label: TAB[s.id] }))];

function framesOf(block: Block): Frame[] {
  if (block.kind === "row") return block.frames;
  return [block.frame];
}

// Every photo, flattened and tagged with its category, in source order.
const ALL_SHOTS: Shot[] = SECTIONS.flatMap((s) =>
  s.blocks.flatMap(framesOf).map((f) => ({ ...f, cat: s.id }))
);

export function NonAutoGallery() {
  const [cat, setCat] = useState("all");
  const [active, setActive] = useState<number | null>(null);

  const visible = useMemo(
    () => (cat === "all" ? ALL_SHOTS : ALL_SHOTS.filter((s) => s.cat === cat)),
    [cat]
  );

  // Closing the lightbox when the filter changes keeps the index valid.
  useEffect(() => {
    setActive(null);
  }, [cat]);

  const openAt = useCallback((i: number) => setActive(i), []);

  return (
    <>
      {/* FILTER TABS — sticky under the fixed header */}
      <div className="sticky top-16 z-40 bg-ink/85 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-5 py-4 md:px-10">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-wideTesla">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                className={`relative pb-1 transition-colors duration-300 ${
                  cat === c.id ? "text-bone" : "text-white/40 hover:text-white/70"
                }`}
              >
                {c.label}
                {cat === c.id ? (
                  <motion.span
                    layoutId="cat-underline"
                    className="absolute inset-x-0 -bottom-px h-px bg-signal"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MASONRY GRID */}
      <div className="px-5 pb-24 pt-6 md:px-10 md:pb-32 md:pt-8">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            key={cat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4"
          >
            {visible.map((shot, i) => (
              <MasonryTile key={shot.src} shot={shot} onClick={() => openAt(i)} />
            ))}
          </motion.div>
        </div>
      </div>

      <Lightbox frames={visible} active={active} setActive={setActive} />
    </>
  );
}

function MasonryTile({ shot, onClick }: { shot: Shot; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${shot.title}`}
      className="group mb-3 block w-full break-inside-avoid overflow-hidden bg-white/[0.03] md:mb-4"
    >
      <div className="relative w-full" style={{ aspectRatio: `${shot.w} / ${shot.h}` }}>
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          loading="lazy"
          className="object-cover transition-transform duration-[900ms] ease-expo group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
      </div>
    </button>
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
