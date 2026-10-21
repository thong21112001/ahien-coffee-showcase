"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";
import { IMAGES } from "@/shared/constants/images";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/shared/lib/gsap";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";

interface ContactFormProps {
  data?: SettingSection;
}

export function ContactForm({ data }: ContactFormProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const title = data?.title || "";
  const imageUrl = getImageUrl(data?.image) || IMAGES.contact.image;
  const subtitle = data?.content || data?.subtitle || "";

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
        "Liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất."
      );
      setName("");
      setPhone("");
      setEmail("");
      setContent("");
      setIsSubmitting(false);
    }, 1200);
  };

  const contactMethods =
    data?.gridItems && data.gridItems.length > 0
      ? [...data.gridItems]
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((item) => ({
          name: item.title || "",
          value: item.content || "",
          iconSvg: item.icon || "",
          icon: null,
        }))
      : [];

  useGSAP(
    () => {
      if (!data) return;

      if (prefersReducedMotion) {
        gsap.set(
          [
            ".contact-header",
            ".contact-form-card",
            ".contact-image-card",
            ".contact-info-card",
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            clearProps: "all",
          }
        );
        return;
      }

      // Header entrance
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact-header",
            start: "top 85%",
          },
        }
      );

      // Form card slides in from left
      gsap.fromTo(
        ".contact-form-card",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-form-card",
            start: "top 80%",
          },
        }
      );

      // Storefront image slides in from right
      gsap.fromTo(
        ".contact-image-card",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-image-card",
            start: "top 80%",
          },
        }
      );

      // Row 2 cards fade and rise
      gsap.fromTo(
        ".contact-info-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-info-card",
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, data] }
  );

  if (!data) return null;

  return (
    <section ref={sectionRef} id="lien-he" className="py-24 bg-stone-50 text-stone-850">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="contact-header text-center max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-[32px] text-brand-brown font-bold font-serif mb-4">
            {title}
          </h2>
          <p className="text-gray-700 leading-relaxed">{subtitle}</p>
        </div>

        <div className="space-y-8">
          {/* Row 1: Form & Storefront Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Booking Form Card */}
            <div className="contact-form-card bg-white rounded-3xl p-8 border border-stone-200/60 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-center text-xl font-serif font-bold text-stone-900 mb-2">
                  Bạn cần hỗ trợ?
                </h3>
                <p className="text-center text-sm text-stone-500 mb-6">
                  Vui lòng điền đầy đủ thông tin, chúng tôi sẽ liên hệ xác nhận
                  trong thời gian sớm nhất.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 tracking-wider mb-1 font-medium">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Vui lòng nhập họ tên"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-brand-brown focus:bg-white focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 tracking-wider mb-1 font-medium">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Vui lòng nhập số điện thoại"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-brand-brown focus:bg-white focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 tracking-wider mb-1 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Vui lòng nhập email"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-brand-brown focus:bg-white focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 tracking-wider mb-1 font-medium">
                      Nội dung
                    </label>
                    <textarea
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Ghi chú thêm về yêu cầu đặt bàn hoặc câu hỏi"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-brand-brown focus:bg-white focus:outline-none transition-all duration-200 resize-none"
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 rounded-xl bg-brand-brown hover:bg-brand-brown-dark disabled:bg-stone-400 text-white py-3.5 text-sm shadow-md hover:shadow-lg transition-colors cursor-pointer text-center font-bold"
                  >
                    {isSubmitting ? "Đang gửi..." : "Liên hệ ngay!"}
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Storefront Image */}
            <div className="contact-image-card relative min-h-[350px] w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200/50">
              <Image
                src={imageUrl}
                alt="A Hiền Coffee"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Row 2: Contacts & Map Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Quick Contacts Card */}
            <div className="contact-info-card bg-white border border-stone-200/60 rounded-3xl p-6 shadow-lg flex flex-col justify-between space-y-4">
              {contactMethods.map((method, index) => {
                const plainTextValue = method.value.replace(/<[^>]*>?/gm, "");

                return (
                  <motion.div
                    key={index}
                    whileHover={prefersReducedMotion ? {} : { x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="bg-stone-50 rounded-2xl p-4 shadow-xs flex items-center gap-4 group cursor-default transition-colors hover:bg-amber-50/50"
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
                      <span className="text-sm font-bold text-stone-800 block mb-0.5 group-hover:text-brand-brown transition-colors">
                        {method.name}
                      </span>
                      <span
                        className="text-sm text-stone-500 block truncate"
                        title={plainTextValue}
                      >
                        {plainTextValue}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Mockup Card */}
            <div className="contact-info-card bg-white rounded-3xl p-6 border border-stone-200/60 shadow-lg flex flex-col justify-between">
              <div className="relative w-full grow rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 min-h-[180px] lg:min-h-0">
                <Link
                  href={
                    "https://www.google.com/maps/place/A+Hi%E1%BB%81n+Coffee/@16.0518188,108.2174677,17z/data=!3m1!4b1!4m6!3m5!1s0x314219005268a871:0xba5e4eb6104ae07c!8m2!3d16.0518188!4d108.2174677!16s%2Fg%2F11ntptjcq1?hl=vi&entry=ttu&g_ep=EgoyMDI2MDgwNC4wIKXMDSoASAFQAw%3D%3D"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full h-full group"
                >
                  <Image
                    src={IMAGES.contact.map}
                    alt="Bản đồ chỉ đường A Hiền Coffee"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
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

