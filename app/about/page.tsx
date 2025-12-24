import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DesktopDock } from "@/components/navigation/desktop-dock";
import { MobileNav } from "@/components/navigation/mobile-nav";

export const metadata: Metadata = {
  title: "About - History & Heritage of Maghey Sankranti Mela",
  description:
    "Discover the rich 71-year history of Maghey Sankranti Mela from its humble beginnings in 1955 to becoming Sikkim's grandest cultural festival. Learn about our mission, heritage, and commitment to preserving Sikkimese culture at Jorethang Nayabazar.",
  keywords: [
    "about Maghey Sankranti Mela",
    "festival history",
    "71 years heritage",
    "Sikkim cultural tradition",
    "Jorethang history",
    "festival evolution",
    "community celebration",
    "cultural preservation",
  ],
  openGraph: {
    title: "About Maghey Sankranti Mela - 71 Years of Cultural Heritage",
    description:
      "Discover the remarkable journey of Sikkim's grandest cultural festival from 1955 to 2026, celebrating traditions and bringing communities together.",
    url: "/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Maghey Sankranti Mela - Historical and Cultural Heritage",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-background pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-12">
          <Link href="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-balance">
              About Maghey Sankranti Mela 2026
            </h1>

            <div className="text-center mb-8">
              <p className="text-xl text-amber-600 font-semibold">
                Jorethang Nayabazar, Namchi District Sikkim, 737121
              </p>
              <p className="text-lg text-gray-600 mt-2">
                A Celebration of Culture, Heritage & Unity
              </p>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
              <Image
                src="/assets/about/about.JPEG"
                alt="Maghey Sankranti Mela - Sacred confluence of Rangeet and Rammam rivers"
                fill
                className="object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none space-y-8 text-foreground">
              <div className="bg-linear-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-l-4 border-amber-500">
                <h2 className="text-2xl font-bold text-amber-800 mb-4">
                  Welcome to Sikkim's Grandest Cultural Festival
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  The Maghey Sankranti Mela is one of Sikkim's most cherished
                  cultural celebrations, held annually in the picturesque town
                  of Jorethang Nayabazar. This vibrant festival brings together
                  tradition, spirituality, and modern festivities in a
                  spectacular showcase of Sikkimese heritage, attracting
                  thousands of visitors from across India and around the globe.
                </p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">
                Historical Origins
              </h2>
              <h3 className="text-xl font-semibold text-amber-700 mb-4">
                From Humble Beginnings to Grand Celebration
              </h3>

              <p className="leading-relaxed mb-6">
                The Maghey Sankranti Mela traces its roots to{" "}
                <strong>1955</strong>, when it began as a modest agricultural
                fair held on the auspicious occasion of Makar Sankranti. The
                story begins with devotees gathering at the sacred confluence of
                the Rangeet and Rammam rivers to take holy dips in the pristine
                waters. Local farmers from neighboring towns including
                Kalimpong, Siliguri, and Darjeeling would bring their
                agricultural produce, handicrafts, and handloom products to
                sell.
              </p>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="text-lg font-semibold mb-4 text-blue-800">
                  Evolution Through the Decades:
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>1955:</strong> First agricultural fair organized at
                    Jorethang
                  </li>
                  <li>
                    <strong>1961:</strong> Formal organization with volunteers
                    mobilizing local participation
                  </li>
                  <li>
                    <strong>1970s-1980s:</strong> Expansion to include cultural
                    programs and sports events
                  </li>
                  <li>
                    <strong>1990s-2000s:</strong> Integration of adventure
                    activities and tourism promotion
                  </li>
                  <li>
                    <strong>2010s-Present:</strong> State-level festival
                    featuring international participation
                  </li>
                </ul>
              </div>

              <p className="leading-relaxed">
                What started as a small gathering has evolved into a grand three
                to eight-day festival that celebrates not only agricultural
                traditions but also the rich cultural tapestry of Sikkim, while
                retaining its spiritual essence and old-world charm.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">
                The Significance of Maghey Sankranti
              </h2>
              <h3 className="text-xl font-semibold text-amber-700 mb-4">
                A Festival of Light, Harvest & New Beginnings
              </h3>

              <p className="leading-relaxed mb-6">
                Maghey Sankranti, known as Makar Sankranti across India, is a
                Hindu festival celebrated on January 14th (or 15th during leap
                years) each year. This solar festival marks a significant
                astronomical event and holds deep spiritual meaning.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-3 text-green-800 flex items-center">
                    <span className="mr-2">🌞</span> Astronomical Significance
                  </h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>
                      • Marks the Sun's transition from Sagittarius (Dhanu) to
                      Capricorn (Makara)
                    </li>
                    <li>
                      • Signals the beginning of Uttarayana – the Sun's
                      northward journey
                    </li>
                    <li>
                      • Represents the end of winter and the onset of longer,
                      warmer days
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-3 text-purple-800 flex items-center">
                    <span className="mr-2">🙏</span> Spiritual Importance
                  </h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>
                      • Dedicated to Surya (the Sun God), symbolizing light,
                      energy, and life
                    </li>
                    <li>
                      • Considered an auspicious time marking the end of
                      inauspicious phases
                    </li>
                    <li>
                      • Symbolizes the triumph of light over darkness and good
                      over evil
                    </li>
                  </ul>
                </div>
              </div>
              <ul className="space-y-2 leading-relaxed list-disc list-inside">
                <li>Traditional and contemporary cultural performances</li>
                <li>Authentic culinary experiences from master chefs</li>
                <li>Art exhibitions and craft demonstrations</li>
                <li>Educational workshops and cultural seminars</li>
                <li>Sports competitions and traditional games</li>
                <li>Family-friendly activities and entertainment</li>
              </ul>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 mt-12">
                <h2 className="text-2xl font-bold mb-4">Join Us</h2>
                <p className="leading-relaxed mb-4">
                  Be part of our continuing legacy. Whether you're interested in
                  performing, volunteering, or simply attending, we welcome you
                  to experience the richness of cultural celebration.
                </p>
                <Link href="/news">
                  <Button size="lg">View Upcoming Events</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DesktopDock />
      <MobileNav />
    </>
  );
}
