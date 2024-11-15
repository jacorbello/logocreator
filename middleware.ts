import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, NextFetchEvent } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(
  req: NextRequest,
  evt: NextFetchEvent,
) {
  // Check for Russian traffic first
  if (req.geo?.country === "RU") {
    return new NextResponse("Access Denied", { status: 403 });
  }

  // If not from Russia, proceed with Clerk authentication
  return clerkMiddleware()(req, evt);
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
