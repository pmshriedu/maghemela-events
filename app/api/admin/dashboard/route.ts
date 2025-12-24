import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated admin
    const session = await getServerSession(authOptions);
    if (
      !session ||
      !(session as any).user ||
      (session as any).user.email !== "admin@culturalevent.com"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current date for filtering
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Get total counts
    const [blogCount, newsCount, visitorCount] = await Promise.all([
      prisma.blog.count(),
      prisma.news.count(),
      prisma.visitor.count(),
    ]);

    // Get recent content
    const [recentBlogs, recentNews] = await Promise.all([
      prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      }),
      prisma.news.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      }),
    ]);

    // Get visitor analytics
    const [recentVisitors, todayVisitors, weeklyVisitors] = await Promise.all([
      prisma.visitor.findMany({
        orderBy: { timestamp: "desc" },
        take: 10,
        select: {
          id: true,
          name: true,
          email: true,
          location: true,
          timestamp: true,
        },
      }),
      prisma.visitor.count({
        where: {
          timestamp: {
            gte: today,
          },
        },
      }),
      prisma.visitor.count({
        where: {
          timestamp: {
            gte: weekAgo,
          },
        },
      }),
    ]);

    // Get visitors by day for the last 7 days
    const visitorsByDay = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const count = await prisma.visitor.count({
        where: {
          timestamp: {
            gte: date,
            lt: nextDate,
          },
        },
      });

      visitorsByDay.push({
        date: date.toISOString(),
        count,
      });
    }

    // Get top sources
    const sourceAggregation = await prisma.visitor.groupBy({
      by: ["source"],
      _count: {
        source: true,
      },
      orderBy: {
        _count: {
          source: "desc",
        },
      },
      take: 5,
    });

    const topSources = sourceAggregation.map((item) => ({
      source: item.source || "Direct",
      count: item._count.source,
    }));

    // Get top locations
    const locationAggregation = await prisma.visitor.groupBy({
      by: ["location"],
      _count: {
        location: true,
      },
      orderBy: {
        _count: {
          location: "desc",
        },
      },
      take: 5,
    });

    const topLocations = locationAggregation.map((item) => ({
      location: item.location || "Unknown",
      count: item._count.location,
    }));

    // Get top purposes
    const purposeAggregation = await prisma.visitor.groupBy({
      by: ["purpose"],
      _count: {
        purpose: true,
      },
      orderBy: {
        _count: {
          purpose: "desc",
        },
      },
      take: 5,
    });

    const topPurposes = purposeAggregation.map((item) => ({
      purpose: item.purpose || "General",
      count: item._count.purpose,
    }));

    // Calculate total page views (estimate based on visitors)
    const totalPageViews = Math.floor(visitorCount * 3.2); // Average pages per visitor

    const dashboardData = {
      // Counts
      blogCount,
      newsCount,
      visitorCount,
      todayVisitors,
      weeklyVisitors,
      totalPageViews,

      // Recent content
      recentBlogs: recentBlogs.map((blog) => ({
        ...blog,
        createdAt: blog.createdAt.toISOString(),
      })),
      recentNews: recentNews.map((news) => ({
        ...news,
        createdAt: news.createdAt.toISOString(),
      })),

      // Recent visitors
      recentVisitors: recentVisitors.map((visitor) => ({
        ...visitor,
        timestamp: visitor.timestamp.toISOString(),
      })),

      // Chart data
      visitorsByDay,
      topSources,
      topLocations,
      topPurposes,

      // Metadata
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
