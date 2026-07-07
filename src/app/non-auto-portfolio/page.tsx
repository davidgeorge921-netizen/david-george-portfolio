import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Non-Auto Portfolio"
};

export default function NonAutoPortfolio() {
  return (
    <section className="min-h-screen bg-ink px-5 pb-20 pt-28 text-bone light:bg-bone light:text-ink md:px-10 md:pt-32">
      <div className="mx-auto max-w-[550px]">
        <iframe
          src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7474964692898226176"
          title="Behind the scenes — David George"
          className="h-[640px] w-full border border-white/10 bg-white sm:h-[720px] light:border-black/10"
          allowFullScreen
        />
      </div>
    </section>
  );
}
