"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";
import { IMAGES } from "@/shared/constants/images";

interface ContactFormProps {
  data?: SettingSection;
}

export function ContactForm({ data }: ContactFormProps) {
  if (!data) return null;

  const title = data.title || "";
  const imageUrl = getImageUrl(data.image) || IMAGES.contact.image;
  const subtitle = data.content || data.subtitle || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Vui lòng nhập Họ tên và Số điện thoại!");
      return;
    }
    setIsSubmitting(true);
    // Simulate booking API call
    setTimeout(() => {
      toast.success(
        "Đặt bàn thành công! Chúng tôi sẽ liên hệ xác nhận sớm nhất."
      );
      setName("");
      setPhone("");
      setEmail("");
      setContent("");
      setIsSubmitting(false);
    }, 1200);
  };

  const contactMethods =
    data.gridItems && data.gridItems.length > 0
      ? [...data.gridItems]
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((item) => ({
          name: item.title || "",
          value: item.content || "",
          iconSvg: item.icon || "",
          icon: null,
        }))
      : [];

  return (
    <section id="lien-he" className="py-24 bg-stone-50 text-stone-850">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-[32px] text-brand-brown font-bold font-serif mb-4">
            {title}
          </h2>

          <p className="text-gray-700 leading-relaxed">{subtitle}</p>
        </div>

        <div className="space-y-8">
          {/* Row 1: Form & Storefront Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Booking Form Card */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/60 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-center text-xl font-serif font-bold text-stone-900 mb-2">
                  Bạn cần đặt bàn?
                </h3>
                <p className="text-center text-sm text-stone-500 mb-6">
                  Vui lòng điền đầy đủ thông tin, chúng tôi sẽ liên hệ xác nhận
                  trong thời gian sớm nhất.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 tracking-wider mb-1">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Vui lòng nhập"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-brand-brown focus:bg-white focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 tracking-wider mb-1">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Vui lòng nhập"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-brand-brown focus:bg-white focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 tracking-wider mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Vui lòng nhập"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-brand-brown focus:bg-white focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 tracking-wider mb-1">
                      Nội dung
                    </label>
                    <textarea
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Vui lòng nhập"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-brand-brown focus:bg-white focus:outline-none transition-all duration-200 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 rounded-xl bg-brand-brown hover:bg-brand-brown-dark disabled:bg-stone-400 text-white py-3.5 text-sm shadow-md hover:shadow-lg transition-all duration-250 hover:scale-[1.01] active:scale-99 cursor-pointer text-center font-bold"
                  >
                    {isSubmitting ? "Đang gửi..." : "Đặt bàn ngay!"}
                  </button>
                </form>
              </div>
            </div>

            {/* Storefront Image */}
            <div className="relative min-h-[350px] w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200/50 hover:scale-[1.005] transition-transform duration-300">
              <Image
                src={imageUrl}
                alt="Đội ngũ Bếp Nhà Thu storefront"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 2: Contacts & Map Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Quick Contacts Card */}
            <div className="bg-white border border-stone-200/60 rounded-3xl p-6 shadow-lg flex flex-col justify-between space-y-4">
              {contactMethods.map((method, index) => {
                const plainTextValue = method.value.replace(/<[^>]*>?/gm, "");

                return (
                  <div
                    key={index}
                    className="bg-stone-50 rounded-2xl p-4 shadow-xs flex items-center gap-4 group"
                  >
                    <div className="h-10 w-10 [&>span>svg]:w-6 [&>span>svg]:h-6 [&>span>svg_path]:fill-brand-brown rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      {method.iconSvg ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: method.iconSvg }}
                          className="flex items-center justify-center w-full h-full"
                        />
                      ) : (
                        method.icon
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-bold text-stone-800 block mb-0.5">
                        {method.name}
                      </span>
                      <span
                        className="text-sm text-stone-500 block truncate"
                        title={plainTextValue}
                      >
                        {plainTextValue}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Mockup Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/60 shadow-lg flex flex-col justify-between">
              <div className="relative w-full grow rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 min-h-[180px] lg:min-h-0">
                <Link
                  href={
                    "https://www.google.com/maps/place/A+Hi%E1%BB%81n+Coffee/@16.0518188,108.2174677,17z/data=!3m1!4b1!4m6!3m5!1s0x314219005268a871:0xba5e4eb6104ae07c!8m2!3d16.0518188!4d108.2174677!16s%2Fg%2F11ntptjcq1?hl=vi&entry=ttu&g_ep=EgoyMDI2MDgwNC4wIKXMDSoASAFQAw%3D%3D"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={IMAGES.contact.map}
                    alt="Bản đồ chỉ đường A Hiền Coffee"
                    fill
                    className="object-cover"
                  />
                </Link>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-stone-600 font-medium">
                  K514/5 Hoàng Diệu, phường Hòa Cường, Thành phố Đà Nẵng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
