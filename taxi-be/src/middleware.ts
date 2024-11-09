import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./app/lib/jwtTokenControl";
import { headerSet } from "./app/lib/header";
import { PrismaClient } from "@prisma/client";
import { checkStatus } from "./app/api/user/logout";

const prisma = new PrismaClient();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();

  response = headerSet(request, response);

  // Proteksi rute /api/user
  try {
    if (pathname.startsWith("/api/user")) {
      const result = await isAuthenticated(request);
  
      if (!result.payload) {
        return NextResponse.json(
          { success: false, message: result },
          { status: 401 }
        );
      }
      response.headers.set("userId", String(result.payload.id));
      response.headers.set("version", String(result.payload.version));
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }
  return response;
}

export const config = {
  matcher: ["/api/user/:path*", "/api/:path*"],
};
