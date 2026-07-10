"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Pill CTA that matches the site's existing buttons, with a continuously
// nudging arrow (same idiom as the scroll-to-top button) and a hover fill.
export function OpenProjectButton({
  href,
  label = "Open Project",
  dark = true,
  className = ""
}: {
  href: string;
  label?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-cursor="view"
      className={`group inline-flex w-fit items-center gap-2.5 rounded-full border px-6 py-3 text-xs font-semibold uppercase tracking-wideTesla transition duration-300 ${
        dark
          ? "border-white/25 text-white hover:bg-white hover:text-black light:border-black/25 light:text-black light:hover:bg-black light:hover:text-white"
          : "border-black/25 text-black hover:bg-black hover:text-white"
      } ${className}`}
    >
      {label}
      <motion.span
        aria-hidden="true"
        className="inline-flex"
        animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowUpRight size={15} />
      </motion.span>
    </Link>
  );
}
