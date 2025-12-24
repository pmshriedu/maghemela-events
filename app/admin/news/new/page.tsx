import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NewsForm } from "@/components/admin/news-form";

export default async function NewNewsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create News Article</h1>
        <p className="text-muted-foreground">
          Add a new news article to your website
        </p>
      </div>

      <NewsForm />
    </div>
  );
}
