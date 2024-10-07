import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import routes from "@/constants/routes";
import groups from "@/constants/groups";

export async function middleware(request: NextRequest) {
  const token = (await getToken({ req: request })) as {
    sub: string;
    username: string;
    groups: number[];
    is_staff: boolean;
    token: string;
    iat: number;
    exp: number;
    jti: string;
  };

  if (!token) {
    return NextResponse.redirect(new URL(routes.ROOT, request.url));
  }

  if (
    request.nextUrl.pathname.startsWith(routes.ADMIN) &&
    !token.groups.includes(groups.ADMIN)
  ) {
    return NextResponse.redirect(new URL(routes.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher:[
    "/admin",
    "/dashboard",
  ]
};
