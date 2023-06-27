import { ReactNode } from 'react';

import HomePage from '@/core/layouts/pages/Home/Home.component';
import CreateSong from '@/core/layouts/components/CreateSong/CreateSong.component';

export default function AppPage({ children }: { children: ReactNode }) {
    // return <HomePage />;
    return <CreateSong />;

}
