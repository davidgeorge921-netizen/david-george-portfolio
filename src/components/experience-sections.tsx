import { CheckAvailability } from "@/components/check-availability";
import { Reveal } from "@/components/reveal";

const eyebrow = "text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45";
const heading = "mt-4 max-w-2xl text-2xl font-semibold leading-tight md:text-4xl";
const muted = "text-white/62 light:text-black/62";

/* ---------------------------------------------------------------------------
   SELECTED WORK — understated trust. Real experience, no implied employment.
--------------------------------------------------------------------------- */

const COLLABORATIONS = ["BMW", "Aston Martin", "Ferrari", "Haval", "Red Bull Motorsport"];

export function SelectedWork() {
  return (
    <section className="border-t border-white/10 bg-ink px-5 py-24 text-bone light:border-black/10 light:bg-bone light:text-ink md:px-10 md:py-28">
      <div className="mx-auto max-w-[1800px]">
        <Reveal>
          <p className={eyebrow}>Selected Work</p>
          <h2 className={heading}>Projects &amp; collaborations</h2>
          <p className={`mt-5 max-w-xl text-sm leading-7 ${muted}`}>
            A selection of the brands and productions I&apos;ve contributed to across automotive and
            commercial work.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-3 lg:grid-cols-5 light:border-black/10">
            {COLLABORATIONS.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold uppercase tracking-wideTesla text-white/70 light:text-black/70"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   PROCESS — four quiet steps.
--------------------------------------------------------------------------- */

const STEPS = [
  { n: "01", copy: "Tell me about your project." },
  { n: "02", copy: "We plan the shoot together." },
  { n: "03", copy: "Photography and careful editing." },
  { n: "04", copy: "Your final gallery is delivered." }
];

export function ProcessSection() {
  return (
    <section className="border-t border-white/10 bg-ink px-5 py-24 text-bone light:border-black/10 light:bg-bone light:text-ink md:px-10 md:py-28">
      <div className="mx-auto max-w-[1800px]">
        <Reveal>
          <p className={eyebrow}>Process</p>
          <h2 className={heading}>Working together</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4 light:border-black/10">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <p className="text-sm font-semibold text-white/40 light:text-black/40">{s.n}</p>
              <p className="mt-3 text-lg leading-7 text-white/80 light:text-black/80">{s.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   PRICING — expectation-setting only. Prices are PLACEHOLDERS.
--------------------------------------------------------------------------- */

const TIERS = [
  { name: "Portrait Sessions", price: "From €250" },
  { name: "Family Sessions", price: "From €350" },
  { name: "Commercial Projects", price: "Custom quote" }
];

export function Pricing() {
  return (
    <section className="border-t border-white/10 bg-ink px-5 py-24 text-bone light:border-black/10 light:bg-bone light:text-ink md:px-10 md:py-28">
      <div className="mx-auto max-w-[1800px]">
        <Reveal>
          <p className={eyebrow}>Sessions</p>
          <h2 className={heading}>Where things start</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-3 light:border-black/10">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <p className={eyebrow}>{t.name}</p>
              <p className="mt-3 text-2xl font-light md:text-3xl">{t.price}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-14">
            <CheckAvailability />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
