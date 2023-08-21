'use client';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import {
    pushSongIntoPrevPlayListAction,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceProfileQuery } from '@/core/redux/services/user.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { faClock, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import style from './SongComposer.module.scss';
import { memo } from 'react';

const cx = classNames.bind(style);

function SongComposerPage() {
    const path = usePathname();
    const userId = path.split('/composer/song/')[1];
    const { data, isLoading, isError } = useGetServiceProfileQuery(userId);
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
                <h2>Danh sách bài hát Của bạn</h2>
                <p>Chỉ hiện thị với bạn</p>
            </div>
            <div className={cx('album-render')}>
                <div className={cx('title')}>
                    <div id={cx('id')}>#</div>
                    <div id={cx('song')}>Bài hát</div>
                    <div id={cx('album')}>Album</div>
                    <div id={cx('date')}>Ngày phát hành</div>
                    <div id={cx('lenght')}>
                        <FontAwesomeIcon className={cx('icon-clock')} icon={faClock} />
                    </div>
                </div>
                <div className={cx('list-songs')}>
                    {data?.data.songsReference?.map((song, index) => (
                        <div key={song._id} className={cx('single-song')}>
                            <div id={cx('id')}>{index + 1}</div>
                            <div onClick={() => onClick(song._id)} id={cx('song')}>
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
                            <div id={cx('date')}>19/12/2020</div>
                            <div id={cx('lenght')}>
                                <HeartComponent />
                                <span id={cx('lenght')}>3:40</span>
                                <FontAwesomeIcon className={cx('icon')} icon={faEdit} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(SongComposerPage);
