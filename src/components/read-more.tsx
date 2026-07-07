"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

// Collapses its content on mobile behind a "Read more" toggle with an animated
// chevron. On md+ screens the content is always shown and the toggle is hidden.
export function ReadMore({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className={`${open ? "block" : "hidden"} md:block`}>{children}</div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wideTesla text-white/70 transition hover:text-white light:text-black/70 light:hover:text-black md:hidden"
      >
        {open ? "Read less" : "Read more"}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? "rotate-180" : "animate-bounce"}`}
        />
      </button>
    </div>
  );
}
