import type { Metadata } from "next";
import { BusinessPortraits } from "@/components/business-portraits";

export const metadata: Metadata = {
  title: "Business Portraits — Stuttgart & EMEA",
  description:
    "Executive headshots and personal-brand portraits by David George — studio or on location across EMEA. Individual, executive and team sessions.",
  openGraph: {
    title: "Business Portraits — Stuttgart & EMEA | David George",
    description:
      "Executive headshots and personal-brand portraits — studio or on location across EMEA.",
    images: ["/images/non-auto/exec-portrait-charcoal-grey.jpg"]
  }
};

export default function BusinessPortraitsPage() {
  return <BusinessPortraits />;
}
