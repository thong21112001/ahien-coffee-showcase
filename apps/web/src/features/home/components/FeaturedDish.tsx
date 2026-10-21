"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";
import { IMAGES } from "@/shared/constants/images";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/shared/lib/gsap";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";

interface FeaturedDishProps {
  data?: SettingSection;
}

export function FeaturedDish({ data }: FeaturedDishProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const subtitle = data?.subtitle || "";
  const title = data?.title || "";
  const content = data?.content || data?.description || "";
  const dishImage = getImageUrl(data?.image) || IMAGES.featuredDish;
  const url = data?.url || "#lien-he";

  useGSAP(
    () => {
      if (!data) return;

      if (prefersReducedMotion) {
        gsap.set([".featured-card", ".featured-text", ".featured-dish-img"], {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotate: 0,
          clearProps: "all",
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".featured-card",
          start: "top 80%",
        },
      });

      tl.fromTo(
        ".featured-card",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          ".featured-text",
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".featured-dish-img",
          { opacity: 0, scale: 0.92, rotate: -2 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, data] }
  );

  if (!data) return null;

  return (
    <section ref={sectionRef} className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="featured-card relative bg-[url('/bannerMain.webp')] bg-center bg-cover rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
          {/* Subtle amber glowing effect */}
          <div className="absolute inset-0 bg-black/65 z-0"></div>

          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/15 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-12">
            {/* Left Content (Grid spanning 7 cols) */}
            <div className="featured-text lg:col-span-7 space-y-6 text-white">
              {subtitle && (
                <span className="inline-block text-brand-gold text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30">
                  {subtitle}
                </span>
              )}
              <h3 className="text-2xl md:text-[34px] font-bold font-serif tracking-tight text-white leading-tight">
                {title}
              </h3>
              <p className="text-stone-300 leading-relaxed text-base md:text-lg font-light">
                {content}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-start">
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.04 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
                >
                  <Link
                    href={url}
                    className="inline-block rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-8 py-3.5 shadow-xl shadow-amber-500/20 text-center text-sm"
                  >
                    Liên hệ ngay!
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right Image (Grid spanning 5 cols) */}
            <div className="lg:col-span-5 relative h-64 lg:h-[350px] w-full flex items-center justify-center">
              <div className="featured-dish-img relative w-full h-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30">
                <Image
                  src={dishImage}
                  alt={title}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

