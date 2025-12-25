import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export async function NewsPreview() {
  let news = [];
  try {
    news = await prisma.news.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch news:", error);
    // Return empty array, so the section renders but without news
  }

  if (news.length === 0) {
    return null; // Or return a message, but for now, hide the section
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">Latest News</h2>
            <p className="text-xl text-muted-foreground">
              Stay updated with our latest announcements
            </p>
          </div>
          <Link href="/news">
            <Button variant="outline" className="hidden md:flex bg-transparent">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  {item.eventDate
                    ? format(new Date(item.eventDate), "MMM d, yyyy")
                    : format(new Date(item.createdAt), "MMM d, yyyy")}
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/news">
            <Button variant="outline">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
