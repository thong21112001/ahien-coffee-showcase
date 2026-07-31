import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập Email" })
    .email({ message: "Địa chỉ Email không đúng định dạng" }),
  password: z
    .string()
    .min(4, { message: "Mật khẩu phải có ít nhất 4 ký tự" }),
});

export type LoginSchemaInput = z.infer<typeof loginSchema>;
