'use client';
import { ELocalStorageKey } from '@/core/common/constants/common.constant';
import UpdateProfile from '@/core/layouts/components/PopUp/UpdateProfile/UpdateProfile.component';
import { useGetServiceProfileQuery } from '@/core/redux/services/user.service';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { LocalStorageSide } from '@/utils/clientStore.util';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';
import ComposerPage from '../Composer/Composer/Composer.component';
import FavoriteProfilePage from './FavoriteProfile/FavoriteProfile.component';
import HistoryProfilePage from './HistoryProfile/HistoryProfile.component';
import PlayListProfilePage from './PlayListProfile/PlayListProfile.component';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);
const localStorageInstance = new LocalStorageSide();
function ProfilePage() {
    const loginInfo = localStorageInstance.getStore(ELocalStorageKey.PROFILE);
    const router = useRouter();
    const path = usePathname();
    const resurt = path.split('/profile/')[1];
    const [popupUploadProfile, setPopupUploadProfile] = useState(false);
    const { data, isLoading, refetch } = useGetServiceProfileQuery(resurt);

    const handlePopupProfile = useCallback(
        (isReload: boolean) => {
            if (isReload) {
                refetch();
                setPopupUploadProfile(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    useEffect(() => {
        if (!loginInfo) router.replace('/auth/login');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginInfo]);

    return (
        <div className={cx('profile')}>
            {isLoading && <SkeletonLoading count={20} />}
            {data && (
                <>
                    <div className={cx('profile-user')}>
                        <div className={cx('information')}>
                            <div className={cx('image-profile')}>
                                <Image
                                    className={cx('image2')}
                                    src={
                                        data.data.avatarUrl
                                            ? `${data.data.avatarUrl}?${new Date().getTime()}`
                                            : '/images/fallback-thumbnail-user.jpg'
                                    }
                                    alt=""
                                    loading="lazy"
                                    width={500}
                                    height={500}
                                />

                                <button onClick={() => setPopupUploadProfile(true)} className={cx('update-profile')}>
                                    <FontAwesomeIcon icon={faPen} className={cx('icon-edit')} />
                                </button>
                                {popupUploadProfile && (
                                    <UpdateProfile isUpdated={handlePopupProfile} dataProfile={data.data} />
                                )}
                            </div>
                            <div className={cx('name')}>
                                <p>Profile</p>
                                <h2 className={cx('name-profile')}>{data.data.name}</h2>
                                <p>{data.data.albumsReference?.length} Album đã tạo</p>
                            </div>
                        </div>
                    </div>

                    {data && <ComposerPage isComposer={data.data.role} profile={data.data} />}
                    {data && <HistoryProfilePage profile={data.data} />}
                    {data && <PlayListProfilePage profile={data.data} />}
                    {data && <FavoriteProfilePage profile={data.data} />}
                </>
            )}
        </div>
    );
}

export default memo(ProfilePage);
