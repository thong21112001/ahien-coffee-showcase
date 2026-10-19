'use client';

import { useI18n } from '@/shared/i18n/hooks';

export default function LanguageSwitcher() {
    const { currentLanguage, changeLanguage, availableLanguages, t } = useI18n();

    return (
        <select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            className="px-3 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
            aria-label={t('language.switch')}
        >
            {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                    {t(`language.${lang}`)}
                </option>
            ))}
        </select>
    );
}
