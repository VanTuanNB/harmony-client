import { ReactNode } from 'react';

import HomePage from '@/core/layouts/pages/Home/Home.component';
import ComposerPage from '@/core/layouts/pages/Composer/Composer.component';

export default function AppPage({ children }: { children: ReactNode }) {
    // return <HomePage />;
    return <ComposerPage />;

}
