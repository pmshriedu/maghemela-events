import { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Legacy } from "@/components/home/legacy";
import { Highlights } from "@/components/home/highlights";
import { Banner } from "@/components/home/banner";
import { OurLegacy } from "@/components/home/our-legacy";
import { Gallery } from "@/components/home/gallery";
import { HomestayPreview } from "@/components/home/homestay-preview";
import { Videos } from "@/components/home/videos";
import { Reels } from "@/components/home/reels";
import { NewsPreview } from "@/components/home/news-preview";
import { BlogPreview } from "@/components/home/blog-preview";
import { ReviewsSection } from "@/components/home/reviews";
import { Footer } from "@/components/home/footer";
import { DesktopDock } from "@/components/navigation/desktop-dock";
import { MobileNav } from "@/components/navigation/mobile-nav";

export const metadata: Metadata = {
  title: "Home - Welcome to Maghey Sankranti Mela 2026",
  description:
    "Welcome to the official website of Maghey Sankranti Mela 2026, Sikkim's grandest cultural festival at Jorethang Nayabazar. Experience 71 years of tradition, cultural heritage, adventure activities, and spiritual celebrations from January 14-21, 2026.",
  keywords: [
    "home page",
    "welcome",
    "Maghey Sankranti Mela 2026",
    "festival home",
    "Sikkim cultural festival",
    "January 2026 events",
    "Jorethang celebration",
  ],
  openGraph: {
    title:
      "Welcome to Maghey Sankranti Mela 2026 - Sikkim's Grandest Cultural Festival",
    description:
      "Discover the magic of 71 years of tradition at Jorethang Nayabazar, Sikkim. Join us for cultural performances, adventure activities, and spiritual celebrations.",
    url: "/",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Maghey Sankranti Mela 2026 Homepage - Cultural Festival Celebration",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen pb-20 md:pb-0">
        <Hero />
        <Highlights />
        <Banner />
        <Legacy />

        <Gallery />
        <HomestayPreview />
        <Videos />
        <Reels />
        <NewsPreview />
        <BlogPreview />
        <ReviewsSection />
        <Footer />
      </main>
      <DesktopDock />
      <MobileNav />
    </>
  );
}
