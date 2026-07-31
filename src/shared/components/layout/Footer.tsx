"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#12100e] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          {/* Col 1: Brand Logo & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Bếp Nhà Thu Logo"
                width={120}
                height={75}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              Thưởng thức hương vị ẩm thực truyền thống Hội An trong không gian ấm cúng, cổ kính và chan chứa tình thân.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider">
              Khám phá
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link href="/" className="hover:text-[#D9A05B] transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="#ve-chung-toi" className="hover:text-[#D9A05B] transition-colors">
                  Về Bếp Nhà Thu
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#D9A05B] transition-colors">
                  Thực đơn phong phú
                </Link>
              </li>
              <li>
                <Link href="#hinh-anh" className="hover:text-[#D9A05B] transition-colors">
                  Bộ sưu tập không gian
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D9A05B]" />
              Giờ mở cửa
            </h4>
            <div className="text-sm text-stone-400 space-y-2">
              <p>
                <strong className="text-stone-200">Thứ Hai - Thứ Sáu:</strong>
                <br /> 09:00 - 22:00
              </p>
              <p>
                <strong className="text-stone-200">Thứ Bảy - Chủ Nhật:</strong>
                <br /> 08:30 - 22:30
              </p>
            </div>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider">
              Liên hệ
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9A05B] shrink-0 mt-0.5" />
                <span>Số 123 Phố Cổ, Thành phố Hội An, Quảng Nam</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D9A05B] shrink-0" />
                <a href="tel:0915003833" className="hover:text-[#D9A05B] transition-colors">
                  0915 003 833
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D9A05B] shrink-0" />
                <span>bepnhathu@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-stone-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Bếp Nhà Thu. All rights reserved.</p>
          <p>Thiết kế & Triển khai bởi Senior Frontend Team</p>
        </div>
      </div>
    </footer>
  );
}
