# THIẾT LẬP VÀ VẬN HÀNH NEON POSTGRESQL VỚI PRISMA
## Production Database Architecture for A Hiền Coffee

---

## 1. TỔNG QUAN HẠ TẦNG DỮ LIỆU NEON

Dự án sử dụng **Neon Serverless PostgreSQL** làm cơ sở dữ liệu sản xuất duy nhất:
- **Serverless Compute:** Tự động mở rộng khi có lượng truy cập tăng và tự ngắt khi không tải để tiết kiệm tối đa chi phí.
- **Connection Pooling:** Sử dụng tích hợp PgBouncer (cổng 5432) để xử lý hàng ngàn kết nối đồng thời từ Vercel Serverless Functions mà không gây cạn kiệt connection pool.
- **Branching:** Hỗ trợ tạo nhánh database độc lập cho từng môi trường (Development, Preview, Production).

---

## 2. BIẾN MÔI TRƯỜNG KẾT NỐI (CONNECTION STRINGS)

Trong dự án Next.js, cấu hình 2 biến môi trường sau trong Vercel Project Settings:

```env
# 1. DATABASE_URL: Đường dẫn kết nối qua Neon Connection Pooler (Dùng cho ứng dụng Next.js runtime)
DATABASE_URL="postgresql://[user]:[password]@[neon-project-id]-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"

# 2. DIRECT_URL: Đường dẫn kết nối trực tiếp đến PostgreSQL (Dùng cho Prisma CLI Migrations)
DIRECT_URL="postgresql://[user]:[password]@[neon-project-id].ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

> [!IMPORTANT]
> **Quy Tắc An Toàn:**
> - Tuyệt đối không thêm tiền tố `NEXT_PUBLIC_` vào `DATABASE_URL` hoặc `DIRECT_URL`.
> - Hai biến môi trường này chỉ được phép đọc tại máy chủ (Server-side only).
> - Phân tách rõ ràng giữa nhánh Production và Preview để tránh làm xáo trộn dữ liệu khách hàng thật.

---

## 3. QUY TRÌNH THỰC HIỆN PRISMA MIGRATIONS

### 3.1. Trong Môi Trường Phát Triển (Development)
Khi cần điều chỉnh schema:
```bash
npm --workspace=@ahien/web exec prisma -- migrate dev --name [ten_thay_doi]
```

### 3.2. Trong Môi Trường Production / CI/CD (Vercel)
Khi triển khai lên Vercel Production, thực thi lệnh migrate an toàn (không phá hủy dữ liệu):
```bash
npm --workspace=@ahien/web exec prisma -- migrate deploy
```

> [!CAUTION]
> **Nghiêm Cấm:**
> - Tuyệt đối không chạy lệnh `prisma migrate reset` hoặc `prisma db push --force-reset` trên cơ sở dữ liệu Production của khách hàng.
> - Không thực thi các câu lệnh `DROP TABLE` thủ công ngoài quy trình migration có kiểm soát.

---

## 4. TỐI ƯU HÓA PRISMA CLIENT TRONG NEXT.JS SERVERLESS

Tệp `src/server/db/prisma.ts` đã được cấu hình cơ chế Singleton:
```typescript
import { PrismaClient } from "@prisma/client";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  globalThis.prismaGlobal ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
```
Cơ chế này ngăn ngừa việc khởi tạo kết nối mới sau mỗi lần HMR (Hot Module Replacement) trong lúc phát triển và tối ưu hóa vòng đời kết nối trong môi trường Vercel Functions.

