import { ReactNode } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import styles from './HeaderRight.module.scss';
import ButtonSwitchTheme from '@/shared/components/ButtonSwitchTheme/ButtonSwitchTheme.component';
import Image from 'next/image';

const cx = classNames.bind(styles);

function HeaderRight(): ReactNode {
    return (
        <ul className={cx('header-right-options')}>
            <li className={cx('item')}>
                <ButtonSwitchTheme />
            </li>
            <li className={cx('item')}>
                <HeadlessTippy
                    visible={true}
                    interactive
                    placement="bottom"
                    render={(attrs) => <div className={cx('popper-search')} tabIndex={-1} {...attrs}></div>}
                >
                    <Image
                        width={60}
                        height={60}
                        src={'https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg'}
                        alt=""
                    />
                </HeadlessTippy>
            </li>
            <li className={cx('item')}></li>
        </ul>
    );
}

export default HeaderRight;
