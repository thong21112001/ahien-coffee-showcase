import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["vi", "en"];
const DEFAULT_LOCALE = "vi";

function getPreferredLocale(request: NextRequest): string {
  // 1. Check existing cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLang = request.headers.get("accept-language");
  if (acceptLang) {
    const langs = acceptLang.split(",").map((l) => l.split(";")[0].trim().toLowerCase());
    for (const lang of langs) {
      if (lang.startsWith("vi")) {
        return "vi";
      }
    }
    // If client requested English or any non-Vietnamese, provide English
    return "en";
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static assets, api routes, next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a supported locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract current locale from path and sync cookie
    const currentLocale = pathname.split("/")[1];
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", currentLocale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return response;
  }

  // Redirect to localized path
  const targetLocale = getPreferredLocale(request);
  const redirectUrl = new URL(`/${targetLocale}${pathname === "/" ? "" : pathname}`, request.url);

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set("NEXT_LOCALE", targetLocale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
