import { ReactNode, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import styles from './HeaderRight.module.scss';
import ButtonSwitchTheme from '@/shared/components/ButtonSwitchTheme/ButtonSwitchTheme.component';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import PopperMenuComponent from '@/shared/components/PopperMenu/PopperMenu.component';
import { USER_SETTINGS, MENU_SETTINGS } from '@/shared/constants/index.constant';

const cx = classNames.bind(styles);

function HeaderRight(): ReactNode {
    return (
        <ul className={cx('header-right-options')}>
            <li className={cx('item')}>
                <ButtonSwitchTheme />
            </li>
            <li className={cx('item')}>
                <PopperMenuComponent listOptions={MENU_SETTINGS} position={{ top: 46, right: 0 }}>
                    <button className={cx('btn-settings')}>
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                </PopperMenuComponent>
            </li>
            <li className={cx('item')}>
                <PopperMenuComponent listOptions={USER_SETTINGS} position={{ top: 46, right: 0 }}>
                    <Image
                        width={40}
                        height={40}
                        className={cx('avatar')}
                        src={'/images/fallback-thumbnail-user.jpg'}
                        alt=""
                    />
                </PopperMenuComponent>
            </li>
        </ul>
    );
}

export default HeaderRight;
