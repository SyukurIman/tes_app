import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./lib/jwtTokenControl";

// Middleware to check JWT token on routes requiring authorization
export async function middleware(request: NextRequest) {
  const result = await isAuthenticated(request)
  // const userId = request.nextUrl.searchParams.get('userId');

  if (!result.userId) {
    return Response.json({ success: false, message: 'Invalid token' }, { status: 401 })
  }

  request.headers.set('userId', String(result.userId));
  return NextResponse.next({request: request});
}

// Define which paths require protection
export const config = {
  matcher: ['/api/user/:path*'], // Protect all routes under /api/user/
};
