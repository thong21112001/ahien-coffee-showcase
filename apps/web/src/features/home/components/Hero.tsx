"use client";

import React from "react";
import Link from "next/link";
import { SettingSection, Locale } from "@ahien/types";
import { getImageUrl } from "@ahien/utils";
import { IMAGES } from "@/shared/constants/images";
import { getDictionary } from "@/shared/i18n";
import { Sparkles, Coffee } from "lucide-react";

interface HeroProps {
  data?: SettingSection;
  locale?: Locale;
}

export function Hero({ data, locale = "vi" }: HeroProps) {
  const dict = getDictionary(locale);
  const t = dict.home.hero;

  const title = locale === "en" ? t.title : (data?.title || t.title);
  const subtitle = locale === "en" ? t.subtitle : (data?.subtitle || t.subtitle);
  const backgroundImage = getImageUrl(data?.image) || IMAGES.hero.background;
  const menuUrl = data?.url || "#thuc-don";

  return (
    <section
      className="relative min-h-[560px] lg:min-h-[640px] bg-cover bg-center flex items-center justify-center overflow-hidden py-16 lg:py-24 select-none"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Dark luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/60 z-10" />

      {/* Main Grid Container */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-16 max-w-7xl w-full mx-auto flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-12 xl:col-span-8 max-w-3xl text-left space-y-6 sm:space-y-8">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-semibold tracking-wide shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight">
              {title}
            </h1>

            <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-light">
              {subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#lien-he"
                className="rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:brightness-110 text-stone-950 font-bold px-8 py-3.5 shadow-xl shadow-amber-500/20 transition-all duration-300 text-center hover:scale-[1.03] active:scale-95 text-sm"
              >
                {t.ctaContact}
              </Link>

              <Link
                href="#tim-gu-ca-phe"
                className="rounded-full bg-stone-900/90 hover:bg-stone-800 text-amber-400 border border-amber-500/40 hover:border-amber-400 px-6 py-3.5 shadow-md backdrop-blur-md transition-all duration-300 text-center hover:scale-[1.03] active:scale-95 text-sm font-semibold flex items-center gap-2"
              >
                <Sparkles size={16} />
                <span>{t.ctaQuiz}</span>
              </Link>

              <Link
                href={menuUrl}
                className="rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-6 py-3.5 shadow-md transition-all duration-300 text-center hover:scale-[1.03] active:scale-95 text-sm font-medium"
              >
                {t.ctaMenu}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
