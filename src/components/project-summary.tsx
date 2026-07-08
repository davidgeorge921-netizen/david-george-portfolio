"use client";

import { useState } from "react";

// Desktop keeps the exact original summary (two-line clamp, always visible).
// On mobile the text is collapsed to a short preview with a Read More / Show
// Less toggle so the photograph stays the hero.
export function ProjectSummary({ summary }: { summary: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Desktop — unchanged */}
      <p className="mt-3 hidden max-w-xl text-sm leading-6 text-white/72 line-clamp-2 md:block">
        {summary}
      </p>

      {/* Mobile — collapsible */}
      <div className="md:hidden">
        <p
          className={`mt-2 max-w-xl text-[13px] leading-6 text-white/75 ${
            expanded ? "" : "line-clamp-1"
          }`}
        >
          {summary}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
          className="mt-1.5 text-[10px] font-semibold uppercase tracking-wideTesla text-white/80 transition hover:text-white"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      </div>
    </>
  );
}
