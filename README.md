# A HIỀN COFFEE — SINCE 1986
## Nền Tảng Trình Diễn Thương Hiệu, Bảo Vệ Dữ Liệu Cá Nhân & Quản Trị Khách Hàng Đồng Bộ Excel

> **"Góc nhỏ A Hiền Coffee — Since 1986."**  
> Nơi hương cà phê phin thủ công lan tỏa trong ánh nắng dịu và những câu chuyện đời thường. Lưu giữ bản sắc Việt, nâng tầm hạt cà phê đặc sản Arabica Cầu Đất & Robusta Buôn Ma Thuột.

---

## 🌟 ĐẶC ĐIỂM NỔI BẬT (KEY ENHANCEMENTS)

1. **Nhận Diện Thương Hiệu A Hiền Coffee Chuẩn Mực:**
   - Xóa bỏ 100% dấu vết Next.js mặc định.
   - Logo vector Phin cà phê di sản truyền thống độc quyền (`ahien-logo.svg`, `ahien-mark.svg`).
   - Thiết kế hài hòa, hoài niệm, ấm áp với sắc nâu espresso và hổ phách hoàng kim.
   - Thẻ siêu dữ liệu SEO, OpenGraph và Favicon sắc nét trên mọi thiết bị.
2. **Tuân Thủ Pháp Luật Việt Nam Về Bảo Vệ Dữ Liệu Cá Nhân (Privacy-by-Design):**
   - Triển khai nghiêm ngặt theo **Luật Bảo vệ Dữ liệu Cá nhân số 91/2025/QH15** (hiệu lực từ 01/01/2026), **Nghị định số 356/2025/NĐ-CP** (thay thế Nghị định 13/2023/NĐ-CP), **Luật Giao dịch điện tử số 20/2023/QH15** và **Luật Bảo vệ quyền lợi người tiêu dùng 2023**.
   - Biểu mẫu lấy ý kiến đồng ý (Consent Management) minh bạch: Không sử dụng ô chọn sẵn, tách bạch độc lập mục đích vận hành và mục đích tiếp thị.
   - Lưu vết bằng chứng đồng ý bất biến (Consent Audit Trail) có dấu thời gian và băm ẩn danh IP.
   - Trang toàn văn Chính sách bảo vệ dữ liệu cá nhân (`/[locale]/chinh-sach-bao-mat`) và Modal xem nhanh.
   - Cổng tiếp nhận thực thi quyền của chủ thể dữ liệu (DSR Portal).
3. **Cơ Sở Dữ Liệu Neon PostgreSQL & Prisma ORM:**
   - Neon Serverless PostgreSQL là nguồn chân lý duy nhất (Single Source of Truth).
   - Quản lý quan hệ dữ liệu chuẩn hóa, transactional consistency chống mất mát dữ liệu.
4. **Bảng Điều Khiển Quản Trị Viên Duy Nhất (Single Admin Dashboard):**
   - Không mở đăng ký tự do; bảo vệ phiên bằng HttpOnly Cookie, HMAC-SHA256 JWT và mật khẩu băm Bcrypt.
   - Phòng chống brute-force đăng nhập bằng cơ chế Rate Limiting tự động.
   - Quản lý toàn diện liên hệ: Tìm kiếm, lọc theo ngày/loại/trạng thái (`NEW`, `CONTACTED`, `FOLLOWING_UP`, `RESOLVED`, `ARCHIVED`).
   - Ghi nhận lịch sử chăm sóc khách hàng và xem bằng chứng đồng ý pháp lý.
5. **Xuất Sổ Cái Báo Cáo Excel Chuyên Nghiệp (ExcelJS):**
   - Tạo file `.xlsx` đa sheet tức thì trong bộ nhớ (In-memory) theo yêu cầu.
   - Gồm 3 sheets: Danh Sách Liên Hệ, Bằng Chứng Đồng Ý, Lịch Sử Chăm Sóc.
   - Cơ chế phòng chống tấn công chèn mã độc vào bảng tính (Formula Injection Protection).

---

## 🛠️ CÔNG NGHỆ ÁP DỤNG (TECH STACK)

