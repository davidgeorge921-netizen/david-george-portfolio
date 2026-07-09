import type { Metadata } from "next";
import { NonAutoGallery } from "@/components/non-auto-gallery";

export const metadata: Metadata = {
  title: "Portraiture, Editorial & Commercial | David George",
  description:
    "Non-automotive work by David George: executive & brand portraiture, fashion editorial, creative portraits, food & beverage and lifestyle photography across EMEA.",
  openGraph: {
    title: "Portraiture, Editorial & Commercial | David George",
    description:
      "Executive portraiture, fashion editorial, food & beverage and lifestyle photography by David George.",
    images: ["/images/non-auto/editorial-tartan-gaze.jpg"]
  }
};

export default function NonAutoPortfolio() {
  return (
    <main className="min-h-screen bg-ink text-bone">
      <NonAutoGallery />
    </main>
  );
}
