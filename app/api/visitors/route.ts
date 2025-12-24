import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const visitorData = {
      id: randomUUID(),
      name: body.name || null,
      email: body.email || null,
      phone: body.phone || "Anonymous",
      location: body.location || null,
      purpose: body.purpose || null,
      source: body.source || null,
      isAnonymous: body.anonymous || false,
      userAgent: body.userAgent || null,
      referrer: body.referrer || null,
      screenResolution: body.screenResolution || null,
      timezone: body.timezone || null,
      language: body.language || null,
      ipAddress:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "unknown",
      timestamp: new Date(body.timestamp || Date.now()),
    };

    // Save visitor data to database
    const visitor = await prisma.visitor.create({
      data: visitorData,
    });

    return NextResponse.json({
      success: true,
      id: visitor.id,
      message: "Visitor data recorded successfully",
    });
  } catch (error) {
    console.error("Error saving visitor data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record visitor data" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const limit = parseInt(searchParams.get("limit") || "1000"); // Increased limit for better client-side filtering

    const whereClause: any = {};

    if (startDate && endDate) {
      whereClause.timestamp = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const visitors = await prisma.visitor.findMany({
      where: whereClause,
      orderBy: { timestamp: "desc" },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        purpose: true,
        source: true,
        isAnonymous: true,
        timestamp: true,
        userAgent: true,
        referrer: true,
        screenResolution: true,
        timezone: true,
        language: true,
        ipAddress: true,
      },
    });

    // Get analytics
    const analytics = await getVisitorAnalytics(whereClause);

    return NextResponse.json({
      success: true,
      visitors,
      analytics,
    });
  } catch (error) {
    console.error("Error fetching visitor data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch visitor data" },
      { status: 500 }
    );
  }
}

async function getVisitorAnalytics(whereClause: any) {
  const [
    totalVisitors,
    anonymousVisitors,
    topLocations,
    topPurposes,
    topSources,
    visitorsByDay,
  ] = await Promise.all([
    // Total visitors
    prisma.visitor.count({ where: whereClause }),

    // Anonymous visitors
    prisma.visitor.count({
      where: { ...whereClause, isAnonymous: true },
    }),

    // Top locations
    prisma.visitor.groupBy({
      by: ["location"],
      where: {
        ...whereClause,
        location: { not: null },
        isAnonymous: false,
      },
      _count: { location: true },
      orderBy: { _count: { location: "desc" } },
      take: 10,
    }),

    // Top purposes
    prisma.visitor.groupBy({
      by: ["purpose"],
      where: {
        ...whereClause,
        purpose: { not: null },
      },
      _count: { purpose: true },
      orderBy: { _count: { purpose: "desc" } },
      take: 10,
    }),

    // Top sources
    prisma.visitor.groupBy({
      by: ["source"],
      where: {
        ...whereClause,
        source: { not: null },
      },
      _count: { source: true },
      orderBy: { _count: { source: "desc" } },
      take: 10,
    }),

    // Visitors by day (last 7 days)
    prisma.$queryRaw`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as count
      FROM "Visitor" 
      WHERE timestamp >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY DATE(timestamp)
      ORDER BY date ASC
    ` as Promise<Array<{ date: Date; count: bigint }>>,
  ]);

  return {
    totalVisitors,
    anonymousVisitors,
    registeredVisitors: totalVisitors - anonymousVisitors,
    topLocations: topLocations.map((l) => ({
      location: l.location,
      count: l._count.location,
    })),
    topPurposes: topPurposes.map((p) => ({
      purpose: p.purpose,
      count: p._count.purpose,
    })),
    topSources: topSources.map((s) => ({
      source: s.source,
      count: s._count.source,
    })),
    visitorsByDay: visitorsByDay.map((day) => ({
      date: day.date,
      count: Number(day.count), // Convert BigInt to number
    })),
  };
}
