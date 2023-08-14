'use client';
import { ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './AuthLayout.module.scss';

import { useAppSelector } from '@/core/redux/hook.redux';
import { selectClientStoreReducer } from '@/core/redux/features/client/client.slice';
import { ELocalStorageKey } from '@/core/common/constants/common.constant';
import Image from 'next/image';
import { MainLogo } from '@/shared/components/Svg/index.component';
import { EDataTheme } from '@/core/common/constants/reduxSlice.constant';

const cx = classNames.bind(styles);

function AuthLayout({ children }: { children: ReactNode }) {
    const store = useAppSelector(selectClientStoreReducer);
    const currentTheme = store.localStoreSide[ELocalStorageKey.DATA_THEME];

    return (
        <div id="root" data-theme={store.localStoreSide[ELocalStorageKey.DATA_THEME]} className={cx('primary-layout')}>
            <header className={cx('header')}>
                <div className={cx('icon-logo')}>
                    <MainLogo
                        fillIcon={currentTheme === EDataTheme.DARK ? 'white' : 'black'}
                        className={cx('Layer_1')}
                    />
                </div>
            </header>
            <main className={cx('contents')}>
                <div className={cx('container')}>{children}</div>
            </main>
        </div>
    );
}

export default AuthLayout;
