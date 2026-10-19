import viHome from "@/locales/vi/home.json";
import enHome from "@/locales/en/home.json";
import viQuiz from "@/locales/vi/quiz.json";
import enQuiz from "@/locales/en/quiz.json";
import { Locale } from "@ahien/types";

export const dictionaries = {
  vi: {
    home: viHome,
    quiz: viQuiz,
  },
  en: {
    home: enHome,
    quiz: enQuiz,
  },
};

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale] || dictionaries.vi;
};

export const LOCALES: Locale[] = ["vi", "en"];
export const DEFAULT_LOCALE: Locale = "vi";
