import { NextRequest, NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/server/schemas/contact.schema";
import { contactRepository } from "@/server/repositories/contact.repository";

// Simple in-memory rate limiting map: ip -> timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Quý khách đã gửi yêu cầu quá nhanh. Vui lòng đợi trong giây lát và thử lại.",
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    const body = await request.json();
    const parseResult = contactSubmissionSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMsg =
        parseResult.error.issues[0]?.message ||
        "Dữ liệu gửi lên không hợp lệ. Vui lòng kiểm tra lại.";
      return NextResponse.json(
        { success: false, message: errorMsg, errors: parseResult.error.format() },
        { status: 400 }
      );
    }

    const input = parseResult.data;

    // 3. Honeypot check (Bẫy bot spam)
    if (input.botField && input.botField.length > 0) {
      // Silently accept bot submission without persisting
      return NextResponse.json({
        success: true,
        message: "Cảm ơn Quý khách! Chúng tôi đã ghi nhận thông tin liên hệ.",
      });
    }

    // 4. Persistence in PostgreSQL via Transaction
    const userAgent = request.headers.get("user-agent") || undefined;
    const contact = await contactRepository.createContactWithConsent(input, {
      clientIp,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Gửi liên hệ thành công! A Hiền Coffee sẽ liên hệ xác nhận trong thời gian sớm nhất.",
        data: {
          id: contact.id,
          createdAt: contact.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Hệ thống đang bận hoặc có lỗi xảy ra. Quý khách vui lòng thử lại sau ít phút hoặc liên hệ trực tiếp qua hotline 0367 262 415.",
      },
      { status: 500 }
    );
  }
}

