"use client";

import React from "react";

export function MenuSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 animate-pulse">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-[#F9F7F5] rounded-[1.25rem] p-3 flex flex-col border border-stone-200/40"
        >
          <div className="w-full aspect-[4/3] rounded-xl bg-stone-200/80 mb-3"></div>
          <div className="h-4 bg-stone-200/80 rounded-md w-3/4 mx-auto mb-2"></div>
          <div className="h-3 bg-stone-200/60 rounded-md w-1/2 mx-auto mb-3"></div>
          <div className="h-3 bg-stone-200/50 rounded-md w-5/6 mx-auto mb-4"></div>
          <div className="h-5 bg-stone-200/80 rounded-md w-2/5 mx-auto mt-auto"></div>
        </div>
      ))}
    </div>
  );
}
