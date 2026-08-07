"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";
import { IMAGES } from "@/shared/constants/images";

interface FeaturedDishProps {
  data?: SettingSection;
}

export function FeaturedDish({ data }: FeaturedDishProps) {
  if (!data) return null;

  const subtitle = data.subtitle || "";
  const title = data.title || "";
  const content = data.content || data.description || "";
  const dishImage = getImageUrl(data.image) || IMAGES.featuredDish;
  const url = data.url || "#lien-he";

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[url('/bannerMain.png')] bg-center bg-cover rounded-3xl overflow-hidden shadow-2xl border border-stone-850">
          {/* Subtle amber glowing effect */}
          <div className="absolute inset-0 bg-black/55 z-0"></div>

          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center mx-5">
            {/* Left Content (Grid spanning 7 cols) */}
            <div className="lg:col-span-7 py-8 md:py-13 space-y-6 text-white">
              {subtitle && (
                <span className="inline-block text-brand-gold text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                  {subtitle}
                </span>
              )}
              <h3 className="text-2xl md:text-[32px] font-bold font-serif tracking-tight text-white">
                {title}
              </h3>
              <p className="text-stone-300 leading-relaxed text-base md:text-xl font-light">
                {content}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
                <Link
                  href={url}
                  className="w-full sm:w-auto rounded-full bg-brand-brown hover:bg-brand-brown-dark text-white px-8 py-3.5 shadow-md hover:shadow-lg transition-all duration-200 text-center hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  Đặt bàn ngay!
                </Link>
              </div>
            </div>

            {/* Right Image (Grid spanning 5 cols) */}
            <div className="lg:col-span-5 relative h-64 lg:h-[350px] w-full m-auto">
              <Image
                src={dishImage}
                alt={title}
                fill
                className="object-cover object-center rounded-4xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
