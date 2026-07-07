"use client";

import Image from "next/image";
import { useState } from "react";

export function VideoEmbed({
  poster,
  embedUrl,
  title
}: {
  poster: string;
  embedUrl: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden bg-black shadow-2xl shadow-black/30">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
            quality={95}
          />
          <span className="absolute inset-0 bg-black/15 transition duration-300 group-hover:bg-black/30" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 backdrop-blur transition duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#0b0b0b" className="ml-0.5" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
