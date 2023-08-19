import { ReactNode, memo } from 'react';

import { IProfile } from '@/core/common/interfaces/userStore.interface';
import ButtonSwitchTheme from '@/shared/components/ButtonSwitchTheme/ButtonSwitchTheme.component';
import PopperMenuComponent from '@/shared/components/PopperMenu/PopperMenu.component';
import { IPopperListOptions } from '@/shared/interfaces/IPopperListOptions.interface';
import { faBan, faGear, faHome, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './HeaderRight.module.scss';

const cx = classNames.bind(styles);

interface IProps {
    profile: IProfile;
}

function HeaderRight({ profile }: IProps): ReactNode {
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

    return (
        <div className={cx('header-right-options')}>
            <div className={cx('item')}>
                <ButtonSwitchTheme />
            </div>
            <div className={cx('item')}>
                <PopperMenuComponent listOptions={MENU_SETTINGS} position={{ top: 46, right: 0 }}>
                    <button className={cx('btn-settings')}>
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                </PopperMenuComponent>
            </div>
            <div className={cx('item')}>
                <PopperMenuComponent listOptions={USER_SETTINGS} position={{ top: 46, right: 0 }}>
                    <Image
                        src={profile.avatarUrl || '/images/fallback-thumbnail-user.jpg'}
                        width={40}
                        height={40}
                        alt="image"
                        className={cx('avatar')}
                    />
                </PopperMenuComponent>
            </div>
        </div>
    );
}

export default memo(HeaderRight);
