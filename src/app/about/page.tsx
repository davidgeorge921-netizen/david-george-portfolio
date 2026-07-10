import type { Metadata } from "next";
import { AboutJourney } from "@/components/about-journey";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind David George, automotive and commercial photographer. How a Nikon D5100 from his father, years of weddings and events, and a moment that changed everything shaped the way he photographs people today.",
  openGraph: {
    title: "About | David George",
    description:
      "How a first camera, years of real jobs, and a moment that changed everything shaped the way David George photographs people today.",
    images: ["/images/about/portrait.jpg"],
    type: "profile"
  }
};

export default function AboutPage() {
  return <AboutJourney />;
}
