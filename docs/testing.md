# BÁO CÁO VÀ HƯỚNG DẪN KIỂM THỬ HỆ THỐNG
## Automated Testing & Quality Assurance: A Hiền Coffee

---

## 1. PHẠM VI KIỂM THỬ TỰ ĐỘNG (AUTOMATED TEST SUITE)

Hệ thống được kiểm thử tự động toàn diện thông qua bộ test runner chuẩn của Node.js kết hợp TypeScript (`node --experimental-strip-types --test`). Toàn bộ 13/13 test cases đều được thực thi và vượt qua với kết quả tuyệt đối.

### 1.1. Nhận Diện Thương Hiệu (`branding.test.ts`)
- **Test 1:** Xác minh tệp biểu tượng logo vector `ahien-logo.svg` và `ahien-mark.svg` tồn tại trong thư mục `public/brand/`, chứa đầy đủ các yếu tố nhận diện: `"A HIỀN COFFEE"`, `"SINCE 1986"`, `"ĐÀ NẴNG"`.
- **Test 2:** Xác minh toàn bộ các tệp SVG mặc định của template Next.js (`next.svg`, `vercel.svg`, `globe.svg`) đã bị xóa triệt để khỏi thư mục `public/`.
- **Test 3:** Xác minh Metadata của toàn bộ ứng dụng trong `layout.tsx` hiển thị chuẩn xác tiêu đề thương hiệu, tagline di sản từ năm 1986 và liên kết icon.

### 1.2. Bảo Vệ Dữ Liệu Cá Nhân & Quản Lý Đồng Ý (`privacy-consent.test.ts`)
- **Test 4:** Kiểm thử từ chối gửi biểu mẫu khi khách hàng **chưa tích chọn** ô đồng ý xử lý thông tin vận hành (`consentOperational: false`).
- **Test 5:** Kiểm thử tính **độc lập của sự đồng ý Marketing**: Khi khách hàng chỉ tích chọn đồng ý vận hành mà không tích Marketing, biểu mẫu vẫn được chấp thuận hợp lệ (`consentMarketing: false`).
- **Test 6:** Kiểm thử bẫy **Honeypot chống spam**: Bắt trọn các yêu cầu gửi từ bot tự động khi trường ẩn `botField` bị điền dữ liệu.
- **Test 7:** Kiểm thử giới hạn độ dài họ tên (tối thiểu 2 ký tự, tối đa 100) và tính hợp lệ của định dạng số điện thoại Việt Nam.
- **Test 8:** Kiểm thử schema tiếp nhận yêu cầu quyền chủ thể dữ liệu (DSR Schema) với các quyền hợp lệ (`ACCESS`, `CORRECTION`, `DELETION`, `RESTRICTION`, `WITHDRAWAL`).

### 1.3. Xác Thực Quản Trị Viên (`admin-auth.test.ts`)
- **Test 9:** Kiểm thử ký và giải mã token JWT bằng chữ ký số HMAC-SHA256 sử dụng `node:crypto`.
- **Test 10:** Kiểm thử phát hiện và từ chối token bị làm giả, chỉnh sửa payload hoặc định dạng không hợp lệ.
- **Test 11:** Kiểm thử băm mật khẩu và đối chiếu mật khẩu an toàn với thuật toán `bcrypt` (bảo đảm mật khẩu đúng khớp, mật khẩu sai bị từ chối).

### 1.4. Xuất Báo Cáo Excel Chuyên Nghiệp (`excel-export.test.ts`)
- **Test 12:** Kiểm thử cơ chế **Phòng chống tấn công Formula Injection**: Hàm làm sạch tự động thêm dấu nháy đơn `'` trước các ký tự nguy hiểm (`=`, `+`, `-`, `@`) để bảo vệ máy tính của Quản trị viên.
- **Test 13:** Kiểm thử tạo workbook đa sheet chuẩn mực với `ExcelJS`, xác minh cấu trúc 2 worksheets (`Danh Sách Liên Hệ`, `Bằng Chứng Đồng Ý`), các cột dữ liệu và định dạng dòng cố định (Frozen Header).

---

## 2. HƯỚNG DẪN THỰC THI KIỂM THỬ

### Chạy Toàn Bộ Test Suite Tự Động:
Từ thư mục gốc dự án:
```bash
npm test
```
*Kết quả ghi nhận: 13/13 tests passed trong ~0.95 giây.*

### Kiểm Tra Kiểu Dữ Liệu Toàn Dự Án:
```bash
npm run typecheck
```
*Kết quả ghi nhận: 4/4 tasks successful trong 6 packages, 0 lỗi TypeScript.*

