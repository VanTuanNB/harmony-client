import { ReactNode, memo, useEffect, useState } from 'react';

import { selectUserReducer } from '@/core/redux/features/user/user.slice';
import { useAppSelector } from '@/core/redux/hook.redux';
import ButtonSwitchTheme from '@/shared/components/ButtonSwitchTheme/ButtonSwitchTheme.component';
import PopperMenuComponent from '@/shared/components/PopperMenu/PopperMenu.component';
import { IPopperListOptions } from '@/shared/interfaces/IPopperListOptions.interface';
import { faBan, faGear, faHome, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './HeaderRight.module.scss';

const cx = classNames.bind(styles);

function HeaderRight(): ReactNode {
    const [avatar, setAvatar] = useState<string>('');
    const { profile } = useAppSelector(selectUserReducer);
    console.log(profile);
    const MENU_SETTINGS: IPopperListOptions[] = [
        {
            icon: faHome,
            title: 'Home settings',
            href: '/dashboard',
        },
        {
            icon: faUser,
            title: 'Profile',
            href: `/profile/${profile ? profile._id : ''}`,
        },
        {
            icon: faRightFromBracket,
            title: 'Log out',
            href: '/logout',
        },
    ];

    const USER_SETTINGS: IPopperListOptions[] = [
        {
            icon: faBan,
            title: 'Danh sách chặn',
            children: {
                title: 'Nested Setting',
                data: [
                    {
                        icon: faBan,
                        title: 'Nested Setting',
                    },
                    {
                        icon: faBan,
                        title: 'Nested Setting2',
                    },
                ],
            },
        },
    ];

    useEffect(() => {
        if (profile) setAvatar(profile.avatarUrl);
    }, [profile]);

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
                    {!!avatar ? (
                        <Image src={avatar} width={40} height={40} alt="image" className={cx('avatar')} />
                    ) : (
                        <></>
                    )}
                </PopperMenuComponent>
            </li>
        </ul>
    );
}

export default memo(HeaderRight);
