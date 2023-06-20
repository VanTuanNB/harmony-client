'use client';
import { ReactNode } from 'react';
import { store } from './store.redux';
import { Provider } from 'react-redux';

export default function Providers({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
