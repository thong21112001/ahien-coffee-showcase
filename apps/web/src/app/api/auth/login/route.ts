import { NextRequest, NextResponse } from "next/server.js";
import { prisma } from "../../../../server/db/prisma.ts";
import {
  comparePassword,
  signAdminToken,
  setAdminSessionCookie,
} from "../../../../server/auth/admin-auth.ts";

// Login rate limiting: IP -> [timestamp, ...]
const loginAttemptMap = new Map<string, { attempts: number; lockedUntil?: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_PERIOD_MS = 5 * 60 * 1000; // 5 minutes

function checkLoginRateLimit(ip: string): { allowed: boolean; remainingLockoutSeconds?: number } {
  const now = Date.now();
  const record = loginAttemptMap.get(ip);

  if (!record) return { allowed: true };

  if (record.lockedUntil && record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingLockoutSeconds: remainingSeconds };
  }

  if (record.lockedUntil && record.lockedUntil <= now) {
    // Lockout expired, reset
    loginAttemptMap.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

function recordFailedLogin(ip: string) {
  const now = Date.now();
  const record = loginAttemptMap.get(ip) || { attempts: 0 };
  record.attempts += 1;

  if (record.attempts >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_PERIOD_MS;
  }

  loginAttemptMap.set(ip, record);
}

function clearFailedLogins(ip: string) {
  loginAttemptMap.delete(ip);
}

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // 1. Check rate limit
    const rateCheck = checkLoginRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Quá nhiều lần thử đăng nhập thất bại. Vui lòng thử lại sau ${rateCheck.remainingLockoutSeconds} giây.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse body
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập đầy đủ Email và Mật khẩu!" },
        { status: 400 }
      );
    }

    // 3. Find admin in database or environment fallback
    const inputEmail = String(email).trim().toLowerCase();
    const inputPassword = String(password);

    const envAdminEmail = (
      process.env.ADMIN_EMAIL ||
      process.env.ADMIN_INITIAL_EMAIL ||
      "admin@ahiencoffee.vn"
    ).toLowerCase();
    const envAdminPassword =
      process.env.ADMIN_PASSWORD ||
      process.env.ADMIN_INITIAL_PASSWORD;

    let adminUser: {
      id: string;
      email: string;
      name: string;
      role: string;
      isActive: boolean;
    } | null = null;

    if (process.env.DATABASE_URL) {
      try {
        const dbAdmin = await prisma.adminAccount.findUnique({
          where: { email: inputEmail },
        });

        if (dbAdmin && dbAdmin.isActive) {
          const isPasswordValid = await comparePassword(
            inputPassword,
            dbAdmin.passwordHash
          );
          if (isPasswordValid) {
            adminUser = {
              id: dbAdmin.id,
              email: dbAdmin.email,
              name: dbAdmin.name,
              role: dbAdmin.role,
              isActive: dbAdmin.isActive,
            };
          }
        }
      } catch (dbErr) {
        console.warn(
          "Prisma admin lookup encountered error, checking env credentials fallback:",
          dbErr
        );
      }
    }

    // Fallback: Check environment-configured admin credentials
    if (!adminUser && envAdminPassword && inputEmail === envAdminEmail) {
      if (inputPassword === envAdminPassword) {
        adminUser = {
          id: "admin-system-id",
          email: envAdminEmail,
          name: "Admin A Hiền",
          role: "ADMIN",
          isActive: true,
        };
      }
    }

    if (!adminUser) {
      recordFailedLogin(clientIp);
      return NextResponse.json(
        { success: false, message: "Email hoặc mật khẩu không chính xác!" },
        { status: 401 }
      );
    }

    // 4. Success -> Clear failed attempts & Generate Session
    clearFailedLogins(clientIp);

    const token = signAdminToken({
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
    });

    const response = NextResponse.json({
      success: true,
      message: "Đăng nhập thành công!",
      data: {
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role,
          isActive: adminUser.isActive,
        },
        accessToken: token,
      },
    });

    // Set secure HttpOnly cookie
    setAdminSessionCookie(response, token);

    return response;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { success: false, message: "Đã xảy ra lỗi hệ thống khi đăng nhập." },
      { status: 500 }
    );
  }
}

