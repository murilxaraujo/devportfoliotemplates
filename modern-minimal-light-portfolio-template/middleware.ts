import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Geo-location may not be typed in NextRequest; use any cast to access geo
  const country = (request as any).geo?.country || "";
  const url = request.nextUrl.clone();

  // Redirect Brazilian visitors to pt-BR locale if they are on default locale
  if ((!url.locale || url.locale === url.defaultLocale) && country === "BR") {
    url.locale = "pt-BR";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
