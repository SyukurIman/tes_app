import { NextRequest, NextResponse } from "next/server";

const corsOptions: {
  allowedMethods: string[];
  allowedOrigins: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  maxAge?: number;
  credentials: boolean;
} = {
  allowedMethods: (process.env?.ALLOWED_METHODS || "").split(","),
  allowedOrigins: (process.env?.ALLOWED_ORIGIN || "").split(","),
  allowedHeaders: (process.env?.ALLOWED_HEADERS || "").split(","),
  exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
  maxAge: process.env?.MAX_AGE ? parseInt(process.env.MAX_AGE) : undefined,
  credentials: process.env?.CREDENTIALS === "true",
};

export const headerSet = (request: NextRequest, response: NextResponse) => {
  const origin = request.headers.get("origin") ?? "";

  if (
    corsOptions.allowedOrigins.includes("*") ||
    corsOptions.allowedOrigins.includes(origin)
  ) {
    response.headers.set(
      "Access-Control-Allow-Origin",
      corsOptions.allowedOrigins.includes("*") ? "*" : origin
    );
  }

  response.headers.set(
    "Access-Control-Allow-Credentials",
    corsOptions.credentials.toString()
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    corsOptions.allowedMethods.join(",")
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(",")
  );
  response.headers.set(
    "Access-Control-Expose-Headers",
    corsOptions.exposedHeaders.join(",")
  );

  if (corsOptions.maxAge) {
    response.headers.set(
      "Access-Control-Max-Age",
      corsOptions.maxAge.toString()
    );
  }

  return response;
};
