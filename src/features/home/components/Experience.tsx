"use client";

import React from "react";
import { SettingSection } from "../types/home.types";

interface ExperienceProps {
  data?: SettingSection;
}

export function Experience({ data }: ExperienceProps) {
  const title = data?.title || "Trải Nghiệm Không Gian Ẩm Thực";
  const subtitle = data?.subtitle || "HÀNH TRÌNH THƯỞNG THỨC";

  const gridItems = data?.gridItems || [
    { title: "Đón Tiếp Ấm Cúng", content: "Nụ cười nồng hậu đón chào quý khách ngay từ cửa bến.", position: 1 },
    { title: "Không Gian Hoài Cổ", content: "Kiến trúc đèn lồng lung linh mang dấu ấn Hội An cổ kính.", position: 2 },
    { title: "Thực Đơn Tinh Hoa", content: "Thưởng thức từng món ăn đậm đà chuẩn vị truyền thống.", position: 3 },
    { title: "Kỷ Niệm Đáng Nhớ", content: "Lưu giữ những khoảnh khắc ấm áp bên người thân yêu.", position: 4 },
  ];

  return (
    <section className="py-20 bg-[#12100e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#D9A05B] font-extrabold text-xs md:text-sm tracking-widest uppercase">
            {subtitle}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-2">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1c1916] p-6 rounded-2xl border border-stone-800 hover:border-[#D9A05B]/50 transition-all hover:-translate-y-1.5 shadow-lg"
            >
              <div className="text-3xl font-extrabold text-[#D9A05B] mb-3">
                0{idx + 1}
              </div>
              <h4 className="font-bold text-white text-base mb-2">
                {item.title}
              </h4>
              <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
