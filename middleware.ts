import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // All routes reaching this point should be protected admin routes
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow access if user has admin role
        return !!token && token.role === "ADMIN";
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/blogs/:path*",
    "/admin/news/:path*",
    "/admin/analytics/:path*",
  ],
};
