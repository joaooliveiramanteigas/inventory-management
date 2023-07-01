import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Check if the "auth" cookie is present
  const hasAuthCookie = request.cookies.get("auth")?.value;

  // Check if the current page is the landing page
  const isLandingPage = request.url.includes("/landing");

  // Check if the authentication cookie matches the page type
  if ((isLandingPage && hasAuthCookie) || (!isLandingPage && !hasAuthCookie)) {
    // Redirect to the appropriate page based on authentication status
    return NextResponse.redirect(
      new URL(isLandingPage ? "/" : "/landing", request.url)
    );
  }
}

// Configuration object for the middleware
export const config = {
  // Define the URLs to which the middleware should be applied
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
