import test from "node:test";
import assert from "node:assert";
import { NextRequest } from "next/server.js";
import {
  signAdminToken,
  verifyAdminToken,
  hashPassword,
  comparePassword,
} from "../server/auth/admin-auth.ts";
import { POST as handleLogin } from "../app/api/auth/login/route.ts";
import { GET as handleProfile } from "../app/api/auth/profile/route.ts";
import { POST as handleLogout } from "../app/api/auth/logout/route.ts";

test("Admin Auth: signs and verifies JWT session token accurately", () => {
  const adminData = {
    id: "admin-uuid-001",
    email: "admin@ahiencoffee.vn",
    name: "Admin A Hiền",
  };

  const token = signAdminToken(adminData);
  assert.ok(token && typeof token === "string", "Token must be a non-empty string");

  const verified = verifyAdminToken(token);
  assert.ok(verified, "Token must verify successfully");
  assert.strictEqual(verified.sub, adminData.id);
  assert.strictEqual(verified.email, adminData.email);
  assert.strictEqual(verified.role, "ADMIN");
});

test("Admin Auth: rejects tampered or malformed JWT token", () => {
  const adminData = {
    id: "admin-uuid-002",
    email: "admin2@ahiencoffee.vn",
    name: "Admin Test",
  };

  const token = signAdminToken(adminData);
  // Tamper with payload
  const parts = token.split(".");
  const tamperedToken = `${parts[0]}.${parts[1]}tampered.${parts[2]}`;

  const verified = verifyAdminToken(tamperedToken);
  assert.strictEqual(verified, null, "Tampered token must be rejected");

  const malformed = verifyAdminToken("invalid.token");
  assert.strictEqual(malformed, null, "Malformed token must be rejected");
});

test("Admin Auth: hashes and compares password correctly with bcrypt", async () => {
  const plainPassword = "AHienSecurePassword@2026";
  const hash = await hashPassword(plainPassword);

  assert.ok(hash && hash.startsWith("$2"), "Bcrypt hash must start with $2");
  assert.notStrictEqual(hash, plainPassword, "Hash must not equal plaintext");

  const isMatch = await comparePassword(plainPassword, hash);
  assert.strictEqual(isMatch, true, "Correct password must match");

  const isWrong = await comparePassword("WrongPassword123", hash);
  assert.strictEqual(isWrong, false, "Wrong password must not match");
});

test("Admin Auth Login Route: rejects invalid credentials with 401", async () => {
  const req = new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: "admin@ahiencoffee.vn",
      password: "CompletelyWrongPassword123",
    }),
    headers: { "content-type": "application/json" },
  });

  const res = await handleLogin(req);
  assert.strictEqual(res.status, 401);
  const data = await res.json();
  assert.strictEqual(data.success, false);
});

test("Admin Auth Login Route: successfully logs in with valid credentials and sets HttpOnly cookie", async () => {
  // Ensure test environment credentials match
  process.env.ADMIN_EMAIL = "admin@ahiencoffee.vn";
  process.env.ADMIN_PASSWORD = "AHienCoffee@1986";
  process.env.ADMIN_JWT_SECRET = "ahien-coffee-admin-secret-2026-heritage-secure-key";

  const req = new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: "admin@ahiencoffee.vn",
      password: "AHienCoffee@1986",
    }),
    headers: { "content-type": "application/json" },
  });

  const res = await handleLogin(req);
  assert.strictEqual(res.status, 200);

  const data = await res.json();
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.data.user.email, "admin@ahiencoffee.vn");
  assert.strictEqual(data.data.user.role, "ADMIN");
  assert.ok(data.data.accessToken, "Should return JWT access token");

  const cookieHeader = res.headers.get("set-cookie");
  assert.ok(cookieHeader && cookieHeader.includes("ahien_admin_session="), "Must set session cookie");

  // Verify profile access with returned token
  const profileReq = new NextRequest("http://localhost:3000/api/auth/profile", {
    method: "GET",
    headers: { authorization: `Bearer ${data.data.accessToken}` },
  });
  const profileRes = await handleProfile(profileReq);
  assert.strictEqual(profileRes.status, 200);
  const profileData = await profileRes.json();
  assert.strictEqual(profileData.data.email, "admin@ahiencoffee.vn");

  // Verify logout
  const logoutRes = await handleLogout();
  assert.strictEqual(logoutRes.status, 200);
  const logoutCookie = logoutRes.headers.get("set-cookie");
  assert.ok(logoutCookie && logoutCookie.includes("Max-Age=0"), "Logout must clear session cookie");
});
