'use client';

import { useI18n } from '@/shared/i18n/hooks';
import Button from '@/shared/components/Button';
import ThemeToggle from '@/shared/components/ThemeToggle';
import LanguageSwitcher from '@/shared/components/LanguageSwitcher';

export default function { Module } Page() {
    const { t } = useI18n();

    return (
        <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl tracking-tighter">PROJECT</div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <Button size="sm">Get Started</Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(59,130,246,0.1)_0%,rgba(0,0,0,0)_100%)]"></div>
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-neutral-500">
                        {t('{module}.title')}
                    </h1>
                    <p className="text-xl lg:text-2xl text-gray-600 dark:text-neutral-400 mb-10 leading-relaxed">
                        {t('{module}.description')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="w-full sm:w-auto">Start Building</Button>
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto">Learn More</Button>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-24 bg-gray-50 dark:bg-neutral-900/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Amazing Features</h2>
                        <p className="text-gray-600 dark:text-neutral-400">Everything you need to scale your application globally.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                                    <div className="w-6 h-6 bg-blue-500 rounded-lg"></div>
                                </div>
                                <h3 className="text-xl font-bold mb-4">Feature {i}</h3>
                                <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                                    High-performance modules built for the modern edge. Modular, typed, and ready for production.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-neutral-500 text-sm">
                    © 2024 Your Company. Built with Next.js & Modular Architecture.
                </div>
            </footer>
        </main>
    );
}
