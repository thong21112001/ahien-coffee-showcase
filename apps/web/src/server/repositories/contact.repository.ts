import { prisma } from "../db/prisma.ts";
import type { ContactSubmissionInput, DataSubjectRequestInput } from "../schemas/contact.schema.ts";
import crypto from "node:crypto";

export interface ContactFilters {
  search?: string;
  status?: string;
  inquiryType?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export const CURRENT_POLICY_VERSION = "v1.0.0-2026.01";
export const CURRENT_CONSENT_VERSION = "consent_v1";

const SAMPLE_CONTACTS = [
  {
    id: "sample-contact-001",
    fullName: "Nguyễn Văn An",
    phone: "0905123456",
    email: "an.nguyen@example.com",
    message: "Tôi muốn đặt bàn 4 người vào tối thứ 7 lúc 19h để thử cà phê phin di sản.",
    inquiryType: "TABLE_RESERVATION",
    source: "WEBSITE_CONTACT_FORM",
    status: "NEW",
    createdAt: new Date(Date.now() - 3600000 * 2),
    updatedAt: new Date(Date.now() - 3600000 * 2),
    consentRecords: [
      {
        id: "sample-consent-001",
        contactId: "sample-contact-001",
        purpose: "OPERATIONAL_INQUIRY",
        status: "GRANTED",
        policyVersion: CURRENT_POLICY_VERSION,
        consentVersion: CURRENT_CONSENT_VERSION,
        consentedAt: new Date(Date.now() - 3600000 * 2),
      },
      {
        id: "sample-consent-002",
        contactId: "sample-contact-001",
        purpose: "MARKETING_COMMUNICATION",
        status: "GRANTED",
        policyVersion: CURRENT_POLICY_VERSION,
        consentVersion: CURRENT_CONSENT_VERSION,
        consentedAt: new Date(Date.now() - 3600000 * 2),
      },
    ],
    activities: [
      {
        id: "sample-act-001",
        contactId: "sample-contact-001",
        activityType: "STATUS_CHANGE",
        description: "Khách hàng gửi liên hệ / đặt bàn trực tuyến thành công.",
        performedBy: "Hệ thống A Hiền Coffee",
        createdAt: new Date(Date.now() - 3600000 * 2),
      },
    ],
    _count: { activities: 1 },
  },
  {
    id: "sample-contact-002",
    fullName: "Trần Thị Mai",
    phone: "0918765432",
    email: "mai.tran@example.com",
    message: "Tư vấn giúp tôi các dòng hạt Robusta chế biến mật ong (Honey Process).",
    inquiryType: "COFFEE_PRODUCT",
    source: "WEBSITE_CONTACT_FORM",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 3600000 * 5),
    consentRecords: [
      {
        id: "sample-consent-003",
        contactId: "sample-contact-002",
        purpose: "OPERATIONAL_INQUIRY",
        status: "GRANTED",
        policyVersion: CURRENT_POLICY_VERSION,
        consentVersion: CURRENT_CONSENT_VERSION,
        consentedAt: new Date(Date.now() - 86400000),
      },
    ],
    activities: [
      {
        id: "sample-act-002",
        contactId: "sample-contact-002",
        activityType: "PHONE_CALL",
        description: "Đã gọi điện tư vấn dòng cà phê A Hiền Heritage Blend.",
        performedBy: "Admin A Hiền",
        createdAt: new Date(Date.now() - 3600000 * 5),
      },
    ],
    _count: { activities: 1 },
  },
];

