'use client';
import { ISong, IUser } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import {
    removeSongFromSuggestListAction,
    replaceIntoPrevPlayListAction,
    replaceNewListNextSong,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceProfileQuery } from '@/core/redux/services/user.service';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { formatDate } from '@/utils/format.util';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import style from './SongUser.module.scss';

const cx = classNames.bind(style);

function SongUserPage() {
    const { slug } = useParams();
    const [profile, setProfile] = useState<IUser>();
    const { data, isLoading, isError } = useGetServiceProfileQuery(slug);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            setProfile(data.data);
        }
    }, [data]);

    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (song: ISong, index: number) => {
        if (index > 0) {
            const prevSongs =
                (profile &&
                    profile.songsReference &&
                    profile.songsReference.filter((item: ISong, itemIndex: number) => itemIndex < index)) ||
                [];
            dispatch(replaceIntoPrevPlayListAction(prevSongs));
        }
        const nextSongs =
            (profile &&
                profile.songsReference &&
                profile.songsReference.filter((item: ISong, itemIndex: number) => itemIndex > index)) ||
            [];
        dispatch(replaceNewListNextSong(nextSongs));
        dispatch(removeSongFromSuggestListAction(song._id));
        dispatch(startPlayingAction(song));
    };
    return (
        <div className={cx('main-album')}>
            {isLoading && <SkeletonLoading count={20} />}
            <div className={cx('profile-user')}>
                <div className={cx('information')}>
                    <div className={cx('image-profile')}>
                        <Image
                            className={cx('image2')}
                            src={data?.data.avatarUrl || '/images/fallback-thumbnail-user.jpg'}
                            alt=""
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className={cx('name')}>
                        <p>Tác giả</p>
                        <h2 className={cx('name-profile')}>{data?.data.name}</h2>
                    </div>
                </div>
            </div>
            <div className={cx('title')}>
                <h2>Danh sách bài hát </h2>
                <p>Bài hát đã tải lên</p>
            </div>

            <div className={cx('album-render')}>
                <div className={cx('title')}>
                    <div id={cx('id')}>#</div>
                    <div id={cx('song')}>Bài hát</div>
                    <div id={cx('album')}>Album</div>
                    <div id={cx('date')}>Ngày phát hành</div>
                </div>
                <div className={cx('list-songs')}>
                    {data?.data.songsReference?.map((song, index) => (
                        <div
                            key={song._id}
                            className={cx('single-song', store.playing.currentSong._id === song._id && 'active')}
                        >
                            <div id={cx('id')}>{index + 1}</div>
                            <div id={cx('song')} onClick={() => onClick(song, index)}>
                                <Image className={cx('img')} src={song.thumbnailUrl} width={40} height={40} alt="" />
                                <div id={cx('song-title')}>
                                    <div id={cx('title')}>{song.title}</div>
                                    <div id={cx('author')}>{data.data.name}</div>
                                </div>
                            </div>
                            <div id={cx('album')}>
                                {song.albumReference?.map((album, index) => (
                                    <Link href={'/album/' + album._id} key={index}>
                                        {album.title}
                                    </Link>
                                ))}
                            </div>
                            <div id={cx('date')}>{formatDate(song.publish)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(SongUserPage);
