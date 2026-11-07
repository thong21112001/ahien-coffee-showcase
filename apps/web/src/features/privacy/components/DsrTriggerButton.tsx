"use client";

import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { DataSubjectRequestModal } from "./DataSubjectRequestModal";

export function DsrTriggerButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-4 py-2.5 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-all cursor-pointer shadow-sm active:scale-98"
      >
        <ShieldCheck size={16} className="text-amber-400" />
        Gửi Yêu Cầu Bảo Vệ Dữ Liệu Trực Tuyến (DSR)
      </button>

      <DataSubjectRequestModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

