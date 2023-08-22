'use client';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import {
    pushSongIntoPrevPlayListAction,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceSongsViewTopQuery } from '@/core/redux/services/song.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import style from './SongTop.module.scss';
import { formatDate } from '@/utils/format.util';

const cx = classNames.bind(style);

function SongTopPage() {
    const { data, isLoading, isError } = useGetServiceSongsViewTopQuery('100');
    const dispatch = useAppDispatch();
    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (_id: string) => {
        const songSelected = store.playlist.suggests.find((song) => song._id === _id);
        dispatch(pushSongIntoPrevPlayListAction(songSelected as any));
        dispatch(startPlayingAction(songSelected as ISong));
    };
    return (
        <div className={cx('main-album')}>
            {isLoading && <SkeletonLoading count={20} />}
            <div className={cx('title')}>
                <h2>Top 100 bài hát nghe nhiều nhất</h2>
            </div>
            <div className={cx('album-render')}>
                <div className={cx('list-songs')}>
                    {data?.data?.map((song, index) => (
                        <div key={song._id} className={cx('single-song')}>
                            <div className={cx('id', 'top' + index)}>
                                <p>{index + 1}</p>
                            </div>
                            <div id={cx('song')}>
                                <Image
                                    onClick={() => onClick(song._id)}
                                    className={cx('img')}
                                    src={song.thumbnailUrl}
                                    width={100}
                                    height={100}
                                    alt=""
                                />
                                <div id={cx('song-title')}>
                                    <div onClick={() => onClick(song._id)} id={cx('title')}>
                                        {song.title}
                                    </div>
                                    <div id={cx('author')}>
                                        {song.performers.map((item, index) => (
                                            <Link href={'/composer/@' + item.nickname} key={index}>
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
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
                            <div id={cx('lenght')}>
                                <HeartComponent />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(SongTopPage);
