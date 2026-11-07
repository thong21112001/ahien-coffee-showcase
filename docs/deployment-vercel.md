# HƯỚNG DẪN TRIỂN KHAI LÊN NỀN TẢNG VERCEL
## Production Deployment Guide: A Hiền Coffee + Neon PostgreSQL

---

## 1. CÁC BƯỚC CHUẨN BỊ TRƯỚC KHI DEPLOY

### Bước 1: Khởi Tạo Dự Án Cơ Sở Dữ Liệu Trên Neon
1. Đăng nhập vào [Neon Console](https://console.neon.tech).
2. Tạo một Project mới: `ahien-coffee-db` tại khu vực gần nhất (ví dụ: `ap-southeast-1` Singapore để tối ưu độ trễ cho Việt Nam).
3. Sao chép 2 chuỗi kết nối:
   - **Pooled connection string** (cổng 5432, có chứa `-pooler`).
   - **Direct connection string** (kết nối trực tiếp phục vụ migration).

### Bước 2: Cấu Hình Biến Môi Trường Trên Vercel
Truy cập **Vercel Dashboard** -> Chọn dự án `ahien-coffee-showcase` -> **Settings** -> **Environment Variables**. Bổ sung các biến sau:

| Tên Biến Môi Trường | Mục Đích Sử Dụng | Môi Trường Áp Dụng | Ví Dụ Giá Trị |
|---|---|---|---|
| `DATABASE_URL` | Kết nối runtime qua Neon Pooler | Production, Preview, Dev | `postgresql://user:pass@ep-pooler.aws.neon.tech/neondb?sslmode=require&pgbouncer=true` |
| `DIRECT_URL` | Kết nối trực tiếp để chạy Prisma Migration | Production, Preview, Dev | `postgresql://user:pass@ep-direct.aws.neon.tech/neondb?sslmode=require` |
| `ADMIN_JWT_SECRET` | Khóa bí mật ký token session Admin | Production, Preview, Dev | Chuỗi ngẫu nhiên 64 ký tự hex |
| `ADMIN_BOOTSTRAP_SECRET` | Khóa bảo vệ API khởi tạo tài khoản | Production, Preview, Dev | Chuỗi ngẫu nhiên 32 ký tự |
| `IP_SALT` | Muối bảo vệ băm ẩn danh IP | Production, Preview, Dev | Chuỗi ngẫu nhiên 32 ký tự |

> [!NOTE]
> Để bảo vệ dữ liệu khách hàng thật, khuyến nghị tạo một **Branch riêng** trên Neon cho môi trường `Preview` và gắn `DATABASE_URL` tương ứng trên Vercel cho nhánh Preview.

---

## 2. QUY TRÌNH DEPLOYMENT BUILD COMMAND

Trong `vercel.json` và Turborepo, Next.js được build qua lệnh:
```bash
turbo run build --filter=@ahien/web
```
Trong quá trình build trên Vercel, Prisma Client sẽ tự động được tạo thông qua `postinstall` hoặc step build.

Để đảm bảo Prisma Client luôn sẵn sàng trước khi Next.js biên dịch, bổ sung script trong `apps/web/package.json`:
```json
"postinstall": "prisma generate"
```

---

## 3. THỰC THI MIGRATION TRÊN PRODUCTION

Trước khi phát hành phiên bản mới ra người dùng thật:
1. Chạy lệnh migrate deploy từ máy quản trị hoặc thông qua CI/CD:
   ```bash
   npm --workspace=@ahien/web exec prisma -- migrate deploy
   ```
2. Khởi tạo tài khoản Quản trị viên A Hiền Coffee:
   ```bash
   npm --workspace=@ahien/web run seed:admin admin@ahiencoffee.vn MatKhauBaoMatCuaQuan@1986 "Admin A Hiền"
   ```

---

## 4. CHECKLIST NGHIỆM THU SAU KHI DEPLOY (POST-DEPLOYMENT ACCEPTANCE)

- [ ] Truy cập trang chủ `https://[domain-cua-quan]`:
  - [ ] Logo A Hiền Coffee và biểu tượng Phin hiển thị sắc nét.
  - [ ] Favicon trên tab trình duyệt đúng biểu tượng A Hiền Coffee.
  - [ ] Chân trang Footer có liên kết *"Chính sách bảo vệ dữ liệu"*.
- [ ] Gửi thử nghiệm một form liên hệ (bằng dữ liệu thử nghiệm):
  - [ ] Không tích ô đồng ý -> Hệ thống báo lỗi và chặn gửi.
  - [ ] Tích ô đồng ý -> Gửi thành công, nhận được thông báo xác nhận.
- [ ] Đăng nhập Quản trị viên tại `https://[domain-cua-quan]/login`:
  - [ ] Đăng nhập thành công với tài khoản Admin.
  - [ ] Kiểm tra liên hệ vừa gửi hiển thị trên danh sách.
  - [ ] Xem chi tiết liên hệ, cập nhật trạng thái sang `CONTACTED`.
  - [ ] Bấm nút **"Xuất Báo Cáo Excel (.xlsx)"** -> Kiểm tra file tải về đầy đủ 3 sheets.

