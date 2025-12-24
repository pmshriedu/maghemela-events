"use client";

import { useRef, useEffect, useState, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Home,
  Info,
  BookOpen,
  Newspaper,
  Calendar,
  Users,
  MapPin,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";
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

function DockIcon({
  icon: Icon,
  label,
  href,
  mouseX,
  isActive,
}: {
  icon: any;
  label: string;
  href: string;
  mouseX: any;
  isActive: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return (val as number) - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [50, 80, 50]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <NavigationBlocker href={href} ref={ref}>
      <motion.div
        style={{ width }}
        className={cn(
          "aspect-square rounded-full flex items-center justify-center relative group transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-card text-foreground hover:bg-muted"
        )}
      >
        <Icon className="w-6 h-6" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {label}
        </div>
      </motion.div>
    </NavigationBlocker>
  );
}

export function DesktopDock() {
  // ALWAYS call hooks FIRST, before any conditional logic or early returns
  const pathname = usePathname();
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const visitorContext = useContext(VisitorContext);
  const { isPopupVisible, hasCompletedForm } = visitorContext || {
    isPopupVisible: false,
    hasCompletedForm: true,
  };

  // Determine if dock should be hidden - but don't return early
  const shouldHide =
    pathname.startsWith("/admin") || (isPopupVisible && !hasCompletedForm);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // Check if user is within 200px of the bottom
      const bottomThreshold = 200;
      const isAtBottom =
        scrollHeight - scrollTop - clientHeight < bottomThreshold;
      setIsNearBottom(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Always render the component, but conditionally show/hide it
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: isNearBottom || shouldHide ? 100 : 0,
        opacity: isNearBottom || shouldHide ? 0 : 1,
      }}
      transition={{ delay: 0.3, duration: 0.6 }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-end gap-4 px-6 py-4 rounded-2xl backdrop-blur-lg bg-background/80 border border-border shadow-2xl">
        {navItems.map((item) => (
          <DockIcon
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            mouseX={mouseX}
            isActive={pathname === item.href}
          />
        ))}
      </div>
    </motion.div>
  );
}
