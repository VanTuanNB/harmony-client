'use client';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import {
    pushSongIntoPrevPlayListAction,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceGenreByIdQuery } from '@/core/redux/services/genre.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { ListSongIcon } from '@/shared/components/Svg/index.component';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './GenreDtail.module.scss';
import { memo } from 'react';
const cx = classNames.bind(styles);

function GenreDetailPage() {
    const router = usePathname();
    const genreId = router.split('/genres/')[1];
    const { data, isLoading, isError } = useGetServiceGenreByIdQuery(genreId);
    const dispatch = useAppDispatch();
    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (_id: string) => {
        const songSelected = store.playlist.suggests.find((song) => song._id === _id);
        dispatch(pushSongIntoPrevPlayListAction(songSelected as any));
        dispatch(startPlayingAction(songSelected as ISong));
    };
    return (
        <>
            {isLoading && <SkeletonLoading count={10} />}
            {data?.data && (
                <div className={cx('main-album')}>
                    <div className={cx('album-infor')}>
                        <div className={cx('image')}>
                            <Image
                                className={cx('album-img')}
                                src={'/images/genres/' + data.data.thumbnailUrl}
                                width={232}
                                height={232}
                                alt=""
                            />
                        </div>
                        <div className={cx('album-detail')}>
                            <div className={cx('title')}>
                                <p>Genre</p>
                                <span className={cx('album-name')}>{data?.data.title}</span>
                            </div>
                        </div>
                    </div>
                    {data.data.listSong?.length !== 0 && (
                        <>
                            <div className={cx('btn-icon')}>
                                <FontAwesomeIcon className={cx('icon-Play')} icon={faPlayCircle} />
                            </div>

                            <div className={cx('album-render')}>
                                <div className={cx('list-songs')}>
                                    {data?.data.listSong?.map((song, index) => (
                                        <div
                                            onClick={() => onClick(song._id)}
                                            key={index}
                                            className={cx('single-song')}
                                        >
                                            <div id={cx('id')}>{index + 1}</div>
                                            <div id={cx('song')}>
                                                <Image
                                                    className={cx('img')}
                                                    src={song.thumbnailUrl}
                                                    width={50}
                                                    height={50}
                                                    alt=""
                                                />
                                                <div id={cx('song-title')}>
                                                    <div id={cx('title')}>{song.title}</div>
                                                    <div id={cx('author')}>
                                                        {song.performers?.map((item, index) => (
                                                            <Link href={'/composer/@' + item.nickname} key={index}>
                                                                {item.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div id={cx('album')}>
                                                {song.albumReference?.map((item, index) => (
                                                    <Link href={'/user/album/' + item._id} key={index}>
                                                        {item.title}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div id={cx('date')}>12/11/2012</div>
                                            <div id={cx('lenght')}>
                                                <HeartComponent />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    {data.data.listSong?.length === 0 && (
                        <div className={cx('wrapper-disconnect-network')}>
                            <ListSongIcon className={cx('icon')} />
                            <p className={cx('disconnect-network-title')}>Thể loại {data.data.title} chưa có bài hát</p>
                        </div>
                    )}
                </div>
            )}
            {isError && (
                <div className={cx('wrapper-disconnect-network')}>
                    <ListSongIcon className={cx('icon')} />
                    <p className={cx('disconnect-network-title')}>Album không tồn tại</p>
                </div>
            )}
        </>
    );
}
export default memo(GenreDetailPage);
