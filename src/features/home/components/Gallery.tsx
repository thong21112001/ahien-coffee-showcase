"use client";

import React from "react";
import Image from "next/image";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";

interface GalleryProps {
  data?: SettingSection;
}

export function Gallery({ data }: GalleryProps) {
  const title = data?.title || "Không Gian Bếp Nhà Thu";
  const subtitle = data?.subtitle || "BỘ SƯU TẬP HÌNH ẢNH";

  const images = data?.gridItems?.map((g) => getImageUrl(g.image)) || [
    "/gallery-1.png",
    "/gallery-2.png",
    "/gallery-3.png",
    "/gallery-4.png",
    "/gallery-5.png",
    "/gallery-6.png",
  ];

  return (
    <section id="hinh-anh" className="py-20 bg-stone-50 text-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#8D4F2A] font-extrabold text-xs md:text-sm tracking-widest uppercase">
            {subtitle}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-stone-900 mt-2">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200 shadow-sm border border-stone-200 group cursor-pointer"
            >
              <Image
                src={img}
                alt={`Gallery photo ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-bold uppercase tracking-wider px-3 py-1 bg-black/60 rounded-full backdrop-blur-xs">
                  Xem ảnh
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
