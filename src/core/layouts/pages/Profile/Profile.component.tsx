'use client';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import UpdateProfile from '@/core/layouts/components/PopUp/UpdateProfile/UpdateProfile.component';
import {
    pushSongIntoPrevPlayListAction,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceProfileQuery } from '@/core/redux/services/user.service';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useState } from 'react';
import HistoryProfilePage from './HistoryProfile/HistoryProfile.component';
import PlayListProfilePage from './PlayListProfile/PlayListProfile.component';
import ComposerPage from '../Composer/Composer/Composer.component';
import styles from './Profile.module.scss';
import FavoriteProfilePage from './FavoriteProfile/FavoriteProfile.component';

const cx = classNames.bind(styles);

function ProfilePage() {
    const path = usePathname();
    const resurt = path.split('/profile/')[1];
    const [popupUploadProfile, setPopupUploadProfile] = useState(false);
    const { data, isLoading, refetch } = useGetServiceProfileQuery(resurt);
    const dispatch = useAppDispatch();

    const closePopupProfile = useCallback(
        (isReload: boolean) => {
            if (isReload) {
                // refetch();
                setPopupUploadProfile(false);
                console.log('profile', data);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const openPopUpProfile = () => {
        if (!popupUploadProfile) {
            setPopupUploadProfile(true);
        }
    };

    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (_id: string) => {
        const songSelected = store.playlist.suggests.find((song) => song._id === _id);
        dispatch(pushSongIntoPrevPlayListAction(songSelected as any));
        dispatch(startPlayingAction(songSelected as ISong));
    };
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
                                    src={data.data.avatarUrl || '/images/fallback-thumbnail-user.jpg'}
                                    alt=""
                                    width={500}
                                    height={500}
                                />

                                <button onClick={openPopUpProfile} className={cx('update-profile')}>
                                    <FontAwesomeIcon icon={faPen} className={cx('icon-edit')} />
                                </button>
                                {popupUploadProfile && (
                                    <UpdateProfile close={closePopupProfile} dataProfile={data.data} />
                                )}
                            </div>
                            <div className={cx('name')}>
                                <p>Profile</p>
                                <h2 className={cx('name-profile')}>{data.data.name}</h2>
                                <p>{data.data.albumsReference?.length} Album đã tạo</p>
                            </div>
                        </div>
                    </div>

                    {data && <ComposerPage isComposer={data.data.role} profile={data.data} playSong={onClick} />}
                    {data && <HistoryProfilePage playSong={onClick} profile={data.data} />}
                    {data && <PlayListProfilePage profile={data.data} />}
                    {data && <FavoriteProfilePage playSong={onClick} profile={data.data} />}
                </>
            )}
        </div>
    );
}

export default memo(ProfilePage);
