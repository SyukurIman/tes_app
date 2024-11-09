import * as jose from "jose";
import { NextRequest } from "next/server";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
};

export const isAuthenticated = async (req: NextRequest) => {
  let token =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (token) {
    try {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7);
      }

      const { payload } = await jose.jwtVerify(token, jwtConfig.secret);
      if (payload?.id) {
        // req.nextUrl.searchParams.set('userId', payload.id);
        return { userId: payload.id };
      } else {
        return { userId: null };
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      return { userId: null };
    }
  } else {
    return { userId: null };
  }
};
