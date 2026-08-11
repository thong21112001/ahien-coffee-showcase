"use client";

import React from "react";
import Image from "next/image";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";
import { IMAGES } from "@/shared/constants/images";

interface GalleryProps {
  data?: SettingSection;
}

export function Gallery({ data }: GalleryProps) {
  if (!data) return null;

  const title = data.title || "";
  const subtitle = data.subtitle || "";

  const apiImages = data.gridItems
    ? [...data.gridItems].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    : [];

  const renderSlot = (index: number, className: string, heightClass: string) => {
    const item = apiImages.find((img) => img.position === index);
    const rawImage = item?.image || IMAGES.gallery[index] || IMAGES.common.placeholder;
    const isCustomImage = Boolean(item?.image || IMAGES.gallery[index]);
    const text = item?.key || `Khoảnh khắc Ahien #${index + 1}`;

    return (
      <div
        className={`relative rounded-2xl overflow-hidden shadow-md border border-stone-800 hover:scale-[1.02] transition-all duration-300 group cursor-pointer ${heightClass} ${className}`}
      >
        <Image
          src={getImageUrl(rawImage)}
          alt={text}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Concept Art Badge */}
        <span className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 z-10 shadow-sm">
          {isCustomImage ? "📸 Real Gallery" : "🎨 Visual Concept"}
        </span>

        {/* Gradient Overlay & Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent group-hover:from-stone-950/60 transition-colors flex flex-col justify-end p-4">
          <span className="text-xs text-stone-300 font-serif tracking-wider truncate">
            {text}
          </span>
        </div>
      </div>
    );
  };

  const renderCenterSlot = (index: number, heightClass: string) => {
    const item = apiImages.find((img) => img.position === index);
    const rawImage = item?.image || IMAGES.gallery[index] || IMAGES.common.placeholder;
    const isCustomImage = Boolean(item?.image || IMAGES.gallery[index]);
    const text = item?.key || `Ahien Signature Concept`;

    return (
      <div
        className={`relative rounded-2xl overflow-hidden shadow-lg border-2 border-brand-gold hover:scale-[1.02] transition-all duration-300 group cursor-pointer ${heightClass}`}
      >
        <Image
          src={getImageUrl(rawImage)}
          alt={text}
          fill
          className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Center Concept Art Badge */}
        <span className="absolute top-3 left-3 bg-brand-gold text-stone-950 text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 z-10 shadow-md">
          {isCustomImage ? "🌟 Signature Shot" : "✨ Signature Concept"}
        </span>

        {/* Gradient Overlay & Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent group-hover:from-stone-950/70 transition-colors flex flex-col justify-end p-5">
          <span className="text-sm font-semibold text-brand-gold font-serif tracking-wider truncate">
            {text}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="hinh-anh" className="py-24 bg-stone-900 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-[32px] font-bold font-serif mb-4">
            {title}
          </h2>
          <p className="text-white leading-relaxed text-base md:text-xl">
            {subtitle}
          </p>
        </div>

        {/* Asymmetrical Grid Collage */}
        <div className="space-y-4 select-none">
          {/* Row 1: 4 photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {renderSlot(0, "", "h-44 sm:h-56")}
            {renderSlot(1, "", "h-44 sm:h-56")}
            {renderSlot(2, "", "h-44 sm:h-56")}
            {renderSlot(3, "", "h-44 sm:h-56")}
          </div>

          {/* Row 2: 3 photos (middle is center slot) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left */}
            {renderSlot(4, "", "h-56 sm:h-64")}
            {/* Center */}
            {renderCenterSlot(5, "h-56 sm:h-64")}
            {/* Right */}
            {renderSlot(6, "", "h-56 sm:h-64")}
          </div>

          {/* Row 3: 3 photos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {renderSlot(7, "", "h-48 sm:h-60")}
            {renderSlot(8, "", "h-48 sm:h-60")}
            {renderSlot(9, "", "h-48 sm:h-60")}
          </div>
        </div>

        {/* Transparency & Artistic Concept Disclaimer */}
        <div className="mt-16 bg-stone-850/90 border border-brand-gold/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md max-w-4xl mx-auto text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/40 text-brand-gold text-xs font-semibold uppercase tracking-wider">
            <span>✨ Cảm Hứng Nghệ Thuật & Cam Kết Chân Thật</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
            Sáng Tạo Bởi AI - Hương Vị Từ Tâm
          </h3>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Tại <span className="text-brand-gold font-medium">Ahien Coffee</span>, các hình ảnh minh họa không gian & concept sản phẩm được thiết kế với sự hỗ trợ của công nghệ AI nhằm truyền tải tối đa cảm hứng nghệ thuật. Tuy nhiên, từng hạt cà phê và hương vị phục vụ quý khách luôn cam kết <span className="text-white font-semibold underline underline-offset-4 decoration-brand-gold">100% nguyên bản, chế biến thủ công chân thực</span>.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-6 text-xs text-stone-400 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              Hạt Cà Phê Nguyên Bản 100%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              Pha Chế Thủ Công Thật
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              Trải Nghiệm Đậm Chất
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

