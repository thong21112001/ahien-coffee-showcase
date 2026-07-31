import { Metadata } from 'next';
import { { Module }Page } from '@/modules/{module}';

export const metadata: Metadata = {
    title: '{Module}',
    description: 'Browse and manage all {module}',
};

export default function Page() {
    return < { Module }Page />;
}
