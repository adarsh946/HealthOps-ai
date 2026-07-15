import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // allow public routes through
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // check for auth cookie
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