| Thành Phần | Công Nghệ / Thư Viện |
|---|---|
| **Hosting** | Vercel (Serverless & Edge Network) |
| **Frontend Framework** | Next.js 16 (App Router, React 19, Turbopack) |
| **Styling & Icons** | Tailwind CSS v4, Lucide React, GSAP, Motion |
| **Database** | Neon Serverless PostgreSQL (ap-southeast-1) |
| **ORM** | Prisma ORM v6 (v6.19.3) |
| **Authentication** | Custom Single Admin Auth (Bcrypt, HMAC-SHA256, HttpOnly Cookie) |
| **Validation** | Zod (zod 4) |
| **Excel Engine** | ExcelJS (exceljs 4.4.0) |
| **Testing** | Node.js Native Test Runner (node:test, node:assert) |

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY (QUICK START)

### 1. Cài đặt các gói phụ thuộc:
```bash
npm install
```

### 2. Thiết lập Biến môi trường:
Tạo tệp `.env.local` trong thư mục `apps/web/`:
```env
# Kết nối cơ sở dữ liệu Neon PostgreSQL
DATABASE_URL="postgresql://user:pass@ep-pooler.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://user:pass@ep-direct.aws.neon.tech/neondb?sslmode=require"

# Khóa bảo mật Admin
ADMIN_JWT_SECRET="your-secure-jwt-secret-key"
ADMIN_BOOTSTRAP_SECRET="your-secure-bootstrap-secret"
IP_SALT="ahien-coffee-salt-2026"
```

### 3. Đồng bộ Cơ sở dữ liệu Prisma:
```bash
npm --workspace=@ahien/web exec prisma -- generate
npm --workspace=@ahien/web exec prisma -- migrate deploy
```

### 4. Khởi tạo Tài khoản Quản trị viên ban đầu:
```bash
npm --workspace=@ahien/web run seed:admin admin@ahiencoffee.vn MatKhauBaoMatCuaQuan@1986 "Admin A Hiền"
```

### 5. Khởi chạy máy chủ phát triển:
```bash
npm run dev:web
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để trải nghiệm website và [http://localhost:3000/login](http://localhost:3000/login) để truy cập trang quản trị.

---

## 🧪 KIỂM THỬ TỰ ĐỘNG & KIỂM TRA CHẤT LƯỢNG

Hệ thống đi kèm bộ kiểm thử tự động toàn diện:

```bash
# Chạy bộ test suite (13/13 tests)
npm test

# Kiểm tra tĩnh kiểu dữ liệu TypeScript (0 lỗi)
npm run typecheck
```

---

## 📚 TÀI LIỆU KỸ THUẬT CHI TIẾT (DOCUMENTATION INDEX)

Mọi chi tiết kiến trúc và hướng dẫn vận hành chuyên sâu được lưu trữ tại thư mục `docs/`:
- [Kiến trúc Hệ thống Tổng thể](docs/architecture.md)
- [Báo cáo Đối chiếu Pháp lý Bảo vệ Dữ liệu Cá nhân](docs/privacy-compliance.md)
- [Quản lý Sự đồng ý & Quyền Chủ thể Dữ liệu (DSR)](docs/consent-management.md)
- [Quy trình Quản lý & Chăm sóc Khách hàng](docs/contact-management.md)
- [Thiết lập & Vận hành Neon PostgreSQL](docs/database-neon.md)
- [Cơ chế Xác thực Quản trị viên Duy nhất](docs/admin-authentication.md)
- [Cấu trúc Sổ cái Báo cáo Excel](docs/excel-export.md)
- [Hướng dẫn Triển khai Lên Vercel](docs/deployment-vercel.md)
- [Báo cáo & Hướng dẫn Kiểm thử](docs/testing.md)

---

## ☕ VỀ A HIỀN COFFEE

- **Địa chỉ:** K514/5 Hoàng Diệu, phường Hòa Cường, Thành phố Đà Nẵng, Việt Nam.
- **Giờ mở cửa:** 06:30 - 22:00 hàng ngày.
- **Hotline/Zalo:** 0367 262 415.
- **Email:** quangthong211101@gmail.com.
