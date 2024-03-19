

import { NextResponse, type NextRequest } from "next/server";
import { withAuth } from 'next-auth/middleware';

// Config
// ========================================================

export { default } from "next-auth/middleware"


const corsOptions: {
  allowedMethods: string[];
  allowedHeaders: string[];
  allowedOrigins: string[];
  exposedHeaders: string[];
  maxAge?: number;
  credentials: boolean;
} = {
  allowedMethods: (process.env?.ALLOWED_METHODS || "").split(","),
  allowedOrigins: (process.env?.ALLOWED_ORIGIN || "").split(","),
  allowedHeaders: (process.env?.ALLOWED_HEADERS || "").split(","),
  exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
  maxAge: process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE) || undefined, // 60 * 60 * 24 * 30, // 30 days
  credentials: process.env?.CREDENTIALS == "true",
};

export async function middleware(request: NextRequest, ) {

  const response = NextResponse.next();
  const origin = request.headers.get("origin") ?? "";


  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Credentials", corsOptions.credentials.toString());
  response.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));
  response.headers.set("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
  response.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(","));
  response.headers.set("Access-Control-Max-Age", corsOptions.maxAge?.toString() ?? "");

  return response;

}

export const config = {
  api: {
    bodyParser: false,
    matcher: ['/dashboard', "/api/:path*"]
  }
};
