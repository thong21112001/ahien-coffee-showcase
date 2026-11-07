import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/server/auth/admin-auth";
import { contactRepository } from "@/server/repositories/contact.repository";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getAdminSession(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Yêu cầu quyền Quản trị viên." }, { status: 401 });
    }

    const { id } = await params;
    const contact = await contactRepository.getContactById(id);

    if (!contact) {
      return NextResponse.json({ success: false, message: "Không tìm thấy liên hệ." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    console.error("Get contact details error:", error);
    return NextResponse.json({ success: false, message: "Lỗi hệ thống khi tải thông tin liên hệ." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getAdminSession(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Yêu cầu quyền Quản trị viên." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, note } = body;

    if (!status) {
      return NextResponse.json({ success: false, message: "Vui lòng chọn trạng thái hợp lệ." }, { status: 400 });
    }

    const updated = await contactRepository.updateContactStatus(
      id,
      String(status),
      note ? String(note) : undefined,
      admin.name || "Admin"
    );

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công!",
      data: updated,
    });
  } catch (error) {
    console.error("Update contact error:", error);
    return NextResponse.json({ success: false, message: "Lỗi hệ thống khi cập nhật trạng thái." }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getAdminSession(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Yêu cầu quyền Quản trị viên." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { activityType, description } = body;

    if (!description) {
      return NextResponse.json({ success: false, message: "Nội dung ghi chú không được để trống." }, { status: 400 });
    }

    const activity = await contactRepository.addActivity(
      id,
      activityType || "NOTE_ADDED",
      String(description),
      admin.name || "Admin"
    );

    return NextResponse.json({
      success: true,
      message: "Thêm ghi chú chăm sóc thành công!",
      data: activity,
    });
  } catch (error) {
    console.error("Add activity error:", error);
    return NextResponse.json({ success: false, message: "Lỗi hệ thống khi thêm ghi chú." }, { status: 500 });
  }
}

