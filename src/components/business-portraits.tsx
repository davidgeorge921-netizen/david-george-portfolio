"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

const base = "/images/non-auto";

/* ----------------------------------------------------------------------------
   NOTE FOR DAVID:
   • Prices below are PLACEHOLDERS — replace the values in PACKAGES with your real
     rates before sharing widely.
   • The testimonials are a template — swap in real client quotes, or delete.
---------------------------------------------------------------------------- */

const PACKAGES = [
  {
    name: "Individual",
    price: "from €249",
    img: `${base}/exec-portrait-charcoal-grey.jpg`,
    w: 3072,
    h: 3840,
    alt: "Studio business portrait of a woman against a light grey backdrop",
    copy: "A focused session for a single professional. One look, expert lighting and a set of polished, retouched portraits ready for LinkedIn, press and your website.",
    includes: "≈45 min · 1 look · 5 retouched images"
  },
  {
    name: "Executive",
    price: "from €449",
    img: `${base}/exec-portrait-cream.jpg`,
    w: 3072,
    h: 3840,
    alt: "Executive portrait of a woman in a cream turtleneck against a warm backdrop",
    copy: "An extended session with multiple looks and backgrounds. Ideal for founders and leadership who need a versatile set of images for profiles, speaking and media.",
    includes: "≈90 min · 2–3 looks · 12 retouched images"
  },
  {
    name: "Team / On-Location",
    price: "On request",
    img: `${base}/exec-portrait-white-knit.jpg`,
    w: 3072,
    h: 3840,
    alt: "Business portrait of a smiling woman in a white knit top on a dark backdrop",
    copy: "Consistent portraits for your whole team, shot at your office or a studio. Individual headshots plus group options, all matched in style and colour.",
    includes: "At your office or studio · Priced per head"
  }
];

const VALUES = [
  {
    title: "First impressions count",
    copy: "Before a word is exchanged, your portrait has already spoken. A considered image signals credibility, warmth and attention to detail."
  },
  {
    title: "One consistent look",
    copy: "For teams and leadership, every portrait is matched in framing, light and colour — so your brand looks deliberate across every profile and page."
  },
  {
    title: "Relaxed, directed sessions",
    copy: "You don’t need to know how to pose. I direct throughout, keep the set easy, and coax out expressions that actually feel like you."
  }
];

const STEPS = [
  { n: "01", title: "Enquiry", copy: "Tell me about you or your team and how the images will be used. We agree on scope and a date." },
  { n: "02", title: "Preparation", copy: "We plan looks, wardrobe and location, so nothing is left to chance on the day." },
  { n: "03", title: "The shoot", copy: "A relaxed, fully-directed session — in studio or on location across EMEA." },
  { n: "04", title: "Delivery", copy: "Hand-retouched, high-resolution images delivered in web and print formats, ready to use." }
];

const GALLERY = [
  { img: `${base}/exec-portrait-charcoal-grey.jpg`, w: 3072, h: 3840, alt: "Business portrait against a light grey backdrop" },
  { img: `${base}/creative-mono-executive.jpg`, w: 3071, h: 3840, alt: "Black and white portrait of a bearded man in a three-piece suit" },
  { img: `${base}/exec-portrait-white-knit.jpg`, w: 3072, h: 3840, alt: "Portrait of a smiling woman in a white knit top" },
  { img: `${base}/creative-mono-joy.jpg`, w: 2742, h: 3840, alt: "Black and white portrait of a woman laughing" },
  { img: `${base}/exec-portrait-cream.jpg`, w: 3072, h: 3840, alt: "Executive headshot against a warm tan backdrop" },
  { img: `${base}/creative-mono-poise.jpg`, w: 3072, h: 3840, alt: "Black and white studio portrait of a woman with arms crossed" },
  { img: `${base}/exec-portrait-brick.jpg`, w: 2880, h: 3840, alt: "Executive portrait of a man against exposed brick" },
  { img: `${base}/creative-draped.jpg`, w: 3072, h: 3840, alt: "Portrait of a woman in a draped blazer against a grey backdrop" }
];

const FAQS = [
  { q: "How long does a session take?", a: "An Individual session runs about 45 minutes; an Executive session around 90. Team days are scheduled to keep each person to a short, efficient slot." },
  { q: "Where do the shoots happen?", a: "In a studio in the Stuttgart area, or on location at your office anywhere across EMEA. Travel beyond the region is quoted per project." },
  { q: "How many images do I receive?", a: "You receive the retouched selects listed in each package. Additional final images can always be added afterwards." },
  { q: "How soon are the photos delivered?", a: "A gallery of proofs follows within a few days; final retouched images are typically delivered within one week." },
  { q: "Can you photograph a whole team?", a: "Yes — the Team / On-Location package delivers matched individual headshots plus group options, all consistent in style and colour." }
];

const TESTIMONIALS = [
  { quote: "Add a short client testimonial here.", name: "Client name", role: "Title, Company" },
  { quote: "Add a second client testimonial here.", name: "Client name", role: "Title, Company" }
];

