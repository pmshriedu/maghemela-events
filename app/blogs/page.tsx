import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { DesktopDock } from "@/components/navigation/desktop-dock";
import { MobileNav } from "@/components/navigation/mobile-nav";

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

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
            <h1 className="text-5xl font-bold mb-4 text-balance">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Stories, insights, and reflections from our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full p-0">
                  {blog.coverImage && (
                    <div className="relative aspect-video">
                      <Image
                        src={blog.coverImage || "/placeholder.svg"}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">
                      {format(new Date(blog.createdAt), "MMMM d, yyyy")}
                    </div>
                    <h2 className="text-2xl font-bold mb-3 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                      {blog.content.substring(0, 200)}...
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {blogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
      <DesktopDock />
      <MobileNav />
    </>
  );
}
