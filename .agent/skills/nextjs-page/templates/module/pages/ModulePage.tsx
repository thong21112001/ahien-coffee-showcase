'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { fetch{ Module }s } from '../store/{module}Thunks';
import { useI18n } from '@/shared/i18n/hooks';

export default function { Module } Page() {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.{ module });
    const { t } = useI18n();

    useEffect(() => {
        dispatch(fetch{ Module }s());
    }, [dispatch]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">
                {t('{module}.title')}
            </h1>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:text-red-200">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-gray-600 dark:text-gray-400">{t('{module}.loading')}</div>
            ) : items.length === 0 ? (
                <div className="text-gray-600 dark:text-gray-400">{t('{module}.noItems')}</div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-semibold mb-2 dark:text-white">{item.name}</h3>
                            {/* Item content */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
