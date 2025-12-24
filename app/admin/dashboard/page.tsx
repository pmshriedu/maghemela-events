"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  Newspaper,
  Users,
  Eye,
  TrendingUp,
  Globe,
  Activity,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

interface DashboardData {
  blogCount: number;
  newsCount: number;
  visitorCount: number;
  recentBlogs: Array<{ title: string; createdAt: string }>;
  recentNews: Array<{ title: string; createdAt: string }>;
  recentVisitors: Array<{
    name: string | null;
    email: string | null;
    location: string | null;
    timestamp: string;
  }>;
  topSources: Array<{ source: string; count: number }>;
  todayVisitors: number;
  weeklyVisitors: number;
  totalPageViews: number;
  visitorsByDay: Array<{ date: string; count: number }>;
  topLocations: Array<{ location: string; count: number }>;
  topPurposes: Array<{ purpose: string; count: number }>;
}

const CHART_COLORS = [
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#8b5cf6",
  "#f97316",
];

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) {
      redirect("/admin/login");
      return;
    }
    fetchDashboardData();
  }, [session, status]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/dashboard");
      const dashboardData = await response.json();
      setData(dashboardData);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="space-y-8 p-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="p-6 text-center">Failed to load dashboard data</div>;
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {session?.user?.email}. Here&apos;s what&apos;s
            happening with your cultural event portal.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDashboardData}
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-amber-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <BookOpen className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.blogCount}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              {
                (data.recentBlogs || []).filter((blog) => {
                  const blogDate = new Date(blog.createdAt);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return blogDate >= weekAgo;
                }).length
              }{" "}
              this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">News Articles</CardTitle>
            <Newspaper className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.newsCount}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              {
                (data.recentNews || []).filter((news) => {
                  const newsDate = new Date(news.createdAt);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return newsDate >= weekAgo;
                }).length
              }{" "}
              this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Visitors
            </CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.visitorCount}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />+
              {data.todayVisitors} today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPageViews}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              Avg. 3.2 pages/visitor
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Visitor Trends (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.visitorsByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                  formatter={(value: number) => [value, "Visitors"]}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.topSources}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="count"
                  nameKey="source"
                  label={({ source, percent }) =>
                    `${source} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {(data.topSources || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value, "Visitors"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-amber-600" />
              Top Visitor Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.topLocations} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="location" type="category" width={100} />
                <Tooltip formatter={(value: number) => [value, "Visitors"]} />
                <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Visit Purposes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.topPurposes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="purpose"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis />
                <Tooltip formatter={(value: number) => [value, "Visitors"]} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-amber-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">This Week</span>
                <Badge variant="secondary">
                  {data.weeklyVisitors} visitors
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Today</span>
                <Badge variant="secondary">{data.todayVisitors} visitors</Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Total Content</span>
                <Badge variant="secondary">
                  {data.blogCount + data.newsCount} items
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-600" />
              Recent Blog Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data.recentBlogs || []).length > 0 ? (
                (data.recentBlogs || []).slice(0, 3).map((blog, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm truncate">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 text-blue-700"
                    >
                      Published
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm py-4">No blog posts yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Recent Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data.recentVisitors || []).length > 0 ? (
                (data.recentVisitors || [])
                  .slice(0, 3)
                  .map((visitor, index) => (
                    <div key={index} className="flex items-center gap-3 py-2">
                      <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {visitor.name?.[0]?.toUpperCase() ||
                          visitor.email?.[0]?.toUpperCase() ||
                          "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {visitor.name || visitor.email || "Anonymous"}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {visitor.location || "Unknown location"}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(visitor.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-sm py-4">No visitors yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
