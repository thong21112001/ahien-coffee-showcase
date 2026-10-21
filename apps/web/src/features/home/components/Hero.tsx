"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { SettingSection, Locale } from "@ahien/types";
import { getImageUrl } from "@ahien/utils";
import { IMAGES } from "@/shared/constants/images";
import { getDictionary } from "@/shared/i18n";
import { Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/shared/lib/gsap";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";

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

  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        // Immediate display without motion for users preferring reduced motion
        gsap.set([bgRef.current, ".hero-badge", ".hero-title", ".hero-subtitle", ".hero-cta-btn"], {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "all",
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Subtle scale-in of the artisanal background
      if (bgRef.current) {
        tl.fromTo(
          bgRef.current,
          { scale: 1.08, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" },
          0
        );
      }

      // Badge entrance
      tl.fromTo(
        ".hero-badge",
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        0.2
      );

      // Main Heading entrance
      tl.fromTo(
        ".hero-title",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        0.35
      );

      // Subtitle paragraph reveal
      tl.fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.65
      );

      // Action buttons staggered entrance
      tl.fromTo(
        ".hero-cta-btn",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        0.9
      );
    },
    { scope: heroRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[560px] lg:min-h-[640px] flex items-center justify-center overflow-hidden py-16 lg:py-24 select-none"
    >
      {/* Background with GSAP subtle scale */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Dark luxury gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/60 z-10" />

      {/* Main Grid Container */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-16 max-w-7xl w-full mx-auto flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-12 xl:col-span-8 max-w-3xl text-left space-y-6 sm:space-y-8">
            {/* Tag */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-semibold tracking-wide shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{t.badge}</span>
            </div>

            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight">
              {title}
            </h1>

            <p className="hero-subtitle text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-light">
              {subtitle}
            </p>

            {/* Action Buttons with Motion feedback */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.div
                className="hero-cta-btn"
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              >
                <Link
                  href="#lien-he"
                  className="inline-block rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:brightness-110 text-stone-950 font-bold px-8 py-3.5 shadow-xl shadow-amber-500/20 transition-all text-center text-sm"
                >
                  {t.ctaContact}
                </Link>
              </motion.div>

              <motion.div
                className="hero-cta-btn"
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              >
                <Link
                  href="#tim-gu-ca-phe"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-900/90 hover:bg-stone-800 text-amber-400 border border-amber-500/40 hover:border-amber-400 px-6 py-3.5 shadow-md backdrop-blur-md transition-all text-center text-sm font-semibold"
                >
                  <Sparkles size={16} />
                  <span>{t.ctaQuiz}</span>
                </Link>
              </motion.div>

              <motion.div
                className="hero-cta-btn"
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              >
                <Link
                  href={menuUrl}
                  className="inline-block rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-6 py-3.5 shadow-md transition-all text-center text-sm font-medium"
                >
                  {t.ctaMenu}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

