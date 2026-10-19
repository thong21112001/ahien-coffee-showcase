import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-amber-900 text-amber-50 hover:bg-amber-800 shadow-lg shadow-amber-950/40 hover:shadow-amber-900/50 hover:scale-[1.02]",
    secondary:
      "bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white border border-stone-700/60 shadow-md",
    gold:
      "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-stone-950 font-bold hover:brightness-110 shadow-lg shadow-amber-500/20 hover:scale-[1.03]",
    glass:
      "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-md hover:border-amber-400/50",
    outline:
      "bg-transparent text-amber-400 border border-amber-500/40 hover:bg-amber-500/10 hover:border-amber-400",
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
