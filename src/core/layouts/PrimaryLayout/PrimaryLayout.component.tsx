'use client';
import classNames from 'classnames/bind';
import { ReactNode, useEffect, useState } from 'react';

import { ELocalStorageKey } from '@/core/common/constants/common.constant';
import SideBarInfo from '@/core/layouts/components/SideBarInfo/SideBarInfo.component';
import SideBarNavigation from '@/core/layouts/components/SideBarNavigation/SideBarNavigation.component';
import { selectClientStoreReducer } from '@/core/redux/features/client/client.slice';
import { useAppSelector } from '@/core/redux/hook.redux';
import LoadingPage from '@/shared/components/Loading/LoadingPage/LoadingPage.component';
import { usePathname, useRouter } from 'next/navigation';
import AuthLayout from '../AuthLayout/AuthLayout.component';
import HeaderComponent from '../components/Header/Header.component';
import PlayerControl from '../components/PlayerControl/PlayerControl.component';
import styles from './PrimaryLayout.module.scss';

const cx = classNames.bind(styles);

function PrimaryLayout({ children }: { children: ReactNode }) {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const router = useRouter();
    const store = useAppSelector(selectClientStoreReducer);
    const path = usePathname();
    const regex = /\/auth\//;
    const regexNotFound = /^\/not-found$/;
    const condition = regex.test(path) || regexNotFound.test(path);
    useEffect(() => {
        if (!!store.localStoreSide.harmony_user_token) {
            setIsLogin(true);
        } else {
            router.replace('/auth/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.localStoreSide]);
    return (
        <div id="root" data-theme={store.localStoreSide[ELocalStorageKey.DATA_THEME]}>
            {condition && <AuthLayout>{children}</AuthLayout>}
            {!isLogin && !condition && <LoadingPage />}
            {!condition && isLogin && (
                <div className={cx('primary-layout')}>
                    <SideBarNavigation />
                    <main className={cx('contents')}>
                        <div className={cx('block')}></div>
                        <HeaderComponent />
                        <div className={cx('container')}>{children}</div>
                    </main>
                    <SideBarInfo />
                    <div className={cx('component-outside')}>
                        <PlayerControl />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PrimaryLayout;
