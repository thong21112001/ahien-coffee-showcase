"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Locale } from "@ahien/types";
import { Button, GlassCard, RadarChart } from "@ahien/ui";
import { CoffeeQuizModal } from "./CoffeeQuizModal";
import { Sparkles, HelpCircle, Compass, Award } from "lucide-react";

interface CoffeeQuizSectionProps {
  locale: Locale;
}

export function CoffeeQuizSection({ locale }: CoffeeQuizSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample preview radar profile
  const sampleProfile = {
    aroma: 9,
    acidity: 7,
    sweetness: 8,
    body: 7,
    bitterness: 6,
  };

  return (
    <section id="tim-gu-ca-phe" className="relative py-20 bg-stone-950 overflow-hidden text-white select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles size={14} className="animate-pulse" />
              <span>
                {locale === "vi" ? "Trải Nghiệm Tương Tác Độc Quyền" : "Exclusive Sensory Experience"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-white leading-tight">
              {locale === "vi" ? (
                <>
                  Khám Phá <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Gu Cà Phê Chân Ái</span> Của Riêng Bạn
                </>
              ) : (
                <>
                  Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Signature Flavor Match</span>
                </>
              )}
            </h2>

            <p className="text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light">
              {locale === "vi"
                ? "Mỗi người đều sở hữu một tầng giác quan độc bản. Chỉ với 3 câu hỏi trắc nghiệm nhanh, thuật toán A Hiền Flavor Profiler sẽ giải mã khẩu vị của bạn và vẽ nên biểu đồ giác quan cho ly cà phê lý tưởng nhất."
                : "Every coffee lover has a unique palate fingerprint. Answer 3 quick sensory questions and let A Hiền Flavor Profiler decode your taste notes with an interactive radar chart."}
            </p>

            {/* Benefit Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <HelpCircle size={20} className="text-amber-400 shrink-0" />
                <span className="text-xs text-stone-300 font-medium">
                  {locale === "vi" ? "3 Bước Nhanh Chóng" : "3 Quick Steps"}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <Compass size={20} className="text-amber-400 shrink-0" />
                <span className="text-xs text-stone-300 font-medium">
                  {locale === "vi" ? "Biểu Đồ 5 Giác Quan" : "5-Axis Sensory Radar"}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <Award size={20} className="text-amber-400 shrink-0" />
                <span className="text-xs text-stone-300 font-medium">
                  {locale === "vi" ? "Gợi Ý Món Độc Bản" : "Tailored Drink Match"}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="gold"
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30"
              >
                <Sparkles size={18} />
                <span>
                  {locale === "vi" ? "Bắt Đầu Khám Phá Ngay" : "Start Flavor Profiler Quiz"}
                </span>
              </Button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <GlassCard
              glow
              className="w-full max-w-md bg-stone-900/80 border-amber-500/30 p-6 sm:p-8 space-y-6 text-center transform hover:-translate-y-1 transition-transform duration-500"
            >
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                  {locale === "vi" ? "Minh Họa Biểu Đồ Giác Quan" : "Flavor Radar Preview"}
                </span>
                <h3 className="text-xl font-bold text-white font-serif">
                  {locale === "vi" ? "Tách Cà Phê Hoàn Hảo" : "Your Signature Cup"}
                </h3>
              </div>

              {/* Live Interactive Radar Chart preview */}
              <div className="flex justify-center py-2">
                <RadarChart profile={sampleProfile} locale={locale} size={240} />
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                💡{" "}
                {locale === "vi"
                  ? "Nhấp nút bên dưới để giải mã khẩu vị chuẩn xác của bạn!"
                  : "Click below to discover your personalized match!"}
              </div>

              <Button
                variant="glass"
                size="md"
                onClick={() => setIsModalOpen(true)}
                className="w-full"
              >
                {locale === "vi" ? "Thử Nghiệm Ngay (Miễn Phí)" : "Take Quiz Now (Free)"}
              </Button>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <CoffeeQuizModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
      />
    </section>
  );
}
