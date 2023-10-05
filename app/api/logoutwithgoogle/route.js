import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request) {
  //Remove the value and expire the cookie
  const options = {
    name: process.env.COOKIE_SESSION_NAME,
    value: "",
    maxAge: -1,
  };

  cookies().set(options);
  return NextResponse.json({}, { status: 200 });
}