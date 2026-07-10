import type { Metadata } from "next";
import { AboutJourney } from "@/components/about-journey";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind David George — automotive and commercial photographer. A short, visual journey from a first DSLR to brand campaigns in Oman.",
  openGraph: {
    title: "About | David George",
    description:
      "A short, visual journey from a first DSLR to brand campaigns — how David George works and what he looks for in a frame.",
    images: ["/images/david-george-portrait.jpg"],
    type: "profile"
  }
};

export default function AboutPage() {
  return <AboutJourney />;
}
