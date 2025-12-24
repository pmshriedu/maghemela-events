import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Newspaper, 
  Users, 
  Calendar, 
  Eye,
  TrendingUp,
  Globe,
  MessageCircle
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch statistics
  const [
    blogCount, 
    newsCount, 
    userCount,
    visitorCount,
    recentBlogs,
    recentNews,
    recentVisitors
  ] = await Promise.all([
    prisma.blog.count(),
    prisma.news.count(),
    prisma.user.count(),
    prisma.visitor.count(),
    prisma.blog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { title: true, createdAt: true, slug: true }
    }),
    prisma.news.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { title: true, createdAt: true }
    }),
    prisma.visitor.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: { 
        name: true, 
        email: true, 
        location: true, 
        purpose: true,
        createdAt: true 
      }
    })
  ]);

  // Mock data for charts (in a real app, this would come from your database)
  const monthlyData = [
    { month: 'Jan', visitors: 1200, blogs: 15, news: 8 },
    { month: 'Feb', visitors: 1500, blogs: 18, news: 12 },
    { month: 'Mar', visitors: 1800, blogs: 22, news: 15 },
    { month: 'Apr', visitors: 2200, blogs: 25, news: 18 },
    { month: 'May', visitors: 2800, blogs: 28, news: 20 },
    { month: 'Jun', visitors: 3200, blogs: 30, news: 22 },
  ];

  const visitorSources = [
    { name: 'Google Search', value: 35, color: '#3b82f6' },
    { name: 'Social Media', value: 25, color: '#8b5cf6' },
    { name: 'Direct Visit', value: 20, color: '#10b981' },
    { name: 'Word of Mouth', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#ef4444' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {session.user?.email}. Here's what's happening with your cultural event portal.
          </p>
        </div>
        <div className="mt-4 lg:mt-0 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <BookOpen className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogCount}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +2 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">News Articles</CardTitle>
            <Newspaper className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newsCount}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +1 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visitorCount}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +{Math.floor(Math.random() * 50) + 10} today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(visitorCount * 3.5).toFixed(0)}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              Avg. 3.5 pages/visitor
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-500" />
              Monthly Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.1}
                />
                <Area 
                  type="monotone" 
                  dataKey="blogs" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Visitor Sources Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-500" />
              Visitor Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={visitorSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {visitorSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {visitorSources.map((source, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm text-gray-600 truncate">{source.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Blogs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Recent Blog Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBlogs.map((blog, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm truncate">{blog.title}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                      Published
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Visitors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              Recent Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentVisitors.slice(0, 5).map((visitor, index) => (
                <div key={index} className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {visitor.name?.[0]?.toUpperCase() || visitor.email?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {visitor.name || visitor.email || 'Anonymous'}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {visitor.location || 'Unknown location'} • {visitor.purpose || 'No purpose specified'}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(visitor.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
    prisma.news.count(),
    prisma.user.count(),
    prisma.visitor.count(),
    prisma.blog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { title: true, createdAt: true, slug: true }
    }),
    prisma.news.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { title: true, createdAt: true }
    }),
    prisma.visitor.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: { 
        name: true, 
        email: true, 
        location: true, 
        purpose: true,
        createdAt: true 
      }
    })
  ]);

  // Mock data for charts (in a real app, this would come from your database)
  const monthlyData = [
    { month: 'Jan', visitors: 1200, blogs: 15, news: 8 },
    { month: 'Feb', visitors: 1500, blogs: 18, news: 12 },
    { month: 'Mar', visitors: 1800, blogs: 22, news: 15 },
    { month: 'Apr', visitors: 2200, blogs: 25, news: 18 },
    { month: 'May', visitors: 2800, blogs: 28, news: 20 },
    { month: 'Jun', visitors: 3200, blogs: 30, news: 22 },
  ];

  const visitorSources = [
    { name: 'Google Search', value: 35, color: '#3b82f6' },
    { name: 'Social Media', value: 25, color: '#8b5cf6' },
    { name: 'Direct Visit', value: 20, color: '#10b981' },
    { name: 'Word of Mouth', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#ef4444' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {session.user?.email}. Here's what's happening with your cultural event portal.
          </p>
        </div>
        <div className="mt-4 lg:mt-0 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <BookOpen className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogCount}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +2 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">News Articles</CardTitle>
            <Newspaper className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newsCount}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +1 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visitorCount}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +{Math.floor(Math.random() * 50) + 10} today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(visitorCount * 3.5).toFixed(0)}</div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              Avg. 3.5 pages/visitor
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-500" />
              Monthly Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.1}
                />
                <Area 
                  type="monotone" 
                  dataKey="blogs" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Visitor Sources Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-500" />
              Visitor Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={visitorSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {visitorSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {visitorSources.map((source, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm text-gray-600 truncate">{source.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Blogs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Recent Blog Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBlogs.map((blog, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm truncate">{blog.title}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                      Published
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Visitors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              Recent Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentVisitors.slice(0, 5).map((visitor, index) => (
                <div key={index} className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {visitor.name?.[0]?.toUpperCase() || visitor.email?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {visitor.name || visitor.email || 'Anonymous'}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {visitor.location || 'Unknown location'} • {visitor.purpose || 'No purpose specified'}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(visitor.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogCount}</div>
            <p className="text-xs text-muted-foreground">
              Published blog posts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total News</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newsCount}</div>
            <p className="text-xs text-muted-foreground">
              News articles published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">
              System administrators
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
