import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { hashPassword } from "@/server/auth/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const existingAdminCount = await prisma.adminAccount.count();

    // Nếu đã tồn tại admin, yêu cầu khóa bí mật khởi tạo hệ thống
    if (existingAdminCount > 0) {
      const bootstrapSecretHeader = request.headers.get("x-bootstrap-secret");
      const configuredSecret = process.env.ADMIN_BOOTSTRAP_SECRET;

      if (!configuredSecret || bootstrapSecretHeader !== configuredSecret) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Hệ thống đã có tài khoản Quản trị viên. Hành động khởi tạo bị từ chối.",
          },
          { status: 403 }
        );
      }
    }

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || String(password).length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Vui lòng cung cấp email hợp lệ và mật khẩu tối thiểu 8 ký tự.",
        },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(String(password));

    // Khởi tạo hoặc cập nhật tài khoản Admin
    const admin = await prisma.adminAccount.upsert({
      where: { email: String(email).trim().toLowerCase() },
      update: {
        passwordHash,
        name: name || "Admin A Hiền",
        isActive: true,
      },
      create: {
        email: String(email).trim().toLowerCase(),
        name: name || "Admin A Hiền",
        passwordHash,
        role: "ADMIN",
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Khởi tạo tài khoản Quản trị viên A Hiền Coffee thành công!",
      data: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("Admin bootstrap error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống khi khởi tạo tài khoản quản trị." },
      { status: 500 }
    );
  }
}

