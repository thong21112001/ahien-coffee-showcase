"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";

interface FeaturedDishProps {
  data?: SettingSection;
}

export function FeaturedDish({ data }: FeaturedDishProps) {
  const title = data?.title || "Cao Lầu Hội An - Món Ăn Chữ Ký";
  const subtitle = data?.subtitle || "MÓN ĂN ĐẶC SẮC NHẤT";
  const content =
    data?.content ||
    "Món ăn đặc sản độc nhất vô nhị chỉ có tại đất Quảng. Sợi mì dai ngon kết hợp cùng thịt xá xíu đậm đà, tóp mỡ giòn rụm và nước dùng thanh ngọt được ninh kỹ nhiều giờ.";

  const image = data?.image ? getImageUrl(data.image) : "/featured-dish.png";

  return (
    <section className="py-20 bg-stone-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[#D9A05B] font-extrabold text-xs md:text-sm tracking-widest uppercase">
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {title}
            </h2>
            <div
              className="text-stone-300 text-base leading-relaxed space-y-4 font-normal"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="pt-4">
              <Link
                href="/menu"
                className="inline-block px-8 py-3.5 bg-[#8D4F2A] hover:bg-[#763f1f] active:scale-95 text-white font-bold rounded-2xl shadow-lg transition-all hover:scale-105"
              >
                Thưởng thức ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
