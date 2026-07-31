'use client';

import { Provider } from 'react-redux';
import { store } from '@/shared/store';
import ThemeProvider from '@/shared/components/ThemeProvider';
import '@/shared/i18n/config';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </Provider>
    );
}
