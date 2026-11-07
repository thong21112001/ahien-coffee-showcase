# XÁC THỰC QUẢN TRỊ VIÊN DUY NHẤT (SINGLE ADMIN AUTH)
## Hướng Dẫn Cấu Hình Và Vận Hành An Toàn

---

## 1. NGUYÊN TẮC BẢO MẬT (SECURITY PRINCIPLES)

1. **Duy Nhất Một Quản Trị Viên (Single Admin Only):** Không mở đăng ký tự do (No public registration).
2. **Không Lưu Mật Khẩu Dạng Bản Rõ (Bcrypt Hashing):** Mật khẩu được băm bằng thuật toán `bcrypt` với cost factor = 12 trước khi lưu vào bảng `admin_accounts`.
3. **Session Cookie HttpOnly & Secure:** Phiên đăng nhập được quản lý bằng cookie `ahien_admin_session`, có thuộc tính `HttpOnly: true`, `Secure: true` (trong production), `SameSite: "lax"`, thời hạn 7 ngày.
4. **Phòng Chống Tấn Công Dò Mật Khẩu (Brute-Force Rate Limiting):**
   - Tối đa 5 lần đăng nhập sai liên tiếp trên một địa chỉ IP.
   - Khi vượt ngưỡng, hệ thống tự động khóa IP trong vòng 5 phút (300 giây).
5. **Defense-in-Depth:**
   - Middleware kiểm tra sự hiện diện của session cookie để chuyển hướng sớm các truy cập `/admin` chưa đăng nhập về `/login`.
   - Tất cả các API Route Quản trị (`/api/admin/*`) bắt buộc kiểm tra và giải mã JWT token tại máy chủ; middleware không thay thế được kiểm tra tại server route.

---

## 2. QUY TRÌNH KHỞI TẠO TÀI KHOẢN ADMIN ĐẦU TIÊN (BOOTSTRAP)

Có 2 phương thức an toàn để thiết lập tài khoản Admin ban đầu:

### Phương Thức A: Sử Dụng CLI Script (Khuyến nghị cho Nhà phát triển)
Từ thư mục dự án, chạy lệnh:
```bash
npm --workspace=@ahien/web run seed:admin admin@ahiencoffee.vn MatKhauManh@1986 "Admin A Hiền"
```
Script sẽ tự động kiểm tra, băm mật khẩu bằng `bcrypt` và ghi nhận tài khoản vào Neon PostgreSQL.

### Phương Thức B: Sử Dụng API Bootstrap An Toàn
Khi triển khai lần đầu trên Vercel:
1. Thiết lập biến môi trường `ADMIN_BOOTSTRAP_SECRET` trong Vercel Project Settings (ví dụ: một chuỗi ngẫu nhiên 32 ký tự).
2. Gửi request `POST /api/auth/bootstrap` kèm header `x-bootstrap-secret`:
   ```bash
   curl -X POST https://your-domain.vercel.app/api/auth/bootstrap \
     -H "Content-Type: application/json" \
     -H "x-bootstrap-secret: YOUR_BOOTSTRAP_SECRET" \
     -d '{"email": "admin@ahiencoffee.vn", "password": "YourStrongPassword123!", "name": "Admin A Hiền"}'
   ```
3. Sau khi tài khoản được tạo thành công, API sẽ tự động khóa lại đối với các yêu cầu tiếp theo nếu không có khóa bí mật hợp lệ.

---

## 3. CÁC BIẾN MÔI TRƯỜNG BẢO MẬT LIÊN QUAN

```env
# Khóa bí mật dùng để ký và xác thực HMAC-SHA256 JWT Token cho Admin
ADMIN_JWT_SECRET="generate-a-secure-random-64-character-hex-string-for-production"

# Khóa bí mật dùng cho việc khởi tạo lại Admin (nếu cần thiết)
ADMIN_BOOTSTRAP_SECRET="generate-another-secure-secret-for-bootstrap"

# Muối băm địa chỉ IP phục vụ bằng chứng đồng ý mà không lưu IP thô
IP_SALT="ahien-coffee-privacy-salt-2026"
```

