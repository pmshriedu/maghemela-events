"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin, TrendingUp, Globe, Calendar, Eye } from "lucide-react";

interface VisitorAnalytics {
  totalVisitors: number;
  anonymousVisitors: number;
  registeredVisitors: number;
  topLocations: Array<{ location: string; count: number }>;
  topPurposes: Array<{ purpose: string; count: number }>;
  topSources: Array<{ source: string; count: number }>;
  visitorsByDay: Array<{ date: string; count: number }>;
}

interface Visitor {
  id: string;
  name: string | null;
  email: string | null;
  location: string | null;
  purpose: string | null;
  source: string | null;
  isAnonymous: boolean;
  timestamp: string;
  userAgent: string | null;
  referrer: string | null;
}

export default function VisitorAnalyticsPage() {
  const [analytics, setAnalytics] = useState<VisitorAnalytics | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (dateRange.start) params.append("startDate", dateRange.start);
      if (dateRange.end) params.append("endDate", dateRange.end);

      const response = await fetch(`/api/visitors?${params}`);
      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
        setVisitors(data.visitors);
      }
    } catch (error) {
      console.error("Error fetching visitor data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateRangeChange = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-muted-foreground">
            Loading analytics...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-auto mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            📊 Visitor Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track and analyze website visitors for Maghey Sankranti Mela 2026
          </p>
        </div>

        {/* Date Range Filter */}
        <div className="mb-6 p-4 bg-card rounded-lg border border-border">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="text-sm font-medium text-foreground">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
                className="mt-1 block px-3 py-2 border border-input rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
                className="mt-1 block px-3 py-2 border border-input rounded-md bg-background text-foreground"
              />
            </div>
            <Button onClick={handleDateRangeChange}>Apply Filter</Button>
          </div>
        </div>

        {analytics && (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Visitors
                    </CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.totalVisitors}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Unique website visitors
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-secondary/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Registered Visitors
                    </CardTitle>
                    <Eye className="h-4 w-4 text-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.registeredVisitors}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Provided contact information
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-accent/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Anonymous Visitors
                    </CardTitle>
                    <Globe className="h-4 w-4 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.anonymousVisitors}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Skipped registration
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-muted-foreground/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Engagement Rate
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.totalVisitors > 0
                        ? Math.round(
                            (analytics.registeredVisitors /
                              analytics.totalVisitors) *
                              100
                          )
                        : 0}
                      %
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Registration rate
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Top Locations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Top Visitor Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analytics.topLocations
                        .slice(0, 5)
                        .map((location, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm font-medium">
                              {location.location}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {location.count} visitors
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Top Purposes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-secondary" />
                      Visit Purposes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analytics.topPurposes
                        .slice(0, 5)
                        .map((purpose, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm font-medium capitalize">
                              {purpose.purpose?.replace("-", " ")}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {purpose.count}
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Visitors Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Visitors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                            Timestamp
                          </th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                            Name
                          </th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                            Location
                          </th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                            Purpose
                          </th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                            Source
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {visitors.slice(0, 10).map((visitor) => (
                          <tr
                            key={visitor.id}
                            className="border-b border-border/50"
                          >
                            <td className="p-3 text-sm">
                              {new Date(visitor.timestamp).toLocaleDateString()}
                              <br />
                              <span className="text-xs text-muted-foreground">
                                {new Date(
                                  visitor.timestamp
                                ).toLocaleTimeString()}
                              </span>
                            </td>
                            <td className="p-3 text-sm">
                              {visitor.isAnonymous ? (
                                <span className="text-muted-foreground italic">
                                  Anonymous
                                </span>
                              ) : (
                                visitor.name || visitor.email || "—"
                              )}
                            </td>
                            <td className="p-3 text-sm">
                              {visitor.location || "—"}
                            </td>
                            <td className="p-3 text-sm capitalize">
                              {visitor.purpose?.replace("-", " ") || "—"}
                            </td>
                            <td className="p-3 text-sm capitalize">
                              {visitor.source?.replace("-", " ") || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
