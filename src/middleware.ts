import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentEmployee } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const employee = await getCurrentEmployee();
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");

  // Redirect to dashboard if already logged in and trying to access auth pages
  if (isAuthPage && employee) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect dashboard and admin routes
  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    if (!employee) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Additional check for admin routes
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      employee.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/admin/:path*"],
};
