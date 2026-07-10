import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice (Impressum) for David George Photography."
};

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-bone px-6 py-32 text-ink md:px-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-light tracking-tight md:text-4xl">Legal Notice</h1>
        <p className="mt-2 text-sm text-ink/50">Information pursuant to § 5 TMG</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-ink/70">
          <section>
            <p className="font-medium text-ink">David George</p>
            <p>[Street and number]</p>
            <p>[Postcode] Stuttgart, Germany</p>
          </section>

          <section>
            <p className="font-medium text-ink">Contact</p>
            <p>Phone: +49 163 516051</p>
            <p>Email: davidgeorge921@gmail.com</p>
          </section>

          <section>
            <p className="font-medium text-ink">Responsible for content pursuant to § 55 (2) RStV</p>
            <p>David George, address as above.</p>
          </section>

          <p className="border-t border-ink/10 pt-8 text-xs text-ink/40">
            Please complete the bracketed fields with your registered address before publishing. A
            legal notice (Impressum) is legally required for business websites in Germany.
          </p>
        </div>

        <a href="/" className="mt-14 inline-block text-sm font-semibold uppercase tracking-wideTesla text-ink/60 transition hover:text-ink">
          ← Back to home
        </a>
      </div>
    </main>
  );
}
