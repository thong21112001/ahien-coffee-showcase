import { z } from "zod";

export const bookingSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự" })
    .max(100, { message: "Họ và tên không được vượt quá 100 ký tự" }),
  phone: z
    .string()
    .min(9, { message: "Số điện thoại không hợp lệ" })
    .max(15, { message: "Số điện thoại không hợp lệ" })
    .regex(/^[0-9+--\s()]+$/, { message: "Số điện thoại chỉ chứa các chữ số" }),
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập Email" })
    .email({ message: "Địa chỉ Email không đúng định dạng" }),
  number_of_guests: z
    .number({ message: "Số lượng khách phải là chữ số" })
    .min(1, { message: "Số lượng khách tối thiểu là 1 người" })
    .max(100, { message: "Số lượng khách tối đa là 100 người" }),
  date: z.string().min(1, { message: "Vui lòng chọn ngày đặt bàn" }),
  time: z.string().min(1, { message: "Vui lòng chọn giờ đặt bàn" }),
  note: z.string().optional(),
});

export type BookingSchemaInput = z.infer<typeof bookingSchema>;
