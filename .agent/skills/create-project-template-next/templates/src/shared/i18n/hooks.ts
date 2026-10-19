import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { t, i18n } = useTranslation('common');
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return {
    t,
    currentLanguage: i18n.language,
    changeLanguage,
    availableLanguages: ['en', 'vi'],
  };
};
