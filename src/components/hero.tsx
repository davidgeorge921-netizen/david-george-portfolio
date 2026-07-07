"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const slides = [
  { src: "/images/aston-martin/IMG_3268.jpg", alt: "Black Aston Martin rolling through a mountain road" },
  { src: "/images/aston-martin/IMG_3276.jpg", alt: "Aston Martin center console and carbon-fibre detail" },
  { src: "/images/aston-martin/IMG_3260.jpg", alt: "Aston Martin bronze wheel with green brake caliper" },
  { src: "/images/aston-martin/IMG_3269.jpg", alt: "Black Aston Martin front rolling on a mountain road" }
];

export function Hero() {
  // Duplicate the set so the marquee can loop seamlessly (translate -50% == one full set).
  const loop = [...slides, ...slides];

  return (
    <section className="relative h-[100svh] overflow-hidden bg-black">
      <motion.div
        className="flex h-full w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 34, ease: "linear", repeat: Infinity }}
      >
        {loop.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            className="relative h-full w-[88vw] shrink-0 mr-2 md:w-[62vw] md:mr-3"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index < 2}
              quality={95}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* Soft edge vignettes to frame the moving strip */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/70 to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/70 to-transparent md:w-28" />

      {/* Animated scroll indicator */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex h-9 w-5 justify-center rounded-full border border-white/60 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-white"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wideTesla text-white/70">Scroll</span>
      </motion.div>
    </section>
  );
}
