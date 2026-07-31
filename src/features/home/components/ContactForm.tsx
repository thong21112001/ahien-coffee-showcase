"use client";

import React from "react";
import { SettingSection } from "../types/home.types";
import { BookingForm } from "@/features/cart";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface ContactFormProps {
  data?: SettingSection;
}

export function ContactForm({ data }: ContactFormProps) {
  const title = data?.title || "Đặt Bàn Trực Tuyến & Liên Hệ";
  const subtitle = data?.subtitle || "GIỮ BÀN TRƯỚC";

  return (
    <section id="lien-he" className="py-20 bg-stone-100 text-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#8D4F2A] font-extrabold text-xs md:text-sm tracking-widest uppercase">
            {subtitle}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-stone-900 mt-2">
            {title}
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            Đặt bàn trước để được phục vụ chu đáo nhất và nhận ưu đãi riêng từ Bếp Nhà Thu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-stone-200/80">
          {/* Form Side */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-stone-900 mb-6">
              Thông tin giữ chỗ
            </h3>
            <BookingForm />
          </div>

          {/* Info & Map Side */}
          <div className="flex flex-col justify-between space-y-6 bg-stone-50 p-6 md:p-8 rounded-2xl border border-stone-200/80">
            <div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">
                Thông tin nhà hàng
              </h3>
              <ul className="space-y-4 text-stone-600 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#8D4F2A] shrink-0 mt-0.5" />
                  <span>
                    <strong>Địa chỉ:</strong> Số 123 Phố Cổ, Thành phố Hội An, Tỉnh Quảng Nam
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#8D4F2A] shrink-0" />
                  <span>
                    <strong>Hotline đặt bàn:</strong> 0915 003 833
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#8D4F2A] shrink-0" />
                  <span>
                    <strong>Email:</strong> bepnhathu@gmail.com
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#8D4F2A] shrink-0 mt-0.5" />
                  <span>
                    <strong>Giờ phục vụ:</strong> 08:30 - 22:30 hàng ngày
                  </span>
                </li>
              </ul>
            </div>

            {/* Embedded Google Map Placeholder / iframe */}
            <div className="w-full h-48 rounded-xl overflow-hidden bg-stone-200 relative border border-stone-300">
              <iframe
                title="Bếp Nhà Thu Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.7335272635955!2d108.32420957583626!3d15.877864845371661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420dcd14a2f8c5%3A0xb249339eefec3a0d!2sH%E1%BB%99i%20An%2C%20Qu%E1%BA%A3ng%20Nam!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
