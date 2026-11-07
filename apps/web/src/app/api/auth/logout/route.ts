import { NextResponse } from "next/server.js";
import { clearAdminSessionCookie } from "../../../../server/auth/admin-auth.ts";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Đăng xuất thành công.",
  });

  clearAdminSessionCookie(response);
  return response;
}

