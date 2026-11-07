import { z } from "zod";

export const contactSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(100, "Họ và tên không được vượt quá 100 ký tự"),
  phone: z
    .string()
    .trim()
    .min(9, "Số điện thoại phải có ít nhất 9 chữ số")
    .max(15, "Số điện thoại không được vượt quá 15 ký tự")
    .regex(/^[0-9+--\s()]+$/, "Số điện thoại chỉ được chứa chữ số và ký tự hợp lệ"),
  email: z
    .string()
    .trim()
    .email("Địa chỉ Email không đúng định dạng")
    .optional()
    .or(z.literal("")),
  inquiryType: z
    .enum([
      "TABLE_RESERVATION",
      "GENERAL_INQUIRY",
      "COFFEE_PRODUCT",
      "EVENT_WORKSHOP",
    ])
    .default("GENERAL_INQUIRY"),
  message: z
    .string()
    .trim()
    .max(1000, "Nội dung không được vượt quá 1000 ký tự")
    .optional()
    .or(z.literal("")),
  consentOperational: z.boolean().refine((val) => val === true, {
    message:
      "Quý khách vui lòng xác nhận đồng ý cho phép xử lý dữ liệu để chúng tôi liên hệ hỗ trợ.",
  }),
  consentMarketing: z.boolean().default(false),
  // Anti-spam honeypot field (should remain empty if submitted by human)
  botField: z.string().optional().or(z.literal("")),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;

// Data Subject Request Schema
export const dataSubjectRequestSchema = z.object({
  requestType: z.enum([
    "ACCESS",
    "CORRECTION",
    "DELETION",
    "RESTRICTION",
    "WITHDRAWAL",
  ]),
  requesterName: z.string().trim().min(2, "Vui lòng nhập họ và tên"),
  requesterPhone: z.string().trim().min(9, "Vui lòng nhập số điện thoại"),
  requesterEmail: z.string().trim().email("Vui lòng nhập địa chỉ email hợp lệ"),
  details: z.string().trim().min(5, "Vui lòng mô tả chi tiết yêu cầu của Quý khách"),
});

export type DataSubjectRequestInput = z.infer<typeof dataSubjectRequestSchema>;

