"use client";

import React from "react";
import Link from "next/link";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";

interface HeroProps {
  data?: SettingSection;
}

export function Hero({ data }: HeroProps) {
  const title = data?.title || "Bếp Nhà Thu - Ẩm Thực Hội An Traditional";
  const subtitle =
    data?.subtitle ||
    "Thưởng thức hương vị truyền thống Hội An trong không gian ấm cúng, cổ kính.";
  const bgImage = data?.image
    ? getImageUrl(data.image)
    : "/bannerExperience.png";

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 transform scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-transparent to-stone-900/60" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#D9A05B]/20 border border-[#D9A05B]/40 text-[#D9A05B] text-xs md:text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-xs">
          Tinh hoa ẩm thực cố đô
        </span>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          {title}
        </h1>

        <p className="text-stone-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-4 bg-[#8D4F2A] hover:bg-[#763f1f] active:scale-95 text-white font-bold rounded-2xl shadow-xl shadow-[#8D4F2A]/30 transition-all text-base cursor-pointer hover:scale-105"
          >
            Xem thực đơn ngay
          </Link>
          <Link
            href="#lien-he"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/30 font-bold rounded-2xl backdrop-blur-xs transition-all text-base cursor-pointer"
          >
            Đặt bàn trực tuyến
          </Link>
        </div>
      </div>
    </section>
  );
}
