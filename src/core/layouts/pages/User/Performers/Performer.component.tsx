'use client';
import { ISong, IUser } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import {
    pushSongIntoPrevPlayListAction,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServicePerformerQuery } from '@/core/redux/services/user.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { AlbumIcon, ListSongIcon } from '@/shared/components/Svg/index.component';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Performer.module.scss';

const cx = classNames.bind(styles);

function PerformerPage() {
    const path = usePathname();
    const resurt = path.split('/composer/@')[1];
    const [profile, setProfile] = useState<IUser>();
    const apiUser = useGetServicePerformerQuery(resurt);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (apiUser.data) {
            setProfile(apiUser.data.data);
        }
    }, [apiUser.data, profile]);
    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (_id: string) => {
        const songSelected = store.playlist.suggests.find((song) => song._id === _id);
        dispatch(pushSongIntoPrevPlayListAction(songSelected as any));
        dispatch(startPlayingAction(songSelected as ISong));
    };
    return (
        <div className={cx('profile')}>
            {apiUser.isLoading && <SkeletonLoading count={20} />}
            {profile && (
                <>
                    <div className={cx('profile-user')}>
                        <div className={cx('information')}>
                            <div className={cx('image-profile')}>
                                <Image
                                    className={cx('image2')}
                                    src={profile.avatarUrl || '/images/fallback-thumbnail-user.jpg'}
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className={cx('name')}>
                                <p>Profile</p>
                                <h2 className={cx('name-profile')}>{profile?.name}</h2>
                            </div>
                        </div>
                    </div>
                    <div className={cx('history')}>
                        <div className={cx('control-title')}>
                            <div className={cx('title-left')}>
                                <h2>Bài hát phổ biến</h2>
                            </div>
                            <div className={cx('btn')}>
                                <Link href={'/user/song/' + profile._id}>Xem tất cả</Link>
                            </div>
                        </div>
                        <div className={cx('list-songs')}>
                            {profile.songsReference?.map((song, index) => (
                                <div onClick={() => onClick(song._id)} key={song._id} className={cx('single-song')}>
                                    <div className={cx('single-left')}>
                                        <div id={cx('id')}>{index + 1}</div>
                                        <div id={cx('song')}>
                                            <Image src={song.thumbnailUrl} alt={''} width={40} height={40}></Image>
                                            <div id={cx('song-title')}>
                                                <div id={cx('title')}>{song.title}</div>
                                                <div id={cx('author')}>{profile.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('single-right')}>
                                        <div id={cx('album')}>
                                            {format(new Date(song.publish), 'dd-MM-yyyy HH:mm:ss')}
                                        </div>

                                        <HeartComponent />
                                        <div id={cx('lenght')}>
                                            <span id={cx('lenght')}>3:40</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {profile.songsReference?.length === 0 && (
                                <div className={cx('albumNot')}>
                                    <ListSongIcon className={cx('icon-album')} />
                                    <h2 className={cx('h2-not')}>Hiện tại chưa có bài hát nào</h2>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={cx('playlist')}>
                        <div className={cx('control-title')}>
                            <div className={cx('title-left')}>
                                <h2>Album Phổ biến</h2>
                            </div>
                        </div>
                        <div className={cx('list')}>
                            {profile.albumsReference?.map((album) => (
                                <Link href={'/user/album/' + album._id} key={album._id} className={cx('item')}>
                                    {album.thumbnailUrl && (
                                        <Image src={album.thumbnailUrl} alt="" width={100} height={100} />
                                    )}
                                    {album.thumbnailUrl === null && <AlbumIcon className={cx('icon-album')} />}
                                    <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                                    <h3>{album.title}</h3>
                                    <p>By {profile.name}</p>
                                </Link>
                            ))}
                            {profile.albumsReference?.length === 0 && (
                                <div className={cx('albumNot')}>
                                    <AlbumIcon className={cx('icon-album')} />
                                    <h2 className={cx('h2-not')}>Hiện tại không có album nào</h2>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default PerformerPage;
