"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import {
  BookOpen,
  Home,
  Newspaper,
  LogOut,
  Users,
  Menu,
  BarChart3,
  FileText,
  Calendar,
  Star,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
    description: "Overview & Analytics",
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
    icon: BookOpen,
    description: "Manage blog posts",
  },
  {
    title: "News",
    href: "/admin/news",
    icon: Newspaper,
    description: "News & announcements",
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: Calendar,
    description: "Manage events",
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: Star,
    description: "Customer reviews",
  },
  {
    title: "Visitors",
    href: "/admin/visitors",
    icon: Users,
    description: "Visitor tracking",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    description: "Site statistics",
  },
];

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex h-full flex-col bg-amber-50 border-r border-amber-200">
      {/* Header */}
      <div className="border-b border-amber-200 p-6">
        <div className="flex items-center gap-3">
          {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-md">
            <span className="text-lg font-bold text-white">🏛️</span>
          </div> */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">Maghey Mela CMS</h2>
            <p className="text-sm text-amber-700">Cultural Event Portal</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="border-b border-amber-200 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 shadow-sm">
            <AvatarFallback className="bg-amber-600 text-white">
              {session?.user?.email?.[0]?.toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-800">
              {session?.user?.email || "Admin"}
            </p>
            <p className="text-xs text-amber-600">Administrator</p>
          </div>
          <Badge
            variant="outline"
            className="border-green-500 bg-green-50 text-green-600 shadow-sm"
          >
            Online
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Main Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link key={item.href} href={item.href} onClick={onLinkClick}>
              <div
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all hover:bg-amber-100 hover:shadow-sm",
                  isActive
                    ? "bg-amber-600 text-white shadow-md"
                    : "text-gray-700 hover:text-gray-900"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive
                      ? "text-amber-100"
                      : "text-gray-500 group-hover:text-amber-600"
                  )}
                />
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div
                    className={cn(
                      "text-xs",
                      isActive
                        ? "text-amber-100"
                        : "text-gray-500 group-hover:text-gray-600"
                    )}
                  >
                    {item.description}
                  </div>
                </div>
                {isActive && (
                  <div className="h-2 w-2 rounded-full bg-amber-100 shadow-sm" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="border-t border-amber-200 p-4 space-y-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Actions
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start bg-white/50 border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-400 shadow-sm"
          asChild
        >
          <Link href="/admin/blogs/new">
            <FileText className="mr-2 h-4 w-4" />
            New Blog Post
          </Link>
        </Button>
      </div>

      {/* Footer */}
      <div className="border-t border-amber-200 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:bg-red-50 hover:text-red-600"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export function AdminNav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <>
        {/* Mobile Menu Button Skeleton */}
        <div className="fixed top-4 left-4 z-50 lg:hidden">
          <div className="h-10 w-10 rounded-lg bg-amber-100 animate-pulse" />
        </div>
        {/* Desktop Sidebar Skeleton */}
        <div className="fixed left-0 top-0 h-screen w-80 hidden lg:block bg-amber-50 border-r border-amber-200" />
      </>
    );
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-white border-amber-300 text-amber-700 hover:bg-amber-50 shadow-lg"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <SheetTitle className="sr-only">Admin Navigation Menu</SheetTitle>
            <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-80 hidden lg:block">
        <SidebarContent />
      </div>
    </>
  );
}
