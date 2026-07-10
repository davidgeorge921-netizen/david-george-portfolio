"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from "@/lib/forms";

const SESSION_TYPES = ["Wedding", "Family", "Portrait", "Commercial", "Automotive", "Event"];
const BUDGETS = ["Under €500", "€500–€1,500", "€1,500–€3,000", "€3,000+", "Not sure yet"];

const eyebrow = "text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45";
const inputCls =
  "w-full border border-white/20 bg-transparent px-4 py-3 text-base text-bone outline-none transition placeholder:text-white/30 focus:border-white/60 light:border-black/20 light:text-ink light:placeholder:text-black/30 light:focus:border-black/60 [color-scheme:dark] light:[color-scheme:light]";

function pill(active: boolean) {
  return `rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wideTesla transition duration-300 ${
    active
      ? "border-white bg-white text-black light:border-black light:bg-black light:text-white"
      : "border-white/25 text-white/70 hover:border-white/60 light:border-black/20 light:text-black/70 light:hover:border-black/60"
  }`;
}

export function Inquiry() {
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
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
          subject: "New booking inquiry — David George Photography",
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
        setType("");
        setBudget("");
      } else {
        setStatus("error");
      }
    } catch {
      clearTimeout(timeout);
      setStatus("error");
    }
  }

  return (
    <section
      id="inquire"
      className="scroll-mt-24 border-t border-white/10 bg-ink px-5 py-24 text-bone light:border-black/10 light:bg-bone light:text-ink md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <p className={eyebrow}>Check Availability</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">Let&apos;s talk about your shoot.</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 light:text-black/62">
            Currently accepting bookings for Autumn 2026. Tell me a little about what you have in
            mind and I&apos;ll reply personally, usually within a day.
          </p>
        </Reveal>

        {status === "sent" ? (
          <Reveal>
            <div className="mt-12 border-t border-white/10 pt-12 light:border-black/10">
              <p className="text-2xl font-light">Thank you, your inquiry is on its way.</p>
              <p className="mt-3 text-sm text-white/55 light:text-black/55">
                I&apos;ll be in touch personally, usually within a day.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.05}>
            <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-9">
              <input type="hidden" name="Looking for" value={type} />
              <input type="hidden" name="Budget" value={budget} />
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

              <fieldset>
                <legend className={eyebrow}>What are you looking for?</legend>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {SESSION_TYPES.map((t) => (
                    <button key={t} type="button" onClick={() => setType(type === t ? "" : t)} className={pill(type === t)}>
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Preferred date">
                  <input type="date" name="Preferred date" className={inputCls} />
                </Field>
                <Field label="Location">
                  <input name="Location" placeholder="City or venue" className={inputCls} />
                </Field>
              </div>

              <fieldset>
                <legend className={eyebrow}>
                  Budget <span className="text-white/30 light:text-black/30">(optional)</span>
                </legend>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {BUDGETS.map((b) => (
                    <button key={b} type="button" onClick={() => setBudget(budget === b ? "" : b)} className={pill(budget === b)}>
                      {b}
                    </button>
                  ))}
                </div>
              </fieldset>

              <Field label="Tell me about your vision">
                <textarea
                  name="Vision"
                  rows={4}
                  placeholder="A few words about what you&apos;re imagining"
                  className={`${inputCls} resize-y`}
                />
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Your name">
                  <input name="Name" required autoComplete="name" className={inputCls} />
                </Field>
                <Field label="Email">
                  <input type="email" name="email" required autoComplete="email" className={inputCls} />
                </Field>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-xs font-semibold uppercase tracking-wideTesla transition duration-300 hover:bg-white hover:text-black disabled:opacity-50 light:border-black/25 light:hover:bg-black light:hover:text-white"
                >
                  {status === "sending" ? "Sending…" : "Check Availability"}
                </button>
                {status === "error" ? (
                  <p className="text-sm text-white/60 light:text-black/60">
                    Couldn&apos;t send. Please email{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className={eyebrow}>{label}</span>
      {children}
    </label>
  );
}
