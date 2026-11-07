"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface DataSubjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DataSubjectRequestModal({ isOpen, onClose }: DataSubjectRequestModalProps) {
  const [requestType, setRequestType] = useState<string>("ACCESS");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim() || !details.trim()) {
      toast.error("Vui lòng điền đầy đủ tất cả các trường thông tin!");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/privacy/dsr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType,
          requesterName: name.trim(),
          requesterPhone: phone.trim(),
          requesterEmail: email.trim(),
          details: details.trim(),
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSubmittedRequestId(json.data?.requestId || "DSR-OK");
        toast.success("Yêu cầu của Quý khách đã được tiếp nhận thành công!");
      } else {
        toast.error(json.message || "Không thể gửi yêu cầu. Vui lòng kiểm tra lại!");
      }
    } catch {
      toast.error("Lỗi kết nối máy chủ. Vui lòng thử lại sau ít phút!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setDetails("");
    setSubmittedRequestId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-stone-900 border border-amber-500/30 p-6 sm:p-8 text-stone-200 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dsr-modal-title"
      >
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pr-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 id="dsr-modal-title" className="text-lg sm:text-xl font-serif font-bold text-white">
              Cổng Yêu Cầu Quyền Dữ Liệu Cá Nhân
            </h3>
            <p className="text-xs text-amber-400">
              Thực thi quyền chủ thể theo Luật số 91/2025/QH15 & Nghị định 356/2025/NĐ-CP
            </p>
          </div>
        </div>

        {submittedRequestId ? (
          <div className="text-center py-6 space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mx-auto border border-emerald-500/30">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-lg font-bold text-white">Tiếp Nhận Thành Công!</h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md mx-auto">
              Yêu cầu của Quý khách đã được ghi nhận vào hệ thống quản lý quyền riêng tư của A Hiền Coffee với mã số:
            </p>
            <div className="inline-block px-4 py-2 rounded-xl bg-stone-950 border border-stone-800 font-mono text-amber-400 text-sm font-bold">
              {submittedRequestId}
            </div>
            <p className="text-xs text-stone-400">
              Đội ngũ phụ trách quyền riêng tư sẽ liên hệ xác minh thông tin qua số điện thoại/email của Quý khách và hoàn tất phản hồi trong thời hạn tối đa <strong>72 giờ làm việc</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Hoàn tất & Đóng
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-amber-300 flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>
                Quý khách có thể yêu cầu xem lại thông tin, chỉnh sửa, yêu cầu xóa hoặc rút lại sự đồng ý nhận thông tin tiếp thị. Vui lòng cung cấp đúng số điện thoại/email đã sử dụng khi gửi liên hệ.
              </span>
            </div>

            <div>
              <label className="block text-stone-400 mb-1 font-medium">Loại quyền Quý khách muốn thực thi *</label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 outline-none focus:border-amber-500"
              >
                <option value="ACCESS">Quyền truy cập: Xem lại thông tin cá nhân đã lưu trữ</option>
                <option value="CORRECTION">Quyền đính chính: Sửa đổi thông tin bị sai sót</option>
                <option value="WITHDRAWAL">Rút lại sự đồng ý: Hủy đăng ký nhận tin tiếp thị & khuyến mãi</option>
                <option value="DELETION">Quyền xóa dữ liệu: Yêu cầu xóa toàn bộ thông tin cá nhân</option>
                <option value="RESTRICTION">Quyền hạn chế: Giới hạn phạm vi xử lý dữ liệu</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Họ và tên *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ tên của Quý khách"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Số điện thoại đăng ký *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại đã gửi liên hệ"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-400 mb-1 font-medium">Địa chỉ Email xác nhận *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1 font-medium">Chi tiết nội dung yêu cầu *</label>
              <textarea
                rows={3}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Mô tả cụ thể thông tin cần sửa đổi, xóa hoặc lý do rút lại sự đồng ý..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 outline-none focus:border-amber-500 resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <Send size={15} />
                {isSubmitting ? "Đang gửi yêu cầu..." : "Gửi Yêu Cầu Quyền Riêng Tư"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default DataSubjectRequestModal;

