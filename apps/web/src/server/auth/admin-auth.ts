import type { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../db/prisma.ts";

export const ADMIN_COOKIE_NAME = "ahien_admin_session";
const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

function getJwtSecret(): string {
  return (
    process.env.ADMIN_JWT_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "ahien-coffee-admin-secret-2026-heritage-secure-key"
  );
}

export interface AdminPayload {
  sub: string;
  email: string;
  name: string;
  role: string;
  exp: number;
  iat: number;
}

/**
 * Tạo token JWT ký HMAC-SHA256 bảo mật sử dụng node:crypto
 */
export function signAdminToken(admin: { id: string; email: string; name: string }): string {
  const secret = getJwtSecret();
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminPayload = {
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    role: "ADMIN",
    iat: now,
    exp: now + SESSION_DURATION_SECONDS,
  };

  const headerB64 = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${headerB64}.${payloadB64}`)
    .digest("base64url");

  return `${headerB64}.${payloadB64}.${signature}`;
}

/**
 * Xác thực và giải mã token JWT
 */
export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, signature] = parts;

    const secret = getJwtSecret();
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(`${headerB64}.${payloadB64}`)
      .digest("base64url");

    // Timing-safe comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    const payload: AdminPayload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8")
    );

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Token expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Đặt cookie session HttpOnly bảo mật cho Admin
 */
export function setAdminSessionCookie(response: NextResponse, token: string): void {
  const isProduction = process.env.NODE_ENV === "production";

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

/**
 * Xóa cookie session khi Admin đăng xuất
 */
export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

/**
 * Kiểm tra xác thực Admin từ Request
 */
export async function getAdminSession(request: NextRequest) {
  // 1. Kiểm tra cookie
  let token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  // 2. Kiểm tra header Authorization nếu có (hỗ trợ API client)
  if (!token) {
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) return null;

  const payload = verifyAdminToken(token);
  if (!payload) return null;

  // Kiểm tra tài khoản vẫn còn active trong database nếu đã cấu hình DATABASE_URL
  if (process.env.DATABASE_URL) {
    try {
      const admin = await prisma.adminAccount.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
        },
      });

      if (!admin || !admin.isActive) return null;

      return admin;
    } catch (err) {
      console.warn(
        "Database lookup in getAdminSession failed, falling back to verified JWT payload:",
        err
      );
    }
  }

  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role,
    isActive: true,
  };
}

/**
 * Hash mật khẩu bằng bcrypt
 */
export async function hashPassword(plainText: string): Promise<string> {
  return await bcrypt.hash(plainText, 12);
}

/**
 * Đối chiếu mật khẩu bằng bcrypt
 */
export async function comparePassword(plainText: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plainText, hash);
}
