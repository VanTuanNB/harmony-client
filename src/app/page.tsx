
import { ReactNode } from 'react';

import HomePage from '@/core/layouts/pages/Home/Home.component';
import FormSong from '@/shared/components/Form/FormSong.component'; 

export default function AppPage({ children }: { children: ReactNode }) {
    // return <HomePage />;
    return <FormSong />;

}
