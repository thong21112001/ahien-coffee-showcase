"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@ahien/types";

interface FooterProps {
  locale?: Locale;
}

export function Footer({ locale = "vi" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-300 py-12 border-t border-stone-800 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-stone-800/80">
          {/* Column 1: Info & Description */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border border-amber-500/30 bg-stone-900">
                <Image
                  src="/logo.webp"
                  alt="A Hiền Coffee Logo"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">A HIỀN COFFEE</h3>
                <p className="text-[10px] text-amber-400 uppercase tracking-widest">
                  Artisanal Heritage Coffee
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
              {locale === "vi"
                ? "A Hiền Coffee là nơi hương cà phê phin thủ công lan tỏa trong ánh nắng dịu và những câu chuyện đời thường. Lưu giữ bản sắc Việt, nâng tầm hạt cà phê đặc sản."
                : "A Hiền Coffee is where handcrafted Vietnamese Phin coffee merges with tranquil moments. Preserving native heritage while elevating specialty highland beans."}
            </p>

            <div className="flex items-center gap-4 text-xs text-amber-400/90 font-medium">
              <span>☕ 100% Rang Mộc Tự Nhiên</span>
              <span>•</span>
              <span>🇻🇳 Cầu Đất & Buôn Ma Thuột</span>
            </div>
          </div>

          {/* Column 2: Navigation Categories */}
          <div className="space-y-4 md:pl-10">
            <h4 className="text-sm font-serif font-bold text-amber-400 tracking-wider uppercase">
              {locale === "vi" ? "Khám Phá" : "Explore"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#ve-chung-toi" className="hover:text-amber-400 transition-colors">
                  {locale === "vi" ? "Về chúng tôi & Triết lý" : "Our Heritage & Story"}
                </Link>
              </li>
              <li>
                <Link href="#thuc-don" className="hover:text-amber-400 transition-colors">
                  {locale === "vi" ? "Thực đơn cà phê đặc sắc" : "Curated Coffee Menu"}
                </Link>
              </li>
              <li>
                <Link href="#tim-gu-ca-phe" className="hover:text-amber-400 transition-colors text-amber-300 font-semibold">
                  {locale === "vi" ? "✨ Trắc nghiệm gu cà phê (Quiz)" : "✨ Flavor Profiler Quiz"}
                </Link>
              </li>
              <li>
                <Link href="#hinh-anh" className="hover:text-amber-400 transition-colors">
                  {locale === "vi" ? "Không gian & Khoảnh khắc" : "Ambience & Gallery"}
                </Link>
              </li>
              <li>
                <Link href="#lien-he" className="hover:text-amber-400 transition-colors">
                  {locale === "vi" ? "Đặt bàn & Liên hệ" : "Reservation & Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-amber-400 tracking-wider uppercase">
              {locale === "vi" ? "Thông Tin Liên Hệ" : "Contact & Visit"}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-400">
              <li className="flex gap-2">
                <span className="text-stone-300 font-medium">Hotline/Zalo:</span>
                <span className="text-amber-300">0367262415</span>
              </li>
              <li className="flex gap-2">
                <span className="text-stone-300 font-medium">Email:</span>
                <Link href="mailto:quangthong211101@gmail.com" className="hover:text-amber-400 transition-colors">
                  quangthong211101@gmail.com
                </Link>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-stone-300 font-medium shrink-0">
                  {locale === "vi" ? "Địa chỉ:" : "Address:"}
                </span>
                <span>TP. Đà Nẵng & TP. Hồ Chí Minh, Việt Nam</span>
              </li>
              <li className="flex gap-2">
                <span className="text-stone-300 font-medium">
                  {locale === "vi" ? "Giờ mở cửa:" : "Hours:"}
                </span>
                <span>06:30 - 22:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright info */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-xs text-stone-500 gap-4">
          <p>© {currentYear} A Hiền Coffee. {locale === "vi" ? "Tất cả các quyền được bảo lưu." : "All rights reserved."}</p>
          <div className="flex gap-6">
            <span className="hover:text-amber-400 transition-colors cursor-pointer">
              {locale === "vi" ? "Chính sách bảo mật" : "Privacy Policy"}
            </span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">
              {locale === "vi" ? "Điều khoản dịch vụ" : "Terms of Service"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
