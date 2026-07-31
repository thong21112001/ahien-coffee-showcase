"use client";

import React from "react";
import Image from "next/image";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";

interface GalleryProps {
  data?: SettingSection;
}

export function Gallery({ data }: GalleryProps) {
  const title = data?.title || "Góc nhỏ Bếp Nhà Thu";
  const subtitle =
    data?.subtitle ||
    "Khép lại những ồn ào, Bếp đón bạn vào một không gian an yên nơi góc phố Đào Duy Từ. Sự mộc mạc của cảnh vật hòa cùng cách chăm chút tỉ mỉ mang đến một chốn dừng chân đầm ấm, thân tình.";

  const apiImages = data?.gridItems
    ? [...data.gridItems].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    : [];

  const renderSlot = (index: number, className: string, heightClass: string) => {
    const item = apiImages.find((img) => img.position === index);
    const rawImage = item?.image;
    const hasImage =
      rawImage &&
      rawImage !== "/placeholder.png" &&
      rawImage !== "/uploads/placeholder.png";
    const text = item?.key || `gallery-${index + 1}`;

    return (
      <div
        className={`relative rounded-2xl overflow-hidden shadow-md border border-stone-850 hover:scale-[1.02] transition-all duration-300 group cursor-pointer ${heightClass} ${className}`}
      >
        {hasImage ? (
          <>
            <Image
              src={getImageUrl(rawImage) || "/placeholder.png"}
              alt={text}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-800 text-stone-400 font-serif text-sm border border-stone-700/50 hover:bg-stone-750 transition-colors p-4 text-center">
            {text}
          </div>
        )}
      </div>
    );
  };

  const renderCenterSlot = (index: number, heightClass: string) => {
    const item = apiImages.find((img) => img.position === index);
    const rawImage = item?.image;
    const hasImage =
      rawImage &&
      rawImage !== "/placeholder.png" &&
      rawImage !== "/uploads/placeholder.png";
    const text = item?.key || `gallery-${index + 1}`;

    return (
      <div
        className={`relative rounded-2xl overflow-hidden shadow-lg border-2 border-brand-gold hover:scale-[1.02] transition-all duration-300 group cursor-pointer ${heightClass}`}
      >
        {hasImage ? (
          <Image
            src={getImageUrl(rawImage) || "/placeholder.png"}
            alt={text}
            fill
            className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-850 text-brand-gold font-serif text-sm hover:bg-stone-800 transition-colors p-4 text-center">
            {text}
          </div>
        )}
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

          {/* Row 2: 3 photos (middle is the signage) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left */}
            {renderSlot(4, "", "h-56 sm:h-64")}
            {/* Center (Signage) */}
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
      </div>
    </section>
  );
}
