import ExcelJS from "exceljs";
import { prisma } from "../../db/prisma";
import { ContactFilters } from "../../repositories/contact.repository";

/**
 * Phòng chống tấn công chèn mã độc vào bảng tính (CSV/Formula Injection)
 */
function sanitizeForExcel(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value).trim();
  // Nếu chuỗi bắt đầu bằng các ký tự công thức Excel nguy hiểm, thêm dấu nháy đơn
  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str}`;
  }
  return str;
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const BRAND_HEADER_FILL: ExcelJS.Fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FF451A03" }, // Espresso brown
};

const BRAND_HEADER_FONT: Partial<ExcelJS.Font> = {
  name: "Calibri",
  size: 11,
  bold: true,
  color: { argb: "FFFFFFFF" },
};

export const excelExportService = {
  /**
   * Tạo workbook Excel chuyên nghiệp đa sheet từ dữ liệu PostgreSQL
   */
  async generateContactsWorkbook(filters: ContactFilters = {}): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "A Hiền Coffee - Hệ Thống Quản Trị";
    workbook.lastModifiedBy = "Admin A Hiền";
    workbook.created = new Date();
    workbook.modified = new Date();

    // 1. Lọc và lấy dữ liệu từ cơ sở dữ liệu
    const whereClause: Record<string, unknown> = {};

    if (filters.search) {
      whereClause.OR = [
        { fullName: { contains: filters.search, mode: "insensitive" } },
        { phone: { contains: filters.search } },
        { email: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    if (filters.status && filters.status !== "ALL") {
      whereClause.status = filters.status;
    }

    if (filters.inquiryType && filters.inquiryType !== "ALL") {
      whereClause.inquiryType = filters.inquiryType;
    }

    if (filters.startDate || filters.endDate) {
      const dateFilter: Record<string, Date> = {};
      if (filters.startDate) dateFilter.gte = new Date(filters.startDate);
      if (filters.endDate) {
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);
        dateFilter.lte = end;
      }
      whereClause.createdAt = dateFilter;
    }

    const contacts = await prisma.contact.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        consentRecords: {
          orderBy: { consentedAt: "desc" },
        },
        activities: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    // ==========================================
    // SHEET 1: CONTACTS (DANH SÁCH LIÊN HỆ)
    // ==========================================
    const sheet1 = workbook.addWorksheet("Danh Sách Liên Hệ", {
      views: [{ state: "frozen", ySplit: 1 }],
      properties: { tabColor: { argb: "FFD97706" } },
    });

    sheet1.columns = [
      { header: "Mã Liên Hệ (ID)", key: "id", width: 38 },
      { header: "Thời Gian Gửi", key: "createdAt", width: 20 },
      { header: "Họ và Tên", key: "fullName", width: 25 },
      { header: "Số Điện Thoại", key: "phone", width: 16 },
      { header: "Email", key: "email", width: 26 },
      { header: "Loại Yêu Cầu", key: "inquiryType", width: 24 },
      { header: "Nội Dung Yêu Cầu", key: "message", width: 45 },
      { header: "Trạng Thái", key: "status", width: 18 },
      { header: "Nguồn Gửi", key: "source", width: 22 },
      { header: "Cập Nhật Lần Cuối", key: "updatedAt", width: 20 },
    ];

    // Format header row
    const headerRow1 = sheet1.getRow(1);
    headerRow1.height = 26;
    headerRow1.eachCell((cell) => {
      cell.fill = BRAND_HEADER_FILL;
      cell.font = BRAND_HEADER_FONT;
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    contacts.forEach((c) => {
      sheet1.addRow({
        id: c.id,
        createdAt: formatDate(c.createdAt),
        fullName: sanitizeForExcel(c.fullName),
        phone: sanitizeForExcel(c.phone),
        email: sanitizeForExcel(c.email),
        inquiryType: c.inquiryType,
        message: sanitizeForExcel(c.message),
        status: c.status,
        source: c.source,
        updatedAt: formatDate(c.updatedAt),
      });
    });

    sheet1.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: 10 },
    };

    // ==========================================
    // SHEET 2: CONSENT RECORDS (BẰNG CHỨNG ĐỒNG Ý)
    // ==========================================
    const sheet2 = workbook.addWorksheet("Bằng Chứng Đồng Ý", {
      views: [{ state: "frozen", ySplit: 1 }],
      properties: { tabColor: { argb: "FF2563EB" } },
    });

    sheet2.columns = [
      { header: "Mã Đồng Ý (Consent ID)", key: "id", width: 38 },
      { header: "Mã Liên Hệ (Contact ID)", key: "contactId", width: 38 },
      { header: "Mục Đích Xử Lý", key: "purpose", width: 30 },
      { header: "Trạng Thái", key: "status", width: 15 },
      { header: "Phiên Bản Chính Sách", key: "policyVersion", width: 22 },
      { header: "Thời Điểm Đồng Ý", key: "consentedAt", width: 20 },
      { header: "Thời Điểm Rút Lại", key: "withdrawnAt", width: 20 },
      { header: "Mã Băm Kiểm Toán (IP Hash)", key: "ipHash", width: 32 },
    ];

    const headerRow2 = sheet2.getRow(1);
    headerRow2.height = 26;
    headerRow2.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF1E3A8A" }, // Dark blue
      };
      cell.font = BRAND_HEADER_FONT;
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    contacts.forEach((c) => {
      c.consentRecords.forEach((r) => {
        sheet2.addRow({
          id: r.id,
          contactId: r.contactId,
          purpose: r.purpose,
          status: r.status,
          policyVersion: r.policyVersion,
          consentedAt: formatDate(r.consentedAt),
          withdrawnAt: formatDate(r.withdrawnAt),
          ipHash: r.ipHash || "",
        });
      });
    });

    sheet2.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: 8 },
    };

    // ==========================================
    // SHEET 3: ACTIVITY HISTORY (LỊCH SỬ CHĂM SÓC)
    // ==========================================
    const sheet3 = workbook.addWorksheet("Lịch Sử Chăm Sóc", {
      views: [{ state: "frozen", ySplit: 1 }],
      properties: { tabColor: { argb: "FF059669" } },
    });

    sheet3.columns = [
      { header: "Mã Hoạt Động (ID)", key: "id", width: 38 },
      { header: "Mã Liên Hệ (Contact ID)", key: "contactId", width: 38 },
      { header: "Loại Hoạt Động", key: "activityType", width: 22 },
      { header: "Nội Dung Ghi Chú", key: "description", width: 45 },
      { header: "Người Thực Hiện", key: "performedBy", width: 22 },
      { header: "Thời Gian", key: "createdAt", width: 20 },
    ];

    const headerRow3 = sheet3.getRow(1);
    headerRow3.height = 26;
    headerRow3.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF064E3B" }, // Forest green
      };
      cell.font = BRAND_HEADER_FONT;
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    contacts.forEach((c) => {
      c.activities.forEach((a) => {
        sheet3.addRow({
          id: a.id,
          contactId: a.contactId,
          activityType: a.activityType,
          description: sanitizeForExcel(a.description),
          performedBy: a.performedBy,
          createdAt: formatDate(a.createdAt),
        });
      });
    });

    sheet3.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: 6 },
    };

    // Xuất ra Buffer an toàn trong bộ nhớ
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  },
};

export default excelExportService;

