import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Yatra_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const yatraOne = Yatra_One({
  subsets: ["devanagari", "latin"],
  variable: "--font-yatra",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maati-radio.vercel.app"),

  title: "Maati Radio — Rajasthan · 94.7 FM",

  description:
    "A little piece of Rajasthan on the internet — folk music, desert evenings, old radios, and memories of home.",

  openGraph: {
    title: "Maati Radio — Rajasthan · 94.7 FM",
    description:
      "A little piece of Rajasthan on the internet — folk music, desert evenings, old radios, and memories of home.",
    url: "https://maati-radio.vercel.app",
    siteName: "Maati Radio",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 627,
        alt: "Maati Radio — Rajasthan Folk Music",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Maati Radio — Rajasthan · 94.7 FM",
    description:
      "A little piece of Rajasthan on the internet — folk music, desert evenings, old radios, and memories of home.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#241811",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexMono.variable} ${yatraOne.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
