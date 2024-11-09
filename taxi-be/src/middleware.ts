import { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/jwtTokenControl";
import { header_set } from "./lib/header";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/user")) {
    const result = await isAuthenticated(request);

    if (!result.userId) {
      return Response.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }
    request.headers.set("userId", String(result.userId));
  }

  return await header_set(request);
}

// Define which paths require protection
export const config = {
  matcher: ["/api/user/:path*", "/api/:path*"], // Protect all routes under /api/user/
};
