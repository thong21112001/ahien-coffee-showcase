import { NextRequest, NextResponse } from "next/server";
import { dataSubjectRequestSchema } from "@/server/schemas/contact.schema";
import { contactRepository } from "@/server/repositories/contact.repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = dataSubjectRequestSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMsg =
        parseResult.error.issues[0]?.message ||
        "Dữ liệu yêu cầu không hợp lệ. Vui lòng kiểm tra lại.";
      return NextResponse.json(
        { success: false, message: errorMsg, errors: parseResult.error.format() },
        { status: 400 }
      );
    }

    const reqRecord = await contactRepository.createDataSubjectRequest(parseResult.data);

    return NextResponse.json(
      {
        success: true,
        message:
          "Yêu cầu về quyền dữ liệu cá nhân của Quý khách đã được tiếp nhận. Đội ngũ A Hiền Coffee sẽ liên hệ xác minh và phản hồi trong vòng 72 giờ làm việc.",
        data: {
          requestId: reqRecord.id,
          createdAt: reqRecord.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating data subject request:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Không thể gửi yêu cầu vào lúc này. Quý khách vui lòng thử lại hoặc liên hệ email quangthong211101@gmail.com.",
      },
      { status: 500 }
    );
  }
}

