import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";

export default async function NewBlogPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Blog</h1>
        <p className="text-muted-foreground">
          Add a new blog post to your website
        </p>
      </div>

      <BlogForm />
    </div>
  );
}
