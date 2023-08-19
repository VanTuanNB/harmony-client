'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import PrimaryLayout from '../layouts/PrimaryLayout/PrimaryLayout.component';
import { store } from './store.redux';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <PrimaryLayout>{children}</PrimaryLayout>
        </Provider>
    );
}
