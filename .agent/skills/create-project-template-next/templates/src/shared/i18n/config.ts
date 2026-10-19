import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enCommon from '@/locales/en/common.json';
import viCommon from '@/locales/vi/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      vi: {
        common: viCommon,
      },
    },
    lng: 'vi', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
