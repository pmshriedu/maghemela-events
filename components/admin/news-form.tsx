"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { News } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { format } from "date-fns"

const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  eventDate: z.string().optional(),
})

type NewsFormValues = z.infer<typeof newsSchema>

export function NewsForm({ news }: { news?: News }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: news
      ? {
          title: news.title,
          content: news.content,
          eventDate: news.eventDate ? format(new Date(news.eventDate), "yyyy-MM-dd") : "",
        }
      : undefined,
  })

  const onSubmit = async (data: NewsFormValues) => {
    setIsLoading(true)
    try {
      const url = news ? `/api/admin/news/${news.id}` : "/api/admin/news"
      const method = news ? "PUT" : "POST"

      const payload = {
        ...data,
        eventDate: data.eventDate ? new Date(data.eventDate).toISOString() : null,
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to save news")

      toast({
        title: "Success",
        description: news ? "News updated successfully" : "News created successfully",
      })

      router.push("/admin/news")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save news",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} placeholder="Enter news title" />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDate">Event Date (Optional)</Label>
            <Input id="eventDate" type="date" {...register("eventDate")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" {...register("content")} placeholder="Write your news content here..." rows={12} />
            {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {news ? "Update News" : "Create News"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
