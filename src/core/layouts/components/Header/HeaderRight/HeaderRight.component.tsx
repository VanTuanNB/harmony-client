import { ReactNode, memo, useCallback } from 'react';

import { IProfile } from '@/core/common/interfaces/userStore.interface';
import { setUserToken } from '@/core/redux/features/client/client.slice';
import { updateProfile } from '@/core/redux/features/user/user.slice';
import { useAppDispatch } from '@/core/redux/hook.redux';
import ButtonSwitchTheme from '@/shared/components/ButtonSwitchTheme/ButtonSwitchTheme.component';
import PopperMenuComponent from '@/shared/components/PopperMenu/PopperMenu.component';
import { IPopperListOptions } from '@/shared/interfaces/IPopperListOptions.interface';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
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

    const USER_SETTINGS: IPopperListOptions[] = [
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

    const handelLogout = useCallback((title: string) => {
        if (title === 'Đăng xuất') {
            dispatch(setUserToken(null));
            dispatch(updateProfile(null));
            router.replace('/');
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
                    callbackFn={handelLogout}
                    listOptions={USER_SETTINGS}
                    position={{ top: 10, right: 0 }}
                >
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
