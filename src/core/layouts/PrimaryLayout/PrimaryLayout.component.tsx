'use client';
import { ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './PrimaryLayout.module.scss';
import SideBarNavigation from '@/core/layouts/components/SideBarNavigation/SideBarNavigation.component';
import SideBarInfo from '@/core/layouts/components/SideBarInfo/SideBarInfo.component';
import PlayerControl from '../components/PlayerControl/PlayerControl.component';
import HeaderComponent from '../components/Header/Header.component';
import { useAppSelector } from '@/core/redux/hook.redux';
import { selectClientStoreReducer } from '@/core/redux/features/client/client.slice';

const cx = classNames.bind(styles);

function PrimaryLayout({ children }: { children: ReactNode }) {
    const store = useAppSelector(selectClientStoreReducer);
    return (
        <div id="root" data-theme={store.localStorage['data-theme']} className={cx('primary-layout')}>
            <SideBarNavigation />
            <main className={cx('contents')}>
                <HeaderComponent />
                <div>{children}</div>
            </main>
            <SideBarInfo />
            <div className={cx('component-outside')}>
                <PlayerControl />
            </div>
        </div>
    );
}

export default PrimaryLayout;
