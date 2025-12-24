import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { DesktopDock } from "@/components/navigation/desktop-dock"
import { MobileNav } from "@/components/navigation/mobile-nav"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await prisma.blog.findUnique({
    where: { slug },
  })

  if (!blog) {
    notFound()
  }

  return (
    <>
      <main className="min-h-screen bg-background pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-12">
          <Link href="/blogs">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="text-muted-foreground mb-4">{format(new Date(blog.createdAt), "MMMM d, yyyy")}</div>
              <h1 className="text-5xl font-bold mb-6 text-balance">{blog.title}</h1>
            </div>

            {blog.coverImage && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                <Image src={blog.coverImage || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed text-foreground">{blog.content}</p>
            </div>
          </article>
        </div>
      </main>
      <DesktopDock />
      <MobileNav />
    </>
  )
}
