import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/server/auth/admin-auth";
import { excelExportService } from "@/server/services/excel/excel-export.service";

export async function GET(request: NextRequest) {
  try {
    // 1. Enforce Server-Side Admin Authorization
    const admin = await getAdminSession(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Truy cập bị từ chối. Vui lòng đăng nhập với quyền Quản trị viên." },
        { status: 401 }
      );
    }

    // 2. Extract Query Parameters
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;
    const inquiryType = searchParams.get("inquiryType") || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;

    // 3. Generate In-Memory Excel Workbook
    const fileBuffer = await excelExportService.generateContactsWorkbook({
      search,
      status,
      inquiryType,
      startDate,
      endDate,
    });

    // 4. Return Formatted Excel File
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const filename = `ahien-coffee-contacts-${dateStr}.xlsx`;

    return new Response(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Excel export error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống khi tạo và xuất file Excel." },
      { status: 500 }
    );
  }
}

