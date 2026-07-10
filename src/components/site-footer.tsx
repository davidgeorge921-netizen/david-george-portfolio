import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-bone px-6 py-16 text-ink">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        {/* Social icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-bone transition-transform duration-300 hover:-translate-y-0.5"
          >
            <XIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/david-bobby-george/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-bone transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://www.instagram.com/fireshot.studios/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-bone transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Instagram size={18} />
          </a>
        </div>

        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-light tracking-tight underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70"
        >
          david george photography
        </Link>

        {/* Legal notice */}
        <Link
          href="/legal-notice"
          className="text-lg text-ink/70 underline decoration-1 underline-offset-8 transition-colors hover:text-ink"
        >
          Legal notice
        </Link>
      </div>
    </footer>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
