"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { ArrowUp, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "@/components/site-footer";

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
  const [navHidden, setNavHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const lenisRef = useRef<Lenis | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.85, smoothWheel: true });
    lenisRef.current = lenis;
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToTop = () => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setNavDark(backdropIsLight());
      setShowTop(y > 400);
      // Hide the header whenever the page is scrolled; show it only near the very top,
      // so it never overlaps the photos while browsing.
      setNavHidden(y > 80);
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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
          navHidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <nav
          className={`mx-auto flex h-16 max-w-[1800px] items-center justify-between px-5 text-[11px] font-medium uppercase tracking-wideTesla transition-colors duration-300 md:px-10 ${
            navDark ? "text-black" : "text-white"
          }`}
        >
          <Link href="/" aria-label="Home">
            David George
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="/#work">Work</a>
            <a href="/#gallery">Gallery</a>
            <Link href="/business-portraits">Business Portraits</Link>
            <Link href="/about">About</Link>
            <a href="/#inquire">Contact</a>
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-white/10 bg-ink/95 text-white backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-[1800px] flex-col px-5 text-xs font-medium uppercase tracking-wideTesla">
              <a href="/#work" onClick={() => setMenuOpen(false)} className="border-b border-white/10 py-4">Work</a>
              <a href="/#gallery" onClick={() => setMenuOpen(false)} className="border-b border-white/10 py-4">Gallery</a>
              <Link href="/business-portraits" onClick={() => setMenuOpen(false)} className="border-b border-white/10 py-4">Business Portraits</Link>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="border-b border-white/10 py-4">About</Link>
              <a href="/#inquire" onClick={() => setMenuOpen(false)} className="py-4">Contact</a>
            </div>
          </div>
        )}
      </header>
      {/* Keyed by pathname so each route reliably remounts and fades in on
          client-side navigation (AnimatePresence mode="wait" left incoming
          App Router pages stuck invisible until a hard refresh). */}
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
      <SiteFooter />
      <ScrollToTopButton visible={showTop} onClick={scrollToTop} />
      <CustomCursor />
    </div>
  );
}

function ScrollToTopButton({ visible, onClick }: { visible: boolean; onClick: () => void }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll back to top"
          onClick={onClick}
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-6 right-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-bone/30 bg-ink/70 text-bone backdrop-blur transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-white light:border-ink/20 light:bg-bone/70 light:text-ink md:bottom-8 md:right-8 md:h-14 md:w-14"
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp size={20} strokeWidth={1.75} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
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
