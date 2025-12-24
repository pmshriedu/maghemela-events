"use client";

import { useRouter, usePathname } from "next/navigation";
import { useVisitor } from "@/components/providers/visitor-provider";
import { toast } from "sonner";

interface NavigationBlockerProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function NavigationBlocker({
  href,
  children,
  onClick,
  className,
  ...props
}: NavigationBlockerProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const router = useRouter();
  const pathname = usePathname();
  const { hasCompletedForm, isPopupVisible } = useVisitor();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If on home page and popup is visible but form not completed, prevent navigation
    if (pathname === "/" && isPopupVisible && !hasCompletedForm) {
      e.preventDefault();
      toast.error(
        "Please complete the visitor registration form before navigating to other pages.",
        {
          duration: 4000,
        }
      );
      return;
    }

    // If trying to navigate away from home page when popup is visible but form not completed
    if (
      pathname === "/" &&
      isPopupVisible &&
      !hasCompletedForm &&
      href !== "/"
    ) {
      e.preventDefault();
      toast.error(
        "Please complete the visitor registration form before navigating to other pages.",
        {
          duration: 4000,
        }
      );
      return;
    }

    // Call original onClick if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
