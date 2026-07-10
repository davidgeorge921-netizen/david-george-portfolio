"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from "@/lib/forms";

const eyebrow = "text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45";

export function GuideDownload() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Guide request — Preparing for Your Portrait Session",
          from_name: "David George Photography website",
          ...Object.fromEntries(fd)
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);
      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (res.ok && data.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      clearTimeout(timeout);
      setStatus("error");
    }
  }

  return (
    <section className="border-t border-white/10 bg-ink px-5 py-24 text-bone light:border-black/10 light:bg-bone light:text-ink md:px-10 md:py-28">
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <p className={eyebrow}>Free Guide</p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight md:text-4xl">Preparing for Your Portrait Session</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 light:text-black/62">
            A short guide on what to wear, how to prepare, and what to expect on the day. Leave your
            email and I&apos;ll send it over.
          </p>
        </Reveal>

        {status === "sent" ? (
          <Reveal>
            <p className="mt-8 text-lg text-white/80 light:text-black/80">
              Thank you, the guide is on its way to your inbox.
            </p>
          </Reveal>
        ) : (
          <Reveal delay={0.05}>
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Your email"
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-base text-bone outline-none transition placeholder:text-white/30 focus:border-white/60 sm:max-w-sm light:border-black/20 light:text-ink light:placeholder:text-black/30 light:focus:border-black/60"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-xs font-semibold uppercase tracking-wideTesla transition duration-300 hover:bg-white hover:text-black disabled:opacity-50 light:border-black/25 light:hover:bg-black light:hover:text-white"
              >
                {status === "sending" ? "Sending…" : "Send me the guide"}
              </button>
            </form>
          </Reveal>
        )}

        {status === "error" ? (
          <p className="mt-4 text-sm text-white/60 light:text-black/60">
            Couldn&apos;t send. Please email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        ) : null}
      </div>
    </section>
  );
}
