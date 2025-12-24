"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  UserCheck,
  UserX,
  MapPin,
  Globe,
  Calendar,
  Clock,
  Eye,
  TrendingUp,
  Filter,
  Search,
  Info,
  RefreshCw,
} from "lucide-react";

interface Visitor {
  id: string;
  name: string | null;
  email: string | null;
  phone: string;
  location: string | null;
  purpose: string | null;
  source: string | null;
  isAnonymous: boolean;
  timestamp: string;
  userAgent: string | null;
  referrer: string | null;
  screenResolution: string | null;
  timezone: string | null;
  language: string | null;
  ipAddress: string | null;
}

interface VisitorAnalytics {
  totalVisitors: number;
  anonymousVisitors: number;
  registeredVisitors: number;
  topLocations: Array<{ location: string; count: number }>;
  topPurposes: Array<{ purpose: string; count: number }>;
  recentVisitors: Visitor[];
  todayVisitors: number;
  weeklyVisitors: number;
}

export default function VisitorTrackingPage() {
  const { data: session, status } = useSession();
  const [analytics, setAnalytics] = useState<VisitorAnalytics | null>(null);
  const [allVisitors, setAllVisitors] = useState<Visitor[]>([]);
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "anonymous" | "registered">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) {
      redirect("/admin/login");
      return;
    }
    fetchData();
  }, [session, status]);

  useEffect(() => {
    let filtered = allVisitors;

    // Apply filter
    if (filter === "anonymous") {
      filtered = filtered.filter((visitor) => visitor.isAnonymous);
    } else if (filter === "registered") {
      filtered = filtered.filter((visitor) => !visitor.isAnonymous);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (visitor) =>
          visitor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          visitor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          visitor.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          visitor.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          visitor.purpose?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredVisitors(filtered);
  }, [allVisitors, filter, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/visitors");
      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
        setAllVisitors(data.visitors);
      }
    } catch (error) {
      console.error("Failed to fetch visitor data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="space-y-6 p-4 lg:p-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

  if (!analytics) {
    return <div className="p-4 text-center">Failed to load visitor data</div>;
  }

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-auto mx-auto">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
            Visitor Tracking
          </h1>
          <p className="text-sm lg:text-base text-gray-600">
            Monitor and analyze your website visitors and their activity
            patterns.
          </p>
        </div>
        <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={loading}
            className="w-full lg:w-auto"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <div className="text-xs lg:text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-amber-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">
              Total Visitors
            </CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {analytics.totalVisitors}
            </div>
            <p className="text-xs opacity-80">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              All time visitors
            </p>
          </CardContent>
        </Card>

        <Card className="bg-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">
              Registered Users
            </CardTitle>
            <UserCheck className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {analytics.registeredVisitors}
            </div>
            <p className="text-xs opacity-80">
              <Eye className="inline w-3 h-3 mr-1" />
              Non-anonymous visitors
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">
              Anonymous
            </CardTitle>
            <UserX className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {analytics.anonymousVisitors}
            </div>
            <p className="text-xs opacity-80">
              <Globe className="inline w-3 h-3 mr-1" />
              Anonymous visitors
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">
              Today
            </CardTitle>
            <Calendar className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {analytics.todayVisitors}
            </div>
            <p className="text-xs opacity-80">
              <Clock className="inline w-3 h-3 mr-1" />
              Visitors today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Top Locations */}
        <Card className="h-80 flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
              <MapPin className="h-4 lg:h-5 w-4 lg:w-5 text-amber-600" />
              Top Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-4 lg:p-6 pt-0 overflow-hidden">
            {analytics.topLocations.length > 0 ? (
              <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-amber-50">
                <div className="space-y-3">
                  {analytics.topLocations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100 hover:shadow-sm transition-all duration-200 hover:from-amber-100 hover:to-orange-100"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex items-center justify-center w-7 h-7 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-xs font-bold shadow-sm">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {location.location}
                          </p>
                          <p className="text-xs text-amber-600 font-medium">
                            {location.count} visitor
                            {location.count !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center min-w-0">
                        <span className="text-lg font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full text-xs">
                          {location.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="h-6 w-6 text-amber-500" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">
                    No location data yet
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Locations will appear here
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Purposes */}
        <Card className="h-80 flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
              <Eye className="h-4 lg:h-5 w-4 lg:w-5 text-green-600" />
              Visit Purposes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-4 lg:p-6 pt-0 overflow-hidden">
            {analytics.topPurposes.length > 0 ? (
              <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-green-50">
                <div className="space-y-3">
                  {analytics.topPurposes.map((purpose, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 hover:shadow-sm transition-all duration-200 hover:from-green-100 hover:to-emerald-100"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex items-center justify-center w-7 h-7 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-xs font-bold shadow-sm">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {purpose.purpose}
                          </p>
                          <p className="text-xs text-green-600 font-medium">
                            {purpose.count} visitor
                            {purpose.count !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center min-w-0">
                        <span className="text-lg font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">
                          {purpose.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">
                    No purpose data yet
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Purposes will appear here
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="h-80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
              <TrendingUp className="h-4 lg:h-5 w-4 lg:w-5 text-blue-600" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">This Week</span>
                <Badge variant="secondary">
                  {analytics.weeklyVisitors} visitors
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Today</span>
                <Badge variant="secondary">
                  {analytics.todayVisitors} visitors
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Avg/Day</span>
                <Badge variant="secondary">
                  {Math.round(analytics.weeklyVisitors / 7)} visitors
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Registered %</span>
                <Badge variant="secondary">
                  {Math.round(
                    (analytics.registeredVisitors / analytics.totalVisitors) *
                      100
                  )}
                  %
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitor List with Filters */}
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
              <Users className="h-5 w-5 text-purple-600" />
              All Visitors ({filteredVisitors.length})
            </CardTitle>

            {/* Filters and Search */}
            <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3">
              <div className="relative w-full lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search visitors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              <Select
                value={filter}
                onValueChange={(value: "all" | "anonymous" | "registered") =>
                  setFilter(value)
                }
              >
                <SelectTrigger className="w-full lg:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Visitors</SelectItem>
                  <SelectItem value="registered">Registered Only</SelectItem>
                  <SelectItem value="anonymous">Anonymous Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 lg:p-6">
          {filteredVisitors.length > 0 ? (
            <ScrollArea className="h-96 lg:h-125">
              <div className="space-y-3">
                {filteredVisitors.map((visitor) => (
                  <div
                    key={visitor.id}
                    className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 py-3 px-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 shadow-sm shrink-0">
                        <AvatarFallback className="bg-amber-600 text-white">
                          {visitor.isAnonymous
                            ? "?"
                            : visitor.name?.[0]?.toUpperCase() ||
                              visitor.email?.[0]?.toUpperCase() ||
                              "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm truncate">
                          {visitor.isAnonymous
                            ? "Anonymous Visitor"
                            : visitor.name || visitor.email || "Unknown User"}
                        </h4>
                        <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 text-xs text-gray-500">
                          {visitor.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">
                                {visitor.location}
                              </span>
                            </div>
                          )}
                          {visitor.purpose && (
                            <>
                              {visitor.location && (
                                <span className="hidden lg:inline">•</span>
                              )}
                              <span className="truncate">
                                {visitor.purpose}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between lg:justify-end gap-3">
                      <div className="flex items-center gap-2">
                        {visitor.isAnonymous ? (
                          <Badge variant="outline" className="text-gray-500">
                            Anonymous
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-200"
                          >
                            Registered
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-400 text-right">
                          <div>
                            {new Date(visitor.timestamp).toLocaleDateString()}
                          </div>
                          <div className="lg:hidden">
                            {new Date(visitor.timestamp).toLocaleTimeString()}
                          </div>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedVisitor(visitor)}
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-full max-w-md lg:max-w-lg mx-4">
                            <DialogHeader>
                              <DialogTitle>Visitor Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 p-2">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback className="bg-amber-600 text-white">
                                    {visitor.isAnonymous
                                      ? "?"
                                      : visitor.name?.[0]?.toUpperCase() ||
                                        visitor.email?.[0]?.toUpperCase() ||
                                        "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold">
                                    {visitor.isAnonymous
                                      ? "Anonymous Visitor"
                                      : visitor.name ||
                                        visitor.email ||
                                        "Unknown User"}
                                  </h3>
                                  <Badge
                                    variant={
                                      visitor.isAnonymous
                                        ? "secondary"
                                        : "outline"
                                    }
                                  >
                                    {visitor.isAnonymous
                                      ? "Anonymous"
                                      : "Registered"}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid gap-3">
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-sm text-gray-500">
                                    Email:
                                  </span>
                                  <span className="col-span-2 text-sm">
                                    {visitor.email || "Not provided"}
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-sm text-gray-500">
                                    Phone:
                                  </span>
                                  <span className="col-span-2 text-sm">
                                    {visitor.phone || "Not provided"}
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-sm text-gray-500">
                                    Location:
                                  </span>
                                  <span className="col-span-2 text-sm">
                                    {visitor.location || "Not provided"}
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-sm text-gray-500">
                                    Purpose:
                                  </span>
                                  <span className="col-span-2 text-sm">
                                    {visitor.purpose || "Not specified"}
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-sm text-gray-500">
                                    Source:
                                  </span>
                                  <span className="col-span-2 text-sm">
                                    {visitor.source || "Unknown"}
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-sm text-gray-500">
                                    Visit Time:
                                  </span>
                                  <span className="col-span-2 text-sm">
                                    {new Date(
                                      visitor.timestamp
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                {visitor.language && (
                                  <div className="grid grid-cols-3 gap-2">
                                    <span className="text-sm text-gray-500">
                                      Language:
                                    </span>
                                    <span className="col-span-2 text-sm">
                                      {visitor.language}
                                    </span>
                                  </div>
                                )}
                                {visitor.timezone && (
                                  <div className="grid grid-cols-3 gap-2">
                                    <span className="text-sm text-gray-500">
                                      Timezone:
                                    </span>
                                    <span className="col-span-2 text-sm">
                                      {visitor.timezone}
                                    </span>
                                  </div>
                                )}
                                {visitor.referrer && (
                                  <div className="grid grid-cols-3 gap-2">
                                    <span className="text-sm text-gray-500">
                                      Referrer:
                                    </span>
                                    <span className="col-span-2 text-sm break-all">
                                      {visitor.referrer}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">
                {searchQuery || filter !== "all"
                  ? "No visitors match your filters"
                  : "No visitors tracked yet"}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {searchQuery || filter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Visitors will appear here when they interact with your site"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
