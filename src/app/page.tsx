import { ReactNode } from 'react';

import HomePage from '@/core/layouts/pages/Home/Home.component';

export default function AppPage({ children }: { children: ReactNode }) {
    return <HomePage />;
}
