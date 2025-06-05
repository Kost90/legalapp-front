import {NextRequest, NextResponse} from "next/server";

let locales = ["ua", "en"];
let defaultLocale = "ua";

function getLocale(request: NextRequest) {
    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        "/((?!_next).*)",
    ],
};