"use client";

import React from "react";
import Image from "next/image";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";

interface AboutProps {
  storyData?: SettingSection;
  valuesData?: SettingSection;
}

export function About({ storyData, valuesData }: AboutProps) {
  const storyTitle = storyData?.title || "Hành Trình Gìn Giữ Hương Vị Xưa";
  const storySubtitle =
    storyData?.subtitle || "CÂU CHUYỆN BẾP NHÀ THU";
  const storyContent =
    storyData?.content ||
    "Bếp Nhà Thu được sinh ra từ tình yêu nồng nàn với văn hóa ẩm thực xứ Quảng. Với sự chăm chút kĩ lưỡng từ nguồn nguyên liệu tươi ngon nhất mỗi sớm mai, các đầu bếp lành nghề gìn giữ trọn vẹn bí quyết gia truyền qua nhiều thế hệ.";

  const storyImg = storyData?.image
    ? getImageUrl(storyData.image)
    : "/about-img.png";

  const valuesList = valuesData?.gridItems || [
    {
      title: "Nguyên Liệu Tươi Sạch",
      content: "Tuyển chọn khắt khe mỗi sáng từ các nông trại và ngư trường địa phương.",
      position: 1,
    },
    {
      title: "Bí Quyết Gia Truyền",
      content: "Công thức nêm nếm độc bản giữ trọn hương vị nguyên bản chuẩn Hội An.",
      position: 2,
    },
    {
      title: "Không Gian Ấm Cúng",
      content: "Thiết kế mộc mạc, hoài niệm mang lại cảm giác thân thương như tại nhà.",
      position: 3,
    },
  ];

  return (
    <section id="ve-chung-toi" className="py-20 bg-stone-50 text-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <span className="text-[#8D4F2A] font-extrabold text-xs md:text-sm tracking-widest uppercase">
              {storySubtitle}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-stone-900 leading-tight">
              {storyTitle}
            </h2>
            <div
              className="text-stone-600 leading-relaxed text-sm md:text-base space-y-4"
              dangerouslySetInnerHTML={{ __html: storyContent }}
            />
          </div>

          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
            <Image
              src={storyImg}
              alt="Bếp Nhà Thu Story"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Core Values */}
        {valuesList.length > 0 && (
          <div className="pt-10 border-t border-stone-200/80">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-stone-900 mb-2">
                {valuesData?.title || "Giá Trị Cốt Lõi"}
              </h3>
              <p className="text-stone-500 text-sm">
                Những nguyên tắc vàng giúp Bếp Nhà Thu chinh phục trái tim du khách
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valuesList.map((item, idx) => (
                <div
                  key={item.key || idx}
                  className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D9A05B]/15 text-[#8D4F2A] flex items-center justify-center font-extrabold text-lg mb-4">
                    0{idx + 1}
                  </div>
                  <h4 className="font-bold text-stone-850 text-lg mb-2">
                    {item.title}
                  </h4>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
