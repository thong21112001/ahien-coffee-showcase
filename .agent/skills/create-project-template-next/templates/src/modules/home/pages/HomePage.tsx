'use client';

import ThemeToggle from '@/shared/components/ThemeToggle';
import LanguageSwitcher from '@/shared/components/LanguageSwitcher';
import Button from '@/shared/components/Button';
import { useI18n } from '@/shared/i18n/hooks';
import Welcome from '../components/Welcome';

export default function HomePage() {
    const { t } = useI18n();

    return (
        <main className="flex min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    {t('app.name')}
                </p>
                <div className="flex gap-4">
                    <ThemeToggle />
                    <LanguageSwitcher />
                </div>
            </div>

            <Welcome />

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <Button onClick={() => alert('Clicked!')}>{t('buttons.save')}</Button>
            </div>
        </main>
    );
}
