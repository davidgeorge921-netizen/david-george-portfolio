import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://automotive-portfolio.local"),
  title: {
    default: "David George | Automotive Photographer for Tesla EMEA Berlin",
    template: "%s | David George"
  },
  description:
    "Automotive photography portfolio for Tesla Photographer EMEA Berlin, showing campaign, editorial, social, BMW India EV campaign film support, BTS video, CEO headshots, fashion editorial, retouching, RAW workflow, asset management, and production-house experience.",
  keywords: [
    "automotive photographer",
    "Tesla Berlin photographer",
    "motorsport photography",
    "commercial automotive photography",
    "Aston Martin photography",
    "Tesla Photographer EMEA Berlin",
    "automotive retouching",
    "BMW India EV campaign film",
    "CEO headshots",
    "fashion editorial photography",
    "BTS video",
    "Capture One Lightroom Photoshop"
  ],
  openGraph: {
    title: "David George | Automotive Photographer for Tesla EMEA Berlin",
    description: "Campaign imagery, dynamic automotive capture, BMW India EV campaign film support, BTS video, CEO headshots, fashion editorial, retouching, RAW workflow, and production-house experience.",
    images: ["/images/aston-martin/IMG_3268.jpg"],
    type: "website"
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
      </body>
    </html>
  );
}
