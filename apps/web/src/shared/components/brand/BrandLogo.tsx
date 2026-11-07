"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";

export interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showTagline?: boolean;
  href?: string;
  className?: string;
  textClassName?: string;
  priority?: boolean;
  markOnly?: boolean;
}

const SIZE_MAP = {
  sm: {
    container: "h-9 w-9",
    pixels: 36,
    title: "text-sm",
    tagline: "text-[9px]",
  },
  md: {
    container: "h-11 w-11",
    pixels: 44,
    title: "text-base sm:text-lg",
    tagline: "text-[10px]",
  },
  lg: {
    container: "h-14 w-14",
    pixels: 56,
    title: "text-lg sm:text-xl",
    tagline: "text-xs",
  },
  xl: {
    container: "h-20 w-20",
    pixels: 80,
    title: "text-2xl sm:text-3xl",
    tagline: "text-sm",
  },
};

export function BrandLogo({
  size = "md",
  showText = true,
  showTagline = true,
  href,
  className,
  textClassName,
  priority = false,
  markOnly = false,
}: BrandLogoProps) {
  const currentSize = SIZE_MAP[size];

  const logoContent = (
    <div
      className={cn("inline-flex items-center gap-3 group select-none", className)}
      aria-label="A Hiền Coffee — Góc nhỏ A Hiền Coffee Since 1986"
    >
      {/* Phin Coffee SVG Emblem */}
      <div
        className={cn(
          "relative shrink-0 rounded-full overflow-hidden border border-amber-500/40 bg-stone-900 shadow-md group-hover:border-amber-400 group-hover:shadow-amber-500/20 transition-all duration-300",
          currentSize.container
        )}
      >
        <Image
          src={markOnly ? "/brand/ahien-mark.svg" : "/brand/ahien-logo.svg"}
          alt="A Hiền Coffee Phin Logo"
          width={currentSize.pixels}
          height={currentSize.pixels}
          priority={priority}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Typography with Heritage Flair */}
      {showText && !markOnly && (
        <div className={cn("flex flex-col text-left", textClassName)}>
          <span
            className={cn(
              "font-serif font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors duration-200 leading-tight",
              currentSize.title
            )}
          >
            A HIỀN COFFEE
          </span>
          {showTagline && (
            <span
              className={cn(
                "text-amber-500/90 font-medium tracking-widest uppercase transition-colors duration-200",
                currentSize.tagline
              )}
            >
              Since 1986 • Di Sản
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

export default BrandLogo;

