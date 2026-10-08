import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

const LIMITS: Record<string, { limit: number; windowMs: number }> = {
  "/api/register": { limit: 5, windowMs: 60_000 },
  "/api/auth/callback/credentials": { limit: 5, windowMs: 60_000 },
  "/api/books": { limit: 20, windowMs: 60_000 },
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const rule = LIMITS[pathname];

  if (!rule) {
    return NextResponse.next();
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const key = `${ip}:${pathname}`;
  const { success, remaining } = rateLimit(key, rule.limit, rule.windowMs);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Remaining", String(remaining));
  return response;
}

export const config = {
  matcher: ["/api/register", "/api/auth/callback/credentials", "/api/books"],
};