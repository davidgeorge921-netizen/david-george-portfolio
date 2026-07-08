import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://davidgeorgephotography.com"),
  title: {
    default: "David George | Automotive & Commercial Photographer",
    template: "%s | David George"
  },
  description:
    "Automotive, commercial, and campaign photography — dynamic vehicle capture, reflective-surface product detail, retouching, and RAW colour workflows, from creative brief to final delivery.",
  keywords: [
    "automotive photographer",
    "commercial photographer",
    "motorsport photography",
    "product photography",
    "Aston Martin photography",
    "automotive retouching",
    "Capture One Lightroom Photoshop"
  ],
  openGraph: {
    title: "David George | Automotive & Commercial Photographer",
    description:
      "Automotive, commercial, and campaign photography — dynamic vehicle capture, product detail, retouching, and RAW colour workflows.",
    url: "https://davidgeorgephotography.com",
    siteName: "David George Photography",
    images: ["/images/aston-martin/IMG_3280.jpg"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "David George | Automotive & Commercial Photographer",
    description: "Automotive, commercial, and campaign photography.",
    images: ["/images/aston-martin/IMG_3280.jpg"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
