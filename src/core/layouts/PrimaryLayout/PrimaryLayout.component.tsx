import { ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './PrimaryLayout.module.scss';
import SideBarNavigation from '@/core/layouts/components/SideBarNavigation/SideBarNavigation.component';
import SideBarInfo from '@/core/layouts/components/SideBarInfo/SideBarInfo.component';
import PlayerControl from '../components/PlayerControl/PlayerControl.component';

const cx = classNames.bind(styles);

function PrimaryLayout({ children }: { children: ReactNode }) {
    return (
        <div className={cx('primary-layout')}>
            <SideBarNavigation />
            <main className={cx('contents')}>
                <header></header>
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
