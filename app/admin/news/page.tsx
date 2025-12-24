import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NewsTable } from "@/components/admin/news-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Newspaper, TrendingUp, Calendar } from "lucide-react";

export default async function AdminNewsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const [news, newsStats] = await Promise.all([
    prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    {
      total: await prisma.news.count(),
      thisMonth: await prisma.news.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      upcoming: await prisma.news.count({
        where: {
          eventDate: {
            gte: new Date(),
          },
        },
      }),
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            News Management
          </h1>
          <p className="text-gray-600 mt-2">
            Create and manage news announcements and event updates
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Link href="/admin/news/new">
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Create News Article
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Total Articles
            </CardTitle>
            <Newspaper className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {newsStats.total}
            </div>
            <p className="text-xs text-green-700">All published articles</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              This Month
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {newsStats.thisMonth}
            </div>
            <p className="text-xs text-blue-700">Published this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">
              {newsStats.upcoming}
            </div>
            <p className="text-xs text-amber-700">Future dated events</p>
          </CardContent>
        </Card>
      </div>

      {/* News Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All News Articles</span>
            <Badge variant="secondary" className="ml-2">
              {news.length} total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NewsTable news={news} />
        </CardContent>
      </Card>
    </div>
  );
}
