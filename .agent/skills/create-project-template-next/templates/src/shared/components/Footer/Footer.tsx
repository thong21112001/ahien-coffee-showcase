import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-neutral-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
                            <span className="text-xl font-black tracking-tighter dark:text-white">STORE</span>
                        </Link>
                        <p className="text-gray-500 dark:text-neutral-400 max-w-xs mb-8 leading-relaxed">
                            Experience the best in digital shopping with our premium curated collections and modern interface.
                        </p>
                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-900 flex items-center justify-center text-gray-500 dark:text-neutral-400 cursor-pointer hover:bg-blue-600 hover:text-white transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-6 dark:text-white uppercase tracking-wider text-xs">Navigation</h4>
                        <ul className="space-y-4">
                            {['Home', 'Posts', 'Tasks', 'About'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-gray-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-bold mb-6 dark:text-white uppercase tracking-wider text-xs">Categories</h4>
                        <ul className="space-y-4">
                            {['New Arrivals', 'Best Sellers', 'Discount', 'Collections'].map((item) => (
                                <li key={item}>
                                    <span className="text-gray-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors text-sm cursor-pointer">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-2 lg:col-span-1">
                        <h4 className="font-bold mb-6 dark:text-white uppercase tracking-wider text-xs">Newsletter</h4>
                        <p className="text-gray-500 dark:text-neutral-400 text-sm mb-4">Join our list for exclusive offers.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Email" className="flex-1 min-w-0 px-4 py-2 bg-gray-100 dark:bg-neutral-900 rounded-lg text-sm outline-none dark:text-white border-none focus:ring-1 focus:ring-blue-500" />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">Join</button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 dark:text-neutral-500 font-medium">
                    <p>© 2024 ESTORE LTD. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <span className="hover:text-gray-600 dark:hover:text-neutral-300 cursor-pointer">PRIVACY POLICY</span>
                        <span className="hover:text-gray-600 dark:hover:text-neutral-300 cursor-pointer">TERMS OF SERVICE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
