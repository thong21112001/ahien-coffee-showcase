import test from "node:test";
import assert from "node:assert";
import ExcelJS from "exceljs";

function sanitizeForExcel(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value).trim();
  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str}`;
  }
  return str;
}

test("Excel Export: Formula injection sanitizer neutralizes malicious formula characters", () => {
  assert.strictEqual(sanitizeForExcel("=cmd|'/C calc'!A0"), "'=cmd|'/C calc'!A0");
  assert.strictEqual(sanitizeForExcel("+1234567890"), "'+1234567890");
  assert.strictEqual(sanitizeForExcel("-SUM(A1:A10)"), "'-SUM(A1:A10)");
  assert.strictEqual(sanitizeForExcel("@attacker.com"), "'@attacker.com");
  assert.strictEqual(sanitizeForExcel("Nguyễn Văn An"), "Nguyễn Văn An");
  assert.strictEqual(sanitizeForExcel("0367262415"), "0367262415");
});

test("Excel Export: Generates multi-sheet workbook with ExcelJS", async () => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "A Hiền Coffee";

  // Sheet 1: Contacts
  const sheet1 = workbook.addWorksheet("Danh Sách Liên Hệ", {
    views: [{ state: "frozen", ySplit: 1 }],
  });
  sheet1.columns = [
    { header: "Mã Liên Hệ (ID)", key: "id", width: 38 },
    { header: "Họ và Tên", key: "fullName", width: 25 },
    { header: "Số Điện Thoại", key: "phone", width: 16 },
    { header: "Loại Yêu Cầu", key: "inquiryType", width: 20 },
    { header: "Trạng Thái", key: "status", width: 15 },
  ];

  sheet1.addRow({
    id: "uuid-1234",
    fullName: "Nguyễn Văn Test",
    phone: "0367262415",
    inquiryType: "TABLE_RESERVATION",
    status: "NEW",
  });

  // Sheet 2: Consent Records
  const sheet2 = workbook.addWorksheet("Bằng Chứng Đồng Ý");
  sheet2.columns = [
    { header: "Mã Đồng Ý", key: "id", width: 38 },
    { header: "Mã Liên Hệ", key: "contactId", width: 38 },
    { header: "Mục Đích", key: "purpose", width: 25 },
    { header: "Trạng Thái", key: "status", width: 15 },
  ];

  sheet2.addRow({
    id: "consent-123",
    contactId: "uuid-1234",
    purpose: "OPERATIONAL_INQUIRY",
    status: "GRANTED",
  });

  const buffer = await workbook.xlsx.writeBuffer();
  assert.ok(buffer && buffer.byteLength > 0, "Workbook buffer must not be empty");

  // Read back and verify sheets
  const readWorkbook = new ExcelJS.Workbook();
  await readWorkbook.xlsx.load(buffer);

  assert.strictEqual(readWorkbook.worksheets.length, 2, "Workbook must contain 2 worksheets");
  assert.strictEqual(readWorkbook.worksheets[0].name, "Danh Sách Liên Hệ");
  assert.strictEqual(readWorkbook.worksheets[1].name, "Bằng Chứng Đồng Ý");
  assert.strictEqual(readWorkbook.worksheets[0].rowCount, 2, "Header row + 1 data row");
});

