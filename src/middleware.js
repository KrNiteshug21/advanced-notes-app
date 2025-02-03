import { NextResponse } from "next/server";

// Define protected API routes
const protectedRoutes = ["/api/notes"];

export function middleware(req) {
  const token = req.cookies.get("token")?.value; // Get token from cookies
  const { pathname } = req.nextUrl; // Get current path

  // If user is not authenticated and trying to access a protected API
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next(); // Allow request
}

// Apply middleware only to API routes
export const config = {
  matcher: ["/api/notes/:path*"], // Protect all API routes under /api/notes
};