export function BusinessPortraits() {
  return (
    <div className="bg-bone text-ink">
      {/* HERO */}
      <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 pb-16 pt-28 md:px-14 md:py-0">
          <Eyebrow>Business Portraits · EMEA</Eyebrow>
          <h1 className="mt-5 text-5xl font-light leading-[1.02] tracking-tight md:text-7xl">
            Portraits that
            <br />
            open doors.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/60">
            Executive headshots and personal-brand portraits that make the right first
            impression — shot in studio or on location across EMEA.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <CTA href="/#about">Request a session</CTA>
            <a href="#pricing" className="text-sm font-semibold uppercase tracking-wideTesla text-ink/60 transition hover:text-ink">
              See packages
            </a>
          </div>
        </div>
        <div className="relative min-h-[60vh] md:min-h-screen">
          <Image
            src={`${base}/exec-portrait-charcoal-grey.jpg`}
            alt="Business portrait of a professional against a light grey backdrop"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* INTRO */}
      <Section>
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-2xl font-light leading-snug md:text-4xl">
            A portrait is the first handshake you never get to give in person. It should look
            like you on your best, most confident day — and do that work every time your name
            appears.
          </p>
        </Reveal>
      </Section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-ink/10 px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-14 text-center">
              <Eyebrow center>Packages</Eyebrow>
              <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
                Which session fits your need?
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {PACKAGES.map((p) => (
              <Reveal key={p.name}>
                <article className="flex h-full flex-col">
                  <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-normal">{p.name}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wideTesla text-signal">
                    {p.price}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink/60">{p.copy}</p>
                  <p className="mt-4 border-t border-ink/10 pt-4 text-[12px] uppercase tracking-wide text-ink/45">
                    {p.includes}
                  </p>
                  <div className="mt-6">
                    <CTA href="/#about" small>
                      Enquire
                    </CTA>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 text-center text-xs text-ink/40">
              Prices shown are indicative starting points. Every project is quoted to your exact
              brief.
            </p>
          </Reveal>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="border-t border-ink/10 px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="mb-14 max-w-2xl text-3xl font-light tracking-tight md:text-5xl">
              Your first impression decides.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {VALUES.map((v) => (
              <Reveal key={v.title}>
                <div>
                  <h3 className="text-lg font-medium">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{v.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="border-t border-ink/10 px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-12">
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">Recent portraits</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {GALLERY.map((g) => (
              <Reveal key={g.img}>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/[0.04]">
                  <Image
                    src={g.img}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-expo hover:scale-[1.04]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="border-t border-ink/10 px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={`${base}/creative-mono-executive.jpg`}
                alt="Black and white executive portrait"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal>
            <div>
              <Eyebrow>Approach</Eyebrow>
              <h2 className="mt-4 text-3xl font-light leading-tight tracking-tight md:text-5xl">
                Presence, not performance.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink/60">
                The best business portrait doesn’t look posed — it looks like you, caught mid-thought,
                at ease. My job is to build that ease quickly, read the light, and make the technical
                side invisible so all that remains is a genuine, confident presence.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink/60">
                Whether it’s one founder or a hundred-person team, the standard is the same: clean,
                consistent, and unmistakably professional.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-ink/10 px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-14">
              <Eyebrow>Process</Eyebrow>
              <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
                How your shoot runs.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
            {STEPS.map((s) => (
              <Reveal key={s.n}>
                <div>
                  <p className="text-sm font-semibold text-signal">{s.n}</p>
                  <h3 className="mt-3 text-lg font-medium">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (template — replace with real quotes) */}
      <section className="border-t border-ink/10 px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i}>
                <figure>
                  <blockquote className="text-xl font-light leading-relaxed md:text-2xl">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-ink/50">
                    <span className="font-medium text-ink">{t.name}</span> — {t.role}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink/10 px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-12 text-center">
              <Eyebrow center>FAQ</Eyebrow>
              <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">Good to know</h2>
            </div>
          </Reveal>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="border-t border-ink/10 px-6 py-24 md:px-14 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow center>Let’s work together</Eyebrow>
          <h2 className="mt-5 text-4xl font-light leading-tight tracking-tight md:text-6xl">
            Ready for portraits that work as hard as you do?
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/60">
            Tell me about you or your team and how the images will be used, and I’ll send options and
            availability.
          </p>
          <div className="mt-9">
            <CTA href="/#about">Start a conversation</CTA>
          </div>
          <Link href="/non-auto-portfolio" className="mt-8 text-sm font-semibold uppercase tracking-wideTesla text-ink/50 transition hover:text-ink">
            ← Back to portfolio
          </Link>
        </div>
      </section>
    </div>
  );
}

function Eyebrow({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-wideTesla text-ink/50 ${center ? "text-center" : ""}`}>
      {children}
    </p>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-ink/10 px-6 py-20 md:px-14 md:py-28">
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function CTA({ href, children, small }: { href: string; children: ReactNode; small?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center bg-ink font-semibold uppercase tracking-wideTesla text-bone transition-colors duration-300 hover:bg-signal ${
        small ? "px-5 py-2.5 text-[11px]" : "px-7 py-3.5 text-xs"
      }`}
    >
      {children}
    </a>
  );
}

function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-base font-medium md:text-lg">{q}</span>
        <span className="shrink-0 text-ink/60">{open ? <Minus size={18} /> : <Plus size={18} />}</span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 pr-10 text-sm leading-relaxed text-ink/60">{a}</p>
      </motion.div>
    </div>
  );
}
