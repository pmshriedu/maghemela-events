import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";
import { DesktopDock } from "@/components/navigation/desktop-dock";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { GoBackButton } from "@/components/ui/go-back-button";

export const metadata: Metadata = {
  title: "Page Not Found - Maghey Sankranti Mela 2026",
  description:
    "The page you're looking for doesn't exist. Return to the Maghey Sankranti Mela 2026 homepage to explore Sikkim's grandest cultural festival.",
};

export default function NotFoundPage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-background dark:via-background dark:to-muted flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 md:py-16 w-full">
          <div className="flex flex-col items-center justify-center text-center">
            {/* 404 Illustration */}
            <div className="relative mb-8">
              <div className="text-8xl md:text-9xl font-bold text-amber-500/20 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <Search className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/80 dark:bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-cinzel">
                  Page Not Found
                </h1>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  The page you're looking for seems to have wandered off into
                  the mountains of Sikkim. Don't worry, our cultural festival is
                  still happening strong!
                </p>

                <p className="text-base text-muted-foreground mb-8">
                  Perhaps you mistyped the URL or the page has been moved. Let's
                  get you back to celebrating the rich heritage of Maghey
                  Sankranti Mela 2026.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Home className="mr-2 h-5 w-5" />
                      Back to Home
                    </Button>
                  </Link>

                  <GoBackButton />
                </div>

                {/* Cultural Touch */}
                <div className="mt-8 pt-8 border-t border-amber-200/50 dark:border-amber-800/50 text-center">
                  <p className="text-sm text-muted-foreground italic">
                    "Just like our festival traditions that have endured for 71
                    years, some paths may change, but the celebration
                    continues."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Navigation */}
      <DesktopDock />
      <MobileNav />
    </>
  );
}
