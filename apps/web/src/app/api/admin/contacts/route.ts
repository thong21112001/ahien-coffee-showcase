import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/server/auth/admin-auth";
import { contactRepository } from "@/server/repositories/contact.repository";

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminSession(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Yêu cầu quyền Quản trị viên." },
        { status: 401 }
      );
    }

    const { searchParams } = request.nextUrl;
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;
    const inquiryType = searchParams.get("inquiryType") || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 15;

    const [contactsResult, stats] = await Promise.all([
      contactRepository.getContacts({
        search,
        status,
        inquiryType,
        startDate,
        endDate,
        page,
        limit,
      }),
      contactRepository.getDashboardStats(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        ...contactsResult,
        stats,
      },
    });
  } catch (error) {
    console.error("Admin contacts API error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống khi tải danh sách liên hệ." },
      { status: 500 }
    );
  }
}

