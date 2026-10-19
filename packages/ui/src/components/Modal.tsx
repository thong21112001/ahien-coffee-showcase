import React, { useEffect } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "md" }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const widthMap = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div
        className={`relative w-full ${widthMap[maxWidth]} bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden transform transition-all max-h-[90vh] flex flex-col`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-800/80 mb-6">
          {title && <h3 className="text-xl font-bold text-amber-100">{title}</h3>}
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors ml-auto cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto pr-1">{children}</div>
      </div>
    </div>
  );
}
