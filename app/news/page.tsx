import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { DesktopDock } from "@/components/navigation/desktop-dock"
import { MobileNav } from "@/components/navigation/mobile-nav"

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  })

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

          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 text-balance">Latest News</h1>
            <p className="text-xl text-muted-foreground">Stay updated with our latest announcements and events</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {news.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    {item.eventDate
                      ? format(new Date(item.eventDate), "MMMM d, yyyy")
                      : format(new Date(item.createdAt), "MMMM d, yyyy")}
                  </div>
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {news.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No news yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <DesktopDock />
      <MobileNav />
    </>
  )
}
