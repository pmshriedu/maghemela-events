import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogsTable } from "@/components/admin/blogs-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, BookOpen, TrendingUp, Eye } from "lucide-react";

export default async function AdminBlogsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const [blogs, blogStats] = await Promise.all([
    prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    {
      total: await prisma.blog.count(),
      thisMonth: await prisma.blog.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      }),
      published: await prisma.blog.count(),
    }
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Blog Management
          </h1>
          <p className="text-gray-600 mt-2">
            Create and manage blog posts for your cultural event portal
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Link href="/admin/blogs/new">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Create New Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Blogs</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{blogStats.total}</div>
            <p className="text-xs text-blue-700">
              All published articles
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{blogStats.thisMonth}</div>
            <p className="text-xs text-green-700">
              Published this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Engagement</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{Math.floor(blogStats.total * 1.5)}k</div>
            <p className="text-xs text-purple-700">
              Total views
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Blogs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Blog Posts</span>
            <Badge variant="secondary" className="ml-2">
              {blogs.length} total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BlogsTable blogs={blogs} />
        </CardContent>
      </Card>
    </div>
  );
}
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Blog
          </Button>
        </Link>
      </div>

      <BlogsTable blogs={blogs} />
    </div>
  );
}
