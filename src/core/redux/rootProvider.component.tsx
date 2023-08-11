'use client';
import { ReactNode } from 'react';
import { store } from './store.redux';
import { Provider } from 'react-redux';
import AuthLayout from '../layouts/AuthLayout/AuthLayout.component';
import { usePathname } from 'next/navigation';
import PrimaryLayout from '../layouts/PrimaryLayout/PrimaryLayout.component';

export default function Providers({ children }: { children: ReactNode }) {
    const path = usePathname();
    const regex = /\/auth\//;
    const condition = regex.test(path);
    return (
        <Provider store={store}>
            {condition ? <AuthLayout>{children}</AuthLayout> : <PrimaryLayout>{children}</PrimaryLayout>}
        </Provider>
    );
}
