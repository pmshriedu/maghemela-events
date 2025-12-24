"use client";

import type React from "react";
import { useSession } from "next-auth/react";
import { AdminNav } from "@/components/admin/enhanced-admin-nav";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If user is authenticated with admin role, show admin layout
  if (session?.user && (session.user as any)?.role === "ADMIN") {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminNav />
        <main className="flex-1 p-4 pt-16 lg:p-8 lg:pt-8 ml-0 lg:ml-80">
          {children}
        </main>
        <Toaster />
      </div>
    );
  }

  // For unauthenticated users, show children (login page) without admin layout
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
