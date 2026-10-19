import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export function GlassCard({ children, className, glow = false, ...props }: GlassCardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "relative rounded-2xl p-6 backdrop-blur-xl bg-stone-900/60 border border-stone-800/80 shadow-2xl transition-all duration-300",
          glow && "hover:border-amber-500/40 hover:shadow-amber-500/10",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
