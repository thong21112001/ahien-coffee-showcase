# XUẤT BÁO CÁO EXCEL TRÊN NỀN TẢNG A HIỀN COFFEE
## Hướng Dẫn Kỹ Thuật & Cấu Trúc File Sổ Cái (.xlsx)

---

## 1. NGUYÊN TẮC KỸ THUẬT (TECHNICAL PRINCIPLES)

1. **On-Demand Only (Chỉ tạo khi có yêu cầu):** File Excel được tạo tức thì khi Quản trị viên nhấn nút xuất báo cáo. Hệ thống **không** lưu trữ các file Excel vĩnh viễn trên ổ cứng của serverless container (Vercel).
2. **Không Phụ Thuộc Hạ Tầng Bên Thứ Ba:** Sử dụng thư viện `ExcelJS` tạo trực tiếp trong bộ nhớ (In-memory buffer) và gửi stream về trình duyệt. Không yêu cầu Microsoft Graph API, tài khoản Azure AD hay Google Workspace.
3. **Phòng Chống Tấn Công Chèn Mã Độc Vào Bảng Tính (Formula Injection Protection):**
   Mọi dữ liệu dạng văn bản do khách hàng nhập (Họ tên, SĐT, Email, Nội dung tin nhắn) đều được kiểm tra qua hàm `sanitizeForExcel`:
   ```typescript
   function sanitizeForExcel(value: unknown): string {
     if (value === null || value === undefined) return "";
     const str = String(value).trim();
     if (/^[=+\-@\t\r]/.test(str)) {
       return `'${str}`; // Thêm dấu nháy đơn để Excel hiển thị dưới dạng chuỗi thuần
     }
     return str;
   }
   ```
   Điều này loại bỏ hoàn toàn nguy cơ thực thi mã độc qua các hàm như `=cmd|'/C calc'!A0` khi Quản trị viên mở file bằng Microsoft Excel.

---

## 2. CẤU TRÚC CHI TIẾT CÁC WORKSHEET TRONG WORKBOOK

### Sheet 1: Danh Sách Liên Hệ (Contacts)
- **Màu tab:** Hổ phách hoàng kim (`#D97706`).
- **Header:** Nền nâu cà phê đậm (`#451A03`), chữ trắng in đậm, cố định dòng 1 (Frozen row).
- **Các cột:**
  1. `Mã Liên Hệ (ID)`: UUID ổn định của khách hàng.
  2. `Thời Gian Gửi`: Định dạng `DD/MM/YYYY HH:mm`.
  3. `Họ và Tên`: Họ tên khách hàng đã được làm sạch.
  4. `Số Điện Thoại`: Định dạng văn bản bảo vệ số 0 ở đầu.
  5. `Email`: Địa chỉ email khách hàng.
  6. `Loại Yêu Cầu`: `TABLE_RESERVATION`, `GENERAL_INQUIRY`, v.v.
  7. `Nội Dung Yêu Cầu`: Ghi chú của khách hàng.
  8. `Trạng Thái`: `NEW`, `CONTACTED`, `FOLLOWING_UP`, `RESOLVED`, `ARCHIVED`.
  9. `Nguồn Gửi`: Mặc định `WEBSITE_CONTACT_FORM`.
  10. `Cập Nhật Lần Cuối`: Dấu thời gian chỉnh sửa mới nhất.
- **Tính năng:** Tự động kích hoạt bộ lọc cột (AutoFilter).

### Sheet 2: Bằng Chứng Đồng Ý (Consent Records)
- **Màu tab:** Xanh lam bảo mật (`#2563EB`).
- **Mục đích:** Phục vụ đối chiếu bằng chứng tuân thủ theo Luật Bảo vệ Dữ liệu Cá nhân số 91/2025/QH15.
- **Các cột:**
  1. `Mã Đồng Ý (Consent ID)`: Khóa chính của bản ghi đồng ý.
  2. `Mã Liên Hệ (Contact ID)`: Khóa ngoại liên kết sang Sheet 1.
  3. `Mục Đích Xử Lý`: `OPERATIONAL_INQUIRY` hoặc `MARKETING_COMMUNICATION`.
  4. `Trạng Thái`: `GRANTED` hoặc `WITHDRAWN`.
  5. `Phiên Bản Chính Sách`: Ví dụ `v1.0.0-2026.01`.
  6. `Thời Điểm Đồng Ý`: Dấu thời gian máy chủ.
  7. `Thời Điểm Rút Lại`: Thời điểm khách hàng rút lại (nếu có).
  8. `Mã Băm Kiểm Toán (IP Hash)`: Mã băm SHA-256 ẩn danh bảo vệ quyền riêng tư.

### Sheet 3: Lịch Sử Chăm Sóc (Activity History)
- **Màu tab:** Xanh lục (`#059669`).
- **Các cột:**
  1. `Mã Hoạt Động (ID)`: Mã UUID của bản ghi.
  2. `Mã Liên Hệ (Contact ID)`: Khóa ngoại liên kết.
  3. `Loại Hoạt Động`: `STATUS_CHANGE`, `NOTE_ADDED`, `FOLLOW_UP_CALL`.
  4. `Nội Dung Ghi Chú`: Nội dung trao đổi, chăm sóc khách hàng.
  5. `Người Thực Hiện`: Tên Quản trị viên thao tác.
  6. `Thời Gian`: Thời điểm ghi nhận.

---

## 3. THAO TÁC XUẤT BÁO CÁO QUA API

- **Endpoint:** `GET /api/admin/contacts/export`
- **Xác thực:** Yêu cầu Admin Session Cookie hoặc Bearer Token.
- **Các tham số lọc hỗ trợ:**
  - `search`: Từ khóa tìm kiếm.
  - `status`: Lọc theo trạng thái (`NEW`, `RESOLVED`, v.v.).
  - `inquiryType`: Lọc theo loại yêu cầu.
  - `startDate`, `endDate`: Khoảng thời gian gửi.
- **Headers trả về:**
  - `Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
  - `Content-Disposition: attachment; filename="ahien-coffee-contacts-YYYYMMDD.xlsx"`
  - `Cache-Control: no-store, no-cache, must-revalidate`

