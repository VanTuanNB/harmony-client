'use client';
import { ISong, IUser } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import CreateAlbum from '@/core/layouts/components/PopUp/CreateAlbum/CreateAlbum.component';
import CreateSongComponent from '@/core/layouts/components/PopUp/CreateSong/CreateSong.component';
import UpdateProfile from '@/core/layouts/components/PopUp/UpdateProfile/UpdateProfile.component';
import {
    pushSongIntoPrevPlayListAction,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceProfileQuery } from '@/core/redux/services/user.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { AlbumIcon, HistoryIcon, ListSongIcon, PlayListIcon } from '@/shared/components/Svg/index.component';
import { formatDate } from '@/utils/format.util';
import { faAdd, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import ComposerComponent from '../Composer/Composer/Composer.component';

const cx = classNames.bind(styles);

function Profile() {
    const path = usePathname();
    const resurt = path.split('/profile/')[1];
    const [isComposer, setIsComposer] = useState('');
    const [popupUploadProfile, setPopupUploadProfile] = useState(false);
    const [profile, setProfile] = useState<IUser>();
    const { data, isLoading, refetch } = useGetServiceProfileQuery(resurt);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            let profile = data.data;
            if (profile) {
                setIsComposer(profile.role);
                setProfile(profile);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    
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
            {profile && (
                <>
                    <div className={cx('profile-user')}>
                        <div className={cx('information')}>
                            <div className={cx('image-profile')}>
                                <Image
                                    className={cx('image2')}
                                    src={profile?.avatarUrl || '/images/fallback-thumbnail-user.jpg'}
                                    alt=""
                                    width={500}
                                    height={500}
                                />

                                <button onClick={openPopUpProfile} className={cx('update-profile')}>
                                    <FontAwesomeIcon icon={faPen} className={cx('icon-edit')} />
                                </button>
                                {popupUploadProfile && (
                                    <UpdateProfile close={closePopupProfile} dataProfile={profile} />
                                )}
                            </div>
                            <div className={cx('name')}>
                                <p>Profile</p>
                                <h2 className={cx('name-profile')}>{profile?.name}</h2>
                                <p>{profile?.albumsReference?.length} Album đã tạo</p>
                            </div>
                        </div>
                    </div>
                   <ComposerComponent isComposer={profile.role} dataComposer={profile} />
                    <div className={cx('history')}>
                        <div className={cx('control-title')}>
                            <div className={cx('title-left')}>
                                <h2>Bài hát đã nghe</h2>
                                <p>Chỉ hiển thị với bạn</p>
                            </div>
                            <div className={cx('btn')}>
                                <Link href={''}>Xem tất cả</Link>
                            </div>
                        </div>
                        <div className={cx('list-songs')}>
                            {profile.historyReference?.listSong.map((item) => (
                                <div onClick={() => onClick(item._id)} key={item._id} className={cx('single-song')}>
                                    <div className={cx('single-left')}>
                                        <div id={cx('id')}>1</div>
                                        <div id={cx('song')}>
                                            <Image src={item.thumbnailUrl} alt={''} width={40} height={40}></Image>
                                            <div id={cx('song-title')}>
                                                <div id={cx('title')}>{item.title}</div>
                                                <div id={cx('author')}>{profile.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('single-right')}>
                                        <div id={cx('album')}>{formatDate(item.publish)}</div>

                                        <HeartComponent />
                                        <div id={cx('lenght')}>
                                            <span id={cx('lenght')}>3:40</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {!profile.historyReference && (
                                <div className={cx('albumNot')}>
                                    <HistoryIcon className={cx('icon-album')} />
                                    <h2>Bạn chưa có bài hát đã nghe</h2>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={cx('playlist')}>
                        <div className={cx('control-title')}>
                            <div className={cx('title-left')}>
                                <h2>PlayList của bạn</h2>
                                <p>Chỉ hiển thị với bạn</p>
                            </div>
                        </div>
                        <div className={cx('list')}>
                            {profile.playlistReference?.map((item) => (
                                <Link href={'/user/album/' + item._id} key={item._id} className={cx('item')}>
                                    <Image src="/images/fallback-thumbnail-user.jpg" alt="" width={100} height={100} />
                                    <h3>{item.title}</h3>
                                    <p>{item.userReference.name}</p>
                                </Link>
                            ))}
                            {profile.playlistReference?.length === 0 && (
                                <div className={cx('albumNot')}>
                                    <PlayListIcon className={cx('icon-album')} />
                                    <h2>Bạn chưa có playlist</h2>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={cx('favorite')}>
                        <div className={cx('control-title')}>
                            <div className={cx('title-left')}>
                                <h2>Bài hát yêu thích</h2>
                                <p>Chỉ hiển thị với bạn</p>
                            </div>
                            <div className={cx('btn')}>
                                <Link href={''}>Xem tất cả</Link>
                            </div>
                        </div>
                        <div className={cx('list-songs')}>
                            {profile.favoriteListReference?.listSong.map((item, index) => (
                                <div onClick={() => onClick(item._id)} key={item._id} className={cx('single-song')}>
                                    <div className={cx('single-left')}>
                                        <div id={cx('id')}>{index + 1}</div>
                                        <div id={cx('song')}>
                                            <Image src={item.thumbnailUrl} alt={''} width={40} height={40}></Image>
                                            <div id={cx('song-title')}>
                                                <div id={cx('title')}>{item.title}</div>
                                                <div id={cx('author')}>{profile.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('single-right')}>
                                        <div id={cx('album')}>{formatDate(item.publish)}</div>
                                        <HeartComponent />
                                        <div id={cx('lenght')}>
                                            <span id={cx('lenght')}>3:40</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {!profile.favoriteListReference && (
                                <div className={cx('albumNot')}>
                                    <ListSongIcon className={cx('icon-album')} />
                                    <h2>Bạn chưa thêm bài hát yêu thích</h2>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default memo(Profile);