export const contactRepository = {
  /**
   * Tạo mới liên hệ kèm bản ghi đồng ý xử lý dữ liệu trong 1 Transaction toàn vẹn (Atomic Transaction)
   */
  async createContactWithConsent(
    input: ContactSubmissionInput,
    clientMetadata?: { clientIp?: string; userAgent?: string }
  ) {
    // Tạo mã băm ẩn danh từ IP để phục vụ kiểm toán mà không lưu IP thô
    const ipHash = clientMetadata?.clientIp
      ? crypto
          .createHash("sha256")
          .update(clientMetadata.clientIp + (process.env.IP_SALT || "ahien-salt"))
          .digest("hex")
      : null;

    const serverNow = new Date();

    return await prisma.$transaction(async (tx) => {
      // 1. Tạo thông tin Contact
      const contact = await tx.contact.create({
        data: {
          fullName: input.fullName,
          phone: input.phone,
          email: input.email || null,
          message: input.message || null,
          inquiryType: input.inquiryType,
          source: "WEBSITE_CONTACT_FORM",
          status: "NEW",
          createdAt: serverNow,
          updatedAt: serverNow,
        },
      });

      // 2. Ghi nhận sự đồng ý BẮT BUỘC: Xử lý thông tin liên hệ / đặt bàn
      await tx.consentRecord.create({
        data: {
          contactId: contact.id,
          purpose: "OPERATIONAL_INQUIRY",
          status: "GRANTED",
          policyVersion: CURRENT_POLICY_VERSION,
          consentVersion: CURRENT_CONSENT_VERSION,
          consentedAt: serverNow,
          ipHash,
        },
      });

      // 3. Ghi nhận sự đồng ý TÙY CHỌN: Nhận thông tin tiếp thị / khuyến mãi (nếu khách hàng tích chọn)
      if (input.consentMarketing) {
        await tx.consentRecord.create({
          data: {
            contactId: contact.id,
            purpose: "MARKETING_COMMUNICATION",
            status: "GRANTED",
            policyVersion: CURRENT_POLICY_VERSION,
            consentVersion: CURRENT_CONSENT_VERSION,
            consentedAt: serverNow,
            ipHash,
          },
        });
      }

      // 4. Ghi nhận nhật ký hoạt động khởi tạo ban đầu
      await tx.contactActivity.create({
        data: {
          contactId: contact.id,
          activityType: "STATUS_CHANGE",
          description: "Khách hàng gửi liên hệ / đặt bàn trực tuyến thành công.",
          performedBy: "Hệ thống A Hiền Coffee",
          createdAt: serverNow,
        },
      });

      return contact;
    });
  },

  /**
   * Lấy danh sách liên hệ có phân trang, tìm kiếm và bộ lọc đa tiêu chí
   */
  async getContacts(filters: ContactFilters = {}) {
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(filters.limit) || 15));
    const skip = (page - 1) * limit;

    // Xây dựng điều kiện WHERE an toàn
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
      if (filters.startDate) {
        dateFilter.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        // Cuối ngày endDate
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);
        dateFilter.lte = end;
      }
      whereClause.createdAt = dateFilter;
    }

    const [items, total] = await Promise.all([
      prisma.contact.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          consentRecords: {
            orderBy: { consentedAt: "desc" },
          },
          _count: {
            select: { activities: true },
          },
        },
      }),
      prisma.contact.count({ where: whereClause }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  /**
   * Lấy chi tiết liên hệ theo ID kèm toàn bộ lịch sử đồng ý và hoạt động
   */
  async getContactById(id: string) {
    return await prisma.contact.findUnique({
      where: { id },
      include: {
        consentRecords: {
          orderBy: { consentedAt: "desc" },
        },
        activities: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  },

  /**
   * Cập nhật trạng thái xử lý liên hệ và lưu log hoạt động
   */
  async updateContactStatus(
    id: string,
    status: string,
    note?: string,
    performedBy: string = "Admin"
  ) {
    return await prisma.$transaction(async (tx) => {
      const updated = await tx.contact.update({
        where: { id },
        data: {
          status,
          updatedAt: new Date(),
        },
      });

      await tx.contactActivity.create({
        data: {
          contactId: id,
          activityType: "STATUS_CHANGE",
          description: `Chuyển trạng thái sang "${status}".${note ? ` Ghi chú: ${note}` : ""}`,
          performedBy,
        },
      });

      return updated;
    });
  },

  /**
   * Thêm ghi chú chăm sóc khách hàng
   */
  async addActivity(
    contactId: string,
    activityType: string,
    description: string,
    performedBy: string = "Admin"
  ) {
    return await prisma.contactActivity.create({
      data: {
        contactId,
        activityType,
        description,
        performedBy,
      },
    });
  },

  /**
   * Rút lại sự đồng ý (Bổ sung bản ghi mới, không ghi đè lịch sử cũ)
   */
  async recordConsentWithdrawal(
    contactId: string,
    purpose: string,
    performedBy: string = "Khách hàng"
  ) {
    const serverNow = new Date();

    return await prisma.$transaction(async (tx) => {
      const withdrawal = await tx.consentRecord.create({
        data: {
          contactId,
          purpose,
          status: "WITHDRAWN",
          policyVersion: CURRENT_POLICY_VERSION,
          consentVersion: CURRENT_CONSENT_VERSION,
          consentedAt: serverNow,
          withdrawnAt: serverNow,
        },
      });

      await tx.contactActivity.create({
        data: {
          contactId,
          activityType: "STATUS_CHANGE",
          description: `Rút lại sự đồng ý cho mục đích "${purpose}".`,
          performedBy,
          createdAt: serverNow,
        },
      });

      return withdrawal;
    });
  },

  /**
   * Tiếp nhận yêu cầu thực thi quyền chủ thể dữ liệu (DSR)
   */
  async createDataSubjectRequest(input: DataSubjectRequestInput) {
    return await prisma.dataSubjectRequest.create({
      data: {
        requestType: input.requestType,
        requesterName: input.requesterName,
        requesterPhone: input.requesterPhone,
        requesterEmail: input.requesterEmail,
        details: input.details,
        status: "SUBMITTED",
      },
    });
  },

  /**
   * Danh sách yêu cầu DSR
   */
  async getDataSubjectRequests() {
    return await prisma.dataSubjectRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  /**
   * Thống kê KPI tổng quan cho Dashboard
   */
  async getDashboardStats() {
    const [totalContacts, newContacts, followingUp, resolved, marketingConsents] =
      await Promise.all([
        prisma.contact.count(),
        prisma.contact.count({ where: { status: "NEW" } }),
        prisma.contact.count({ where: { status: "FOLLOWING_UP" } }),
        prisma.contact.count({ where: { status: "RESOLVED" } }),
        prisma.consentRecord.count({
          where: {
            purpose: "MARKETING_COMMUNICATION",
            status: "GRANTED",
          },
        }),
      ]);

    return {
      totalContacts,
      newContacts,
      followingUp,
      resolved,
      marketingConsents,
    };
  },
};

export default contactRepository;

