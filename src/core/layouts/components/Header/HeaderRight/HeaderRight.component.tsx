import { ReactNode, memo, useCallback } from 'react';

import { IProfile } from '@/core/common/interfaces/userStore.interface';
import { setUserToken } from '@/core/redux/features/client/client.slice';
import { updateProfile } from '@/core/redux/features/user/user.slice';
import { useAppDispatch } from '@/core/redux/hook.redux';
import ButtonSwitchTheme from '@/shared/components/ButtonSwitchTheme/ButtonSwitchTheme.component';
import PopperMenuComponent from '@/shared/components/PopperMenu/PopperMenu.component';
import { IPopperListOptions } from '@/shared/interfaces/IPopperListOptions.interface';
import { faBan, faGear, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './HeaderRight.module.scss';

const cx = classNames.bind(styles);

interface IProps {
    profile: IProfile;
}

function HeaderRight({ profile }: IProps): ReactNode {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const MENU_SETTINGS: IPopperListOptions[] = [
        {
            icon: faUser,
            title: 'Thư viện',
            href: `/profile/${profile ? profile._id : ''}`,
        },
        {
            icon: faRightFromBracket,
            title: 'Đăng xuất',
            // href: '/logout',
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

    const handelLogout = useCallback((title: string) => {
        if (title === 'Đăng xuất') {
            dispatch(setUserToken(null));
            dispatch(updateProfile(null));
            router.replace('/auth/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('header-right-options')}>
            <div className={cx('item')}>
                <ButtonSwitchTheme />
            </div>
            <div className={cx('item')}>
                <PopperMenuComponent
                    listOptions={MENU_SETTINGS}
                    callbackFn={handelLogout}
                    position={{ top: 46, right: 0 }}
                >
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
