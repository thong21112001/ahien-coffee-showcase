"use client";

import React from "react";
import Image from "next/image";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";
import { IMAGES } from "@/shared/constants/images";

interface ExperienceProps {
  data?: SettingSection;
}

export function Experience({ data }: ExperienceProps) {
  if (!data) return null;

  const title = data.title || "";
  const subtitle = data.subtitle || "";

  const experiences = data.gridItems
    ? [...data.gridItems]
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((item, idx) => ({
          title: item.title || "",
          desc: item.content || "",
          image: item.image ? getImageUrl(item.image) : IMAGES.experience.image1,
        }))
    : [];

  const bgImage = getImageUrl(data.image) || IMAGES.experience.background;

  const renderContent = (content: string) => {
    if (!content) return null;
    if (content.includes("<") && content.includes(">")) {
      return <span dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return <span>{content}</span>;
  };

  return (
    <section
      className="py-24 bg-fixed bg-cover bg-center text-white relative overflow-hidden"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-brown/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-4">
            {title}
          </h2>
          <p className="text-white leading-relaxed">{subtitle}</p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white border border-stone-800 rounded-2xl overflow-hidden hover:border-brand-brown/50 transition-all duration-500 group hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="relative h-fit w-full overflow-hidden flex justify-center items-center p-5">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  width={500}
                  height={500}
                  className="object-cover transition-transform rounded-4xl duration-500"
                />
              </div>

              {/* Text Container */}
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-bold text-center font-serif text-black tracking-tight group-hover:text-brand-gold transition-colors">
                  {exp.title}
                </h3>
                <p className="text-gray-500 text-lg text-center leading-relaxed">
                  {renderContent(exp.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
