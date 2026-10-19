"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl shadow-xl max-w-md mx-auto border border-stone-200">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
        <ShieldAlert className="w-9 h-9" />
      </div>
      <h2 className="text-2xl font-extrabold text-stone-900 mb-2">
        Truy Cập Bị Từ Chối
      </h2>
      <p className="text-stone-600 text-sm mb-6">
        Tài khoản của bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên để biết thêm chi tiết.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#8D4F2A] hover:bg-[#763f1f] text-white font-bold rounded-xl transition-all shadow-md text-sm"
      >
        Trở về Trang chủ
      </Link>
    </div>
  );
}
