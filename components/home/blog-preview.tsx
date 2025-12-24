import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

export async function BlogPreview() {
  let blogs = [];
  try {
    blogs = await prisma.blog.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    // Return empty array, so the section renders but without blogs
  }

  if (blogs.length === 0) {
    return null; // Or return a message, but for now, hide the section
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              From Our Blog
            </h2>
            <p className="text-xl text-muted-foreground">
              Stories, insights, and reflections
            </p>
          </div>
          <Link href="/blogs">
            <Button variant="outline" className="hidden md:flex bg-transparent">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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
                    {format(new Date(blog.createdAt), "MMM d, yyyy")}
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                    {blog.content.substring(0, 150)}...
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/blogs">
            <Button variant="outline">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
