"use client";

import React from "react";
import { X, Shield, CheckCircle2, Lock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Locale } from "@ahien/types";

interface PrivacyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: Locale;
}

export function PrivacyNoticeModal({
  isOpen,
  onClose,
  locale = "vi",
}: PrivacyNoticeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-stone-900 border border-amber-500/30 p-6 sm:p-8 text-stone-200 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
          aria-label="Đóng cửa sổ"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pr-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <Shield size={22} />
          </div>
          <div>
            <h3
              id="privacy-modal-title"
              className="text-lg sm:text-xl font-serif font-bold text-white leading-tight"
            >
              Chính Sách Bảo Vệ Dữ Liệu Cá Nhân
            </h3>
            <p className="text-xs text-amber-400 font-medium">
              Tuân thủ Luật 91/2025/QH15 & Nghị định 356/2025/NĐ-CP • Phiên bản v1.0.0-2026.01
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-5 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-b border-stone-800 py-5">
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3.5 text-xs text-amber-300">
            <strong>Cam kết bảo mật:</strong> A Hiền Coffee chỉ thu thập dữ liệu cơ bản cần thiết (Họ tên, SĐT, Email) để xử lý liên hệ/đặt bàn của Quý khách. Chúng tôi tuyệt đối không chia sẻ hoặc mua bán thông tin cho bên thứ ba.
          </div>

          <div>
            <h4 className="font-bold text-white mb-1.5 flex items-center gap-2">
              <CheckCircle2 size={15} className="text-amber-400" />
              1. Mục đích thu thập & Căn cứ pháp lý
            </h4>
            <p className="text-stone-400">
              - <strong>Mục đích vận hành (Bắt buộc):</strong> Tiếp nhận, xác nhận thông tin đặt bàn hoặc trả lời câu hỏi của Quý khách. Căn cứ theo sự đồng ý minh bạch và các bước giao kết dịch vụ.<br />
              - <strong>Mục đích tiếp thị (Tùy chọn độc lập):</strong> Nhận thông tin ưu đãi hoặc bản tin cà phê đặc sản nếu Quý khách chủ động chọn. Quý khách có thể bỏ qua mục này mà vẫn gửi liên hệ bình thường.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-1.5 flex items-center gap-2">
              <Lock size={15} className="text-amber-400" />
              2. Quyền của Quý khách
            </h4>
            <p className="text-stone-400">
              Quý khách có toàn quyền yêu cầu: Xem lại thông tin, đính chính sai sót, rút lại sự đồng ý hoặc xóa dữ liệu cá nhân bất kỳ lúc nào bằng cách gửi email đến <strong>quangthong211101@gmail.com</strong> hoặc liên hệ hotline <strong>0367 262 415</strong>.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-1.5">3. Thời gian lưu trữ</h4>
            <p className="text-stone-400">
              Dữ liệu được lưu trữ an toàn trong tối đa 24 tháng hoặc bị xóa ngay khi có yêu cầu hợp lệ từ Quý khách.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-2">
          <Link
            href={`/${locale}/chinh-sach-bao-mat`}
            target="_blank"
            className="text-xs text-amber-400 hover:text-amber-300 underline inline-flex items-center gap-1.5"
          >
            Xem toàn văn chính sách đầy đủ
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            Đã hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyNoticeModal;

