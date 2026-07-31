"use client";

import React from "react";
import { WebLayout } from "@/shared/components/layout/WebLayout";
import { useHomeSections } from "../hooks/useHomeSections";
import { Hero } from "./Hero";
import { About } from "./About";
import { Experience } from "./Experience";
import { CulinaryEssence } from "./CulinaryEssence";
import { FeaturedDish } from "./FeaturedDish";
import { Gallery } from "./Gallery";
import { ContactForm } from "./ContactForm";

export function HomePage() {
  const { data: sections = [] } = useHomeSections();

  const heroData = sections.find((s) => s.key === "home_hero");
  const storyData = sections.find((s) => s.key === "home_story");
  const valuesData = sections.find((s) => s.key === "home_values");
  const experienceData = sections.find((s) => s.key === "home_experience");
  const featuredDishData = sections.find((s) => s.key === "home_featured_dish");
  const galleryData = sections.find((s) => s.key === "home_gallery");
  const menuData = sections.find((s) => s.key === "menu_food");
  const contactData = sections.find((s) => s.key === "home_contact");

  return (
    <WebLayout>
      {/* Hero Banner */}
      <Hero data={heroData} />

      {/* About Story & Values */}
      <About storyData={storyData} valuesData={valuesData} />

      {/* Experience Journey */}
      <Experience data={experienceData} />

      {/* Culinary Essence Preview */}
      <CulinaryEssence data={menuData} />

      {/* Featured Signature Dish */}
      <FeaturedDish data={featuredDishData} />

      {/* Ambient Restaurant Gallery */}
      <Gallery data={galleryData} />

      {/* Online Reservation & Locations */}
      <ContactForm data={contactData} />
    </WebLayout>
  );
}
