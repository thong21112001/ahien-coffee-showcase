import { prisma } from "../src/server/db/prisma.ts";
import { contactRepository } from "../src/server/repositories/contact.repository.ts";
import { hashPassword, comparePassword, signAdminToken } from "../src/server/auth/admin-auth.ts";
import { excelExportService } from "../src/server/services/excel/excel-export.service.ts";

async function runEndToEndTest() {
  console.log("==================================================");
  console.log(" A HIỀN COFFEE — NEON POSTGRESQL E2E PROOF");
  console.log(" Branch: production | Project: odd-forest-68700777");
  console.log("==================================================");

  // 1. Test Database Connectivity
  console.log("\n[1/5] Testing Neon Lakebase Postgres Connection...");
  const adminCount = await prisma.adminAccount.count();
  console.log(`✓ Neon Postgres connected successfully! Admin accounts in DB: ${adminCount}`);

  // 2. Test Admin Authentication against Neon DB
  console.log("\n[2/5] Testing Admin Authentication against Neon DB...");
  const admin = await prisma.adminAccount.findUnique({
    where: { email: "admin@ahiencoffee.vn" },
  });
  if (!admin) throw new Error("Admin account not found in Neon DB!");
  const isMatch = await comparePassword("AHienCoffee@1986", admin.passwordHash);
  if (!isMatch) throw new Error("Password verification against Neon DB failed!");
  const token = signAdminToken({ id: admin.id, email: admin.email, name: admin.name });
  console.log(`✓ Admin authenticated from Neon DB! Admin ID: ${admin.id}`);
  console.log(`✓ HMAC-SHA256 JWT Token generated: ${token.slice(0, 30)}...`);

  // 3. Test Contact Creation with Consent Records in Transaction
  console.log("\n[3/5] Testing Contact Creation with Atomic Consent in Neon DB...");
  const testPhone = `090${Math.floor(1000000 + Math.random() * 9000000)}`;
  const contact = await contactRepository.createContactWithConsent({
    fullName: "Khách Thử Nghiệm Neon",
    phone: testPhone,
    email: "test.neon@ahiencoffee.vn",
    inquiryType: "TABLE_RESERVATION",
    message: "Kiểm thử lưu trữ giao dịch Neon PostgreSQL thành công.",
    consentOperational: true,
    consentMarketing: true,
  }, { clientIp: "127.0.0.1", userAgent: "NeonE2ETest/1.0" });
  console.log(`✓ Contact created in Neon DB! ID: ${contact.id} | Phone: ${contact.phone}`);

  // 4. Test Fetching Contacts and Stats from Neon DB
  console.log("\n[4/5] Testing Contacts Query & Dashboard Stats from Neon DB...");
  const contactsList = await contactRepository.getContacts({ page: 1, limit: 5 });
  const stats = await contactRepository.getDashboardStats();
  console.log(`✓ Retrieved ${contactsList.items.length} contacts from Neon DB (Total: ${contactsList.total})`);
  console.log(`✓ Neon Dashboard Stats: Total=${stats.totalContacts}, New=${stats.newContacts}, Marketing=${stats.marketingConsents}`);

  // 5. Test Excel Generation from Live Neon Data
  console.log("\n[5/5] Testing Excel Export from Neon DB rows...");
  const workbookBuffer = await excelExportService.generateContactsWorkbook({ search: "" });
  console.log(`✓ Excel workbook generated from Neon DB! Buffer size: ${workbookBuffer.length} bytes`);

  // 6. Test Data Subject Request (DSR) in Neon DB
  console.log("\n[Bonus] Testing Data Subject Request (DSR) submission in Neon DB...");
  const dsr = await contactRepository.createDataSubjectRequest({
    requestType: "ACCESS",
    requesterName: "Khách DSR Test",
    requesterPhone: testPhone,
    requesterEmail: "test.neon@ahiencoffee.vn",
    details: "Yêu cầu kiểm tra thông tin cá nhân lưu trong Neon DB.",
  });
  console.log(`✓ DSR created in Neon DB! ID: ${dsr.id} | Status: ${dsr.status}`);

  console.log("\n==================================================");
  console.log(" ALL NEON POSTGRESQL SERVICES VERIFIED END-TO-END! ");
  console.log("==================================================");
}

runEndToEndTest()
  .catch((err) => {
    console.error("\n[E2E TEST FAILED]:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
