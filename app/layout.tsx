import type React from "react";
import type { Metadata } from "next";
import {
  Inter,
  Dancing_Script,
  Playfair_Display,
  Cinzel,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProviderWrapper } from "@/components/providers/session-provider";
import { VisitorProvider } from "@/components/providers/visitor-provider";
import { VisitorTrackingWrapper } from "@/components/ui/visitor-tracking-popup";
import { HowToReachPopup } from "@/components/ui/how-to-reach-popup";
import FloatingMusicPlayer from "@/components/floating-music-player";

// Main body font - clean and readable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Cursive font for special headings
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

// Elegant serif font for hero titles
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// Royal/heritage font for special occasions
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: {
    default: "Maghey Sankranti Mela 2026 - Sikkim's Grandest Cultural Festival",
    template: "%s | Maghey Sankranti Mela 2026",
  },
  description:
    "Experience the 71-year legacy of Maghey Sankranti Mela at Jorethang Nayabazar, Sikkim. Join thousands for cultural performances, adventure activities, holy dips, and festivities celebrating Sikkim's rich heritage from January 14-22, 2026.",
  keywords: [
    "Maghey Sankranti Mela",
    "Jorethang Nayabazar",
    "Sikkim festival",
    "Makar Sankranti",
    "cultural festival",
    "Sikkim tourism",
    "adventure activities",
    "river rafting",
    "paragliding",
    "traditional arts",
    "handicrafts",
    "food festival",
    "religious celebration",
    "holy dip",
    "Rangeet river",
    "Namchi district",
  ],
  authors: [{ name: "Maghey Sankranti Mela Celebration Committee" }],
  creator: "Maghey Sankranti Mela Celebration Committee",
  publisher: "Maghey Sankranti Mela 2026",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://magheymela.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maghey Sankranti Mela 2026 - Sikkim's Grandest Cultural Festival",
    description:
      "Experience 71 years of cultural heritage at Jorethang Nayabazar, Sikkim. Join thousands for cultural performances, adventure activities, and traditional celebrations from January 14-22, 2026.",
    url: "https://magheymela.com",
    siteName: "Maghey Sankranti Mela 2026",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maghey Sankranti Mela 2026 - Cultural Festival at Jorethang Nayabazar, Sikkim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maghey Sankranti Mela 2026 - Sikkim's Grandest Cultural Festival",
    description:
      "Experience 71 years of cultural heritage at Jorethang Nayabazar, Sikkim. Join thousands for cultural performances and traditional celebrations.",
    images: ["/og-image.jpg"],
    creator: "@MagheyMela",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "culture",
  classification: "Cultural Festival",
  generator: "Next.js 14",
  applicationName: "Maghey Sankranti Mela 2026",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      {
        url: "/favicons/favicon-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicons/favicon-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicons/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f59e0b" },
    { media: "(prefers-color-scheme: dark)", color: "#d97706" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Maghey Sankranti Mela 2026",
              description:
                "Sikkim's grandest cultural festival celebrating 71 years of heritage, tradition, and unity at the sacred confluence of Rangeet and Rammam rivers.",
              startDate: "2026-01-14",
              endDate: "2026-01-21",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Jorethang Nayabazar",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Jorethang Nayabazar",
                  addressLocality: "Namchi District",
                  addressRegion: "Sikkim",
                  postalCode: "737121",
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: "27.0844",
                  longitude: "88.4949",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "Maghey Sankranti Mela Celebration Committee",
                url: "https://magheymela.com",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
              },
              image: ["https://magheymela.com/og-image.jpg"],
              url: "https://magheymela.com",
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${dancingScript.variable} ${playfairDisplay.variable} ${cinzel.variable} font-sans antialiased`}
      >
        <SessionProviderWrapper>
          <VisitorProvider>
            {children}
            <Toaster />
            <HowToReachPopup />
            <VisitorTrackingWrapper />
            <FloatingMusicPlayer />
          </VisitorProvider>
        </SessionProviderWrapper>
        <Analytics />
      </body>
    </html>
  );
}
