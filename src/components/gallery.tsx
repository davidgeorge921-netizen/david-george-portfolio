"use client";

import { PortfolioImage } from "@/lib/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

const filters = ["Interior", "Design", "Motion"] as const;
type Filter = "All" | (typeof filters)[number];

export function Gallery({ images }: { images: PortfolioImage[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered = useMemo(
    () => images.filter((image) => filter === "All" || image.category === filter),
    [filter, images]
  );

  return (
    <section id="gallery" className="bg-bone px-5 py-24 text-ink light:bg-white md:px-10 md:py-32">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-black/50">Gallery</p>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter((current) => (current === item ? "All" : item))}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wideTesla transition ${
                  filter === item ? "border-black bg-black text-white" : "border-black/15 text-black/65 hover:border-black"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((image, index) => (
            <motion.button
              key={`${image.src}-${filter}`}
              type="button"
              data-cursor="view"
              onClick={() => setActive(index)}
              className="group relative block w-full overflow-hidden bg-black text-left"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 ease-expo group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/15" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <Lightbox images={filtered} active={active} setActive={setActive} />
    </section>
  );
}

function Lightbox({
  images,
  active,
  setActive
}: {
  images: PortfolioImage[];
  active: number | null;
  setActive: Dispatch<SetStateAction<number | null>>;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (active === null) return;
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length, setActive]);

  const image = active === null ? null : images[active];

  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          className="fixed inset-0 z-[90] bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close viewer"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 backdrop-blur"
          >
            <X size={18} />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => setActive((active! - 1 + images.length) % images.length)}
            className="absolute left-5 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => setActive((active! + 1) % images.length)}
            className="absolute right-5 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur"
          >
            <ChevronRight size={18} />
          </button>
          <div className="relative h-full w-full">
            <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5 md:p-10">
            <p className="max-w-3xl text-sm leading-6 text-white/72">{image.caption}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
