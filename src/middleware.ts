import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

function enforceHttps(request: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV !== "production") return null;

  const host = request.headers.get("host") ?? "";
  if (host.includes("localhost") || host.startsWith("127.0.0.1")) return null;

  const proto = request.headers.get("x-forwarded-proto");
  if (proto && proto !== "https") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const httpsRedirect = enforceHttps(request);
  if (httpsRedirect) return httpsRedirect;

  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and images.
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.png|Voice Agent Case Studies|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|js|jsx|html|dc\\.html)$).*)",
  ],
};
