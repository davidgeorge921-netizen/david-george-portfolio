"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

function parseRgb(value: string): [number, number, number, number] | null {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const parts = match[1].split(",").map((part) => parseFloat(part.trim()));
  const [r, g, b, a = 1] = parts;
  return [r, g, b, a];
}

// Samples the background directly beneath the header and returns true when it is light,
// so the nav text can flip to black for contrast (and back to white over dark sections).
function backdropIsLight(): boolean {
  if (typeof document === "undefined") return false;
  const x = Math.round(window.innerWidth / 2);
  const y = 72; // just below the 64px fixed header
  let node = document.elementFromPoint(x, y) as HTMLElement | null;
  while (node) {
    const rgb = parseRgb(getComputedStyle(node).backgroundColor);
    if (rgb && rgb[3] > 0.1) {
      const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
      return luminance > 0.6;
    }
    node = node.parentElement;
  }
  return false;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [navDark, setNavDark] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.85, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setNavDark(backdropIsLight());
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <div className="min-h-screen bg-ink text-bone transition-colors duration-700 light:bg-bone light:text-ink">
      <motion.div
        className="fixed left-0 top-0 z-[70] h-px origin-left bg-bone light:bg-ink"
        style={{ scaleX }}
      />
      <header className="fixed inset-x-0 top-0 z-50">
        <nav
          className={`mx-auto flex h-16 max-w-[1800px] items-center justify-between px-5 text-[11px] font-medium uppercase tracking-wideTesla transition-colors duration-300 md:px-10 ${
            navDark ? "text-black" : "text-white"
          }`}
        >
          <Link href="/" aria-label="Home">
            David George 2
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="/#work">Work</a>
            <a href="/#gallery">Gallery</a>
            <Link href="/non-auto-portfolio">Non-Auto Portfolio</Link>
            <a href="/#about">About Me / Contact</a>
          </div>
        </nav>
      </header>
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <CustomCursor />
    </div>
  );
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a,button,[data-cursor='view']")));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[80] hidden h-8 w-8 rounded-full border border-white/50 mix-blend-difference md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: active ? 2.25 : 1
      }}
      transition={{ type: "spring", stiffness: 350, damping: 35 }}
    />
  );
}
