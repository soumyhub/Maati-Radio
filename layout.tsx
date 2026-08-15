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
  title: "Maati Radio — Rajasthan · 94.7 FM",
  description:
    "An old radio, still broadcasting from Rajasthan. Folk music, desert wind, and courtyard memory — tune in.",

  openGraph: {
    title: "Maati Radio — Rajasthan · 94.7 FM",
    description:
      "An old radio, still broadcasting from Rajasthan. Folk music, desert wind, and courtyard memory — tune in.",
    type: "website",
    siteName: "Maati Radio",
  },

  twitter: {
    card: "summary",
    title: "Maati Radio — Rajasthan · 94.7 FM",
    description:
      "An old radio, still broadcasting from Rajasthan. Folk music, desert wind, and courtyard memory — tune in.",
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
