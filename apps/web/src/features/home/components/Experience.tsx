"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";
import { IMAGES } from "@/shared/constants/images";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/shared/lib/gsap";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";

interface ExperienceProps {
  data?: SettingSection;
}

export function Experience({ data }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const title = data?.title || "";
  const subtitle = data?.subtitle || "";

  const experiences = data?.gridItems
    ? [...data.gridItems]
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((item) => ({
          title: item.title || "",
          desc: item.content || "",
          image: item.image ? getImageUrl(item.image) : IMAGES.experience.image1,
        }))
    : [];

  const bgImage = getImageUrl(data?.image) || IMAGES.experience.background;

  const renderContent = (content: string) => {
    if (!content) return null;
    if (content.includes("<") && content.includes(">")) {
      return <span dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return <span>{content}</span>;
  };

  useGSAP(
    () => {
      if (!data) return;

      if (prefersReducedMotion) {
        gsap.set([".experience-header", ".experience-card"], {
          opacity: 1,
          y: 0,
          clearProps: "all",
        });
        return;
      }

      // Smooth background parallax scrub
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Section header entrance
      gsap.fromTo(
        ".experience-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".experience-header",
            start: "top 85%",
          },
        }
      );

      // Staggered cards entrance
      gsap.fromTo(
        ".experience-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".experience-cards-grid",
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, data] }
  );

  if (!data) return null;


  return (
    <section
      ref={sectionRef}
      className="py-24 text-white relative overflow-hidden"
    >
      {/* Controlled Parallax Background */}
      <div
        ref={bgRef}
        className="absolute -top-[15%] -bottom-[15%] inset-x-0 bg-cover bg-center will-change-transform z-0"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* Dark luxury overlay for readability */}
      <div className="absolute inset-0 bg-stone-950/80 z-0" />

      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-brown/20 rounded-full blur-[100px] pointer-events-none z-1"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none z-1"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="experience-header text-center max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-stone-300 leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Experience Cards Grid */}
        <div className="experience-cards-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              whileHover={prefersReducedMotion ? {} : { y: -8 }}
              transition={{ duration: 0.25 }}
              className="experience-card bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-2xl overflow-hidden hover:border-brand-gold/50 shadow-xl transition-colors duration-300 group flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden flex justify-center items-center p-4">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform rounded-2xl duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Container */}
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-center font-serif text-white tracking-tight group-hover:text-brand-gold transition-colors">
                  {exp.title}
                </h3>
                <p className="text-stone-300 text-sm md:text-base text-center leading-relaxed">
                  {renderContent(exp.desc)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

