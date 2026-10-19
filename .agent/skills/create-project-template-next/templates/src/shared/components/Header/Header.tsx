'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';
import LanguageSwitcher from '../LanguageSwitcher';

export default function Header() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
    ];

    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 transition-all">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                            E
                        </div>
                        <span className="text-xl font-black tracking-tighter dark:text-white hidden sm:block">
                            STORE
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md relative group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search premium products..."
                            className="w-full bg-gray-100 dark:bg-neutral-900 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all outline-none"
                        />
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === link.href
                                    ? 'text-blue-600 dark:text-blue-500'
                                    : 'text-gray-600 dark:text-neutral-400'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <LanguageSwitcher />
                        </div>

                        <button className="p-2 text-gray-600 dark:text-neutral-400 hover:text-blue-600 transition-colors relative">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">2</span>
                        </button>

                        <button className="w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-800 overflow-hidden flex items-center justify-center text-gray-500 dark:text-neutral-400 border border-gray-100 dark:border-neutral-700 hover:border-blue-500 transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
