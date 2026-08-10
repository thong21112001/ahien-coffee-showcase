"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";
import { IMAGES } from "@/shared/constants/images";

interface HeroProps {
  data?: SettingSection;
}

export function Hero({ data }: HeroProps) {
  if (!data) return null;

  const title = data.title || "";
  const subtitle = data.subtitle || "";
  const avatarImage = IMAGES.hero.avatar;
  const backgroundImage = getImageUrl(data.image) || IMAGES.hero.background;
  const menuUrl = data.url || "#thuc-don";

  const showAvatar = true;

  return (
    <section
      className="relative min-h-[484px] bg-cover bg-center h-full lg:h-[10vh] xl:h-[60vh] flex items-center justify-center overflow-hidden py-12 lg:py-0 select-none"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Main Grid Container */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-22 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column: Typography & CTAs (60% width on large screens) */}
          <div className="lg:col-span-12 xl:col-span-7 max-w-4xl text-left space-y-6 sm:space-y-8 z-20">
            <h1 className="text-2xl md:text-3xl lg:text-[48px] font-bold font-sans text-white tracking-tight leading-normal max-w-4xl">
              {title}
            </h1>

            <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center font-medium gap-7 pt-2">
              <Link
                href="#lien-he"
                className="rounded-full bg-brand-brown hover:bg-brand-brown-dark text-white px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200 text-center hover:scale-[1.02] active:scale-98 cursor-pointer text-sm"
              >
                Liên hệ ngay!
              </Link>
              <Link
                href={menuUrl}
                className="rounded-full bg-white hover:bg-stone-100 text-brand-brown px-8 py-4 shadow-md hover:shadow-lg transition-all duration-200 text-center hover:scale-[1.02] active:scale-98 cursor-pointer text-sm"
              >
                Xem menu
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image Container - Absolute positioned */}
      {showAvatar && (
        <div className="hidden xl:block absolute bottom-40 xl:bottom-90 -right-10 xl:-right-25 w-[55%] h-full z-10 pointer-events-none">
          <Image
            src={avatarImage}
            alt={title}
            width={1000}
            height={1000}
            className="object-contain object-bottom"
            priority
          />
        </div>
      )}
    </section>
  );
}
