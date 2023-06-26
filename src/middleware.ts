import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const hasAuthCookie = request.cookies.get("auth")?.value;
  const isLandingPage = request.url.includes("/landing");

  if ((isLandingPage && hasAuthCookie) || (!isLandingPage && !hasAuthCookie)) {
    return NextResponse.redirect(
      new URL(isLandingPage ? "/" : "/landing", request.url)
    );
  }
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
