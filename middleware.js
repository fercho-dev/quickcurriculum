// validate user session

import { NextResponse } from "next/server";

export async function middleware(request, response) {

  const session = request.cookies.get(process.env.COOKIE_SESSION_NAME);

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //Call the authentication endpoint
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: {
      Cookie: `${process.env.COOKIE_SESSION_NAME}=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: ["/templates/:path*", "/resume/:path*"],
};