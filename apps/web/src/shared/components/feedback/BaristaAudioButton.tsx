"use client";

import React, { useState, useEffect } from "react";
import { baristaAudio } from "@ahien/utils";
import { Volume2, VolumeX, Coffee } from "lucide-react";
import { Locale } from "@ahien/types";

interface BaristaAudioButtonProps {
  locale?: Locale;
}

export function BaristaAudioButton({ locale = "vi" }: BaristaAudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsPlaying(baristaAudio.getState());
  }, []);

  const handleToggle = () => {
    const newState = baristaAudio.toggle();
    setIsPlaying(newState);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer border select-none ${
        isPlaying
          ? "bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-md shadow-amber-500/20"
          : "bg-stone-900/80 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700"
      }`}
      title={
        isPlaying
          ? locale === "vi"
            ? "Tắt âm thanh quán"
            : "Mute Café Ambience"
          : locale === "vi"
          ? "Bật âm thanh Barista ASMR"
          : "Play Barista ASMR Ambience"
      }
      aria-label="Toggle Barista ASMR Ambience"
    >
      {/* Animated coffee cup or volume icon */}
      <span className="relative flex items-center justify-center">
        {isPlaying ? (
          <>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <Volume2 size={15} className="text-amber-400 animate-pulse" />
          </>
        ) : (
          <VolumeX size={15} />
        )}
      </span>

      <span className="hidden sm:inline">
        {isPlaying
          ? locale === "vi"
            ? "ASMR: Đang phát"
            : "ASMR: Playing"
          : "ASMR Lounge"}
      </span>
    </button>
  );
}
