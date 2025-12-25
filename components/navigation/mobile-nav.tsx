"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useContext } from "react";
import {
  Home,
  Info,
  BookOpen,
  Newspaper,
  Calendar,
  Users,
  MapPin,
  Camera,
  MoreHorizontal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationBlocker } from "@/components/ui/navigation-blocker";
import { VisitorContext } from "@/components/providers/visitor-provider";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/about", icon: Info, label: "About" },
  { href: "/events", icon: Calendar, label: "Events" },
  { href: "/homestays", icon: MapPin, label: "Homestays" },
  { href: "/gallery", icon: Camera, label: "Gallery" },
  { href: "/blogs", icon: BookOpen, label: "Blog" },
  { href: "/news", icon: Newspaper, label: "News" },
  { href: "/contact", icon: Users, label: "Contact" },
];

const MAX_VISIBLE_ITEMS = 4;

export function MobileNav() {
  // ALWAYS call hooks FIRST, before any conditional logic or early returns
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);
  const visitorContext = useContext(VisitorContext);
  const { isPopupVisible, hasCompletedForm } = visitorContext || {
    isPopupVisible: false,
    hasCompletedForm: true,
  };

  // Determine if nav should be hidden - but don't return early
  const shouldHide =
    pathname.startsWith("/admin") || (isPopupVisible && !hasCompletedForm);

  const visibleItems = navItems.slice(0, MAX_VISIBLE_ITEMS - 1);
  const moreItems = navItems.slice(MAX_VISIBLE_ITEMS - 1);
  const hasMoreItems = moreItems.length > 0;

  // Always render the component, but conditionally show/hide it
  return (
    <>
      {/* Overlay for More menu */}
      <AnimatePresence>
        {showMore && !shouldHide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setShowMore(false)}
          />
        )}
      </AnimatePresence>

      {/* More Items Popup */}
      <AnimatePresence>
        {showMore && !shouldHide && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-4 right-4 bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl z-60 md:hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  More Options
                </h3>
                <button
                  onClick={() => setShowMore(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <NavigationBlocker
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowMore(false)}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 border",
                        isActive
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-muted/30 text-muted-foreground hover:bg-muted/50 border-border/30 hover:text-foreground"
                      )}
                    >
                      <Icon
                        className={cn("h-6 w-6", isActive && "fill-primary/20")}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                    </NavigationBlocker>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <nav
        className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/60 shadow-2xl transition-transform duration-300",
          shouldHide ? "translate-y-full" : "translate-y-0"
        )}
      >
        <div className="flex items-center justify-around h-16 px-2">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <NavigationBlocker
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-300 rounded-lg mx-1 relative",
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                )}
              >
                <Icon
                  className={cn("h-5 w-5", isActive && "fill-primary/20")}
                />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"
                  />
                )}
              </NavigationBlocker>
            );
          })}

          {/* More Button */}
          {hasMoreItems && (
            <button
              onClick={() => setShowMore(!showMore)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-300 rounded-lg mx-1 relative",
                showMore
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-xs font-medium">More</span>
              {showMore && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
