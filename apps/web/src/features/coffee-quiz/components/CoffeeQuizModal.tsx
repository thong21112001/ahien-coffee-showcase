"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Locale, CoffeeRecommendation } from "@ahien/types";
import { formatPrice } from "@ahien/utils";
import { Modal, Button, RadarChart, GlassCard } from "@ahien/ui";
import { QUIZ_QUESTIONS, calculateRecommendation } from "../data/quizData";
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2 } from "lucide-react";

interface CoffeeQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export function CoffeeQuizModal({ isOpen, onClose, locale }: CoffeeQuizModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<CoffeeRecommendation | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];
  const isLastQuestion = currentStepIndex === QUIZ_QUESTIONS.length - 1;
  const isAnswered = Boolean(selectedAnswers[currentQuestion?.id]);

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const optionIds = Object.values(selectedAnswers);
      const recommendation = calculateRecommendation(optionIds);
      setResult(recommendation);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedAnswers({});
    setResult(null);
  };

  const handleOrder = () => {
    onClose();
    const contactSection = document.getElementById("lien-he");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        result
          ? locale === "vi"
            ? "✨ Hương Vị Chân Ái Của Bạn"
            : "✨ Your Signature Coffee Match"
          : locale === "vi"
          ? "Trắc Nghiệm Gu Cà Phê A Hiền"
          : "A Hiền Coffee Flavor Profiler"
      }
      maxWidth="lg"
    >
      {!result ? (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300 rounded-full"
              style={{
                width: `${((currentStepIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>
              {locale === "vi" ? "Câu hỏi" : "Question"} {currentStepIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-amber-400 font-medium">
              {Math.round(((currentStepIndex + 1) / QUIZ_QUESTIONS.length) * 100)}%
            </span>
          </div>

          {/* Question title */}
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              {locale === "vi" ? currentQuestion.titleVi : currentQuestion.titleEn}
            </h4>
            <p className="text-sm text-stone-400">
              {locale === "vi" ? currentQuestion.subtitleVi : currentQuestion.subtitleEn}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option) => {
              const selected = selectedAnswers[currentQuestion.id] === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    selected
                      ? "bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10"
                      : "bg-stone-800/60 border-stone-700/60 hover:border-stone-600 hover:bg-stone-800"
                  }`}
                >
                  <div className="space-y-1">
                    <p className={`text-sm sm:text-base font-semibold ${selected ? "text-amber-300" : "text-stone-200"}`}>
                      {locale === "vi" ? option.labelVi : option.labelEn}
                    </p>
                    <p className="text-xs text-stone-400">
                      {locale === "vi" ? option.descriptionVi : option.descriptionEn}
                    </p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                      selected
                        ? "bg-amber-500 border-amber-500 text-stone-950"
                        : "border-stone-600 bg-stone-900"
                    }`}
                  >
                    {selected && <CheckCircle2 size={16} className="text-stone-950" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-800/60">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              {locale === "vi" ? "Quay lại" : "Back"}
            </Button>

            <Button
              variant="gold"
              size="sm"
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex items-center gap-2"
            >
              {isLastQuestion
                ? locale === "vi"
                  ? "Xem kết quả"
                  : "Reveal Result"
                : locale === "vi"
                ? "Tiếp tục"
                : "Next"}
              {isLastQuestion ? <Sparkles size={16} /> : <ArrowRight size={16} />}
            </Button>
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
          {/* Top Banner Card */}
          <GlassCard glow className="bg-stone-950/80 border-amber-500/40 p-6 sm:p-7">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Image */}
              <div className="sm:col-span-5 relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-amber-500/20 bg-stone-900">
                <Image
                  src={result.image}
                  alt={result.nameVi}
                  fill
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {result.badges.map((b) => (
                    <span
                      key={b}
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 shadow-sm"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="sm:col-span-7 space-y-3 text-left">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    {locale === "vi" ? result.taglineVi : result.taglineEn}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    {locale === "vi" ? result.nameVi : result.nameEn}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {locale === "vi" ? result.descriptionVi : result.descriptionEn}
                </p>

                <div className="pt-1 text-xs text-stone-400 space-y-1">
                  <p>
                    <span className="text-amber-300 font-medium">
                      {locale === "vi" ? "Vùng hạt:" : "Origin:"}{" "}
                    </span>
                    {result.origin}
                  </p>
                  <p>
                    <span className="text-amber-300 font-medium">
                      {locale === "vi" ? "Độ rang:" : "Roast:"}{" "}
                    </span>
                    {result.roastLevel}
                  </p>
                </div>

                <div className="pt-2 text-lg font-bold text-amber-400">
                  {formatPrice(result.priceVnd, result.priceUsd, locale)}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Sensory Radar Chart Section */}
          <div className="bg-stone-950/50 p-5 rounded-2xl border border-stone-800 text-center space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300">
              {locale === "vi"
                ? "Biểu Đồ Giác Quan Của Ly Cà Phê"
                : "Sensory Flavor Radar Chart"}
            </h4>
            <div className="flex justify-center py-2">
              <RadarChart profile={result.flavorProfile} locale={locale} size={260} />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <RotateCcw size={15} />
              {locale === "vi" ? "Thử lại câu hỏi khác" : "Retake Quiz"}
            </Button>

            <Button
              variant="gold"
              size="md"
              onClick={handleOrder}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              {locale === "vi" ? "Đặt bàn thưởng thức ly này" : "Reserve Tasting Table"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
