"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// One full (uncropped) portrait at a time with left/right navigation.
// Arrow styling matches the homepage gallery lightbox.
export function HeadshotCarousel({
  images,
  className = ""
}: {
  images: { src: string; alt: string }[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const go = (dir: number) => setIndex((current) => (current + dir + images.length) % images.length);
  const image = images[index];

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <Image
        key={image.src}
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 30vw, 100vw"
        quality={95}
        className="object-contain"
      />
      <button
        type="button"
        aria-label="Previous portrait"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Next portrait"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
      >
        <ChevronRight size={18} />
      </button>
      <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-wideTesla text-white/70">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
