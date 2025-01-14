import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const isAuthPage = request.nextUrl.pathname === "/login";
  const isPublicPage =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/register";

  // Allow public pages without redirects
  if (isPublicPage) {
    return NextResponse.next();
  }

  // Redirect to dashboard if logged in and trying to access login page
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect dashboard and admin routes
  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*", "/admin/:path*"],
};
