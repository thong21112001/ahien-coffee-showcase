'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useI18n } from '@/shared/i18n/hooks';

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const { t } = useI18n();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
            >
                <div className="w-6 h-6" />
            </button>
        );
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={t('theme.toggle')}
        >
            {resolvedTheme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}
