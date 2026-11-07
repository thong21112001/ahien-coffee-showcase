import { NextRequest, NextResponse } from "next/server.js";
import { getAdminSession } from "../../../../server/auth/admin-auth.ts";

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminSession(request);

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Profile route error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống khi tải thông tin quản trị." },
      { status: 500 }
    );
  }
}

