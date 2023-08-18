'use client';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import styles from './AuthLayout.module.scss';

import { ELocalStorageKey } from '@/core/common/constants/common.constant';
import { selectClientStoreReducer } from '@/core/redux/features/client/client.slice';
import { useAppSelector } from '@/core/redux/hook.redux';
import { usePathname } from 'next/navigation';

const cx = classNames.bind(styles);

function AuthLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    console.log('path name', pathname);
    const store = useAppSelector(selectClientStoreReducer);
    const currentTheme = store.localStoreSide[ELocalStorageKey.DATA_THEME];

    return (
        <div id="auth" data-theme={store.localStoreSide[ELocalStorageKey.DATA_THEME]} className={cx('primary-layout')}>
            <main className={cx('contents')}>
                <div className={cx('container')}>{children}</div>
            </main>
        </div>
    );
}

export default AuthLayout;
