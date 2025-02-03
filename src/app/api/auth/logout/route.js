import { NextResponse } from "next/server";

export const POST = () => {
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set("token", "", { maxAge: 0 }); // Remove token
  return response;
};
