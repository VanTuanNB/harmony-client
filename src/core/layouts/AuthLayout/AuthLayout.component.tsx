'use client';
import { ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './AuthLayout.module.scss';

import { useAppSelector } from '@/core/redux/hook.redux';
import { selectClientStoreReducer } from '@/core/redux/features/client/client.slice';
import { ELocalStorageKey } from '@/core/common/constants/common.constant';
import Image from 'next/image';

const cx = classNames.bind(styles);

function AuthLayout({ children }: { children: ReactNode }) {
    const store = useAppSelector(selectClientStoreReducer);
    return (
        <div id="root" data-theme={store.localStoreSide[ELocalStorageKey.DATA_THEME]} className={cx('primary-layout')}>
            <header className={cx('header')}>
                <div className={cx('logo-title')}>
                    <Image className={cx('logo')} src='/images/logo-1.png' width={50} height={50} alt="" />

                    <h3 className={cx('title')}>Harmony music</h3>
                </div>
            </header>
            <main className={cx('contents')}>
                <div className={cx('container')}>{children}</div>
            </main>
        </div>
    );
}

export default AuthLayout;
