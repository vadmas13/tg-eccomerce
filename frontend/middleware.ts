import { accessTokenCookieKey, routes } from "@shared/consts";
import { checkAdmin, setAdminHeader } from "@shared/utils";
import { NextRequest, NextResponse } from "next/server";

const protectedEndpoints = [
  routes.categories.url,
  routes.products.url,
  routes.settings.url,
  routes.orders.url,
];

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get(accessTokenCookieKey);
  const response = NextResponse.next();
  // TODO: compouse реализовать
  const res = await setAdminHeader(request, response, token?.value);
  const isAdmin = checkAdmin(res.headers);
  if (!isAdmin && protectedEndpoints.some((x) => request.url.includes(x))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return res;
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
