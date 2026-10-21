import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = pathname === "/admin/login";

  if (!signedIn && !isLogin) return NextResponse.redirect(new URL("/admin/login", request.url));
  if (signedIn && isLogin) return NextResponse.redirect(new URL("/admin", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
