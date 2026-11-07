import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { WebLayout } from "@/shared/components/layout/WebLayout";
import { DsrTriggerButton } from "@/features/privacy/components/DsrTriggerButton";
import { Locale } from "@ahien/types";

interface PrivacyPolicyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata() {
  return {
    title: "Chính Sách Bảo Vệ Dữ Liệu Cá Nhân | A Hiền Coffee",
    description:
      "Chính sách bảo vệ dữ liệu cá nhân của A Hiền Coffee theo Luật số 91/2025/QH15 và Nghị định số 356/2025/NĐ-CP.",
  };
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams?.locale === "en" ? "en" : "vi";

  return (
    <WebLayout locale={locale}>
      <div className="bg-stone-950 text-stone-200 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Navigation */}
          <div className="mb-8">
            <Link
              href={`/${locale}#lien-he`}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft size={16} />
              Quay lại trang chủ / Form liên hệ
            </Link>
          </div>

          {/* Header */}
          <div className="border-b border-stone-800 pb-10 mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs text-amber-400 font-medium mb-4">
              <Shield size={14} />
              Phiên bản hiệu lực: v1.0.0-2026.01 (Áp dụng từ 01/01/2026)
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide mb-4">
              CHÍNH SÁCH BẢO VỆ DỮ LIỆU CÁ NHÂN
            </h1>
            <p className="text-sm sm:text-base text-stone-400 leading-relaxed">
              A Hiền Coffee cam kết tôn trọng quyền riêng tư và bảo vệ an toàn dữ liệu cá nhân của Quý khách theo đúng quy định của <strong>Luật Bảo vệ Dữ liệu Cá nhân số 91/2025/QH15</strong>, <strong>Nghị định số 356/2025/NĐ-CP</strong> và các văn bản quy phạm pháp luật Việt Nam có liên quan.
            </p>
          </div>

          {/* Legal Notice Box */}
          <div className="rounded-2xl bg-stone-900/80 border border-amber-500/30 p-6 mb-12 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertCircle size={18} />
              <span>Nguyên Tắc Minh Bạch & Không Ép Buộc</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Quý khách có toàn quyền tự nguyện quyết định việc cung cấp thông tin. Mọi sự đồng ý chỉ được thu thập khi Quý khách chủ động tích chọn (không sử dụng ô chọn sẵn), sự im lặng không được suy diễn là đồng ý, và sự đồng ý nhận thông tin quảng cáo luôn tách biệt hoàn toàn với việc xử lý thông tin liên hệ đặt bàn.
            </p>
          </div>

          {/* Main Content Sections */}
          <div className="space-y-12 text-sm sm:text-base leading-relaxed text-stone-300">
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">1</span>
                Đơn Vị Kiểm Soát & Xử Lý Dữ Liệu
              </h2>
              <p>
                Dữ liệu cá nhân của Quý khách được kiểm soát và xử lý trực tiếp bởi:
              </p>
              <div className="rounded-xl bg-stone-900 p-5 border border-stone-800 space-y-2 text-xs sm:text-sm">
                <div><strong>Đơn vị:</strong> Hộ kinh doanh A Hiền Coffee (Đà Nẵng — Since 1986)</div>
                <div><strong>Địa chỉ cơ sở:</strong> K514/5 Hoàng Diệu, phường Hòa Cường, Thành phố Đà Nẵng, Việt Nam</div>
                <div><strong>Hotline/Zalo:</strong> 0367 262 415</div>
                <div><strong>Email tiếp nhận quyền riêng tư:</strong> <a href="mailto:quangthong211101@gmail.com" className="text-amber-400 underline">quangthong211101@gmail.com</a></div>
                <div className="text-stone-500 italic text-[11px] pt-1">
                  * [Cấu hình placeholder pháp lý: Mã số thuế & Giấy chứng nhận ĐKKD sẽ được cập nhật đồng bộ theo hồ sơ niêm yết chính thức].
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">2</span>
                Loại Dữ Liệu Cá Nhân Thu Thập
              </h2>
              <p>
                Tuân thủ nguyên tắc tối thiểu hóa dữ liệu (Data Minimization), chúng tôi chỉ thu thập các thông tin cơ bản sau thông qua biểu mẫu trực tuyến:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Họ và tên:</strong> Để xưng hô lịch sự và xác nhận danh tính người đặt bàn/liên hệ.</li>
                <li><strong>Số điện thoại:</strong> Kênh bắt buộc để nhân viên gọi điện xác nhận đặt bàn hoặc phản hồi yêu cầu.</li>
                <li><strong>Địa chỉ Email (tùy chọn):</strong> Nhận thư xác nhận hoặc nhận bản tin ưu đãi (nếu Quý khách đồng ý).</li>
                <li><strong>Nội dung yêu cầu / ghi chú:</strong> Chi tiết về thời gian đặt bàn, số lượng khách hoặc câu hỏi về thực đơn.</li>
              </ul>
              <p className="text-xs text-stone-400 italic">
                Chúng tôi tuyệt đối KHÔNG thu thập dữ liệu nhạy cảm (như CCCD, thông tin tài chính cá nhân, vị trí GPS thời gian thực).
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">3</span>
                Mục Đích & Căn Cứ Pháp Lý Xử Lý Dữ Liệu
              </h2>
              <div className="space-y-4">
                <div className="rounded-xl bg-stone-900/60 p-4 border border-stone-800">
                  <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-400" />
                    Mục đích 1: Tiếp nhận, giải quyết và phản hồi liên hệ / Đặt bàn
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300">
                    <strong>Căn cứ pháp lý:</strong> Sự đồng ý minh bạch của Quý khách theo Điều 11 Luật 91/2025/QH15 và sự cần thiết để thực hiện các bước trước khi giao kết hợp đồng cung cấp dịch vụ tại quán.
                  </p>
                </div>
                <div className="rounded-xl bg-stone-900/60 p-4 border border-stone-800">
                  <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-400" />
                    Mục đích 2: Gửi thông tin khuyến mãi & Bản tin cà phê đặc sản (Tùy chọn)
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300">
                    <strong>Căn cứ pháp lý:</strong> Sự đồng ý hoàn toàn tự nguyện, độc lập. Quý khách có thể từ chối mục đích này mà vẫn được phục vụ yêu cầu liên hệ/đặt bàn bình thường.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">4</span>
                Thời Hạn Lưu Trữ Dữ Liệu
              </h2>
              <p>
                Dữ liệu liên hệ được lưu trữ trong hệ thống cơ sở dữ liệu bảo mật trong thời gian tối đa <strong>24 tháng</strong> kể từ lần tương tác gần nhất để phục vụ công tác chăm sóc khách hàng, hoặc sẽ bị xóa ngay khi Quý khách gửi yêu cầu rút lại sự đồng ý/xóa dữ liệu.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">5</span>
                Quyền Của Quý Khách (Chủ Thể Dữ Liệu)
              </h2>
              <p>
                Theo quy định tại Điều 12 & Điều 13 Luật Bảo vệ Dữ liệu Cá nhân số 91/2025/QH15, Quý khách có các quyền đầy đủ sau:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="rounded-lg bg-stone-900 p-3 border border-stone-800">
                  <strong>1. Quyền được biết:</strong> Được thông báo rõ ràng trước khi dữ liệu được thu thập.
                </div>
                <div className="rounded-lg bg-stone-900 p-3 border border-stone-800">
                  <strong>2. Quyền đồng ý / không đồng ý:</strong> Tự nguyện lựa chọn đồng ý hoặc từ chối từng mục đích.
                </div>
                <div className="rounded-lg bg-stone-900 p-3 border border-stone-800">
                  <strong>3. Quyền truy cập & đính chính:</strong> Yêu cầu xem lại hoặc chỉnh sửa thông tin chưa chuẩn xác.
                </div>
                <div className="rounded-lg bg-stone-900 p-3 border border-stone-800">
                  <strong>4. Quyền rút lại sự đồng ý:</strong> Rút lại sự đồng ý đã cấp trước đó bất kỳ lúc nào.
                </div>
                <div className="rounded-lg bg-stone-900 p-3 border border-stone-800">
                  <strong>5. Quyền xóa dữ liệu:</strong> Yêu cầu xóa toàn bộ dữ liệu cá nhân khỏi hệ thống.
                </div>
                <div className="rounded-lg bg-stone-900 p-3 border border-stone-800">
                  <strong>6. Quyền khiếu nại, tố cáo:</strong> Khiếu nại nếu phát hiện dữ liệu bị sử dụng sai mục đích.
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">6</span>
                Quy Trình Gửi Yêu Cầu Thực Thi Quyền (DSR)
              </h2>
              <p>
                Để thực thi bất kỳ quyền nào nêu trên, Quý khách có thể:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gửi email trực tiếp đến: <strong>quangthong211101@gmail.com</strong> với tiêu đề <em>[Yêu cầu Bảo vệ Dữ liệu Cá nhân]</em> kèm số điện thoại đã đăng ký.</li>
                <li>Liên hệ Hotline/Zalo: <strong>0367 262 415</strong> trong khung giờ 06:30 - 22:00.</li>
                <li>
                  Gửi yêu cầu trực tiếp ngay trên trang web:
                  <DsrTriggerButton />
                </li>
              </ul>
              <p>
                Chúng tôi cam kết tiếp nhận, xác minh và xử lý yêu cầu của Quý khách trong thời hạn tối đa <strong>72 giờ làm việc</strong> kể từ khi nhận được đầy đủ thông tin hợp lệ.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">7</span>
                Biện Pháp An Toàn & Bảo Mật Kỹ Thuật
              </h2>
              <p>
                A Hiền Coffee áp dụng các tiêu chuẩn an toàn bảo mật nghiêm ngặt theo Nghị định 356/2025/NĐ-CP:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mã hóa dữ liệu truyền tải trên môi trường mạng bằng giao thức HTTPS/TLS 1.3 tiêu chuẩn.</li>
                <li>Hệ thống máy chủ cơ sở dữ liệu đặt tại hạ tầng đám mây chuyên nghiệp có tường lửa và kiểm soát quyền truy cập nghiêm ngặt.</li>
                <li>Chỉ duy nhất một Quản trị viên được ủy quyền mới có quyền truy cập vào danh sách liên hệ để phản hồi khách hàng.</li>
                <li>Lưu vết kiểm toán bất biến (Audit Trail) cho mọi lần thay đổi hoặc rút lại sự đồng ý để phục vụ đối chiếu minh bạch.</li>
              </ul>
            </section>
          </div>

          {/* Footer of Notice */}
          <div className="mt-16 pt-8 border-t border-stone-800 text-center">
            <p className="text-xs text-stone-500">
              © {new Date().getFullYear()} A Hiền Coffee. Bản quyền chính sách bảo vệ dữ liệu được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </WebLayout>
  );
}

