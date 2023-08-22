'use client';
import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import {
    removeSongFromSuggestListAction,
    replaceIntoPrevPlayListAction,
    replaceNewListNextSong,
    selectSongReducer,
    startPlayingAction,
    updateStatePlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceGenreByIdQuery } from '@/core/redux/services/genre.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { ListSongIcon } from '@/shared/components/Svg/index.component';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';
import styles from './GenreDtail.module.scss';
import PlayingAlbumComponent from './PlayAlbum.component';
const cx = classNames.bind(styles);

function GenreDetailPage() {
    const router = usePathname();
    const genreId = router.split('/genres/')[1];
    const { data, isLoading, isError } = useGetServiceGenreByIdQuery(genreId);
    const dispatch = useAppDispatch();

    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (song: ISong, index: number) => {
        if (index > 0) {
            const prevSongs =
                (data &&
                    data.data &&
                    data.data.listSong?.filter((item: ISong, itemIndex: number) => itemIndex < index)) ||
                [];
            dispatch(replaceIntoPrevPlayListAction(prevSongs));
        }
        const nextSongs =
            (data && data.data && data.data.listSong?.filter((item: ISong, itemIndex: number) => itemIndex > index)) ||
            [];
        dispatch(replaceNewListNextSong(nextSongs));
        dispatch(removeSongFromSuggestListAction(song._id));
        dispatch(startPlayingAction(song));
    };

    const handlePlaying = () => {
        dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
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
                            {data && data.data && !!data.data.listSong?.length && (
                                <PlayingAlbumComponent data={data.data.listSong} />
                            )}

                            <div className={cx('album-render')}>
                                <div className={cx('list-songs')}>
                                    {data?.data.listSong?.map((song, index) => (
                                        <div
                                            onClick={() => onClick(song, index)}
                                            key={index}
                                            className={cx(
                                                'single-song',
                                                store.playing.currentSong._id === song._id && 'active',
                                            )}
                                        >
                                            <div id={cx('id')}>{index + 1}</div>
                                            <div id={cx('song')} onClick={() => onClick(song, index)}>
                                                <div className={cx('wrapper-img')}>
                                                    <Image
                                                        className={cx('img')}
                                                        src={song.thumbnailUrl}
                                                        width={500}
                                                        height={500}
                                                        alt=""
                                                    />
                                                    {store.playing.currentSong._id === song._id && (
                                                        <>
                                                            {store.playing.state.includes(
                                                                EStateCurrentSong.PLAYING,
                                                            ) && (
                                                                <div className={cx('playing-icon')}>
                                                                    <i className={cx('icon')}></i>
                                                                </div>
                                                            )}
                                                            {store.playing.state.includes(EStateCurrentSong.PAUSED) && (
                                                                <div
                                                                    className={cx('playing-icon')}
                                                                    onClick={handlePlaying}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={faPlay}
                                                                        className={cx('icon-pause')}
                                                                    />
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>

                                                <div id={cx('song-title')}>
                                                    <div id={cx('title')}>{song.title}</div>
                                                    <div className={cx('performers')}>
                                                        {song.performers.map((item, key) => (
                                                            <div key={key} className={cx('author')}>
                                                                {item.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div id={cx('album')}>
                                                {song.albumReference?.map((item, index) => (
                                                    <Link href={'/album/' + item._id} key={index}>
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
